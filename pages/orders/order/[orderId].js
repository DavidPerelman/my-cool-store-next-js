import React, { useState, useContext } from 'react';
import classes from './OrderDetailsPage.module.css';
import { getSession, useSession } from 'next-auth/react';
import OrderProducts from '@/components/Order/OrderProducts/OrderProducts';
import OrderSummary from '@/components/Order/OrderSummary/OrderSummary';
import OrderContext from '@/context/order-context';
import getStripe from '@/utils/get-stripe';

const OrderDetailsPage = ({ order, error }) => {
  const orderCtx = useContext(OrderContext);
  const [editable, setEditable] = useState(false);
  const { data: session, status } = useSession();

  const editOrderHandler = () => {
    orderCtx.makeOrderCopy(order[0].products);
    setEditable(true);
  };

  const cancelEditOrderHandler = () => {
    setEditable(false);
  };

  const updateOrderHandler = async () => {
    const orderId = order[0]._id;
    const updateOrderData = {
      orderId: orderId,
      totalPayment: orderCtx.totalAmount,
      products: orderCtx.copyOrderProducts,
    };

    const response = await fetch(
      `http://localhost:3000/api/orders/${order[0]._id}`,
      {
        method: 'PUT',
        headers: {
          Cookie: session,
        },
        body: JSON.stringify(updateOrderData),
      }
    );

    const data = await response.json();
  };

  const redirectToCheckout = async () => {
    const items = order[0].products.map(({ _id, productQuantity }) => ({
      price: _id,
      quantity: productQuantity,
    }));

    const response = await fetch(
      `http://localhost:3000/api/checkout_sessions`,
      {
        method: 'POST',
        headers: {
          Cookie: session,
        },
        body: JSON.stringify(items),
      }
    );

    const { id } = await response.json();
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  let content;

  if (order) {
    content = (
      <div className={classes.container}>
        <OrderProducts
          products={editable ? orderCtx.copyOrderProducts : order[0].products}
          editable={editable}
        />
        <OrderSummary
          editable={editable}
          totalPayment={order[0].totalPayment}
          onEditClick={editOrderHandler}
          onCancelEditClick={cancelEditOrderHandler}
          onUpdateOrderClick={updateOrderHandler}
          onCheckoutOrderClick={redirectToCheckout}
        />
      </div>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div className={classes.OrderDetailsPage}>
      <section>{content}</section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const orderId = context.params.orderId;

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
    headers: {
      Cookie: context.req.headers.cookie,
    },
  });

  const data = await response.json();

  if (data.error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order: data.order_order,
    },
  };
}

export default OrderDetailsPage;

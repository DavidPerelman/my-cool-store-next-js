import React, { useState, useContext } from 'react';
import classes from './OrderDetailsPage.module.css';
import { getSession } from 'next-auth/react';
import OrderProducts from '@/components/Order/OrderProducts/OrderProducts';
import OrderSummary from '@/components/Order/OrderSummary/OrderSummary';
import OrderContext from '@/context/order-context';

const OrderDetailsPage = ({ order, error }) => {
  const orderCtx = useContext(OrderContext);
  const [editable, setEditable] = useState(false);

  const editOrderHandler = () => {
    orderCtx.makeOrderCopy(order[0].products);
    setEditable(true);
  };

  const cancelEditOrderHandler = () => {
    // orderCtx.cancelEdit(order.products);

    setEditable(false);
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
      order: data.order,
    },
  };
}

export default OrderDetailsPage;

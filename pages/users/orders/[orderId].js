import React, { useState, useContext } from 'react';
import { getSession, useSession } from 'next-auth/react';
import OrderProducts from '@/components/Order/OrderProducts/OrderProducts';
import OrderSummary from '@/components/Order/OrderSummary/OrderSummary';
import OrderContext from '@/context/order-context';
import getStripe from '@/utils/get-stripe';
import classes from './OrderDetailsPage.module.css';
import { useRouter } from 'next/router';
import OrderModal from '@/components/Layout/OrderModal/OrderModal';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';

const OrderDetailsPage = ({ order, error }) => {
  const router = useRouter();
  const orderCtx = useContext(OrderContext);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const editOrderHandler = () => {
    orderCtx.makeOrderCopy(order[0].products);
    setEditable(true);
  };

  const cancelEditOrderHandler = () => {
    setEditable(false);
  };

  const updateOrderHandler = async () => {
    setLoading(true);
    let productsData = [];

    for (let i = 0; i < orderCtx.copyOrderProducts.length; i++) {
      productsData.push({
        _id: orderCtx.copyOrderProducts[i]._id,
        product: orderCtx.copyOrderProducts[i].product._id,
        totalPrice: orderCtx.copyOrderProducts[i].product.price,
        productQuantity: orderCtx.copyOrderProducts[i].productQuantity,
      });
    }

    const orderId = order[0]._id;

    const updateOrderData = {
      totalPayment: orderCtx.totalAmount,
      products: productsData,
    };

    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        Cookie: session,
      },
      body: JSON.stringify(updateOrderData),
    });

    const data = await response.json();
    if (data.order) {
      router.reload(window.location.pathname);
    }
    setLoading(false);
  };

  const redirectToCheckout = async () => {
    const items = order[0].products.map(({ product, productQuantity }) => ({
      price: product.stripe_id,
      quantity: productQuantity,
    }));

    const response = await fetch(`/api/checkout_sessions`, {
      method: 'POST',
      headers: {
        Cookie: session,
      },
      body: JSON.stringify(items),
    });

    const { id } = await response.json();
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  let content;

  if (order) {
    content = (
      <div>
        {loading && <OrderModal onCloseCart={() => setLoading(false)} />}

        <OrderProducts
          products={editable ? orderCtx.copyOrderProducts : order[0].products}
          editable={editable}
        />
        <OrderSummary
          isOpen={order[0].isOpen}
          status={order[0].status}
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
    <div>
      <div className={classes.buttons}>
        <Link href={`/users/orders`} legacyBehavior>
          <button className='btn btn-primary'>My Orders</button>
        </Link>
      </div>

      <section>{content}</section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const orderId = context.params.orderId;

  if (session) {
    const response = await fetch(
      `${process.env.DB_HOST}/api/orders/${orderId}`,
      {
        credentials: 'include',
        headers: {
          Cookie: context.req.headers.cookie,
        },
      }
    );

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
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default OrderDetailsPage;

import React, { useState, useContext } from 'react';
import classes from './orders.module.css';
import { getSession, useSession } from 'next-auth/react';
import OrderProducts from '@/components/Order/OrderProducts/OrderProducts';
import OrderSummary from '@/components/Order/OrderSummary/OrderSummary';
import OrderContext from '@/context/order-context';
import getStripe from '@/utils/get-stripe';
import { useRouter } from 'next/router';
import OrderModal from '@/components/Layout/OrderModal/OrderModal';
import Link from 'next/link';

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
    const items = order[0].products.map(({ _id, productQuantity }) => ({
      price: _id,
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
      <div className={classes.container}>
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
    <div className={classes.OrderDetailsPage}>
      <Link href={`/orders/user/user-orders`} legacyBehavior>
        <button className='btn btn-primary'>My Orders</button>
      </Link>

      <section>{content}</section>
    </div>
  );
};

export default OrderDetailsPage;

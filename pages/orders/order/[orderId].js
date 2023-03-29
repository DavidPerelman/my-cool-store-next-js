import { getSession } from 'next-auth/react';
import React from 'react';

const OrderPage = ({ order }) => {
  console.log(order);
  return <div>OrderPage</div>;
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

  return {
    props: {
      order: data.order,
    },
  };
}

export default OrderPage;

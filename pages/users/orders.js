import React, { useRef, useState, useContext, useEffect } from 'react';
import classes from './orders.module.css';
import Table from '@/components/UI/Table/Table';
import { getSession, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useRouter } from 'next/router';

const UserOrders = (props) => {
  const router = useRouter();
  const { orders } = props;
  const { data: session, status } = useSession();
  const filterInputRef = useRef();
  const [filterText, setFilterText] = useState('');
  const isLoggedIn = session && status === 'authenticated';

  const columns = [
    {
      name: 'No.',
      selector: (row) => row.orderNumber,
    },
    {
      name: 'Created',
      selector: (row) => row.created,
      sortable: true,
      // id: 1,
    },
    {
      name: 'Total',
      selector: (row) => row.totalPayment,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const rowClickedHandler = (row, e) => {
    router.push(`/orders/order/${row._id}`);
  };

  const handleChange = (e) => {};

  const handleClear = () => {};

  return (
    <>
      {isLoggedIn && (
        <div className={classes.UserOrders}>
          <Table
            filterInputRef={filterInputRef}
            columns={columns}
            tableData={orders}
            // filterText={filterText}
            handleChange={handleChange}
            handleClear={handleClear}
            rowClickedHandler={rowClickedHandler}
          />
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const response = await fetch('http://localhost:3000/api/user/orders', {
      credentials: 'include',
      headers: {
        Cookie: context.req.headers.cookie,
      },
    });
    const data = await response.json();
    console.log(data);

    return { props: { orders: data } };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default UserOrders;

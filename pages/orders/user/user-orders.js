import React, { useRef, useState } from 'react';
import classes from './MyOrders.module.css';
import Table from '@/components/UI/Table/Table';
import { getSession, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useRouter } from 'next/router';

const MyOrders = (props) => {
  const router = useRouter();
  const { orders } = props;
  const { data: session, status } = useSession();
  const filterInputRef = useRef();
  const [filterText, setFilterText] = useState('');
  const isLoggedIn = session && status === 'authenticated';

  const columns = [
    {
      name: 'No.',
      selector: (row) => row._id,
    },
    {
      name: 'Created',
      selector: (row) => row.created,
      sortable: true,
      // id: 1,
    },
    // {
    //   name: 'Products',
    //   selector: (row) => row.Products,
    // },
    {
      name: 'Total',
      selector: (row) => row.totalPayment,
      sortable: true,
    },
    // {
    //   name: 'Is Paid',
    //   selector: (row) => row.isPaid.isPaid,
    //   sortable: true,
    // },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  // first filter
  // const filter = (item) =>
  //   (item.orderNumber &&
  //     item.orderNumber.toLowerCase().includes(filterText.toLowerCase())) ||
  //   (item.created &&
  //     item.created.toLowerCase().includes(filterText.toLowerCase())) ||
  //   (item.status &&
  //     item.status.toLowerCase().includes(filterText.toLowerCase()));

  // const ordersData =
  //   orders &&
  //   orders.filter(filter).map((order) => {
  //     return {
  //       id: order._id,
  //       orderNumber: order.orderNumber,
  //       created: order.created,
  //       totalPayment: order.totalPayment,
  //       status: order.status,
  //     };
  //   });

  const rowClickedHandler = (row, e) => {
    // e.preventDefault();
    router.push(`/orders/order/${row._id}`);
    // navigate(`/order/${e.id}`);
  };

  const handleChange = (e) => {
    // setFilterText(e.target.value);
    // console.log(filterText);
  };

  const handleClear = () => {
    // console.log('handleClear');
    // console.log(filterText);
    // if (filterText) {
    //   setFilterText('');
    //   filterInputRef.current.value = '';
    // }
  };

  return (
    <>
      {isLoggedIn && (
        <div className={classes.MyOrders}>
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
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const response = await fetch(
    `${process.env.DB_HOST}/api/orders/user-orders`,
    {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }
  );

  const results = await response.json();

  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
      orders: results,
      // data,
    },
  };
}

export default MyOrders;

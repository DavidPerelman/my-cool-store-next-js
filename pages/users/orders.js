import React, { useRef, useState } from 'react';
// import classes from './orders.module.css';
import Table from '@/components/UI/Table/Table';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useRouter } from 'next/router';

const UserOrders = (props) => {
  const router = useRouter();
  const { orders } = props;
  const filterInputRef = useRef();
  const [filterText, setFilterText] = useState('');

  const columns = [
    {
      name: 'No.',
      selector: (row, index) => index + 1,
      center: true,
      width: '60px',
    },
    {
      name: 'Products No.',
      selector: (row) => row.products.length,
      sortable: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Created',
      selector: (row) => row.created.slice(0, 10),
      sortable: true,
      center: true,
      width: '110px',
    },
    {
      name: 'Total Payment',
      selector: (row) => `${row.totalPayment.toFixed(2)} $`,
      sortable: true,
      center: true,
      width: '160px',
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      center: true,
      sortable: true,
    },
    {
      name: 'Paid',
      selector: (row) => (row.isPaid.isPaid !== true ? 'No' : 'Yes'),
      center: true,
      sortable: true,
    },
  ];

  const rowClickedHandler = (row, e) => {
    router.push(`/users/orders/${row._id}`);
  };

  const handleChange = (e) => {};

  const handleClear = () => {};

  return (
    <div>
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
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const response = await fetch(`${process.env.DB_HOST}/api/user/orders`, {
      credentials: 'include',
      headers: {
        Cookie: context.req.headers.cookie,
      },
    });
    const data = await response.json();

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

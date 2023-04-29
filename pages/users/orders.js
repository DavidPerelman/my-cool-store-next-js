import React, { useRef, useState, useContext, useEffect, useMemo } from 'react';
// import classes from './orders.module.css';
import Table from '@/components/UI/Table/Table';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { useTable } from 'react-table';

const UserOrders = (props) => {
  const router = useRouter();
  const { orders } = props;
  const { data: session, status } = useSession();
  const filterInputRef = useRef();
  const [filterText, setFilterText] = useState('');
  const isLoggedIn = session && status === 'authenticated';

  //   const data = useMemo(() => orders, []);
  //   const columns = useMemo(
  //     () => [
  //       {
  //         Header: 'No.',
  //         accessor: 'orderNumber',
  //       },
  //       {
  //         Header: 'Created',
  //         accessor: 'created',
  //       },
  //       {
  //         Header: 'Total',
  //         accessor: 'totalPayment',
  //       },
  //       {
  //         Header: 'Status',
  //         accessor: 'status',
  //       },
  //     ],
  //     []
  //   );
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

  //   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //     useTable({ columns, data });

  const rowClickedHandler = (row, e) => {
    router.push(`/users/${row._id}`);
  };

  const handleChange = (e) => {};

  const handleClear = () => {};

  return (
    <>
      <div>
        {/* <div className='container'>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={i} {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td key={i} {...cell.getCellProps()}>
                        {' '}
                        {cell.render('Cell')}{' '}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
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
    </>
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

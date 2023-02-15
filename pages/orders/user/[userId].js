import React, { useRef, useState, useContext, useEffect } from 'react';
import Table from '../../components/UI/Table/Table';
import { useGetAllUserOrders } from '../../hooks/useOrdersQuery';
import classes from './MyOrders.module.css';

const MyOrders = () => {
  const filterInputRef = useRef();
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  const { isLoading, error, data: orders } = useGetAllUserOrders();

  console.log(orders);
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
  const filter = (item) =>
    (item.orderNumber &&
      item.orderNumber.toLowerCase().includes(filterText.toLowerCase())) ||
    (item.created &&
      item.created.toLowerCase().includes(filterText.toLowerCase())) ||
    (item.status &&
      item.status.toLowerCase().includes(filterText.toLowerCase()));

  const ordersData =
    orders &&
    orders.filter(filter).map((order) => {
      return {
        id: order._id,
        orderNumber: order.orderNumber,
        created: order.created,
        totalPayment: order.totalPayment,
        status: order.status,
      };
    });

  const rowClickedHandler = (e) => {
    console.log(e.id);
    navigate(`/order/${e.id}`);
  };

  const handleChange = (e) => {
    setFilterText(e.target.value);
    console.log(filterText);
  };

  const handleClear = () => {
    console.log('handleClear');
    console.log(filterText);
    if (filterText) {
      setFilterText('');
      filterInputRef.current.value = '';
    }
  };

  console.log(orders);

  return (
    <div className={classes.MyOrders}>
      <Table
        filterInputRef={filterInputRef}
        columns={columns}
        tableData={ordersData}
        isLoading={isLoading}
        // filterText={filterText}
        handleChange={handleChange}
        handleClear={handleClear}
        rowClickedHandler={rowClickedHandler}
      />
    </div>
  );
};

export default MyOrders;

import React from 'react';
import DataTable from 'react-data-table-component';
import Filtering from '../Filtering/Filtering';

const Table = ({
  columns,
  tableData,
  isLoading,
  handleClear,
  handleChange,
  filterInputRef,
  rowClickedHandler,
}) => {
  const handleSelected = ({ selectedRows }) => {
    console.log(selectedRows);
  };

  const disabledCriteria = (selectedRows) => {
    if (selectedRows.isOpen === true) {
      return false;
    } else {
      return true;
    }
  };

  const customStyles = {
    rows: {
      style: {
        cursor: 'pointer',
        // fontSize: '25px',
        // fontWeight: 'bold',
        // backgroundColor: 'red',
      },
    },
    headCells: {
      style: {
        backgroundColor: 'grey',
        fontSize: '1rem',
        textAlign: 'center',
      },
    },
  };

  return (
    <>
      <Filtering
        handleChange={handleChange}
        handleClear={handleClear}
        filterInputRef={filterInputRef}
      />
      <DataTable
        columns={columns}
        data={tableData}
        fixedHeader={true}
        fixedHeaderScrollHeight='300px'
        progressPending={isLoading}
        // defaultSortFieldId={1}
        selectableRows={true}
        onSelectedRowsChange={handleSelected}
        selectableRowDisabled={disabledCriteria}
        customStyles={customStyles}
        onRowClicked={rowClickedHandler}
      />
    </>
  );
};

export default Table;

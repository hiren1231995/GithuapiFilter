import React from "react";
import { Spinner, Table } from "react-bootstrap";
import PropTypes from "prop-types";

const TableComponent = ({ cols, data, isLoading }) => (
  <div className="table-responsive">
    <Table className="table mt-4">
      <thead>
        <tr>
          <th>id</th>
          {cols &&
            cols.length > 0 &&
            cols.map((headerItem, index) => (
              <>
                {/* {console.log("cols,data", cols, data)} */}
                <th className="text-capitalize" key={index}>
                  {headerItem.title}
                </th>
              </>
            ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={cols.length} className="text-center">
              <Spinner animation="grow" className="bg-black" />
            </td>
          </tr>
        ) : (
          data &&
          data.map((item, index) => (
            <>
              <tr className="cursor-pointer" key={index}>
                <td>{index + 1}</td>
                {cols &&
                  cols.length > 0 &&
                  cols.map((col, i) => (
                    <>
                      <td key={i}>{col.render(item)}</td>
                    </>
                  ))}
              </tr>
            </>
          ))
        )}
      </tbody>
    </Table>
  </div>
);

TableComponent.propTypes = {
  cols: PropTypes.array,
  data: PropTypes.array,
  tableClassName: PropTypes.string,
  hasHoverMenu: PropTypes.object,
  selectdColumn: PropTypes.string,
  // bordered: PropTypes.bool,
  // hoverable: PropTypes.bool,
  // striped: PropTypes.bool,
  // isDark: PropTypes.bool,
};

export default TableComponent;

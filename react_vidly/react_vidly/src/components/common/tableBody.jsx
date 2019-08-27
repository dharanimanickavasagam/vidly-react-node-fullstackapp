import React from "react";
import _ from "lodash";

// Interface
// get some list to be displayed

const TableBody = props => {
  const { content, columns } = props;

  const renderCell = (item, column) => {
    if (column.contentObj) {
      return column.contentObj(item);
    }
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {content.map(item => (
        <tr key={item._id}>
          {columns.map(column => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

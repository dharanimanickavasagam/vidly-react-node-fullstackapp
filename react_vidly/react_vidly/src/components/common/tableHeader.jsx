import React, { Component } from "react";
// Interface
// columns : array
//

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    if (column.path !== this.props.sortColumn.path) {
      return null;
    }
    if (this.props.sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    }
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { columns, ...rest } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              style={{ cursor: "pointer" }}
              key={index}
              onClick={() => this.raiseSort(column.path)}
              {...rest}
            >
              {column.name} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

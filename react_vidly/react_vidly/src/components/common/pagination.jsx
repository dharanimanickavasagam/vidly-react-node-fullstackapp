import React from "react";
import _ from "lodash";

//lodash
// its the optimized version of underscore.js
//Interface
// this shld know the totalCount passed to it
// also it must know the pageSize

const Pagination = props => {
  const { itemsCount, pageSize, onClick, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  //Creates an array, add 1 to the last index always
  const pages = _.range(1, pagesCount + 1);

  if (pages <= 1) return " ";
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page, index) => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button className="page-link" onClick={() => onClick(page)}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;

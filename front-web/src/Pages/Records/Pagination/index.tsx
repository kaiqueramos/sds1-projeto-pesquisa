import React from "react";
import "./styles.css";

type Props = {
  totalPages?: number;
  goToPage: Function;
  activePage: number;
};

const Pagination = ({ totalPages = 0, goToPage, activePage }: Props) => {
  const paginationItems = Array.from(Array(totalPages).keys());
  return (
    <div className="pagination-container">
      {paginationItems.map((item, key) => {
        return (
          <button
            className={`pagination-item ${
              activePage === item ? "active" : "inactive"
            }`}
            onClick={() => {
              goToPage(item);
            }}
            key={key}
          >
            {key + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;

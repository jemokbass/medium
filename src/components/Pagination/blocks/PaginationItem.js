import React from 'react';
import { Link } from 'react-router-dom';

const PaginationItem = ({ currentPage, url, page }) => {
  const current = currentPage === page ? 'active' : '';
  return (
    <li className={`page-item ${current}`}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

export default PaginationItem;

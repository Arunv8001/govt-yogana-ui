import React from "react";
import _fill from "lodash/fill";
import _isFunction from "lodash/isFunction";
import RBPagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import SVG from "react-inlinesvg";
import "./Pagination.scss";

const nearestPages = (total, active) => {
  let pages = [0];
  if (total < 5) {
    pages = _fill(Array(total), null);
  } else if (0 <= active && 2 > active) {
    pages = _fill(Array(5), null);
  } else if (active >= total - 2) {
    pages = _fill(Array(5), null).map((item, i) => total - 5 + i);
  } else {
    pages = _fill(Array(5), null).map((item, i) => active - 2 + i);
  }
  return pages.map((item, index) => item || index);
};

const Pagination = ({
  total = 0,
  pageSize,
  sortBy,
  active = 0,
  pageSizeOptions = [],
  sortByOptions = [],
  onChange,
}) => {
  const pagesCount = Math.ceil(total / pageSize) || 1;
  const pages = nearestPages(pagesCount, active);
  if (pagesCount < active) {
    if (_isFunction(onChange)) {
      onChange({ sortBy, pageSize, activePage: 0 });
    }
  }
  const setPage = (activePage) => {
    onChange({ sortBy, pageSize, activePage });
  };
  const onChangePerChange = (e) => {
    onChange({ sortBy, pageSize: e.target.value, activePage: 0 });
  };
  const onChangeSortBy = (e) => {
    onChange({ sortBy: e.target.value, pageSize, activePage: 0 });
  };
  return (
    <div className="pagination-container">
      <p>
        Showing Results {active * pageSize + 1} to{" "}
        {Math.min((active + 1) * pageSize, total)} of {total}{" "}
      </p>
      <RBPagination>
        <RBPagination.First
          disabled={active === 0}
          onClick={(e) => setPage(0)}
        />
        {pages.map((page) => (
          <RBPagination.Item
            key={page}
            active={active === page}
            onClick={(e) => setPage(page)}
          >
            {page + 1}
          </RBPagination.Item>
        ))}
        <RBPagination.Last
          disabled={active === pagesCount - 1}
          onClick={(e) => setPage(pagesCount - 1)}
        />
      </RBPagination>
      {pageSizeOptions.length && (
        <Form.Group
          controlId="items-per-page"
          className="floating-input page-size-select"
        >
          <Form.Control
            as="select"
            name="itemsPerPage"
            value={pageSize}
            onChange={onChangePerChange}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt.key} value={opt.key} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </Form.Control>
          <Form.Label>Items per page</Form.Label>
          <SVG
            cacheRequests={true}
            src={`/static/svg/keyboard_arrow_down_black_24dp.svg`}
          />
        </Form.Group>
      )}
      {/* {sortByOptions.length && (
        <Form.Group
          controlId="items-per-page"
          className="floating-input page-size-select"
        >
          <Form.Control
            as="select"
            name="itemsPerPage"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            {sortByOptions.map((opt) => (
              <option key={opt.key} value={opt.key} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </Form.Control>
          <Form.Label>Sort by</Form.Label>
          <SVG
            cacheRequests={true}
            src={`/static/svg/keyboard_arrow_down_black_24dp.svg`}
          />
        </Form.Group>
      )} */}
    </div>
  );
};
export default Pagination;

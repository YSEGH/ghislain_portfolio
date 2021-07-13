import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../1-css/Pagination.css";

export default function Pagination({ count, per_page, page, filters, url }) {
  const link = Math.round(count / per_page);
  useEffect(() => {
    console.log({ count, per_page, page, url });
    return () => {};
  }, []);

  return (
    <div className="pagination">
      {page > 1 && (
        <Link to={`${url}/${page - 1}/${filters}`}>Page précédente</Link>
      )}
      {page < link && (
        <Link to={`${url}/${page + 1}/${filters}`}>Page suivante</Link>
      )}
    </div>
  );
}

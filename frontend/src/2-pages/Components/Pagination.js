import React, { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../1-css/Pagination.css";

export default function Pagination({ count, per_page, page, filters, url }) {
  const [link, setLink] = useState(0);
  useEffect(() => {
    setLink(Math.ceil(count / per_page));
    return () => {};
  }, [count]);

  return (
    <div className="pagination">
      {page > 1 && (
        <Link
          className="previous"
          to={`${url}/${page - 1}/${filters ? filters : ""}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          <MdNavigateNext size={20} />
          Page précédente
        </Link>
      )}
      {page < link && (
        <Link
          className="next"
          to={`${url}/${page + 1}/${filters ? filters : ""}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          Page suivante <MdNavigateNext size={20} />
        </Link>
      )}
    </div>
  );
}

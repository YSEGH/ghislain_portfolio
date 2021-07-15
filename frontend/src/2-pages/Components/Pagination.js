import React, { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../1-css/Pagination.css";

export default function Pagination({ count, per_page, page, filters, url }) {
  const [link, setLink] = useState(0);
  useEffect(() => {
    /*     console.log({ count, per_page, page, url });
    console.log(link); */
    setLink(Math.ceil(count / per_page));
    return () => {};
  }, [count]);

  return (
    <div className="pagination">
      {page > 1 && (
        <Link
          className="previous"
          to={`${url}/${page - 1}/${filters ? filters : ""}`}
        >
          <MdNavigateNext size={20} />
          Page précédente
        </Link>
      )}
      {page < link && (
        <Link
          className="next"
          to={`${url}/${page + 1}/${filters ? filters : ""}`}
        >
          Page suivante <MdNavigateNext size={20} />
        </Link>
      )}
    </div>
  );
}

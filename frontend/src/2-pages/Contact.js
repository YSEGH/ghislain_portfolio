import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfosHandler } from "../3-actions/infoActions";
import Nav from "./Components/Nav";
import "../1-css/Contact.css";
import { MdPhone, MdPlace, MdMail } from "react-icons/md";

export default function Contact() {
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  useEffect(() => {
    dispatch(getInfosHandler());
    return () => {};
  }, []);

  return (
    <div className="contact">
      <Nav />
      <div className="contact-content">
        <div className="text-container">
          <h1>Contact</h1>
          <p>
            Do not hesitate to contact me for any question, I will answer you as
            soon as possible.
          </p>
          <p>
            <MdPlace size={30} />
            {infos.city}, {infos.country}
          </p>
          <p>
            <MdPhone size={30} />
            {infos.phone}
          </p>
          <p>
            <MdMail size={30} />
            {infos.email}
          </p>
        </div>
      </div>
    </div>
  );
}

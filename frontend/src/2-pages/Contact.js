import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfosHandler } from "../3-actions/infoActions";
import Nav from "./Components/Nav";
import "../1-css/Contact.css";
import { MdPhone, MdPlace, MdMail } from "react-icons/md";
import Title from "./Components/Title";

export default function Contact() {
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  useEffect(() => {
    document.title = "Ghislain Ramage - Contact";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Would you like to contact me ? You can find my contact details on this page."
      );
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(getInfosHandler());
    return () => {};
  }, []);

  return (
    <div className="contact">
      <Nav />
      <div className="contact-content">
        <Title title="Contact" />
        <div className="text-container">
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

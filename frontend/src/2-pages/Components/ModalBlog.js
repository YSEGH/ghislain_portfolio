import React from "react";
import "../../1-css/ModalBlog.css";
import { MdDateRange, MdPlace, MdInfoOutline, MdClose } from "react-icons/md";

export default function ModalBlog({ item }) {
  const closeModal = () => {
    const modalItem = document.getElementsByClassName("modal-blog")[0];

    modalItem.classList.add("close");
    modalItem.classList.remove("open");
  };

  return (
    <div className="modal-blog" onClick={() => closeModal()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => closeModal()}
        />
        <div className="photo-container">
          <img src="/images/large.jpg" alt="Image 1" />
          <div className="details-infos photo">
            <p>
              <span>
                <MdDateRange size={40} />
              </span>
              04/03/2020
            </p>
            <p>
              <span>
                <MdPlace size={40} />
              </span>
              Paris, France
            </p>
          </div>
        </div>
        <div className="text-container-modal close">
          <div className="details-infos text">
            <p>
              <span>
                <MdDateRange size={40} />
              </span>
              04/03/2020
            </p>
            <p>
              <span>
                <MdPlace size={40} />
              </span>
              Paris, France
            </p>
          </div>
          <h2>{item.name}</h2>
          <p>Fugiat laborum incididunt.</p>
          <p>
            Fugiat laborum incididunt adipisicing exercitation proident ipsum
            sunt. Est sunt magna est magna est esse et in adipisicing eu anim.
            Id nostrud laborum nulla amet duis reprehenderit aliquip. Non
            voluptate dolor Lorem sit minim deserunt nisi anim esse sint veniam
            ea ad. Aute dolor consectetur esse ipsum eiusmod. Eiusmod ullamco ex
            do proident ad exercitation magna occaecat laborum aute ex
            reprehenderit. Fugiat laborum incididunt adipisicing exercitation
            proident ipsum sunt. Est sunt magna est magna est esse et in
            adipisicing eu anim. Id nostrud laborum nulla amet duis
            reprehenderit aliquip. Non voluptate dolor Lorem sit minim deserunt
            nisi anim esse sint veniam ea ad. Aute dolor consectetur esse ipsum
            eiusmod. Eiusmod ullamco ex do proident ad exercitation magna
            occaecat laborum aute ex reprehenderit. laborum incididunt
            adipisicing exercitation proident ipsum sunt. Est sunt magna est
            magna est esse et in adipisicing eu anim. Id nostrud laborum nulla
            amet duis reprehenderit aliquip. Non voluptate dolor Lorem sit minim
            deserunt nisi anim esse sint veniam ea ad. Aute dolor consectetur
            esse ipsum eiusmod. Eiusmod ullamco ex do proident ad exercitation
            magna occaecat laborum aute ex reprehenderit.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import MaterialTable from "material-table";
import "../../1-css/Contenu.css";
import ModalContenu from "./ModalContenu";
import { BiSearch } from "react-icons/bi";

export default function TableItems() {
  const displayModal = () => {
    const modal = document.querySelector(".modal.contenu");
    modal.classList.remove("close");
    modal.classList.add("open");
  };
  return (
    <div className="table-items">
      <MaterialTable
        style={{ boxShadow: "none" }}
        columns={[
          { title: "Adı", field: "name" },
          {
            title: "Doğum Yılı",
            field: "birthYear",
            type: "numeric",
            render: (RowData) => (
              <>
                <ModalContenu />
                <button
                  className="button-modal-contenu"
                  onClick={() => displayModal()}
                >
                  <BiSearch size={30} />
                </button>
              </>
            ),
          },
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        ]}
        title="Demo"
      />
    </div>
  );
}

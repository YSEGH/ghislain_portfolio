import React from "react";
import MaterialTable from "material-table";
import "../../1-css/Contenu.css";

export default function Contenu() {
  return (
    <div className="contenu">
      <MaterialTable
        style={{ boxShadow: "none" }}
        columns={[
          { title: "Adı", field: "name" },
          { title: "Soyadı", field: "surname" },
          { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
          {
            title: "Doğum Yeri",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        ]}
        title="Demo Title"
      />
    </div>
  );
}

import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "../1-css/Admin.css";
import FormAddContenu from "./Components/FormAddContenu";
import FormDetails from "./Components/FormDetails";
import Nav from "./Components/Nav";
import NavAdmin from "./Components/NavAdmin";
import PageContenu from "./Components/PageContenu";
import TableItems from "./Components/TableItems";

export default function Admin(props) {
  return (
    <div className="admin">
      <Nav color={"black"} />
      <NavAdmin color={"black"} />
      <div className="admin-component">
        <Router>
          <Switch>
            <Route path="/admin/contenu" exact render={() => <TableItems />} />
            <Route
              path="/admin/contenu/:itemId"
              render={(props) => <PageContenu {...props} />}
            />
            <Route
              path="/admin/ajouter-contenu"
              render={() => <FormAddContenu update={false} />}
            />
            <Route
              path="/admin/infos-generales"
              render={() => <FormDetails />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

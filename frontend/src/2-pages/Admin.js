import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "../1-css/Admin.css";
import Contenu from "./Components/Contenu";
import FormAddContenu from "./Components/FormAddContenu";
import Nav from "./Components/Nav";
import NavAdmin from "./Components/NavAdmin";

export default function Admin() {
  return (
    <div className="admin">
      <Nav color={"black"} />
      <NavAdmin color={"black"} />
      <div className="admin-component">
        <Router>
          <Switch>
            <Route path="/admin/contenu" render={() => <Contenu />} />
            <Route
              path="/admin/ajouter-contenu"
              render={() => <FormAddContenu />}
            />
            <Route path="/admin/infos-generales" render={() => <Contenu />} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

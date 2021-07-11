import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "../1-css/Admin.css";
import FormDetails from "./Components/FormDetails";
import Nav from "./Components/Nav";
import NavAdmin from "./Components/NavAdmin";
import PageAddContenu from "./Components/PageAddContenu";
import PageContenu from "./Components/PageContenu";
import TableItems from "./Components/TableItems";

export default function Admin(props) {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      props.history.push("/admin");
    }
    if (props.location.pathname === "/admin/mon-compte/") {
      props.history.push("/admin/mon-compte/contenu");
    }
    return () => {};
  }, []);
  return (
    <div className="admin">
      <Nav color={"black"} />
      <NavAdmin color={"black"} />
      <div className="admin-component">
        <Router>
          <Switch>
            <Route
              path="/admin/mon-compte/contenu"
              exact
              render={() => <TableItems />}
            />
            <Route
              path="/admin/mon-compte/contenu/:itemId"
              render={(props) => <PageContenu {...props} />}
            />
            <Route
              path="/admin/mon-compte/ajouter-contenu"
              render={() => <PageAddContenu update={false} />}
            />
            <Route
              path="/admin/mon-compte/infos-generales"
              render={() => <FormDetails />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

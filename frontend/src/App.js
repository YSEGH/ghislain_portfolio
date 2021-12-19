import React, { lazy, Suspense } from "react";
import "./1-css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinnerFullPage } from "./2-pages/Components/SmallComponents";
import PageItem from "./2-pages/Components/PageItem";
import Home from "./2-pages/Home";
import Blog from "./2-pages/Blog";
import Circus from "./2-pages/Circus";
import Photos from "./2-pages/Photos";
import Project from "./2-pages/Project";
import Admin from "./2-pages/Admin";
import About from "./2-pages/About";
import Auth from "./2-pages/Auth";
import Contact from "./2-pages/Contact";
import Agenda from "./2-pages/Agenda";
import PageBlog from "./2-pages/Components/PageBlog";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/contact" render={() => <Contact />} />
          <Route path="/agenda" render={() => <Agenda />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/admin" exact render={(props) => <Auth {...props} />} />
          <Route
            path="/admin/mon-compte"
            render={(props) => <Admin {...props} />}
          />
          <Route
            path="/photography/:page?/:filters?"
            render={(props) => <Photos category={"Photography"} {...props} />}
            exact
          />
          <Route
            path="/projects/:page?/:filters?"
            render={(props) => <Project {...props} />}
            exact
          />
          <Route
            path="/circus/:page?/:filters?"
            render={(props) => <Circus category={"Circus"} {...props} />}
            exact
          />
          <Route
            path="/details/:itemId"
            render={(props) => <PageItem {...props} />}
          />
          <Route
            path="/blog/:page?/:filters?"
            render={(props) => <Blog {...props} />}
            exact
          />
          <Route
            path="/blog/article/id/:itemId"
            render={(props) => <PageBlog {...props} />}
          />
        </Switch>

        <ToastContainer position="bottom-left" autoClose={2500} pauseOnHover />
      </div>
    </Router>
  );
}

export default App;

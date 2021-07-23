import React, { Suspense, lazy } from "react";
import "./1-css/App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
/* import Home from "./2-pages/Home";
import Blog from "./2-pages/Blog";
import Admin from "./2-pages/Admin.js";
import About from "./2-pages/About";
import Circus from "./2-pages/Circus";
import Photos from "./2-pages/Photos";
import Auth from "./2-pages/Auth"; */
import { ToastContainer } from "react-toastify";
import { LoadingSpinnerFullPage } from "./2-pages/Components/SmallComponents";

const Home = lazy(() => import("./2-pages/Home"));
const Blog = lazy(() => import("./2-pages/Blog"));
const Admin = lazy(() => import("./2-pages/Admin"));
const About = lazy(() => import("./2-pages/About"));
const Circus = lazy(() => import("./2-pages/Circus"));
const Photos = lazy(() => import("./2-pages/Photos"));
const Auth = lazy(() => import("./2-pages/Auth"));

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="bottom-left" autoClose={2500} pauseOnHover />
        <Suspense fallback={<LoadingSpinnerFullPage />}>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/about" render={() => <About />} />
            <Route
              path="/admin"
              exact
              render={(props) => <Auth {...props} />}
            />
            <Route
              path="/admin/mon-compte"
              render={(props) => <Admin {...props} />}
            />
            <Route
              path="/photography/:page?/:filters?"
              render={(props) => <Photos category={"Photography"} {...props} />}
            />
            <Route
              path="/circus/:page?/:filters?"
              render={(props) => <Circus category={"Circus"} {...props} />}
            />
            <Route
              path="/blog/:page?/:filters?"
              render={(props) => <Blog {...props} />}
            />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

import React, { Suspense, lazy, useEffect } from "react";
import "./1-css/App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinnerFullPage } from "./2-pages/Components/SmallComponents";
import PageItem from "./2-pages/Components/PageItem";

const Home = lazy(() => import("./2-pages/Home"));
const Blog = lazy(() => import("./2-pages/Blog"));
const Admin = lazy(() => import("./2-pages/Admin"));
const About = lazy(() => import("./2-pages/About"));
const Circus = lazy(() => import("./2-pages/Circus"));
const Photos = lazy(() => import("./2-pages/Photos"));
const Auth = lazy(() => import("./2-pages/Auth"));
const Contact = lazy(() => import("./2-pages/Contact"));
const Project = lazy(() => import("./2-pages/Project"));
const Agenda = lazy(() => import("./2-pages/Agenda"));
const PageBlog = lazy(() => import("./2-pages/Components/PageBlog"));

function App() {
  useEffect(() => {
    if (window.location.origin === "http://ghislainramage.com") {
      window.location.replace("https://www.ghislainramage.com/#/");
    }
    return () => {};
  }, []);
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingSpinnerFullPage />}>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/contact" render={() => <Contact />} />
            <Route path="/agenda" render={() => <Agenda />} />
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
              exact
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
        </Suspense>
        <ToastContainer position="bottom-left" autoClose={2500} pauseOnHover />
      </div>
    </Router>
  );
}

export default App;

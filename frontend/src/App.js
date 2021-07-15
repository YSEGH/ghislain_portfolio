import "./1-css/App.css";
import Home from "./2-pages/Home";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Blog from "./2-pages/Blog";
import Admin from "./2-pages/Admin.js";
import About from "./2-pages/About";
import Circus from "./2-pages/Circus";
import Photos from "./2-pages/Photos";
import Auth from "./2-pages/Auth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="bottom-left" autoClose={2500} pauseOnHover />
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/admin" exact render={(props) => <Auth {...props} />} />
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
      </div>
    </Router>
  );
}

export default App;

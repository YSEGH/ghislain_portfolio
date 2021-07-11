import "./1-css/App.css";
import Home from "./2-pages/Home";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Blog from "./2-pages/Blog";
import Admin from "./2-pages/Admin.js";
import About from "./2-pages/About";
import Circus from "./2-pages/Circus";
import Photos from "./2-pages/Photos";
import Footer from "./2-pages/Components/Footer";
import Auth from "./2-pages/Auth";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/admin" exact render={(props) => <Auth {...props} />} />
          <Route
            path="/admin/mon-compte"
            render={(props) => <Admin {...props} />}
          />
          <Route
            path="/photography"
            render={() => <Photos category={"Photography"} />}
          />
          <Route path="/circus" render={() => <Circus category={"Circus"} />} />
          <Route path="/blog" render={() => <Blog />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

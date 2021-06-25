import "./1-css/App.css";
import Home from "./2-pages/Home";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./2-pages/Category";
import Blog from "./2-pages/Blog";
import Admin from "./2-pages/Admin.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/admin" render={() => <Admin />} />
          <Route
            path="/photography"
            render={() => <Category category={"Photography"} />}
          />
          <Route
            path="/circus"
            render={() => <Category category={"Circus"} />}
          />
          <Route path="/blog" render={() => <Blog />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

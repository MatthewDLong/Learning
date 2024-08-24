import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Search from "./Search";

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

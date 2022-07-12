import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { db } from "./config";
import Edit from "./Edit";
import Navbar from "./Navbar";
import History from "./History";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home db={db} />
          </Route>
          <Route path="/edit">
            <Edit db={db} />
          </Route>
          <Route path="/history">
            <History db={db} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

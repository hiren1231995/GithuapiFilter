import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import UserList from "./UserList";
import Repo from "./Repo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/repo/:id" component={Repo} />
          {/* <Route exact path="/host" component={HostView} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

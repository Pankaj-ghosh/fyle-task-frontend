import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import BankViewContainer from "./components/Bank/BankViewContainer";
import Favourites from "./components/Banks/Favourites";
import BanksViewContainer from "./components/Banks/BanksViewContainer";

function App() {
  return (
    <div className="App">
      <div className="bg-dark">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/bank/:ifsc" component={BankViewContainer} />
            <Route exact path="/favourites" component={Favourites} />
            <Route exact path="/" component={BanksViewContainer} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

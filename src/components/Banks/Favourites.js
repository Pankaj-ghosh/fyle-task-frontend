import React, { Component } from "react";
import BanksTable from "./BanksTable";

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.getFavourites();
  };

  getFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    this.setState({ favourites });
  };

  toggleFavourite = (bank) => {
    let { favourites = [] } = this.state;
    if (favourites && favourites.length > 0) {
      favourites.forEach((fav, index) => {
        if (fav.ifsc === bank.ifsc) {
          favourites.splice(index, 1);
        }
      });
      favourites.length > 0
        ? localStorage.setItem("favourites", JSON.stringify(favourites))
        : localStorage.clear();
      this.setState({ favourites });
    }
  };

  render() {
    let { favourites = [] } = this.state;
    if (!favourites || favourites.length === 0) {
      return (
        <div
          style={{ height: "100vh" }}
          className="d-flex text-light align-items-center justify-content-center"
        >
          <div>
            <h2>No Favourites Available</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <BanksTable
              from={true}
              toggleFavourite={this.toggleFavourite}
              showingFav={true}
              banks={favourites}
            />
          </div>
        </div>
      );
    }
  }
}

export default Favourites;

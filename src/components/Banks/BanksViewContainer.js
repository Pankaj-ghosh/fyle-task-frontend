import React, { Component } from "react";
import BanksView from "./BanksView";
import Service from "../../Services/Service";

class BanksViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadBanks = (city, offSet, pageSize) => {
    this.setState({ loading: true })
    Service.fetchBanks(city.value, offSet, pageSize)
      .then((allBanks = []) => {
        if (allBanks) {
          this.setState({
            allBanks,
            filteredBanks: allBanks,
            loading: false
          });
        }
      })
      .catch((e) => {
        this.setState({ error: e.message, loading: false });
      });
  };

  changeBankDetails = (newBanks) => {
    let { allBanks = [] } = this.state;
    this.setState({ filteredBanks: newBanks ? newBanks : allBanks });
  };

  filterBanksByBranch = (city, offSet, pageSize, branch) => {
    let { allBanks = [] } = this.state;
    if (branch) {
      this.setState({ loading: true })
      Service.getBranchData(city.value, branch, offSet, pageSize)
        .then((allBanks = []) => {
          this.setState({
            allBanks,
            filteredBanks: allBanks,
            loading: false
          });
        })
        .catch((e) => {
          this.setState({ error: e.message, loading: false });
        });
    } else {
      this.loadBanks(city, offSet, pageSize);
    }
  };

  getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  getFavourites = () => {
    let favourites = this.getFromLocalStorage("favourites");
    return favourites || [];
  };

  addToFavourites(key, bank) {
    let favourites = this.getFromLocalStorage("favourites") || [];
    favourites.push(bank);
    localStorage.setItem(key, JSON.stringify(favourites));
    return favourites;
  }

  removeFromFavourites(bank) {
    let favourites = this.getFromLocalStorage("favourites") || [];
    if (favourites && favourites.length > 0) {
      favourites.forEach((fav, index) => {
        if (fav.ifsc === bank.ifsc) {
          favourites.splice(index, 1);
        }
      });
      favourites.length > 0
        ? localStorage.setItem("favourites", JSON.stringify(favourites))
        : localStorage.clear();
      return favourites;
    }
  }

  toggleFavourite = (bank) => {
    let { favourites = [] } = this.state;
    let index = -1;
    if (favourites && favourites.length >= 1) {
      index = favourites.findIndex((fav) => {
        return fav.ifsc === bank.ifsc;
      });
    }
    if (!favourites || index === -1) {
      this.addToFavourites("favourites", bank);
    } else {
      this.removeFromFavourites(bank);
    }
    this.setState({ favourites: this.getFavourites() });
  };

  searchBanks = (city, offSet, pageSize, key) => {
    this.setState({loading: true})
    Service.SearchBanks(city.value, offSet, pageSize, key)
      .then((allBanks = []) => {
        if (allBanks) {
          this.setState({
            allBanks,
            filteredBanks: allBanks,
            loading: false
          });
        }
      })
      .catch((e) => {
        this.setState({ error: e.message, loading: false });
      });
  };

  getTotalBanksCount = (pageSize, city) => {
    Service.getBankCount(city)
      .then((totalBanks) => {
        if (totalBanks)
          this.setState({
            pageCount: Math.ceil(totalBanks / pageSize),
          });
      })
      .catch((e) => {
        this.setState({ error: e.message });
      });
  };

  render() {
    let { allBanks, filteredBanks, error, loading, pageCount } = this.state;
    return (
      <div>
        <BanksView
          pageCount={pageCount}
          allBanks={allBanks}
          filteredBanks={filteredBanks}
          loading={loading}
          loadBanks={this.loadBanks}
          changeBankDetails={this.changeBankDetails}
          getTotalBanksCount={this.getTotalBanksCount}
          toggleFavourite={this.toggleFavourite}
          getFavourites={this.getFavourites}
          filterBanksByBranch={this.filterBanksByBranch}
          searchBanks={this.searchBanks}
          error={error}
        />
      </div>
    );
  }
}

export default BanksViewContainer;

import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Pager from "../Pager";
import BanksViewFilter from "./BanksViewFilter";
import BanksTable from "./BanksTable";
import Loader from "../Loader";

class BanksView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: { label: "Delhi", value: "Delhi" },
      currentPage: 1,
      pageSize: 10,
      totalBanks: 0,
      offSet: 0
    };
  }

  componentDidMount() {
    let { city, pageSize } = this.state;
    this.props.getTotalBanksCount(pageSize, city.value);
    this.loadBanks();
  }

  loadBanks = () => {
    let { city, offSet, pageSize } = this.state;
    this.props.loadBanks(city, offSet, pageSize);
  };

  changePageSize = newPageSize => {
    let { pageSize, currentPage, offSet } = this.state;
    if (currentPage > 1){
      offSet = currentPage * pageSize;
    }else {
      offSet = (currentPage - 1) * pageSize;
    }
    this.setState({ pageSize: newPageSize, offSet }, this.loadBanks);
  };

  handlePageClick = pageNumber => {
    let { city, pageSize, offSet } = this.state;
    let currentPage = pageNumber.selected + 1;
    offSet = (currentPage - 1) * pageSize;
    this.props.loadBanks(city, offSet, pageSize);
    this.setState({ currentPage, offSet });
  };

  changeCity = city => {
    this.setState({ city: city, offSet: 0, currentPage: 1 }, () => {
      this.loadBanks();
      this.props.getTotalBanksCount(this.state.pageSize, city.value);
    });
  };

  getView = () => {
    let favourites = this.props.getFavourites();
    let {loading = false } = this.props; 
    let { filteredBanks = [], error } = this.props;
    if(loading) {
      return <Loader/>
    }
    if (error) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <div className="card" style={{ padding: 15, marginTop: 20 }}>
            <h5>Bank Data Unavailable</h5>
          </div>
        </div>
      );
    }
    if (filteredBanks.length === 0) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <div className="card" style={{ padding: 15, marginTop: 20 }}>
            <h5>Bank Data Unavailable</h5>
          </div>
        </div>
      );
    }

    return (
      <div>
        <BanksTable
          showingFav={false}
          city={this.state.city}
          currentPage={this.state.currentPage}
          pageSize={this.state.pageSize}
          loadBanks={this.props.loadBanks}
          banks={this.props.filteredBanks}
          offSet={this.state.offSet}
          toggleFavourite={this.props.toggleFavourite}
          favourites={favourites}
        />

        <div className="d-flex mt-5" style={{ justifyContent: "space-evenly" }}>
          <div className="text-light">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              forcePage={this.state.currentPage - 1}
              pageCount={this.props.pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"paginationActive"}
            />
          </div>

          <div className="ml-5 bg-dark" style={{ width: "10%" }}>
            <Pager
              pageSize={this.state.pageSize}
              changePageSize={this.changePageSize}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { filteredBanks = [], error } = this.props;
    return (
      <div>
        <BanksViewFilter
          loadBanks={this.loadBanks}
          getTotalBanksCount={this.props.getTotalBanksCount}
          allBanks={this.props.allBanks}
          changeBankDetails={this.props.changeBankDetails}
          searchBanks={this.props.searchBanks}
          filterBanksByBranch={this.props.filterBanksByBranch}
          changeCity={this.changeCity}
          city={this.state.city}
          pageSize={this.state.pageSize}
          offSet={this.state.offSet}
        />

        {this.getView()}
      </div>
    );
  }
}

export default BanksView;

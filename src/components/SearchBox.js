import React, { Component } from "react";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: ""
    };
  }

  OnClientSearch = e => {
    let searchField = e.target.value;
    if (this.props.allBanks) {
      let filteredBanks = this.props.allBanks.filter(
        b =>
          (b.ifsc
            ? b.ifsc.toLowerCase().includes(searchField.toLowerCase())
            : null) ||
          (b.bank_name
            ? b.bank_name.toLowerCase().includes(searchField.toLowerCase())
            : null) ||
          (b.bank_id
            ? b.bank_id.toLowerCase().includes(searchField.toLowerCase())
            : null) ||
          (b.city
            ? b.city.toLowerCase().includes(searchField.toLowerCase())
            : null) ||
          (b.branch
            ? b.branch.toLowerCase().includes(searchField.toLowerCase())
            : null) ||
          (b.address
            ? b.address.toLowerCase().includes(searchField.toLowerCase())
            : null) ||
          (b.district
            ? b.district.toLowerCase().includes(searchField.toLowerCase())
            : null) ||
          (b.state
            ? b.state.toLowerCase().includes(searchField.toLowerCase())
            : null)
      );

      this.props.changeBankDetails(filteredBanks);
    }
  };

  onServerSearch = e => {
    let { city, offSet, pageSize } = this.props;
    let searchField = e.target.value;
    this.props.searchBanks(city, offSet, pageSize, searchField);
  };

  render() {
    let { side } = this.props;
    return (
      <React.Fragment>
        <div
          className="mb-1 text-light"
          style={{ fontWeight: 500, fontSize: "14px" }}
        >
          {side === "client" ? "Client Side Search" : "Server Side Search"}
        </div>
        <input
          style={{ height: "38px", borderRadius: "4px" }}
          type="search"
          placeholder=" Type to search"
          onChange={
            side === "client" ? this.OnClientSearch : this.onServerSearch
          }
        />
      </React.Fragment>
    );
  }
}

export default SearchBox;

import React from "react";
import Select from "react-select";
import BranchSelector from "./BranchSelector";
import SearchBox from "../SearchBox";

const cities = [
  { label: "Banglore", value: "Banglore" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Chennai", value: "Chennai" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Delhi", value: "Delhi" }
];

export default function BanksViewFilter({
  city,
  offSet,
  pageSize,
  changeBankDetails,
  allBanks,
  loadBanks,
  changeCity,
  searchBanks,
  filterBanksByBranch
}) {
  return (
    <div className="col-md-12 mt-3 pb-3">
      <div
        className="d-flex justify-content-between sidebar sidebar--style-4 z-depth-1-top bg-dark"
        style={{ width: "100%", justifyContent: "space-evenly" }}
      >
        <div style={{ width: "200px" }}>
          <div
            className="mb-1 text-light"
            style={{ fontWeight: 500, fontSize: "14px" }}
          >
            Select City
          </div>
          <Select
            placeholder="Select City"
            options={cities}
            onChange={changeCity}
            value={city}
          />
        </div>
        <div style={{ width: "200px" }}>
          <SearchBox
            side="client"
            loadBanks={loadBanks}
            allBanks={allBanks}
            changeBankDetails={changeBankDetails}
          />
        </div>
        <div style={{ width: "200px" }}>
          <SearchBox
            side="server"
            searchBanks={searchBanks}
            city={city}
            offSet={offSet}
            pageSize={pageSize}
            changeBankDetails={changeBankDetails}
          />
        </div>
        <div style={{ width: "200px" }}>
          <BranchSelector
            city={city}
            offSet={offSet}
            pageSize={pageSize}
            filterBanksByBranch={filterBanksByBranch}
          />
        </div>
      </div>
    </div>
  );
}

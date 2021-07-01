import React from "react";

export default function BankView({ bank, message }) {
  if (message) {
    return (
      <div
        style={{ height: "100vh" }}
        className="card d-flex justify-content-center align-items-center"
      >
        <h2>{message}</h2>
      </div>
    );
  }

  if (!bank) {
    return null;
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="card .z-depth-1-top">
        <div>
          <span className="font-weight-bold">Bank name : </span> {bank.bank_name}
        </div>
        <div>
          <span className="font-weight-bold">Branch :</span> {bank.branch}
        </div>
        <div>
          <span className="font-weight-bold">Address :</span> {bank.address}
        </div>
        <div>
          <span className="font-weight-bold">City :</span> {bank.city}
        </div>
        <div>
          <span className="font-weight-bold">District :</span> {bank.district}
        </div>
        <div>
          <span className="font-weight-bold">State :</span> {bank.state}
        </div>
        <div>
          <span className="font-weight-bold"> IFSC :</span> {bank.ifsc}
        </div>
      </div>
    </div>
  );
}

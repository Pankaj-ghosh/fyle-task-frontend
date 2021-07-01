import React from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

export default function BankDataRow(props) {
  let {
    banks = [],
    favourites = [],
    showingFav,
    toggleFavourite,
    from,
  } = props;

  return banks.map((bank) => (
    <tr>
      <td>{bank.ifsc}</td>
      <td className="bg-dark">
        <Link style={{ textDecoration: "none" }} to={"/bank/" + bank.ifsc}>
          {bank.bank_name}
        </Link>
      </td>
      <td>{bank.bank_id}</td>
      <td>{bank.branch}</td>
      <td>{bank.address}</td>
      <td>{bank.city}</td>
      <td>{bank.district}</td>
      <td>{bank.state}</td>
      <td
        className={
          from ||
          (favourites &&
            favourites
              .map((fav) => {
                return fav.ifsc;
              })
              .indexOf(bank.ifsc) !== -1)
            ? "fav"
            : "non-fav"
        }
        onClick={() => toggleFavourite(bank)}
      >
        <i className="fa fa-heart" />
      </td>
    </tr>
  ));
}

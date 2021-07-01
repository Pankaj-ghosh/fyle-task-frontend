import React from "react";
import BankTableHeader from "../Bank/BankTableHeader";
import BankDataRow from "../Bank/BankDataRow";

export default function BanksTable(props) {
  return (
    <div>
      <table className="table table-lg table-dark table-hover">
        <thead>
          <BankTableHeader showingFav={props.showingFav} />
        </thead>
        <tbody>
          <BankDataRow
            from={props.from || false}
            showingFav={props.showingFav}
            banks={props.banks}
            city={props.city}
            currentPage={props.currentPage}
            pageSize={props.pageSize}
            offSet={props.offSet}
            toggleFavourite={props.toggleFavourite}
            favourites={props.favourites}
          />
        </tbody>
      </table>
    </div>
  );
}

import React from "react";

export default function BankTableHeader({ showingFav }) {
  return (
    <tr>
      <th scope="col">IFSC</th>
      <th scope="col">Bank Name</th>
      <th scope="col">ID</th>
      <th scope="col">Branch</th>
      <th scope="col">Address</th>
      <th scope="col">City</th>
      <th scope="col">District</th>
      <th scope="col">State</th>
      <th scope="col">Favourite</th>
    </tr>
  );
}

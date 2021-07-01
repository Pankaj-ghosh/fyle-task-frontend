import React from "react";

export default function Loader (props) {
  return (
    <div className="text-light mt-5 spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

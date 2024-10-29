import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchBox() {
  return (
    <div>
      <input />
      <CiSearch />
      <span>|</span>
      <div>
        <img src="adminpng.jpg" alt="admin-picture" />
        <p>میلاد عظمی</p>
        <p>مدیر</p>
      </div>
    </div>
  );
}

export default SearchBox;

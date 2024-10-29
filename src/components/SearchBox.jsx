import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchBox({ setSearch }) {
  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)} />
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

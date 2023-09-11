import React from "react";
import './SearchList.css'
import SearchListItem from "./components/SearchListItem";

function SearchList(props) {
  // render search list item 
  const { data, isEmpty } = props

  if (isEmpty) {
    return (<h2>No result found!</h2>)
  }
  return (
    <div className="search-list">
      {data.map((item, index) => {
        return <SearchListItem item={item} key={index} />;
      })}
    </div>
  );
}

export default SearchList;

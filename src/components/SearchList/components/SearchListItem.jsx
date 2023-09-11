import React from "react";
import { useNavigate } from "react-router-dom";

function SearchListItem(props) {
  const { item } = props;
  const navigate = useNavigate()
  const price = item.rooms.sort((a, b) => a.price - b.price)[0].price
  // render list item
  return (
    <div className="search-list-item">
      <div className="search-list-img">
        <img src={item.photos} alt="pic" />
      </div>
      <div className="search-list-information">
        <h2>{item.name}</h2>
        <p>{item.distance}m from center</p>
        {item.featured !== "no" && <p className="tag">{item.featured}</p>}
        <p className="type">{item.type}</p>
        <p>{item.desc}</p>
        {item.free_cancel && (
          <div className="search-free-cancel">
            <p>Free cancellation</p>
            <p>You can cancel later, so lock in this great price today!</p>
          </div>
        )}
      </div>
      <div className="search-list-detail">
        <div className="search-list-rate">
          <p></p>
          <p>{Number(item.rating).toFixed(1)}</p>
        </div>
        <div className="search-list-price">
          <h2>${price}</h2>
          <p>Includes taxes and fees</p>
          <button onClick={() => navigate(`/detail/${item._id}`)}>See availability</button>
        </div>
      </div>
    </div>
  );
}

export default SearchListItem;

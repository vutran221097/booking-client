import React from "react";
import { useNavigate } from "react-router-dom";
import "./HotelList.css";

const HotelList = (props) => {
  const { title, data } = props;
  const navigate = useNavigate()

  return (
    <div className="container hotel-list">
      <h2>{title}</h2>
      <div className="hotel-list-items">
        {/* render hotel list */}
        {data.map((item, index) => {
          const price = item.rooms.sort((a, b) => a.price - b.price)[0]?.price || 0
          return (
            <div className="hotel-list-item" key={index} onClick={() => navigate(`/detail/${item._id}`)}>
              <img src={item.photos} alt={item.city} />
              <div>
                <h2>{item.name}</h2>
                <p>{item.city}</p>
                <p className="price">Starting from ${price}</p>
                <div className="type">
                  <span className="rate">{Number(item.rating).toFixed(1)}</span> {item.type}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelList;

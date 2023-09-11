import React from "react";
import { useNavigate } from "react-router-dom";

import "./HotelType.css";
import { baseImgUrl } from "../../constants/baseImgUrl";

const HotelType = (props) => {
  const { data } = props
  const navigate = useNavigate()

  return (
    <div className="container hotel-type">
      <h2>Browse by property type</h2>
      <div className="hotel-type-list">
        {data.map((item, index) => {
          return (
            // render hotel type
            <div className="hotel-type-item" key={index} onClick={() => navigate('/hotel', { state: { type: 'type', param: item.type, title: `${item.type}` } })}>
              <img src={`${baseImgUrl}/${item.img}`} alt={item.type} />
              <div>
                <h2>{item.type}</h2>
                <p>
                  {item.total} hotel{item.total > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelType;

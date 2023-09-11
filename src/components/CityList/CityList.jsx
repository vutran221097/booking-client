import React from "react";
import { baseImgUrl } from "../../constants/baseImgUrl";
import { useNavigate } from "react-router-dom";
import './CityList.css'

const CityList = (props) => {
  const { data } = props
  const navigate = useNavigate()

  return (
    <div className="container city-list">
      {data.map((item, index) => {
        return (
          // render city list
          <div className="city-list-item" key={index}>
            <img src={`${baseImgUrl}/${item.img}`} alt={item.city} onClick={() => navigate('/hotel', { state: { type: 'city', param: item.city, title: `${item.city} Hotels` } })} />
            <div className="city-list-item-text">
              <h1>{item.city}</h1>
              <h3>{item.totalHotels} propertie{item.totalHotels > 1 ? "s" : ""}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CityList;

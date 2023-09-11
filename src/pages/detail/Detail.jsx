import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import "./Detail.css";

import Navbar from "../../components/Navbar/Navbar";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import Axios from "../../api/Axios";
import { baseImgUrl } from "../../constants/baseImgUrl";
import { useSelector } from "react-redux";
import { toastNoti } from "../../utils/utils";

const Detail = () => {
  const [data, setData] = useState({})
  const isLogged = useSelector((state) => state.auth.isLogged)
  const { id } = useParams()
  const navigate = useNavigate()

  const getHotelDetails = async () => {
    try {
      const res = await Axios.get(`/hotels/detail/${id}`)
      if (res.status === 200) {
        setData(res.data)
      }
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getHotelDetails()
    // eslint-disable-next-line
  }, [])

  const onBooking = () => {
    if (!isLogged) {
      navigate('/login')
      toastNoti("Please login first!", "error")
      return;
    }
    navigate('/booking', { state: { hotel: data } })
  }

  return (
    <div>
      <Navbar />
      <div className="detail-page">
        {/* DETAIL HEADER */}
        <div className="container detail-page-header">
          <div>
            <h2>{data.name}</h2>
            <p className="detail-page-address">
              <FontAwesomeIcon icon={faLocationDot} /> {data.address}
            </p>
            <p className="detail-page-distance">
              {data.distance}m from center
            </p>
            <p className="detail-page-price-tag">
              Book a stay over ${data.price} at this property{" "}
              {data.featured && `and get a ${data.featured}`}
            </p>
          </div>
        </div>

        {/* DETAIL BODY */}
        <div className="container detail-page-body">
          {data.img?.map((item, index) => {
            return <img src={`${baseImgUrl}/${item}`} alt={index} key={index} />;
          })}
        </div>

        {/* DETAIL FOOTER */}
        <div className="container detail-page-footer">
          <div className="detail-page-information">
            <h2>{data.name}</h2>
            <p>{data.desc}</p>
          </div>
          <div className="detail-page-offer">
            <p className="detail-page-offer-price">
              <span>${data.rooms?.sort((a, b) => a.price - b.price)[0]?.price || 0}</span> (1 night)
            </p>
            <div>
              <button onClick={() => onBooking()}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Detail;

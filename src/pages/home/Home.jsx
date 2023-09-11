import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDay,
  faChild,
} from "@fortawesome/free-solid-svg-icons";
import { DateRangePicker } from "react-date-range";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Contact from "../../components/Contact/Contact.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CityList from "../../components/CityList/CityList";
import HotelType from "../../components/HotelType/HotelType";
import HotelList from "../../components/HotelList/HotelList";
import Axios from "../../api/Axios";
import { toastNoti } from "../../utils/utils";

function Home() {
  const [cityList, setCityList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [topRatedList, setTopRatedList] = useState([])
  const [city, setCity] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [people, setPeople] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const navigate = useNavigate()

  const getCityList = async () => {
    try {
      const res = await Axios.get('/hotels/city')
      if (res.status === 200) {
        setCityList(res.data)
      }
    } catch (e) {
      console.error(e);
    }
  }

  const getHotelByType = async () => {
    try {
      const res = await Axios.get('/hotels/type')
      if (res.status === 200) {
        setTypeList(res.data)
      }
    } catch (e) {
      console.error(e);
    }
  }

  const getTopRatedHotel = async () => {
    try {
      const res = await Axios.get('/hotels/top-rated')
      if (res.status === 200) {
        setTopRatedList(res.data)
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getCityList()
    getHotelByType()
    getTopRatedHotel()
  }, [])

  const handleDate = (date) => {
    // Set date for input
    setDateRange(
      `${date.selection.startDate.toLocaleDateString(
        "vn-VN"
      )} - ${date.selection.endDate.toLocaleDateString("vn-VN")}`
    );
    // Set date for date range
    setSelectionRange({
      startDate: date.selection.startDate,
      endDate: date.selection.endDate,
      key: "selection",
    });
    // check date to close modal
    if (
      date.selection.startDate.toLocaleDateString("vn-VN") !==
      date.selection.endDate.toLocaleDateString("vn-VN")
    ) {
      setShowCalendar(false);
    }
  };

  const searchData = () => {
    // redirect to search page
    if (!city) {
      return toastNoti("You must enter destination!", "error")
    }
    navigate("/search", {
      state: {
        city: city,
        dateStart: selectionRange.startDate,
        dateEnd: selectionRange.endDate,
        maxPeople: people
      }
    });
  };


  return (
    <div>
      <Navbar />
      <div className="container header">
        <h1>A lifetime of discounts? It's Genius.</h1>
        <p>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        <button type="button" className="header-login">
          Sign in / Register
        </button>
        <div className="search-input">
          <div className="search-place">
            <FontAwesomeIcon className="search-icon" icon={faBed} />{" "}
            <input
              type="text"
              placeholder="Where are you going ?"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="search-date-range">
            <FontAwesomeIcon className="search-icon" icon={faCalendarDay} />
            <input
              type="text"
              placeholder={`${new Date().toLocaleDateString(
                "vn-VN"
              )} - ${new Date().toLocaleDateString("vn-VN")}`}
              defaultValue={dateRange}
              onClick={() => setShowCalendar(!showCalendar)}
              readOnly
            />
            {/* show range picker with condition */}

            {showCalendar && (
              <DateRangePicker
                className="date-range-picker"
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={[selectionRange]}
                minDate={new Date()}
                onChange={handleDate}
                showPreview={false}
              />
            )}
          </div>
          <div className="search-people">
            <FontAwesomeIcon className="search-icon" icon={faChild} />
            <input
              type="number"
              value={people}
              placeholder="1 adult - 0 children - 1 room"
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
          <div className="search-button">
            <button type="button" onClick={searchData}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="home-page">
        <CityList data={cityList} />
        <HotelType data={typeList} />
        <HotelList title="Home guests love" data={topRatedList} />
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;

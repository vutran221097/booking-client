import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./Search.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchPopup from "../../components/SearchPopup/SearchPopup";
import SearchList from "../../components/SearchList/SearchList";
import Axios from "../../api/Axios";

const Search = () => {
  const location = useLocation()
  const { state } = location
  const [destination, setDestination] = useState(!state ? "" : state.city)
  const [selectionRange, setSelectionRange] = useState({
    startDate: !state ? new Date() : new Date(state.dateStart),
    endDate: !state ? new Date() : new Date(state.dateEnd),
    key: "selection",
  });
  const [isEmpty, setIsEmpty] = useState(true)

  const [resultsList, setResultsList] = useState([])

  const onChangeDestination = (e) => {
    setDestination(e.target.value)
  }

  const getData = async () => {
    try {
      setIsEmpty(false)
      const res = await Axios.post('/hotels/search', {
        city: destination,
        dateStart: selectionRange.startDate,
        dateEnd: selectionRange.endDate,
        maxPeople: !state || !state.maxPeople ? 0 : state.maxPeople
      })
      if (res.status === 200) {
        !res.data.length ? setIsEmpty(true) : setResultsList(res.data)
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!state) return;
    getData();
    // eslint-disable-next-line
  }, [])

  const onChangeDate = (dateRange) => {
    setSelectionRange(dateRange)
  }

  return (
    <div>
      <Navbar />
      <div className="search-container container">
        <div className="search-popup-container">
          <SearchPopup
            destination={destination}
            onChangeDestination={(e) => onChangeDestination(e)}
            onChangeDate={(dateRange) => onChangeDate(dateRange)}
            onSearching={() => getData()}
          />
        </div>
        <div className="search-list-container">
          <SearchList data={resultsList} isEmpty={isEmpty} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;

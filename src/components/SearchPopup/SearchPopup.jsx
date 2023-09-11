import React, { useState } from "react";
import "./SearchPopup.css";
import { DateRangePicker } from "react-date-range";

const SearchPopup = (props) => {
  const { destination, onChangeDestination, onChangeDate, onSearching } = props
  const [dateRange, setDateRange] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
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
    onChangeDate({
      startDate: date.selection.startDate,
      endDate: date.selection.endDate,
      key: "selection",
    })
    // check date to close modal
    if (
      date.selection.startDate.toLocaleDateString("vn-VN") !==
      date.selection.endDate.toLocaleDateString("vn-VN")
    ) {
      setShowCalendar(false);
    }
  };

  // render search popup
  return (
    <div className="search-popup">
      <h2>Search</h2>
      <div className="popup-destination">
        <div className="label">Destination</div>
        <input type="text" placeholder="Enter destination..." value={destination} onChange={(e) => onChangeDestination(e)} />
      </div>

      <div className="popup-check-in-date">
        <div className="label">Check-in Date</div>
        <div className="popup-date-range">
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
      </div>

      <div>
        <div className="label">Options</div>
        <div className="popup-options">
          <p>Min price per night</p>
          <input type="number" />
        </div>
        <div className="popup-options">
          <p>Max price per night</p>
          <input type="number" />
        </div>
        <div className="popup-options">
          <p>Adult</p>
          <input type="number" />
        </div>
        <div className="popup-options">
          <p>Children</p>
          <input type="number" />
        </div>
        <div className="popup-options">
          <p>Room</p>
          <input type="number" />
        </div>
      </div>

      <div className="popup-search-button">
        <button onClick={onSearching}>Search</button>
      </div>
    </div>
  );
};

export default SearchPopup;

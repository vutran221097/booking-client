import React from "react";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";

// add icon to library to use icon by "string"
fontawesome.library.add(faBed, faPlane, faCar, faTaxi);

function NavbarItem(props) {
  const { item, onChangeActive, active, onNavigate } = props;
  return (
    // render icon and text in nav item
    <li className={`navbar-item${item.type === active ? " active" : ""}`} onClick={() => { onChangeActive(item.type); onNavigate(item.path) }}>
      <FontAwesomeIcon className="navbar-icon" icon={item.icon} /> {item.type}
    </li>
  );
}

export default NavbarItem;

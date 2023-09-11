import React, { useEffect, useState } from "react";
import "./Navbar.css";
import NavbarItem from "./components/NavbarItem";
import navbarArr from "../../assets/navbar.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducer/authReducer";
import { toastNoti } from "../../utils/utils";

function Navbar() {
  // render nav bar
  const [active, setActive] = useState("Stays")
  const isLogged = useSelector((state) => state.auth.isLogged)
  const username = useSelector((state) => state.auth.currentUser.username)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const onNavigate = (path) => {
    navigate(path)
  }

  const onChangeActive = (e) => {
    setActive(e)
  }

  useEffect(() => {
    if (location.pathname !== '/') return setActive("");
    // eslint-disable-next-line
  }, [])

  const onLogout = () => {
    dispatch(logOut())
    navigate('/')
    toastNoti('Logout success!', "success")
  }

  const onTransactions = () => {
    navigate('/transaction')
  }

  return (
    <div className="container navbar">
      <div className="navbar-header">
        <p onClick={() => onNavigate('/')}>Booking website</p>
        <div className="navbar-login">
          {!isLogged ? (<>
            <button onClick={() => onNavigate('/sign-up')}>Register</button>
            <button onClick={() => onNavigate('/login')}>Login</button>
          </>) : (<>
            <p>{username}</p>
            <button onClick={onTransactions}>Transactions</button>
            <button onClick={onLogout}>Log out</button>
          </>)}

        </div>
      </div>
      <ul className="navbar-items">
        {navbarArr.map((item, index) => {
          return <NavbarItem item={item} key={index} onChangeActive={(e) => onChangeActive(e)} active={active} onNavigate={onNavigate} />;
        })}
      </ul>
    </div>
  );
}

export default Navbar;

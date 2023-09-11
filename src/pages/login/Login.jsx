import { useDispatch } from "react-redux";

import { logIn } from "../../reducer/authReducer";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useInput from "../../customHook/useInput";

import "./Login.css";
import Axios from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import { toastNoti } from "../../utils/utils";

const Login = () => {
  const username = useInput("username");
  const password = useInput("password");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogin = async () => {
    try {
      const res = await Axios.post('/users/login', {
        username: username.value,
        password: password.value
      })
      if (res.status === 200) {
        dispatch(logIn(res.data))
        navigate('/')
        toastNoti("Login success!", "success")
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h1>Login</h1>
        <div className="control-group">
          <div className={`form-control ${username.error ? "invalid" : ""}`}>
            <input
              type="text"
              name="username"
              onChange={username.onChange}
              onBlur={username.onBlur}
              placeholder="Username"
              value={username.value}
            />
            {username.error && username.touched && (
              <div className="error-text">{username.error}</div>
            )}
          </div>

          <div className={`form-control ${password.error ? "invalid" : ""}`}>
            <input
              type="password"
              name="password"
              onChange={password.onChange}
              onBlur={password.onBlur}
              placeholder="Password"
              value={password.value}
            />
            {password.error && password.touched && (
              <div className="error-text">{password.error}</div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useInput from "../../customHook/useInput";
import Axios from '../../api/Axios'
import "../login/Login.css";
import { toastNoti } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const username = useInput("username");
    const password = useInput("password");

    const onSignUp = async () => {
        try {
            const res = await Axios.post('/users/register', {
                username: username.value,
                password: password.value
            })
            if (res.status === 200) {
                toastNoti("Sign up success!", "success")
                username.value = ""
                password.value = ""
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="login-container">
                <h1>Sign Up</h1>
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
                    <button type="button" onClick={onSignUp}>
                        Create Account
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;

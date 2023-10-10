import { useContext, useState } from "react";
import { loginUser, registerUser } from "../services/users";
import { saveCookie } from "../middlewares/cookies";
import { checkIfEmpty, checkRegex } from "../utils/utils";
const Access = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '', role: '' });
    const handleChange = (e, type) => {
        const { name, value } = e.target;
        type === 'login' ? setLoginData((prevData) => ({ ...prevData, [name]: value })) : setRegisterData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = registerData
        if (!checkIfEmpty(registerData)) {
            console.error('Fill all the fields');
            return;
        } else {
            if (!checkRegex(email, 'email')) {
                console.error('Invalid email address');
                return;
            }
            if (password !== confirmPassword) {
                console.error('Passwords do not match');
                return;
            }
            if (!checkRegex(password, 'password')) {
                console.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol. It should be at least 8 characters long.');
                return;
            }
            const newUser = await registerUser(registerData)
            if (newUser.status === 200) {
                saveCookie(newUser.data.token, 'admin', 8600)
                window.location.reload()
            }
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const { email } = loginData
        if (!checkIfEmpty(loginData)) {
            console.error('Fill all the fields');
            return;
        } else {
            if (!checkRegex(email, 'email')) {
                console.error('Invalid email address');
                return;
            }
            const loggedUser = await loginUser(loginData)
            if (loggedUser.status === 200) {
                saveCookie(loggedUser.data.token, 'admin', 8600)
                window.location.reload()
            }
        }
    };

    return (
        <div className="admin-wrapper">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={loginData.email} onChange={(e) => handleChange(e, 'login')} required />
                <label>Password:</label>
                <input type="password" name="password" value={loginData.password} onChange={(e) => handleChange(e, 'login')} required />
                <button type="submit">Login</button>
            </form>
            <hr />
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
                <label>Firstname:</label>
                <input type="text" name="firstname" value={registerData.firstname} onChange={(e) => handleChange(e, 'register')} required />
                <label>Lastname:</label>
                <input type="text" name="lastname" value={registerData.lastname} onChange={(e) => handleChange(e, 'register')} required />
                <label>Email:</label>
                <input type="email" name="email" value={registerData.email} onChange={(e) => handleChange(e, 'register')} required />
                <label>Password:</label>
                <input type="password" name="password" value={registerData.password} onChange={(e) => handleChange(e, 'register')} required />
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" value={registerData.confirmPassword} onChange={(e) => handleChange(e, 'register')} required />
                <label>Role:</label>
                <select name="role" value={registerData.role} onChange={(e) => handleChange(e, 'register')} >
                    <option value="">Pick a role</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Access;
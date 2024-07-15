import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {API_URL, userStorageKey} from "../constants";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        fetch(`${API_URL}/users`)
            .then(response => response.json())
            .then(data => {
                const user = data.value.find(user => user.Name === username && user.Password === password);
                if (user) {
                    localStorage.setItem(userStorageKey, JSON.stringify(user));
                    navigate('/invoices');
                } else {
                    setError('Invalid username or password');
                }
            })
            .catch(error => {
                setError('Failed to load user data');
            });
    };

    return (
        <div className="login-container container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;

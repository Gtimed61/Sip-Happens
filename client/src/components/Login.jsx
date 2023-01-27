import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/login', {
            username: username,
            password: password
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data);
            });
    };

    return (
        <div className='container my-1'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex-row space-between my-2'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='flex-row space-between my-2'>
                    <label htmlFor='pwd'>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex-row flex-end'>
                    <button type="submit">Log In</button>
                </div>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;

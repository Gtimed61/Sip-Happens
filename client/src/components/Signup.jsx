import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/register', {
            username: username,
            email: email,
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
            <h2>Signup</h2>
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
                    <label htmlFor='email'>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex-row space-between my-2'>
                    <label htmlFor='pwd'>Password:</label>
                    <input
                        type="password"
                        name='password'
                        placeholder="**"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div><div className='flex-row flex-end'>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Signup;

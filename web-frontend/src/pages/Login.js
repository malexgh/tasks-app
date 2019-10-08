import React, { useState } from 'react';
import api from '../services/api';
import './Login.css';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password || email.trim() === '' || password.trim() === '') {
            return;
        }
        try {
            const response = await api.post('/users/login', { email, password });
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                //const { token } = response.data;
                //localStorage.setItem('user', token);
                history.push('/tasks');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="password">Password *</label>
                <input
                    type="text"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button className="button" type="submit">Login</button>
            </form>
        </div>
    );
}

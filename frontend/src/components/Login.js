import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} className="input" />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className="input" />
      <button className="btn">Login</button>
    </form>
  );
}

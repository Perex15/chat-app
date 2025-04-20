import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', form);
    alert('Registered! Now login.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} className="input" />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className="input" />
      <button className="btn">Register</button>
    </form>
  );
}

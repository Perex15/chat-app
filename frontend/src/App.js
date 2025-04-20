import React, { useState } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6">
      {token ? (
        <Chat token={token} />
      ) : (
        <div className="space-y-6">
          <Register setToken={setToken} />
          <Login setToken={setToken} />
        </div>
      )}
    </div>
  );
}

export default App;

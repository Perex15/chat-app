import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://your-backend-url');

export default function Chat({ token }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', { sender: 'You', content: message });
    setMessage('');
  };

  return (
    <div className="p-4">
      <div className="chat-window mb-4">{messages.map((m, i) => <p key={i}><b>{m.sender}:</b> {m.content}</p>)}</div>
      <div className="flex gap-2">
        <input value={message} onChange={e => setMessage(e.target.value)} className="input" />
        <button onClick={sendMessage} className="btn">Send</button>
      </div>
    </div>
  );
}

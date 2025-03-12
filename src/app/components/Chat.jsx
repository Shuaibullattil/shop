"use client";
import { useEffect, useState } from "react";

export default function Chat({ userId, receiverId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null); // ✅ Store socket in state

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${userId}`);
    setSocket(ws); // ✅ Store WebSocket instance

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (
        (newMessage.sender_id === userId && newMessage.receiver_id === receiverId) ||
        (newMessage.sender_id === receiverId && newMessage.receiver_id === userId)
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    return () => ws.close();
  }, [userId, receiverId]);

  const sendMessage = () => {
    if (!socket) return alert("Connecting... Please wait!"); // ✅ Handle uninitialized socket

    if (message.trim()) {
      socket.send(JSON.stringify({ receiver_id: receiverId, message }));
      setMessage("");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-2">Chat with {receiverId}</h2>
      <div className="h-60 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded ${msg.sender_id === userId ? "bg-blue-300 text-right" : "bg-gray-300 text-left"}`}>
            <strong>{msg.sender_id}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="border p-1 flex-grow"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-1 ml-2">Send</button>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the expected data structure
interface User {
  _id: string;
  username: string;
  password: string;
}

export default function Register() {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/displayuser") // Make sure your FastAPI runs on port 8000
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {userData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        userData.map((item, index) => (
          <div key={index} className="border border-gray-300 p-4 my-2">
            <p>
              <strong>Username:</strong> {item.username}
            </p>
            <p>
              <strong>Password:</strong> {item.password}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login"); // Redirect to login if no user
    }
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h1 className="text-lg">Welcome, {user.name}!</h1>
          <p className="text-xl">hostel: {user.details.hostel}</p>
          <button onClick={() => { localStorage.removeItem("user"); router.push("/login"); }}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

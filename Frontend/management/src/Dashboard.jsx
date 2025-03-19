import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"; 
import "./Form.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login"); // Redirect if no token
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch("http://localhost:3000/auth/profile", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched User Data:", data); // Debug API response
        setUserData(data.user || data); 
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); 
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}
      
      {userData ? (
        <div>
          <p><strong>Username:</strong> {userData.username || "N/A"}</p>
          <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

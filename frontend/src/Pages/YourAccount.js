import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import '../Css/YourAccount.css';

const YourAccount = () => {
    const [userData, setUserData] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail,"at your account")

    useEffect(() => {
        if (!userEmail) {
            console.error("User email not found");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:7000/api/YourAccount", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userEmail: userEmail })
                });

                const data = await response.json();
                if (data.success) {
                    setUserData(data.user);
                } else {
                    console.error("Failed to fetch user data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userEmail]);

    const handleDeleteAccount = async () => {
        setShowConfirm(true);
    };

    const confirmDelete = async (confirm) => {
        if (confirm) {
            try {
                const response = await fetch("http://localhost:7000/api/deleteAccount", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: userEmail })
                });

                const data = await response.json();
                if (data.success) {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("UserType");
                    localStorage.removeItem("userEmail");
                    alert("account deleted")
                    navigate("/signup");
                } else {
                    console.error("Failed to delete account:", data.message);
                }
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
        setShowConfirm(false);
    };

    return (
        <div>
             <Navbar />
        
        <div className="your-account">
           
            <div className="account-container">
                <h2>Your Account Information</h2>
                {userData ? (
                    <form className="account-form">
                        <div style={{marginTop:"20px"}}>
                            <label>Email:</label>
                            <input type="email" value={userData.email} readOnly />
                        </div>
                        <div>
                            <label>Name:</label>
                            <input type="text" value={userData.name} readOnly />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input type="text" value={userData.number} readOnly />
                        </div>
                        <div>
                            <label>User Type:</label>
                            <input type="text" value={userData.UserType} readOnly />
                        </div>
                     
                        <button type="button" className="delete-btn" onClick={handleDeleteAccount}>
                            Delete Account
                        </button>
                    </form>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
            {showConfirm && (
                <div className="confirm-popup">
                    <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                    <button className="deletebutton" onClick={() => confirmDelete(true)}>Yes, delete</button>
                    <button onClick={() => confirmDelete(false)}>Cancel</button>
                </div>
            )}
        </div>
        </div>
    );
};

export default YourAccount;

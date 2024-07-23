import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import '../Css/Navbar.css';

const Navbar = () => {
    const [IsTogle, setIsTogle] = useState(false);
    const [userType, setUserType] = useState('');
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserType = localStorage.getItem('UserType');
        setUserType(storedUserType);
    }, []);

    const togglebutton = () => {
        setIsTogle(!IsTogle);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("UserType");
        localStorage.removeItem("userEmail");

        navigate("/login");
    };

    return (
        <div>
            <div className="head">
                
                <header className='headernav'>
                    <h4 className="icon">AppointMate</h4>
                    <div className='mainnavbar'>
                        <ol>
                            <li><Link className='link myOrder' to="/">Home</Link></li>
                            {(!localStorage.getItem("authToken")) ?
                                <div className='abc LoginSignUpAtNavbar'>
                                    <li><Link className='link' to="/login">Login</Link></li>
                                    <li><Link className='link' to="/signup">Sign up</Link></li>
                                </div>
                                : <div className='cde LogOutAtNavbar'>
                                    <div>
                                        {userType === 'Student' && (
                                            <li onClick={() => setShowStudentDropdown(!showStudentDropdown)}>
                                                <Link className='link'>Appointment</Link>
                                                {showStudentDropdown && (
                                                    <ul className='dropdownAtNavbar'>
                                                        <div className=''>
                                                        <li><Link className='link' to="/CreateAppointment">Create Appointment</Link></li>
                                                        <li><Link className='link' to="/AppointmentHistory">Appointment History</Link></li>
                                                        </div>
                                                    </ul>
                                                )}
                                            </li>
                                        )}
                                        

                                        {userType === 'Teacher' && (
                                            <li><Link className='link' to="/Your_Appointments">Your_Appointment</Link></li>
                                        )}
                                        <li onClick={handleLogout}><Link to="" className='link '>Log Out</Link></li>
                                        <li ><Link to="/YourAccount" className='link '>You</Link></li>

                                    </div>
                                </div>
                            }
                        </ol>
                        <div className='toglebutton' onClick={togglebutton}>
                            <button>
                                {IsTogle ? <ImCross /> : <FaBars />}
                            </button>
                        </div>
                    </div>
                </header>
            </div>
            {IsTogle && (
                <div>
                    <header className='togglenavbar'>
                        <ol>
                            <li><Link className='link myOrder' to="/"><div className='Headericons'></div>Home</Link></li>
                            {(!localStorage.getItem("authToken")) ?
                                <div className='LoginSignUpAtNavbar'>
                                    <li><Link className='link' to="/login">Login</Link></li>
                                    <li><Link className='link' to="/signup">Sign up</Link></li>
                                </div>
                                :
                                <div className='LogOutAtNavbar'>
                                    <div>
                                        {userType === 'Student' && (
                                            <li onClick={() => setShowStudentDropdown(!showStudentDropdown)}>
                                                <Link className='link'>Appointment</Link>
                                                {showStudentDropdown && (
                                                    <ul className='dropdownAtNavbar_toggle'>
                                                        <div className=''>
                                                        <li><Link className='link' to="/CreateAppointment">Create Appointment</Link></li>
                                                        <li><Link className='link' to="/AppointmentHistory">Appointment History</Link></li>
                                                        </div>
                                                    </ul>
                                                )}
                                            </li>
                                        )}
                                        

                                        {userType === 'Teacher' && (
                                            <li><Link className='link' to="/Your_Appointments">Your_Appointment</Link></li>
                                        )}
                                        <div className='logoutandyou'>
                                        <li onClick={handleLogout}><Link to="" className='link '>Log Out</Link></li>
                                        <li ><Link to="/YourAccount" className='link '>You</Link></li>

                                        </div>
                                        
                                    </div>
                                </div>
                            }
                        </ol>
                    </header>
                </div>
            )}
        </div>
    )
}

export default Navbar;

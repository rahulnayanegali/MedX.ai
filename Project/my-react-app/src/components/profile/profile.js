import React, { useState, useEffect, useRef } from 'react';
import ProfileIcon from '../img/Profile.png';
import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../components/session/AuthContext';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";

const Profile = () => {
    const navigate = useNavigate();
    const [loggedinuser, setloggedinuser] = useState([]);
    const { userType, user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully.");
                navigate('/', { replace: true });
                window
                    .location
                    .reload();
            })
            .catch((error) => {
                console.error("Error occurred while signing out:", error);
            });
    };
 const handleProfile = () =>{
    navigate("/profile");
 }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    let userData;
                    if (userType === "patient") {
                        const patientDoc = doc(db, 'Patient', user.uid);
                        const patientSnap = await getDoc(patientDoc);
                        userData = patientSnap.data();
                    } else if (userType === "doctor") {
                        const doctorDoc = doc(db, 'Medical Professional', user.uid);
                        const doctorSnap = await getDoc(doctorDoc);
                        userData = doctorSnap.data();
                    }

                    if (userData) {
                        setloggedinuser([{
                            id: user.uid,
                            ...userData
                        }]);
                    } else {
                        console.log("User document not found.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchData();
        }
    }, [user, userType]);

    return (
        <div className="relative h-full" ref={dropdownRef}>
            <div className="flex justify-start items-center gap-2.5 h-full rounded-full bg-primary p-2.5 ">
                <div className="bg-opacity-30 rounded-full shadow-inner overflow-hidden h-full w-[45px]">
                    <img className="object-cover w-full h-full bg-blend-overlay bg-primary" src={ProfileIcon} alt="profile" />
                </div>
                <div />
                <FaChevronDown
                    className="h-5 w-5 cursor-pointer"
                    style={{ color: 'white' }}
                    onClick={toggleDropdown}
                />
            </div>
            {isDropdownOpen && (
                <div className="absolute top-full right-2 mt-1  w-48 bg-primary shadow-lg rounded-lg">
                    <ul>
                        {loggedinuser.map(user => (
                            <li key={user.id} className="py-2 px-4 hover:bg-secondary rounded-lg text-white">
                                <p>{user.mp_name || user.p_name}</p>
                                <p>{user.mp_number || user.p_number}</p>
                            </li>
                        ))}
                        <li className="py-2 px-4 hover:bg-secondary rounded-lg text-white">
                            <button className="LogoutButton text-white text-lg bg-red-600 px-4 py-2 rounded-md" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                        <li className="py-2 px-4 hover:bg-secondary rounded-lg text-white">
                            <button className="LogoutButton text-white text-lg bg-slate-500 px-4 py-2 rounded-md" onClick={handleProfile}>
                            Profile
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;

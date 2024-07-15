import React from 'react';
import {useNavigate} from 'react-router-dom';
import {userStorageKey} from "../constants";

const UserHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem(userStorageKey);
        navigate('/');
    };

    const loggedInUser = JSON.parse(localStorage.getItem(userStorageKey));

    return (
        <div className="user-header">
            {loggedInUser ? (
                <div className="user-info">
                    <div className="user-avatar">{loggedInUser.Name ? loggedInUser.Name.slice(0, 2) : ''}</div>
                    <span>{loggedInUser.Name}</span>
                    <div className="logout-dropdown">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            ) : (
                <div className="user-info">
                    <span>Welcome, Guest</span>
                </div>
            )}
        </div>
    );
};

export default UserHeader;
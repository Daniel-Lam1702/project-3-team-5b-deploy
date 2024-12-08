import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Authentication/Navbar";
import "./ManagerMenuHome.css";

export const ManagerMenuHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const root = document.getElementById('root');
        if (root) {
            root.classList.add('manager-menu-home');
        }

        // Cleanup: Remove the class when the component unmounts
        return () => {
            if (root) {
                root.classList.remove('manager-menu-home');
            }
        };
    }, []);

    return (
        <>
            <Navbar backLink={"/manage-stuff"}/>
            <div className="manager-menu-home-container">
                <h2 className="text-white text-7xl">Select menu item category you would like to manage:</h2>
                <div className="manager-menu-home-options flex gap-48 justify-center">
                    <button className="bg-black text-white text-7xl p-10 rounded-lg hover:bg-lime-600 w-80 h-96" onClick={() =>  navigate("/manage-stuff/menu/menu-items")}>Menu Item</button>
                    <button className="bg-black text-white text-7xl p-10 rounded-lg hover:bg-lime-600 w-96 h-96" onClick={() =>  navigate("/manage-stuff/menu/menu-choices")}>Menu Choices</button>
                </div>
            </div>
        </>
    );
};

export default ManagerMenuHome;

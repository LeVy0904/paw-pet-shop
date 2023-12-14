import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Home from '../components/home/Home';
import Footer from '../components/footer/footer';
import Login from '../components/login/Login';

export default function YourComponent() {
    const navigate = useNavigate();
    const getUser = localStorage.getItem('user');
    const getToken = localStorage.getItem('token');

    const checkToken = () => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        if (storedToken && storedUser && tokenExpiration) {
            const currentTime = new Date().getTime();
            if (currentTime < tokenExpiration) {
                const user = JSON.parse(storedUser);
                console.log('User:', user);
            } else {
                console.log('Token has expired, please log in again');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('tokenExpiration');
                navigate("/");
            }
        } else {
            console.log('Token not found, please log in');
            navigate("/");
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div>
            { getToken&&getUser ? (
                <>
                    <Header />
                    <Home />
                    <Footer />
                </>
            ) : (
                <Login />
            )}
           
        </div>
    );
}

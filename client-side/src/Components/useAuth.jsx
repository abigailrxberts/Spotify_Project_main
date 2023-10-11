import { useState, useEffect } from "react";

const UseAuth = (code) => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {

        fetch('http://localhost:5174/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setAccessToken(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);

            const tokenRefreshInterval = setInterval(() => {
            }, (data.expiresIn - 60) * 1000);

            return () => clearInterval(tokenRefreshInterval);
        })
        .catch((error) => {
            console.error("Error fetching access token:", error);
        });
    }, [code]);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
    }, []);

    return accessToken;
};

export default UseAuth;

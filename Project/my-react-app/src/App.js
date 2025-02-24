import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/main/main.js';
import { AuthProvider } from './components/session/AuthContext.js';
import { auth } from './firebase.js'; // Import auth from firebase.js

import { BrowserRouter } from 'react-router-dom';
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
    }, []);

    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App overflow-y-scroll no-scrollbar">
                <Main user={user} />

                </div>
            </AuthProvider>
        </BrowserRouter>

    );
}

export default App;
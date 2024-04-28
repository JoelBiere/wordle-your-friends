import React, {useEffect, useState} from 'react';
import './App.css';
import {App as AntApp, ConfigProvider, theme} from "antd";
import PageLayout from "./layout";
import en_US from 'antd/locale'
import {initializeApp} from "firebase/app";
import firebaseConfig from "./firebase/config";


function App() {

    const {darkAlgorithm} = theme;

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        initializeApp(firebaseConfig);
        // const analytics = getAnalytics(app);
    }, [])
    return (
        <div className="App">
            <ConfigProvider
                locale={en_US}
                theme={{
                    ...theme,
                    algorithm: darkMode ? darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        fontFamily: 'Georgia, serif',
                    }

                }}
            >
                <AntApp>
                    <PageLayout darkMode={darkMode} setDarkMode={setDarkMode}/>
                </AntApp>
            </ConfigProvider>

        </div>
    );
}

export default App;

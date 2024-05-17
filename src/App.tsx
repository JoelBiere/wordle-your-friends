import React, {useEffect, useState} from 'react';
import './App.css';
import { ConfigProvider, theme} from "antd";
import PageLayout from "./layout";
import en_US from 'antd/locale'

function App() {
    const { useToken, darkAlgorithm } = theme;
    const { token } = useToken();
    const setCSSVariables = () => {
        const root = document.documentElement;
        root.style.setProperty('--ant-border-color', token.colorBorder);
    };
    useEffect(() => {
        setCSSVariables();
    }, [token]);

    const [darkMode, setDarkMode] = useState(false);

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
                {/*<AntApp>*/}
                    <PageLayout darkMode={darkMode} setDarkMode={setDarkMode}/>
                {/*</AntApp>*/}
            </ConfigProvider>

        </div>
    );
}

export default App;

import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ConfigProvider, App as AntApp, theme} from "antd";
import PageLayout from "./layout";
import en_US from 'antd/locale'
import {defaultTheme} from "antd/es/theme/context";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import firebaseConfig from "./firebase/config";



function App() {

    const { darkAlgorithm, compactAlgorithm } = theme;

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
    },[])
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
         <PageLayout darkMode={darkMode} setDarkMode={setDarkMode} />
        </AntApp>
      </ConfigProvider>

    </div>
  );
}

export default App;

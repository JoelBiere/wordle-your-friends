import React from "react";
import {Button, Drawer, Layout, Switch, theme, Typography} from "antd";
import {Header} from "antd/es/layout/layout";
import Wordle from "../wordle";
import {LeftOutlined, MenuOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
import styled from "styled-components";

const {useToken} = theme
const PageLayout = (props: { darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [siderOpen, setSiderOpen] = React.useState(false);
    const {token} = useToken()

    return (
        <Layout style={{
            minHeight: "100vh",
            maxWidth: "100vw",
            minWidth: "100vw",
            margin: 0,
            padding: 0,
        }}>
            <DevRibbon> Still In Development! </DevRibbon>

            <Header style={{
                backgroundColor: token.colorBgContainer,
                borderBottom: `1px solid ${token.colorBorder}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>

                <Button icon={siderOpen ? <LeftOutlined/> : <MenuOutlined/>}
                        onClick={() => setSiderOpen(!siderOpen)} type={'text'} size={'small'}/>

                <Typography.Title level={2} style={{margin: 0, paddingBottom: 0}}>Wordle</Typography.Title>

                <Switch
                    size="small"
                    style={{marginBottom: '5px'}}
                    unCheckedChildren={<SunOutlined/>}
                    checkedChildren={<MoonOutlined/>}
                    checked={props.darkMode}
                    onChange={() => props.setDarkMode(!props.darkMode)}
                />
            </Header>
            <Drawer open={siderOpen} onClose={() => setSiderOpen(false)} placement={'left'}>You found me!</Drawer>

            <Wordle theme={props.darkMode ? 'dark' : 'light'}/>


        </Layout>
    )
}

export default PageLayout

const DevRibbon = styled.div`

    position: fixed;
    inset: 0 auto auto 0;
    background: #08769b;
    opacity: 20;
    color: white;
    transform-origin: 100% 0;
    transform: translate(-29.3%) rotate(-45deg);
    box-shadow: 0 0 0 999px #08769b;
    clip-path: inset(0 -100%);

`
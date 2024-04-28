import React from "react";
import {Button, Col, Layout, Row, Switch, theme, Typography} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Wordle from "../wordle";
import {LeftOutlined, MenuOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

const {useToken} = theme
const PageLayout = (props: { darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [siderOpen, setSiderOpen] = React.useState(false);

    const {token}= useToken()

    return (

        <Layout style={{
            maxHeight: "100vh",
            minHeight: "100vh",
            maxWidth: "100vw",
            minWidth: "100vw",
            margin: 0,
            padding: 0
        }}>
            <Header
                style={{backgroundColor: token.colorBgContainer, borderBottom: `1px solid ${token.colorBorder}`}}>
                <Row wrap={false} justify="space-between" align="middle" style={{height: "100%"}}>
                    <Col>
                        <Button icon={siderOpen ? <LeftOutlined/> : <MenuOutlined/>}
                                onClick={() => setSiderOpen(!siderOpen)} type={'text'}/>
                    </Col>
                    <Col flex="auto" style={{textAlign: "center"}}>
                        <Typography.Title level={2} style={{margin: 0}}>Wordle</Typography.Title>
                    </Col>
                    <Col>
                        <Switch
                            size="small"
                            unCheckedChildren={<SunOutlined/>}
                            checkedChildren={<MoonOutlined/>}
                            checked={props.darkMode}
                            onChange={() => props.setDarkMode(!props.darkMode)}
                        />
                    </Col>
                </Row>
            </Header>
            <Layout hasSider={true}>
                <Sider
                    collapsed={!siderOpen}
                    style={{backgroundColor: token.colorBgContainer, borderRight: `1px solid ${token.colorBorder}`}}
                    collapsedWidth={0}
                >
                </Sider>
                <Content>
                    <Wordle theme={props.darkMode ? 'dark' : 'light'}/>
                </Content>
            </Layout>
            {/*<Footer>*/}
            {/*    footer*/}
            {/*</Footer>*/}
        </Layout>
    )
}

export default PageLayout
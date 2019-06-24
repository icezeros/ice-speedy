import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import { connect } from 'dva';
import 'antd/dist/antd.less';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Header from './Header';
import Nav from './Nav';
// import RouteContent from '$routes';
import './index.css';

const { Content } = Layout;

// var { ipcRenderer } = require('electron');
// let ipcRenderer;
// let electron;
// if (window.require) {
//   electron = window.require('electron');
//   ipcRenderer = electron.ipcRenderer;
// }

export default class App extends Component {
  componentDidMount() {
    // ipcRenderer.send('window-inited', {
    //   userAgent: navigator.userAgent,
    // });
  }

  render() {
    const { children, publicData, location } = this.props;

    return (
      <LocaleProvider locale={zhCN}>
        <Layout className="container">
          <Nav />
          <Layout className="bodyContainer">
            <Header />
            <Content className="bodyContainer2">{children}</Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}

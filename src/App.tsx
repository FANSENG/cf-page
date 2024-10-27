import React, { useState } from 'react';
import { FunctionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppRouter from './router';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('ToolBox', 'dir1', <FunctionOutlined />, [
    getItem('Word2Story', 'dir1-item1'),
  ])
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [siderDir, setSiderDir] = useState('ToolBox');
  const [siderName, setSiderName] = useState('Word2Story');
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key);
    switch (key) {
      case 'dir1-item1':
        setSiderDir('ToolBox');
        setSiderName('Word2Story');
        navigate('/word2story');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['dir1-item1']} 
          mode="inline" 
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} > 
          <div className="logo" > 假装是个 LOG </div>
        </Header>
        
        <Content style={{ margin: '0 16px' }}>
          
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{siderDir}</Breadcrumb.Item>
            {siderName !== "" && <Breadcrumb.Item>{siderName}</Breadcrumb.Item>}
          </Breadcrumb>
          
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <AppRouter />
          </div>
        </Content>
        
        <Footer style={{ textAlign: 'center' }}>
          FS1N ©{new Date().getFullYear()}
        </Footer>
      
      </Layout>
    </Layout>
  );
};

export default App;
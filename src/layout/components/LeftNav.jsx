import React, { useEffect, useState } from 'react'
import {
  HomeOutlined,
	TableOutlined,
	AreaChartOutlined,
	AppstoreOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;
// 模拟数组结构
const menuList = [
  {
    label: "首页",
    key: "/home",
    icon: <HomeOutlined />
  },
  {
    label: "数据大屏",
    key: "/dataScreen",
    icon: <AreaChartOutlined />
  },
  {
    label: "超级表格",
    key: "/proTable",
    icon: <TableOutlined />,
    children: [
      {
        label: "使用Tabble",
        key: "/tabble/basic",
        icon: <AppstoreOutlined />
      },
      {
        label: "使用TabblePage",
        key: "/tabble/Page",
        icon: <AppstoreOutlined />
      }
    ]
  },
]
const rootSubmenuKeys = menuList.map(item => item.key)

export default function LeftNav(props) {
  const Location = useLocation()
  const navigate = useNavigate()
  const whd = (e) => {
    navigate(e.key)
  }
  const [openKeys, setOpenKeys] = useState(['/home']);
  const [selectedKeys, setselectedKeys] = useState([Location.pathname])
  const onOpenChange = (Keys) => {
    const latestOpenKey = Keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(Keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  useEffect(() => {
    setselectedKeys([Location.pathname])
  }, [Location.pathname])
  return (
    <Sider trigger={null} collapsible collapsed={props.zdstate}>
      <div className="logo"><i></i><span style={{ 'display': props.zdstate ? 'none' : '' }}>React Admin</span></div>
      <Menu
        theme="dark" 
        mode="inline"
        defaultSelectedKeys={[Location.pathname]}
        items={menuList}
        onClick={whd}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      />
    </Sider>
  )
}

import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';

const { SubMenu } = Menu;

const MenuItemsDelPartner = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
            `${mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
            }`,
          ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <SubMenu key="dashboard" icon={!topMenu && <FeatherIcon icon="home" />} title="Dashboard">
        <Menu.Item key="eco">
          <NavLink onClick={toggleCollapsed} to={`${path}/eco`}>
            Ecommerce
          </NavLink>
        </Menu.Item>
      </SubMenu>

      
     
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/ecommerce/InvoiceList`}>
              <FeatherIcon icon="file" />
            </NavLink>
          )
        }
        key="invoicelist"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/InvoiceList`}>
          Invoices
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/ecommerce/reports`}>
              <FeatherIcon icon="pie-chart" />
            </NavLink>
          )
        }
        key="reports"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/reports`}>
          Reports
        </NavLink>
      </Menu.Item>

      <SubMenu key="settings" icon={!topMenu && <FeatherIcon icon="settings" />} title="Settings">
        <Menu.Item key="apikeys">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/apikeys`}>
            API Keys
          </NavLink>
        </Menu.Item>
        <Menu.Item key="two">
          <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
            Payment Details
          </NavLink>
        </Menu.Item>
        <Menu.Item key="three">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/upload`}>
            Logo Add/Update
          </NavLink>
        </Menu.Item>
        <Menu.Item key="five">
          <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
            Taxes
          </NavLink>
        </Menu.Item>
        <Menu.Item key="six">
          <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
            Profile Settings
          </NavLink>
        </Menu.Item>
        <Menu.Item key="privacypolicy">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/privacypolicy`}>
            Privacy Policy
          </NavLink>
        </Menu.Item>
        <Menu.Item key="refundpolicy">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/refundpolicy`}>
            Refund Policy
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="ticket" icon={!topMenu && <FeatherIcon icon="file-text" />} title="Ticket">
        <Menu.Item key="add-ticket">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/add-ticket`}>
            Add Ticket
          </NavLink>
        </Menu.Item>
        <Menu.Item key="tickets">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/tickets`}>
            Generated Tickets
          </NavLink>
        </Menu.Item>
      </SubMenu>

    </Menu>
  );
};

MenuItemsDelPartner.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  // events: propTypes.object,
};

export default MenuItemsDelPartner;

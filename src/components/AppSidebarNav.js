import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { CBadge, CNavLink, CSidebarNav } from '@coreui/react';

export const AppSidebarNav = ({ items }) => {
  const navLink = (name, url, badge, indent = false) => {
    return (
      <>
        <span>{name}</span>
        {badge && (
          <CBadge color={badge.color} className="ms-auto" size="sm">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index, indent = false) => {
    const { menuName, url, subMenus, subMenuName } = item;
  
    return (
      <div key={index} style={{ paddingLeft: indent ? '20px' : '0' }}>
        {subMenus && subMenus.length > 0 ? (
          <div>
            <CNavLink to={url}>{navLink(menuName || subMenuName, url, null, indent)}</CNavLink>
            {subMenus.map((subMenu, idx) => (
              <div key={`sub-${idx}`} style={{ paddingLeft: '20px' }}>
                <CNavLink to={subMenu.url}>{navLink(subMenu.subMenuName, subMenu.url, null, true)}</CNavLink>
              </div>
            ))}
          </div>
        ) : (
          <CNavLink to={url}>{navLink(menuName || subMenuName, url)}</CNavLink>
        )}
      </div>
    );
  };

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((module, index) => (
          <div key={index}>
            <h5>{module.moduleName}</h5>
            {module.menus.map((menu, idx) => navItem(menu, idx))}
          </div>
        ))}
    </CSidebarNav>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
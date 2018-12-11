import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { NavItem, NavLink, Button } from 'reactstrap';

const NavItems = ({
  children,
  tabId,
  close,
  toggle,
  activeTabId,
  ...props
}) => {
  const wrappedChildren =
    typeof children === 'string' ? (
      <NavLink className={classnames({ active: activeTabId === tabId })}>
        <div className="d-flex align-content-center flex-wrap">
          <div className="m-1"> {children}</div>
          <div className="p-0">
            <Button
              size="sm"
              color="link"
              onClick={event => {
                event.stopPropagation();
                close(tabId);
              }}
            >
              X
            </Button>
          </div>
        </div>
      </NavLink>
    ) : typeof children === 'function' ? (
      children({ tabId, activeTabId, close, toggle })
    ) : null;
  const NavItemChild = React.cloneElement(wrappedChildren, {
    ...props,

    onClick: function() {
      toggle(tabId);
      wrappedChildren.props &&
        wrappedChildren.props.onClick &&
        wrappedChildren.props.onClick(tabId);
    }
  });
  return <NavItem {...props}>{NavItemChild}</NavItem>;
};

NavItems.propTypes = {
  tabId: PropTypes.number,
  close: PropTypes.func,
  toggle: PropTypes.func,
  activeTabId: PropTypes.number
};

export default NavItems;

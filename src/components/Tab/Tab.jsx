import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { TabContext } from '../Tabs';

const Tab = ({ count }) => (
  <TabContext.Consumer>
    {({ activeTabId, currentTabCount, addTab, close }) => {
      return (
        <div className="border-right border-left border-bottom p-3">
          <h2>Tab {count}</h2>
          <Button
            onClick={() => {
              const nextTab = currentTabCount + 1;
              addTab(`Tab ${nextTab}`, <Tab count={nextTab} />);
            }}
          >
            Add new tab
          </Button>
          <Button className="m-1" onClick={() => close(activeTabId)}>
            Close this tab
          </Button>
        </div>
      );
    }}
  </TabContext.Consumer>
);

Tab.propTypes = {
  count: PropTypes.number.isRequired
};

export default Tab;

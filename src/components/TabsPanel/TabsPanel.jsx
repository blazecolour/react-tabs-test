import React from 'react';
import { NavLink, Container, Button } from 'reactstrap';
import classnames from 'classnames';
import Tabs from '../Tabs/';
import Tab from '../Tab/';

function TabsPanel() {
  return (
    
    <Container>
      <Container className="m-3 ">
        <Tabs openTabImmediately defaultActiveTab={1}>
          <Tabs.Tab
            title={({ close, activeTabId, tabId }) => (
               <NavLink
                className={classnames({ active: activeTabId === tabId })}
              >
                <div className="d-flex align-content-center flex-wrap">
                  <div className="m-1"> Tab 1</div>
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
            )}
          >
            <Tab count={1} />
          </Tabs.Tab>
        </Tabs>
      </Container>
    </Container>
  );
}

export default TabsPanel;

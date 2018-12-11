import React from 'react';
import NavItems from '../NavItems';
import { TabContent, TabPane, Nav } from 'reactstrap';

const TabContext = React.createContext();

class Tabs extends React.Component {
  static defaultProps = { openTabImmediately: false, defaultActiveTab: 1 };

  state = {
    currentTabCount: 0,
    tabs: [],
    activeTab: this.props.defaultActiveTab
  };

  static NavItem = NavItems;

  addTab = (tabTitle, tabContent) => {
    this.setState(state => {
      const { tabs, currentTabCount, activeTab } = state;
      const wrappedTitle = <Tabs.NavItem>{tabTitle}</Tabs.NavItem>;
      const tabId = currentTabCount + 1;
      const newActiveTab = this.props.openTabImmediately ? tabId : activeTab;

      return {
        tabs: [...tabs, { tabTitle: wrappedTitle, tabContent, tabId }],
        currentTabCount: tabId,
        activeTab: newActiveTab
      };
    });
  };

  static Tab = ({ title, children }) => {
    return (
      <TabContext.Consumer>
        {({ addTab }) => {
          if (!children.props.added) {
            children = React.cloneElement(children, {
              added: true
            });
            addTab(title, children, false);
          }
          return null;
        }}
      </TabContext.Consumer>
    );
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        reRender: !this.state.reRender
      });
    }
  };

  close = tabId => {
    this.setState(state => {
      const { tabs, activeTab } = state;
      const filteredTabs = tabs.filter(({ tabId: id }) => id !== tabId);
      let newActiveTab = activeTab;
      if (filteredTabs.length && activeTab === tabId) {
        const currentTabIndex = tabs.findIndex(({ tabId: id }) => id === tabId);
        newActiveTab = tabs[currentTabIndex - 1]
          ? tabs[currentTabIndex - 1].tabId
          : tabs[currentTabIndex + 1].tabId;
      }
      return {
        tabs: filteredTabs,
        activeTab: newActiveTab
      };
    });
  };

  componentDidMount() {
    this.setState({ activeTab: this.props.defaultActiveTab });
  }

  render() {
    const { tabs } = this.state;
    return (
      <div>
        <TabContext.Provider
          value={{
            activeTabId: this.state.activeTab,
            currentTabCount: this.state.currentTabCount,
            addTab: this.addTab,
            toggle: this.toggle,
            close: this.close
          }}
        >
          {this.props.children}

          {tabs.length > 0 && (
            <React.Fragment>
              <Nav tabs>
                {tabs.map(({ tabTitle, tabId }) =>
                  React.cloneElement(tabTitle, {
                    key: tabId,
                    tabId,
                    close: this.close,
                    toggle: this.toggle,
                    activeTabId: this.state.activeTab
                  })
                )}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {tabs.map(({ tabContent, tabId }) => {
                  return (
                    <TabPane key={tabId} tabId={tabId}>
                      {tabContent}
                    </TabPane>
                  );
                })}
              </TabContent>
            </React.Fragment>
          )}
        </TabContext.Provider>
      </div>
    );
  }
}

export default Tabs;
export { TabContext };

import React from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import { setSelectedTab, fetchRFQData } from "./actions/index";

const TabContainer = props => {
  const { selectedTab, setActiveTab, fetchRFQData } = props;
  const handleTabChange = (e, { activeIndex }) => {
    setActiveTab(activeIndex);
    fetchRFQData();
  };

  const panes = [
    { menuItem: "RFQ", render: () => true },
    { menuItem: "Quotes", render: () => true },
    { menuItem: "Exception", render: () => true }
  ];

  return (
    <Tab
      panes={panes}
      activeIndex={selectedTab}
      onTabChange={handleTabChange}
    />
  );
};

const mapStateToProps = state => ({
  selectedTab: state.selectedTab
});

const mapDispatchToProps = dispatch => ({
  setActiveTab: value => dispatch(setSelectedTab(value)),
  fetchRFQData: () => dispatch(fetchRFQData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer);

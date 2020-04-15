import React from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import { setSelectedTab, fetchRFQData, setCurrentPageNo, resetFilter } from "./actions/index";
import { LIST_TYPE } from "./constants/rfqConstants";

const TabContainer = props => {
  const { selectedTab, setActiveTab, fetchRFQData, totalCount, setCurrentPageNo, resetFilter } = props;
  const handleTabChange = (e, { activeIndex }) => {
    setActiveTab(activeIndex);
    setCurrentPageNo(1);
    resetFilter();
    fetchRFQData();
  };

  const panes = [
    { menuItem: "RFQ (" + totalCount[LIST_TYPE.RFQ]+")", render: () => true },
    { menuItem: "Quotes (" + totalCount[LIST_TYPE.QUOTE]+")", render: () => true },
    { menuItem: "Exception (" + totalCount[LIST_TYPE.EXCEPTION]+")", render: () => true }
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
  selectedTab: state.selectedTab,
  totalCount: state.totalCount
});

const mapDispatchToProps = dispatch => ({
  setActiveTab: value => dispatch(setSelectedTab(value)),
  fetchRFQData: () => dispatch(fetchRFQData()),
  setCurrentPageNo: value => dispatch(setCurrentPageNo(value)),
  resetFilter: () => dispatch(resetFilter())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer);

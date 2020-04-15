import React from "react";
import { connect } from "react-redux";
import { Menu, Icon, Checkbox, Button, Dropdown } from "semantic-ui-react";

import { resetFilter, fetchRFQData, setCurrentPageNo } from './actions/index';
// import { FILTER_FIELD } from './constants/rfqConstants';
import SelectColumnModalContainer from './SelectColumnModalContainer';

const SecondaryMenuContainer = (props) => {
  const { resetFilter, fetchRFQData, setCurrentPageNo } = props;

  const handleItemClick = () => false;

  const handleClearFilter = () => {
    resetFilter();
    setCurrentPageNo(1);
    fetchRFQData();
  };

  return (
    <div>
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item name="columns">
            <SelectColumnModalContainer/>
          </Menu.Item>
          <Menu.Item name="hide" onClick={handleItemClick}>
            <Icon name="hide" /> Hide
          </Menu.Item>
          <Menu.Item name="dateSort" onClick={handleItemClick}>
            <Button>
              <Icon name="calendar alternate" /> Start Date - End Date
            </Button>
          </Menu.Item>
          <Menu.Item name="create" onClick={handleItemClick}>
            <Icon name="plus" /> Create RFQ
          </Menu.Item>
          <Menu.Item name="export" onClick={handleItemClick}>
            <Icon name="download" /> Export
          </Menu.Item>
          <Menu.Item name="refresh" onClick={handleItemClick}>
            <Checkbox label={"Auto Refresh"} />
          </Menu.Item>
          <Menu.Item name="clear" onClick={handleClearFilter}>
            <Icon name="filter" /> Clear Filters
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  resetFilter: () => dispatch(resetFilter()),
  fetchRFQData: () => dispatch(fetchRFQData()),
  setCurrentPageNo: value => dispatch(setCurrentPageNo(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryMenuContainer);

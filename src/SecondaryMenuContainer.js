import React from "react";
import { connect } from "react-redux";
import { Menu, Icon, Checkbox, Button } from "semantic-ui-react";

import { resetFilter, fetchRFQData, setCurrentPageNo, setDateSortingMode } from './actions/index';
import { DATE_SORTING_MODE } from './constants/rfqConstants';
import SelectColumnModalContainer from './SelectColumnModalContainer';

const SecondaryMenuContainer = (props) => {
  const { resetFilter, fetchRFQData, setCurrentPageNo, dateSort, setDateSortingMode } = props;

  const handleItemClick = () => false;

  const handleClearFilter = () => {
    resetFilter();
    setCurrentPageNo(1);
    fetchRFQData();
  };

  const handleDateSort = () => {
    if(dateSort === DATE_SORTING_MODE.MOST_RECENT){
      setDateSortingMode(DATE_SORTING_MODE.LEAST_RECENT);
    } else {
      setDateSortingMode(DATE_SORTING_MODE.MOST_RECENT);
    }
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
          <Menu.Item name="dateSort" onClick={handleDateSort}>
            <Button>
              <Icon name="calendar alternate" /> 
              {dateSort === DATE_SORTING_MODE.MOST_RECENT ?
              'Sort: Most Recent - Least Recent' : 'Sort: Least Recent - Most Recent'
              }
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
  dateSort: state.dateSort
});

const mapDispatchToProps = dispatch => ({
  resetFilter: () => dispatch(resetFilter()),
  fetchRFQData: () => dispatch(fetchRFQData()),
  setCurrentPageNo: value => dispatch(setCurrentPageNo(value)),
  setDateSortingMode: value => dispatch(setDateSortingMode(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryMenuContainer);

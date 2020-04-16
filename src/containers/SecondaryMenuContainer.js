import React from "react";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import { Menu, Icon, Checkbox, Button } from "semantic-ui-react";

import { resetFilter, fetchRFQData, setCurrentPageNo, setDateSortingMode, setHiddenRow, 
  removeAllSelectedRow, setAutoRefresh } from '../actions/index';
import { DATE_SORTING_MODE } from '../constants/rfqConstants';
import SelectColumnModalContainer from './SelectColumnModalContainer';

const SecondaryMenuContainer = (props) => {
  const { resetFilter, fetchRFQData, setCurrentPageNo, dateSort, setDateSortingMode, entry, 
    selectedRow, hiddenRow, setHiddenRow, removeAllSelectedRow, autoRefresh, setAutoRefresh } = props;

  const handleClearFilter = () => {
    resetFilter();
    setCurrentPageNo(1);
    setHiddenRow(false);
    removeAllSelectedRow();
    fetchRFQData();
  };

  const handleDateSort = () => {
    if(dateSort === DATE_SORTING_MODE.MOST_RECENT){
      setDateSortingMode(DATE_SORTING_MODE.LEAST_RECENT);
    } else {
      setDateSortingMode(DATE_SORTING_MODE.MOST_RECENT);
    }
    setHiddenRow(false);
    removeAllSelectedRow();
    fetchRFQData();
  };

  const toggleHideRow = () => {
    if(hiddenRow){
      removeAllSelectedRow();
    }

    setHiddenRow(!hiddenRow);
  };

  const handleAutoRefresh = (ev, data) => {
    setAutoRefresh(data.checked);
  };

  return (
    <div>
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item name="columns">
            <SelectColumnModalContainer/>
          </Menu.Item>
          <Menu.Item name="hide" onClick={toggleHideRow} disabled={selectedRow.length < 1}>
            <Icon name={hiddenRow ? "unhide" : "hide"} /> {hiddenRow ? 'Unhide' : 'Hide'}
          </Menu.Item>
          <Menu.Item name="dateSort" onClick={handleDateSort}>
            <Button>
              <Icon name="calendar alternate" /> 
              {dateSort === DATE_SORTING_MODE.MOST_RECENT ?
              'Sort: Most Recent - Least Recent' : 'Sort: Least Recent - Most Recent'
              }
            </Button>
          </Menu.Item>
          <Menu.Item name="create">
            <Icon name="plus" /> Create RFQ
          </Menu.Item>
          <Menu.Item name="export">
            <CSVLink data={entry} filename={'RFQ.csv'} style={{color: 'rgba(0,0,0,.87)'}}>
              <Icon name="download" /> Export
            </CSVLink>
          </Menu.Item>
          <Menu.Item name="refresh">
            <Checkbox label={"Auto Refresh"} checked={autoRefresh} onChange={handleAutoRefresh} />
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
  dateSort: state.dateSort,
  entry: state.rfqEntry,
  hiddenRow: state.hiddenRow,
  selectedRow: state.selectedRow,
  autoRefresh: state.autoRefresh
});

const mapDispatchToProps = dispatch => ({
  resetFilter: () => dispatch(resetFilter()),
  fetchRFQData: () => dispatch(fetchRFQData()),
  setCurrentPageNo: value => dispatch(setCurrentPageNo(value)),
  setDateSortingMode: value => dispatch(setDateSortingMode(value)),
  setHiddenRow: value => dispatch(setHiddenRow(value)),
  removeAllSelectedRow: () => dispatch(removeAllSelectedRow()),
  setAutoRefresh: value => dispatch(setAutoRefresh(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryMenuContainer);

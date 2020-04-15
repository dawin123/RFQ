import React from "react";
import { connect } from "react-redux";
import { Pagination, Select, Grid } from "semantic-ui-react";
import { LIST_TYPE_MAPPING } from "./constants/rfqConstants";
import {
  setItemPerPage,
  setCurrentPageNo,
  fetchRFQData,
  setHiddenRow,
  removeAllSelectedRow,
} from "./actions/index";

const PaginationContainer = props => {
  const {
    currentPageNo,
    totalPageNo,
    itemPerPage,
    setItemPerPage,
    setCurrentPageNo,
    fetchRFQData,
    totalCount,
    selectedTab,
    setHiddenRow,
    removeAllSelectedRow
  } = props;

  const handlePageChange = (ev, data) => {
    setCurrentPageNo(data.activePage);
    setHiddenRow(false);
    removeAllSelectedRow();
    fetchRFQData();
  };

  const handleItemPerPageChange = (ev, data) => {
    setItemPerPage(data.value);
    setCurrentPageNo(1);
    setHiddenRow(false);
    removeAllSelectedRow();
    fetchRFQData();
  };

  return (
    <div>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>{"Total Count: " + totalCount[LIST_TYPE_MAPPING[selectedTab]]}</Grid.Column>
          <Grid.Column style={{ textAlign: "right" }}>
            <Select
              options={[
                { key: 5, value: 5, text: "5" },
                { key: 10, value: 10, text: "10" },
              ]}
              style={{ marginRight: "10px" }}
              defaultValue={itemPerPage}
              onChange={handleItemPerPageChange}
            />
            <Pagination
              activePage={currentPageNo}
              onPageChange={handlePageChange}
              totalPages={totalPageNo}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  currentPageNo: state.pagination.currentPageNo,
  totalPageNo: state.pagination.totalPageNo,
  itemPerPage: state.pagination.itemPerPage,
  selectedTab: state.selectedTab,
  filter: state.filter,
  pagination: state.pagination,
  totalCount: state.totalCount
});

const mapDispatchToProps = dispatch => ({
  setItemPerPage: value => dispatch(setItemPerPage(value)),
  setCurrentPageNo: value => dispatch(setCurrentPageNo(value)),
  fetchRFQData: () => dispatch(fetchRFQData()),
  setHiddenRow: value => dispatch(setHiddenRow(value)),
  removeAllSelectedRow: () => dispatch(removeAllSelectedRow())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationContainer);

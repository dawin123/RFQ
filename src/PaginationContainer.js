import React from "react";
import { connect } from "react-redux";
import { Pagination, Select, Grid } from "semantic-ui-react";
import {
  setItemPerPage,
  setCurrentPageNo,
  fetchRFQData
} from "./actions/index";

const PaginationContainer = props => {
  const {
    currentPageNo,
    totalPageNo,
    entry,
    itemPerPage,
    setItemPerPage,
    setCurrentPageNo,
    fetchRFQData
  } = props;

  const handlePageChange = (ev, data) => {
    setCurrentPageNo(data.value);
    fetchRFQData();
  };
  const handleItemPerPageChange = (ev, data) => {
    setItemPerPage(data.value);
    setCurrentPageNo(1);
    fetchRFQData();
  };

  return (
    <div>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>{"Total Count: " + entry.length}</Grid.Column>
          <Grid.Column style={{ textAlign: "right" }}>
            <Select
              options={[
                { key: 5, value: 5, text: "5" },
                { key: 10, value: 10, text: "10" },
                { key: 15, value: 15, text: "15" }
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
  entry: state.rfqEntry,
  itemPerPage: state.pagination.itemPerPage,
  selectedTab: state.selectedTab,
  filter: state.filter,
  pagination: state.pagination
});

const mapDispatchToProps = dispatch => ({
  setItemPerPage: value => dispatch(setItemPerPage(value)),
  setCurrentPageNo: value => dispatch(setCurrentPageNo(value)),
  fetchRFQData: () => dispatch(fetchRFQData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationContainer);

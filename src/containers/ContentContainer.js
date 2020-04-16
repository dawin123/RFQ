import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import TabContainer from "./TabContainer";
import TableContainer from "./TableContainer";
import PaginationContainer from "./PaginationContainer";
import { fetchRFQData } from "../actions/index";

const ContentContainer = props => {
  const { fetchRFQData, autoRefresh } = props;

  useEffect(() => {
    fetchRFQData();
  }, [fetchRFQData]);

  useEffect(() => {
    let interval;
    if(autoRefresh){
      interval = setInterval(() => {
        fetchRFQData();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div>
      <TabContainer />
      <Segment basic style={{ minHeight: "800px", padding: "2em" }}>
        <TableContainer />
        <div style={{ marginTop: "30px" }} />
        <PaginationContainer />
      </Segment>
    </div>
  );
};

const mapStateToProps = state => ({
  autoRefresh: state.autoRefresh
});

const mapDispatchToProps = dispatch => ({
  fetchRFQData: () => dispatch(fetchRFQData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentContainer);

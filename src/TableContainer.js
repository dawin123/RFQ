import React from "react";
import { connect } from "react-redux";
import { Table, Input, Button, Loader, Checkbox } from "semantic-ui-react";
// import sampleData from "./sampleData";
import { setFilter, fetchRFQData, setCurrentPageNo } from "./actions/index";
import { FILTER_FIELD, FIELD_TEXT, FIELD_OBJECT_MAPPING } from "./constants/rfqConstants";

const TableContainer = props => {
  const { filter, entry, setDataFilter, fetchRFQData, setCurrentPageNo, isLoading, showColumn } = props;
  const showPercentage = decimal => {
    return decimal * 100;
  };

  const generateInputProps = field => {
    return {
      onChange: handleInputChange(field),
      value: filter[field],
      onKeyPress: event => {
        if (event.key === "Enter") {
          setCurrentPageNo(1);
          fetchRFQData();
        }
      }
    };
  };

  const handleInputChange = field => (ev, data) => {
    setDataFilter(field, data.value);
  };

  const handleFilterClick = () => () => {
    setCurrentPageNo(1);
    fetchRFQData();
  };

  return (
    <div style={{ overflow: "auto" }}>
      {isLoading ?
        <Loader inline active/> 
        :
        <Table>
          <Table.Header>
            <Table.Row>
              {Object.keys(FIELD_TEXT).map(key => {
                if(showColumn[key]){
                  return (
                    <Table.HeaderCell key={key}>{FIELD_TEXT[key]}</Table.HeaderCell>
                    );
                } else {
                  return null;
                }
              })}
              <Table.HeaderCell />
            </Table.Row>
            <Table.Row>
              {Object.keys(FILTER_FIELD).map(key => {
                if(showColumn[key]){
                  return (
                    <Table.HeaderCell key={key}>
                      <Input {...generateInputProps(FILTER_FIELD[key])} />
                    </Table.HeaderCell>
                  );
                } else {
                  return null;
                }
              })}
              <Table.HeaderCell>
                <Button onClick={handleFilterClick()}>Filter</Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {entry.length > 0 ? entry.map(entry => {
              return (
                <Table.Row key={entry.rfq}>
                  {Object.keys(entry).map(key => {
                    if(showColumn[FIELD_OBJECT_MAPPING[key]]){
                      if(key === 'percentage'){
                        return (
                          <Table.Cell>{showPercentage(entry.percentage)}%</Table.Cell>
                        );
                      } else {
                        return (
                          <Table.Cell>{entry[key]}</Table.Cell>
                        );
                      }
                    } else {
                      return null;
                    }
                  })}
                  <Table.Cell>
                    <Checkbox />
                  </Table.Cell>
                </Table.Row>
              );
            }) :
            <Table.Row>
              <Table.Cell style={{textAlign: 'center'}} 
              colSpan={Object.keys(showColumn).filter(key => showColumn[key]).length}>- No Data -</Table.Cell>
            </Table.Row>
            }
          </Table.Body>
        </Table>
      }
      
    </div>
  );
};

const mapStateToProps = state => ({
  filter: state.filter,
  entry: state.rfqEntry,
  isLoading: state.isLoading,
  showColumn: state.showColumn
});

const mapDispatchToProps = dispatch => ({
  setDataFilter: (field, value) => dispatch(setFilter(field, value)),
  setCurrentPageNo: value => dispatch(setCurrentPageNo(value)),
  fetchRFQData: () => dispatch(fetchRFQData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);

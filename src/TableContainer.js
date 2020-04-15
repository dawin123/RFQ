import React from "react";
import { connect } from "react-redux";
import { Table, Input, Button, Loader } from "semantic-ui-react";
// import sampleData from "./sampleData";
import { setFilter, fetchRFQData, setCurrentPageNo } from "./actions/index";
import { FILTER_FIELD } from "./constants/rfqConstants";

const TableContainer = props => {
  const { filter, entry, setDataFilter, fetchRFQData, setCurrentPageNo, isLoading } = props;
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
              <Table.HeaderCell>RFQ</Table.HeaderCell>
              <Table.HeaderCell>Quote ID</Table.HeaderCell>
              <Table.HeaderCell>Last Updated Time</Table.HeaderCell>
              <Table.HeaderCell>Sender</Table.HeaderCell>
              <Table.HeaderCell>Subject</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Percentage</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Quote Status</Table.HeaderCell>
              <Table.HeaderCell>Market</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.RFQ)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.QUOTE_ID)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.LAST_UPDATED)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.SENDER)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.SUBJECT)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.PRODUCT)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.PERCENTAGE)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.QUANTITY)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.QUOTE_STATUS)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input {...generateInputProps(FILTER_FIELD.MARKET)} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Button onClick={handleFilterClick()}>Filter</Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {entry.length > 0 ? entry.map(entry => {
              return (
                <Table.Row key={entry.rfq}>
                  <Table.Cell>{entry.rfq}</Table.Cell>
                  <Table.Cell>{entry.quoteId}</Table.Cell>
                  <Table.Cell>
                    {entry.lastUpdated}
                  </Table.Cell>
                  <Table.Cell>{entry.sender}</Table.Cell>
                  <Table.Cell>{entry.subject}</Table.Cell>
                  <Table.Cell>{entry.product}</Table.Cell>
                  <Table.Cell>{showPercentage(entry.percentage)}%</Table.Cell>
                  <Table.Cell>{entry.quantity}</Table.Cell>
                  <Table.Cell>{entry.quoteStatus}</Table.Cell>
                  <Table.Cell>{entry.market}</Table.Cell>
                </Table.Row>
              );
            }) :
            <Table.Row>
              <Table.Cell style={{textAlign: 'center'}} colSpan={10}>- No Data -</Table.Cell>
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
  isLoading: state.isLoading
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

import axios from "axios";
import * as rfqActionType from "./rfqActionType";
import { FILTER_FIELD } from "../constants/rfqConstants";

export const setShowSidebar = value => ({
  type: rfqActionType.SHOW_SIDEBAR,
  value: value
});

export const setSelectedTab = value => ({
  type: rfqActionType.SET_SELECTED_TAB,
  value: value
});

export const setFilter = (field, value) => ({
  type: rfqActionType.SET_FILTER,
  field: field,
  value: value
});

export const setCurrentPageNo = value => ({
  type: rfqActionType.SET_PAGE_NO,
  value: value
});

export const setTotalPageNo = value => ({
  type: rfqActionType.SET_TOTAL_PAGE_NO,
  value: value
});

export const setItemPerPage = value => ({
  type: rfqActionType.SET_ITEM_PER_PAGE,
  value: value
});

export const setEntry = entry => ({
  type: rfqActionType.SET_ENTRIES,
  entry: entry
});

export const fetchAPI = () => {
  axios
    .get("https://api.github.com/users/square/repos")
    .then(response => {
      console.log(JSON.stringify(response));
    })
    .catch(err => {
      console.log(err);
    });
};

export const postAPI = () => {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      name: "test",
      salary: "123",
      age: "23"
    })
    .then(response => {
      console.log(JSON.stringify(response));
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchRFQData = () => (dispatch, getState) => {
  console.log("fetching data!");
  const state = getState();
  const spec = {
    selectedTab: state.selectedTab,
    rfqFilter: state.filter[FILTER_FIELD.RFQ],
    quoteIdFilter: state.filter[FILTER_FIELD.QUOTE_ID],
    lastUpdatedFilter: state.filter[FILTER_FIELD.LAST_UPDATED],
    senderFilter: state.filter[FILTER_FIELD.SENDER],
    subjectFilter: state.filter[FILTER_FIELD.SUBJECT],
    productFilter: state.filter[FILTER_FIELD.PRODUCT],
    percentageFilter: state.filter[FILTER_FIELD.PERCENTAGE],
    quantityFilter: state.filter[FILTER_FIELD.QUANTITY],
    quoteStatusFilter: state.filter[FILTER_FIELD.QUOTE_STATUS],
    marketFilter: state.filter[FILTER_FIELD.MARKET],
    currentPageNo: state.pagination.currentPageNo,
    itemPerPage: state.pagination.itemPerPage
  };
  console.log(JSON.stringify(spec));

  axios
    .post("http://13.229.249.252:4567/getRFQList", spec)
    .then(response => {
      console.log(JSON.stringify(response));
    })
    .catch(err => {
      console.log(err);
    });

  return Promise.resolve();
};

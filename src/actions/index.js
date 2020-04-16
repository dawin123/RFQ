import axios from "axios";
import * as rfqActionType from "./rfqActionType";
import { FILTER_FIELD, LIST_TYPE } from "../constants/rfqConstants";

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

export const resetFilter = () => ({
  type: rfqActionType.RESET_FILTER
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

export const setTotalCount = (listType, value) => ({
  type: rfqActionType.SET_TOTAL_COUNT,
  listType: listType,
  value: value
});

export const setIsLoading = value => ({
  type: rfqActionType.SET_IS_LOADING,
  value: value
});

export const setShowColumn = (field, value) => ({
  type: rfqActionType.SET_SHOW_COLUMN,
  field: field,
  value: value
});

export const setDateSortingMode = value => ({
  type: rfqActionType.SET_DATE_SORTING_MODE,
  value: value
});

export const addSelectedRow = toSelect => ({
  type: rfqActionType.ADD_SELECTED_ROW,
  toSelect: toSelect
});

export const removeSelectedRow = toUnselect => ({
  type: rfqActionType.REMOVE_SELECTED_ROW,
  toUnselect: toUnselect
});

export const removeAllSelectedRow = () => ({
  type: rfqActionType.REMOVE_ALL_SELECTED_ROW
});

export const setHiddenRow = value => ({
  type: rfqActionType.SET_HIDDEN_ROW,
  value: value
});

export const setAutoRefresh = value => ({
  type: rfqActionType.SET_AUTO_REFRESH,
  value: value
});

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
    dateSort: state.dateSort,
    currentPageNo: state.pagination.currentPageNo,
    itemPerPage: state.pagination.itemPerPage
  };
  console.log(JSON.stringify(spec));

  const options = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Headers': '*',
      'Access-Control-Request-Method': 'POST'
    }
  };

  dispatch(setIsLoading(true));

  axios
    .post("http://13.229.249.252:4567/getRFQList", spec, options)
    .then(response => {
      console.log(JSON.stringify(response));
      dispatch(setEntry(response.data.rfqList));
      dispatch(setTotalPageNo(response.data.totalPageNo));
      dispatch(setTotalCount(LIST_TYPE.RFQ, response.data.totalRFQCount));
      dispatch(setTotalCount(LIST_TYPE.QUOTE, response.data.totalQuoteCount));
      dispatch(setTotalCount(LIST_TYPE.EXCEPTION, response.data.totalExceptionCount));
      dispatch(setIsLoading(false));
    })
    .catch(err => {
      dispatch(setIsLoading(false));
      console.log(err);
    });

  return Promise.resolve();
};

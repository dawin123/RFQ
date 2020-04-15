import { FILTER_FIELD, LIST_TYPE } from "../constants/rfqConstants";
import * as rfqActionType from "../actions/rfqActionType";

const initialState = {
  showSidebar: true,
  selectedTab: 0,
  filter: {
    [FILTER_FIELD.RFQ]: "",
    [FILTER_FIELD.QUOTE_ID]: "",
    [FILTER_FIELD.LAST_UPDATED]: "",
    [FILTER_FIELD.SENDER]: "",
    [FILTER_FIELD.SUBJECT]: "",
    [FILTER_FIELD.PRODUCT]: "",
    [FILTER_FIELD.PERCENTAGE]: "",
    [FILTER_FIELD.QUANTITY]: "",
    [FILTER_FIELD.QUOTE_STATUS]: "",
    [FILTER_FIELD.MARKET]: ""
  },
  showColumn: {
    [FILTER_FIELD.RFQ]: true,
    [FILTER_FIELD.QUOTE_ID]: true,
    [FILTER_FIELD.LAST_UPDATED]: true,
    [FILTER_FIELD.SENDER]: true,
    [FILTER_FIELD.SUBJECT]: true,
    [FILTER_FIELD.PRODUCT]: true,
    [FILTER_FIELD.PERCENTAGE]: true,
    [FILTER_FIELD.QUANTITY]: true,
    [FILTER_FIELD.QUOTE_STATUS]: true,
    [FILTER_FIELD.MARKET]: true
  },
  pagination: {
    currentPageNo: 1,
    totalPageNo: 5,
    itemPerPage: 10
  },
  totalCount: {
    [LIST_TYPE.RFQ]: 0,
    [LIST_TYPE.QUOTE]: 0,
    [LIST_TYPE.EXCEPTION]: 0
  },
  rfqEntry: [],
  isLoading: false,
};

const rfq = (state = initialState, action) => {
  switch (action.type) {
    case rfqActionType.SET_ENTRIES:
      return {
        ...state,
        rfqEntry: action.entry
      };
    case rfqActionType.SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.value
      };
    case rfqActionType.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.value
      };
    case rfqActionType.SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.field]: action.value
        }
      };
    case rfqActionType.RESET_FILTER:
      return {
        ...state,
        filter: initialState.filter
      };
    case rfqActionType.SET_PAGE_NO:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPageNo: action.value
        }
      };
    case rfqActionType.SET_TOTAL_PAGE_NO:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          totalPageNo: action.value
        }
      };
    case rfqActionType.SET_ITEM_PER_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          itemPerPage: action.value
        }
      };
    case rfqActionType.SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: {
          ...state.totalCount,
          [action.listType]: action.value,
        }
      };
    case rfqActionType.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case rfqActionType.SET_SHOW_COLUMN:
      return {
        ...state,
        showColumn: {
          ...state.showColumn,
          [action.field]: action.value
        }
      };
    default:
      return state;
  }
};

export default rfq;

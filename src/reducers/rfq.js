import { FILTER_FIELD } from "../constants/rfqConstants";
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
  pagination: {
    currentPageNo: 1,
    totalPageNo: 5,
    itemPerPage: 10
  },
  rfqEntry: []
};

const rfq = (state = initialState, action) => {
  switch (action.type) {
    case rfqActionType.SET_ENTRIES:
      return {
        ...state,
        rfcEntry: action.entry
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
          pageNo: action.value
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
    default:
      return state;
  }
};

export default rfq;

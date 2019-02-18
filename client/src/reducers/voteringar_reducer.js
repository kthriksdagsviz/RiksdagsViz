import { RECEIVED_VOTERING_BY_ID,REQUEST_VOTERING_BY_ID, REQUEST_VOTERING_BY_YEAR, RECEIVED_VOTERING_BY_YEAR } from "../constants/ActionTypes";


const initialState = {
  isFetching: false,
  fetched: false,
  list:{
    
  }
}
 
export default function voteringar(state = initialState, action) {
  switch (action.type) {
    case REQUEST_VOTERING_BY_ID: 
      return { ...state, isFetching: true };
    case RECEIVED_VOTERING_BY_ID:
      return {
        isFetching: false,
        fetched: true,
        list:action.data
      } 
    case REQUEST_VOTERING_BY_YEAR:
      return {...state, isFetching: true, fetched: false}
    case RECEIVED_VOTERING_BY_YEAR:
      return {
        isFetching: false,
        fetched: true,
        list: action.data.data
      }
      case "TOGGLE_VOTERING_FETCHED":
      return {...state, fetched: !this.state.fetched}
    default:
      return state;
  }
};
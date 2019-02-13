import { REQUEST_NEWS,RECEIVED_NEWS } from "../constants/ActionTypes";


const initialState = {
  isFetching: false,
  fetched: false,
  list:[]
}
 
export default function nyheter(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NEWS: 
      return { ...state, isFetching: true };
    case RECEIVED_NEWS:
      return {
        isFetching: false,
        fetched: true,
        list:action.data
      } 
    default:
      return state;
  }
};
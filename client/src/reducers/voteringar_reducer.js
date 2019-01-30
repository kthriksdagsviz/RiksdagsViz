import { RECEIVED_VOTERING_BY_ID,REQUEST_VOTERING_BY_ID } from "../constants/ActionTypes";


const initialState = {
  isFetching: false,
  fetched: false,
  list:[]
}
 
export default function voteringar(state = [], action) {
  console.log(action.data)
  switch (action.type) {
    case REQUEST_VOTERING_BY_ID: 
      return { ...state, isFetching: true };
    case RECEIVED_VOTERING_BY_ID:
      return {
        isFetching: false,
        fetched: true,
        list:action.data
      } 
    default:
      return state;
  }
};
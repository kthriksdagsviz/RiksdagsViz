import { RECEIVED_LEDAMOTER,REQUEST_LEDAMOTER } from "../constants/ActionTypes";


const initialState = {
  isFetching: false,
  fetched: false,
  list:[]
}
 
export default function ledamoter(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LEDAMOTER: 
      return { ...state, isFetching: true };
    case RECEIVED_LEDAMOTER:
      return {
        isFetching: false,
        fetched: true,
        list:action.data
      } 
    default:
      return state;
  }
};
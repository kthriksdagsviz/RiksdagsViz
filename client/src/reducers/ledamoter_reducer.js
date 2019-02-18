import { RECEIVED_LEDAMOTER,REQUEST_LEDAMOTER, SET_LEDAMOT, SET_LEDAMOT_FETCHED } from "../constants/ActionTypes";


const initialState = {
  isFetching: false,
  fetched: false,
  list:[],
  selectedLedamot:{}
}
 
export default function ledamoter(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LEDAMOTER: 
      return { ...state, isFetching: true, fetched: false };
    case RECEIVED_LEDAMOTER:
      return {
        isFetching: false,
        fetched: true,
        list:action.data
      } 
    case SET_LEDAMOT:
      return { ...state, selectedLedamot: action.data };
    case SET_LEDAMOT_FETCHED:
      return {...state, fetched: true}
    default:
      return state;
  }
};
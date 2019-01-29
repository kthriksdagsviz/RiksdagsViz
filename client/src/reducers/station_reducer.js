import { RECEIVED_START_STATIONS } from "../constants/ActionTypes";


const initialState = {
    "hej": "hej"
}
  
export default function stations(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_START_STATIONS:
      return {
        ...state
      }
    default:
      return state;
  }
};
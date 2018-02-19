import { AppState } from './state';
import 'rxjs/add/operator/map';
import ActionWithPayload from './action';
import { Observable } from 'rxjs/Observable';

//takes state and action as input and returns new state
export function reducerFunction(state: AppState = {}, action: ActionWithPayload<any>): any {
 switch (action.type) {
  case 'SETUSER':
   //state['employee'] = action.payload;
   return Object.assign({}, state, {employee: action.payload});
  case 'SETCUSTOMER':
   //state['customer'] = action.payload;
   return Object.assign({}, state, {customer: action.payload});
  case 'SETREQHEADER':
   //state['reqHeader'] = {};
   var ob = {
    storeNumber: action.payload.dataResponse.storeNumber,
    employeeId: action.payload.dataResponse.employeeId,
    deviceId: action.payload.dataResponse.storeNumber
   }
   return Object.assign({}, state, {reqHeader: ob, encryptedToken: action.payload.statusResponse.STATUS.encryptedToken});
  case 'SETENCRYPTEDTOKEN':
   //state['reqHeader']['encryptedToken'] = action.payload.statusResponse.STATUS.encryptedToken;
   return Object.assign({}, state, {encryptedToken: action.payload.statusResponse.STATUS.encryptedToken});
  case 'GETSTATE':
   return Object.assign({}, state);
  default:
   return Object.assign({}, state);
 }
}
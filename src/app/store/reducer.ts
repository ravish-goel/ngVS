import { AppState } from './state';
import 'rxjs/add/operator/map';
import ActionWithPayload from './action';
import { Observable } from 'rxjs/Observable';

//takes state and action as input and returns new state
export function reducerFunction(state: AppState = {}, action: ActionWithPayload<any>): any {
	switch (action.type) {
		case 'SETUSER':
			state['employee'] = action.payload;
			return Object.assign({}, state);
		case 'SETCUSTOMER':
			state['customer'] = action.payload;
			return Object.assign({}, state);
		case 'SETREQHEADER':
			state['reqHeader'] = {};
			state['reqHeader']['encryptedToken'] = action.payload.statusResponse.STATUS.encryptedToken;
			state['reqHeader']['storeNumber'] = action.payload.dataResponse.storeNumber;
			state['reqHeader']['employeeId'] = action.payload.dataResponse.employeeId;
			state['reqHeader']['deviceId'] = action.payload.dataResponse.storeNumber;
			return Object.assign({}, state);
		case 'SETENCRYPTEDTOKEN':
			state['reqHeader']['encryptedToken'] = action.payload.statusResponse.STATUS.encryptedToken;
			return Object.assign({}, state);
		case 'GETSTATE':
			return Object.assign({}, state);
		default:
			return Object.assign({}, state);
	}
}
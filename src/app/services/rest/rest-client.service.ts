import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store/state';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable()
export class RestClientService{
  login: any;
  search: any;
  hetAPIUrl: string;
  reqHeader: any;
  hetUserAPIUrl: string;
  user: any;
  state: Observable<any>;
  encryptedToken: String;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.state = store.select(state => state['user']);
   this.hetAPIUrl = 'https://web01.vitaminshoppe.com/rest/model/he/rest/actor/';
    this.hetUserAPIUrl = 'https://web01.vitaminshoppe.com/user/rest/model/he/rest/actor/';
    const params = new HttpParams();
   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.state.subscribe(val => {
      console.log(val);
      this.reqHeader = val.reqHeader? val.reqHeader: {};
      this.encryptedToken = val.encryptedToken? val.encryptedToken: '';
    });

    this.store.dispatch({type: 'GETSTATE'});

   this.login = function(data, userRequest){
    console.log(data);
    var url = userRequest? (this.hetUserAPIUrl + 'HEProfileActor/employeeLogin') : (this.hetAPIUrl + 'HEProfileActor/employeeLogin')
    return this.http.post(url + '?_t=' + (new Date()).getTime(), data ,{headers, params});
    }
    
    this.search = function(data, userRequest){
      console.log(data);
      Object.assign(data, this.reqHeader, {'encryptedToken': this.encryptedToken});
      var url = userRequest? (this.hetUserAPIUrl + 'HECustomerProfileActor/lookUpCustomer') : (this.hetAPIUrl + 'HECustomerProfileActor/lookUpCustomer')
    return this.http.post(url + '?_t=' + (new Date()).getTime(), data ,{headers, params});
    }
  }
}
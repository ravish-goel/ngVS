import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../../../services/rest/rest-client.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../store/state';
import {Router} from '@angular/router';
import { reducerFunction } from '../../../store/reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 	username: string;
 	password: string;
  state: Observable<any>;
  lastName: string;

  constructor(private rc: RestClientService, private store: Store<AppState>, private router: Router) {
    this.state = this.store.select(state => state['user']);
  	this.username = "100003";
  	this.password = "Test1test";
  }

  submit() {
  	this.rc.login({employeeId: this.username, password: this.password}, false).subscribe(
      res => {
        //console.log(res);
        this.store.dispatch({type: 'SETUSER', payload: res.dataResponse});
        this.store.dispatch({type: 'SETREQHEADER', payload: res});
        this.router.navigate(['/home']);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  fun(){
    this.store.dispatch({type: 'GETSTATE'});
  }

  ngOnInit() {
    this.state.subscribe(val => {
      this.lastName = val.employee && val.employee.lastName? val.employee.lastName: '';
    })
  }

}

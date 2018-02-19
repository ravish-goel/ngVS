import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../generic/modal/modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../store/state';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestClientService } from '../../../services/rest/rest-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  state: Observable<any>;
  lastName: String;
  constructor(private rc: RestClientService, private store: Store<AppState>, private modalService: NgbModal) {
  	this.state = store.select(state => state['user']);
  }

  openModalWithComponent() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'World';
  }

  searchCustomer() {
    this.rc.search({email: 'kingoye@gmail.com'}, false).subscribe(
      res => {
        this.store.dispatch({type: 'SETCUSTOMER', payload: res.dataResponse});
        this.store.dispatch({type: 'SETENCRYPTEDTOKEN', payload: res});
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  ngOnInit() {
  	this.state.subscribe(val => {
      this.lastName = val.employee && val.employee.lastName? val.employee.lastName: '';
    })

  	this.store.dispatch({type: 'GETSTATE'});

  }

}

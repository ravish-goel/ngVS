import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { ViewsModule } from './views/views.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {ModalComponent} from '../app/views/generic/modal/modal.component'

//services
import { RestClientService } from './services/rest/rest-client.service';

//store
import { StoreModule } from '@ngrx/store';
import { reducerFunction } from './store/reducer';

//router
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';

//bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ng-bootstrap/modal';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    
  {
    path: 'home',
    loadChildren: 'app/views/home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: 'app/views/login/login.module#LoginModule'
  },
 
];
@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({user: reducerFunction}),
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [RestClientService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' } // <--- this right here
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CollapseModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AgmDirectionModule } from 'agm-direction';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';

import { HttpModule } from '@angular/http';
//import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { LoaderService } from './loader.service';
import { DialogAccidentComponent} from './dialog-accident/dialog-accident.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ManagementBarComponent } from './management-bar/management-bar.component';
import { ManagementTableComponent } from './management-table/management-table.component';
import { ManagementMapComponent } from './management-map/management-map.component';
import { ManagementComponent } from './management/management.component';
import { AccidentPopupComponent } from './accident-popup/accident-popup.component';



const appRoutes: Routes = [
  { path: 'client', component: ClientComponent },
  { path: 'management', component: AccidentPopupComponent },
  {
    path: '',
    redirectTo: '/client',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/client',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ClientComponent,
    DialogAccidentComponent,
    ManagementBarComponent,
    ManagementTableComponent,
    ManagementMapComponent,
    ManagementComponent,
    AccidentPopupComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4X1tSatj9uOJbHGmbpB0Q916JMuTFV1I',
      libraries: ['places', 'geometry'],
    
    }),
    AgmDirectionModule,
    CollapseModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule
    //AgmJsMarkerClustererModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent],
  entryComponents: [DialogAccidentComponent]
})
export class AppModule { }

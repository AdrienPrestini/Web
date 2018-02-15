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
import { ManagementComponent } from './management/management.component';

import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';

const appRoutes: Routes = [
  { path: 'client', component: AppComponent },
  { path: 'management', component: ManagementComponent },
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
    ManagementComponent,
    ClientComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4X1tSatj9uOJbHGmbpB0Q916JMuTFV1I',
      libraries: ['places', 'geometry'],
    
    }),
    AgmDirectionModule,
    CollapseModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { HttpModule } from '@angular/http';
//import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { LoaderService } from './loader.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    
  ],
  imports: [
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
    //AgmJsMarkerClustererModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

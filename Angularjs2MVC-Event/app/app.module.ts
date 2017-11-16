import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { EventService } from './Service/event.service';
import { EventComponent } from './components/event.component';

@NgModule({
	imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
	declarations: [AppComponent, HomeComponent, EventComponent],
	providers: [{ provide: APP_BASE_HREF, useValue: '/' }, EventService],
	bootstrap: [AppComponent]
})

export class AppModule { }
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { enviroment } from '../enviroments/enviroment';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthsModule } from './auth/auths.module';  
import { TrainingModule } from './training/training.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AuthsModule,
    TrainingModule,
    StoreModule.forRoot(reducers, {}),
  ],
  providers: [
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(enviroment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

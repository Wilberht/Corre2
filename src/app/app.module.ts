import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/loginPage/loginPage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Componente
import {MyComponent} from '../components/login';
//Directivas(atributos)
import {DirectiveInputEmail} from '../directives/dirEmail';
import {DirectivePassword} from '../directives/dirPass';
import {DirectiveUser} from '../directives/dirUser';
//Ventanas
import {Principal} from '../pages/principal/principal';
//Facebook
//import { Facebook, NativeStorage } from 'ionic-native';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
//Clave Hash
//ga0RGNYHvNM5d0SLGQfpQWAPGJ8=
import { FriendPage } from '../pages/friendPage/friendPage';
import { GenerateCodePage } from '../pages/generateCodePage/generateCodePage';
import { LogOutPage } from '../pages/logOutPage/logOutPage';
import { NewTourPage } from '../pages/newTourPage/newTourPage';
import { SettingPage } from '../pages/settingPage/settingPage';
import { WeatherPage } from '../pages/weatherPage/weatherPage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MyComponent,
    DirectiveInputEmail,
    DirectivePassword,
    DirectiveUser,
    Principal,
    FriendPage,
    GenerateCodePage,
    LogOutPage,
    NewTourPage,
    SettingPage,
    WeatherPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MyComponent,
    Principal,
    FriendPage,
    GenerateCodePage,
    LogOutPage,
    NewTourPage,
    SettingPage,
    WeatherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

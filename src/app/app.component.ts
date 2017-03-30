import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
//import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



//import { NativeStorage } from 'ionic-native';
import { NativeStorage } from '@ionic-native/native-storage';



import { LoginPage } from '../pages/loginPage/loginPage';
import { Principal } from '../pages/principal/principal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  @ViewChild(Nav) nav: Nav; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public ns: NativeStorage) {
  //constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
     
      let env = this;
      this.ns.getItem('user')
        .then(function (data) {
          // user is previously logged and we have his data
          // we will let him access the app
          env.nav.push(Principal);
          splashScreen.hide();
        }, function (error) {
          //we don't have the user data so we will ask him to log in
          //env.nav.push(HomePage);
          splashScreen.hide();
        });
    
      statusBar.styleDefault();
    });
  }
}

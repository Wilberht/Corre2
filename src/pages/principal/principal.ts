import { Component, ViewChild } from '@angular/core';

//import { NativeStorage } from '@ionic-native/native-storage';
//import { Facebook } from '@ionic-native/facebook';

import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPage } from '../loginPage/loginPage';

import { Nav, NavController } from 'ionic-angular';

import { FriendPage } from '../friendPage/friendPage';
import { GenerateCodePage } from '../generateCodePage/generateCodePage';
//import { LogOutPage } from '../logOutPage/logOutPage';
import { NewTourPage } from '../newTourPage/newTourPage';
import { SettingPage } from '../settingPage/settingPage';
import { WeatherPage } from '../weatherPage/weatherPage';

@Component({
    templateUrl: 'principal.html'
})

export class Principal {
    @ViewChild(Nav) nav: Nav;
    user: any;
    userReady: boolean = false;

    
    rootPage = SettingPage;

    public clasificacion: boolean;

    pages: Array<{ title: string, component: any }>;
    public usuarios: Array<string> = new Array<string>("Yaremi", "Wilberht", "Rivas", "Casillas");

    constructor(public navCtrl: NavController) {
        this.pages = [
            { title: 'Ajustes', component: SettingPage },
            { title: 'Nuevo recorrido', component: NewTourPage },
            { title: 'Clima', component: WeatherPage },
            { title: 'Amigos', component: FriendPage },
            { title: 'Generar código', component: GenerateCodePage },
            { title: 'Cerrar sesión', component: LoginPage }
        ];
    }
    ionViewCanEnter() {
        let env = this;
        //this.ns.getItem('user')
        NativeStorage.getItem('user')
            .then(function (data) {
                env.user = {
                    name: data.name,
                    gender: data.gender,
                    picture: data.picture
                };
                env.userReady = true;
            }, function (error) {
                console.log(error);
            });
    }
    
    doFbLogout() {
        var nav = this.navCtrl;
        //this.f.logout()
        Facebook.logout()
            .then(function (response) {
                //user logged out so we will remove him from the NativeStorage
                NativeStorage.remove('user');
               
                nav.push(LoginPage);
            }, function (error) {
                console.log(error);
            });
    }
    openPage(page) {
        this.nav.setRoot(page.component);
        this.navCtrl.push(page.component);
    }
    
}
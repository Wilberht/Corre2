import { Component, ViewChild } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';

import { LoginPage } from '../loginPage/loginPage';

import { Nav, NavController } from 'ionic-angular';

import { FriendPage } from '../friendPage/friendPage';
import { GenerateCodePage } from '../generateCodePage/generateCodePage';
import { LogOutPage } from '../logOutPage/logOutPage';
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
    public usuarios: Array<string> = new Array<string>("yaremi", "wilberht", "rivas", "casillas");

    constructor(public navCtrl: NavController, public ns: NativeStorage, public f: Facebook) {
        this.pages = [
            { title: 'Ajustes', component: SettingPage },
            { title: 'Nuevo recorrido', component: NewTourPage },
            { title: 'Clima', component: WeatherPage },
            { title: 'Amigos', component: FriendPage },
            { title: 'Generar código', component: GenerateCodePage },
            { title: 'Cerrar sesión', component: LogOutPage }
        ];
    }
    ionViewCanEnter() {
        let env = this;
        this.ns.getItem('user')
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
        this.f.logout()
            .then(function (response) {
                //user logged out so we will remove him from the NativeStorage
                this.ns.remove('user');
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
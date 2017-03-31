import { Component } from '@angular/core';

import { NavController, AlertController ,  LoadingController} from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Principal } from '../pages/principal/principal';

import { Facebook, NativeStorage } from 'ionic-native';

//import { NativeStorage } from '@ionic-native/native-storage';
//import { Facebook } from '@ionic-native/facebook';

@Component({
    selector: 'my-component',
    templateUrl: 'login.html'
})

export class MyComponent {
    //Nombre de los componentes
    public toggleRegister: any;
    public email: any;
    public password: any;
    public userRegister: any;
    public emailRegister: any;
    public passwordRegister: any;
    public passwordVeriRegister: any;
    //Permite que funcionen las errores que aparecen en rojo
    public emailBoolean: boolean = false;
    public passwordBoolean: boolean = false;
    public userRegisterBoolean: boolean = false;
    public emailRegiserBoolean: boolean = false;
    public passwordRegisterBoolean: boolean = false;
    public passwordVeriRegiserBoolean: boolean = false;
    //Variable que use para usar el controlador, no sirve para nada más
    public nothing: any = { showError: false };
    //El form
    myForm: FormGroup;
    //Facebook
    FB_APP_ID: number = 1253462168103087;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
        this.myForm = this.formBuilder.group({
            toggleRegister: [false, Validators.compose([Validators.required])],
            email: ["", [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
            password: ["", Validators.required],
            userRegister: ["", [Validators.required]],
            emailRegister: ["", [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
            passwordRegister: ["", [Validators.required]],
            passwordVeriRegister: ["", [Validators.required]]
        });
        //this.f.browserInit(this.FB_APP_ID, "v2.8");
        Facebook.browserInit(this.FB_APP_ID, "v2.8");
        this.myForm.get('email').setValue("root@root.com");
        this.myForm.get('password').setValue("root");

    }


    doFbLogin() {
        let permissions = new Array();
        let nav = this.navCtrl;
        //the permissions your facebook app needs from the user
        permissions = ["public_profile"];


        //this.f.login(permissions)
        Facebook.login(permissions)
            .then(function (response) {
                let userId = response.authResponse.userID;
                let params = new Array();
                let loading = this.loadingCtrl.create({
                                content: 'SI LLEGA1'
                                });
                                loading.present();
                //Getting name and gender properties
                //this.f.api("/me?fields=name,gender", params)
                Facebook.api("/me?fields=name,gender", params)
                    .then(function (user) {
                        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                        //now we have the users info, let's save it in the NativeStorage
                        NativeStorage.setItem('user',
                            {
                                name: user.name,
                                gender: user.gender,
                                picture: user.picture
                            })
                            .then(function () {
                                 console.log("Si llegó :'()");
                                let loading = this.loadingCtrl.create({
                                content: 'SI LLEGA'
                                });
                                loading.present();
                                this.navCtrl.push(Principal);
                            }, function (error) {
                                let alert10 = this.alertCtrl.create({
                                    title: "Error:",
                                    subTitle: "Incorrect passwords",
                                    buttons: ['OK']
                                });
                                alert10.present();
                                console.log(error);
                            })
                    })
            }, function (error) {
                let alert11 = this.alertCtrl.create({
                    title: "Error:",
                    subTitle: "Incorrect passwords",
                    buttons: ['OK']
                });
                alert11.present();
                console.log(error);
            });
    }


    check(val) {
        if (val == 1) {
            //Borramos los valores de los otros campos que no pertenecen a esta sección.
            this.myForm.get('userRegister').setValue("");
            this.myForm.get('emailRegister').setValue("");
            this.myForm.get('passwordRegister').setValue("");
            this.myForm.get('passwordVeriRegister').setValue("");

            //Inicialización para la revisión de los campos.
            this.emailBoolean = false;
            this.passwordBoolean = false;

            //Validaciónes de los campos.
            if (this.myForm.get('email').hasError('required') || this.myForm.get('email').hasError('pattern')) {
                this.emailBoolean = true;
            }
            if (this.myForm.get('password').hasError('required')) {
                this.passwordBoolean = true;
            }
            if (!this.emailBoolean && !this.passwordBoolean) {
                //Comprobación de los  campos requeridos
                console.log("hola");
                if (this.myForm.get('email').value == "root@root.com" && this.myForm.get('password').value == "root") {
                    this.myForm.get('email').setValue("");
                    this.myForm.get('password').setValue("");
                    this.navCtrl.push(Principal);  ///Codigo para enviar a otra pagina
                }
                else { //En casi de los campos estan bien pero los datos mal.
                    let alert4 = this.alertCtrl.create({
                        title: "Error",
                        subTitle: "¡Contraseña de usuario incorrecta!",
                        buttons: ['OK']
                    });
                    alert4.present();
                }
            }
        } else if (val == 2) {
            //Borramos los campos que no esten en este area
            this.myForm.get('email').setValue("");
            this.myForm.get('password').setValue("");
            //Inicialización para la validación de los campos.
            this.userRegisterBoolean = false;
            this.emailRegiserBoolean = false;
            this.passwordRegisterBoolean = false;
            this.passwordVeriRegiserBoolean = false;
            //Validaciones
            if (this.myForm.get('userRegister').hasError('required')) {
                this.userRegisterBoolean = true;
            }
            if (this.myForm.get('emailRegister').hasError('required') || this.myForm.get('emailRegister').hasError('pattern')) {
                this.emailRegiserBoolean = true;
            }
            if (this.myForm.get('passwordRegister').hasError('required')) {
                this.passwordRegisterBoolean = true;
            }
            if (this.myForm.get('passwordVeriRegister').hasError('required')) {
                this.passwordVeriRegiserBoolean = true;
            }
            if (!this.userRegisterBoolean && !this.emailRegiserBoolean &&
                !this.passwordRegisterBoolean && !this.passwordVeriRegiserBoolean) {
                //en caos que todo sea correcto, mostrara el mensaje que se registro correctamente
                if (this.myForm.get('passwordRegister').value == this.myForm.get('passwordVeriRegister').value) {
                    let alert3 = this.alertCtrl.create({
                        title: "Éxitoso",
                        subTitle: "Usuario registrado",
                        buttons: ['OK']
                    });
                    alert3.present();
                    //Ponemos el valor en false para que nos lleve a la página de login.                 
                    this.myForm.get('toggleRegister').setValue(false);
                } else {//En caso que todos los campos esten bien, pero las contraseñas no coincidan.
                    let alert5 = this.alertCtrl.create({
                        title: "Error",
                        subTitle: "Contraseña incorrecta",
                        buttons: ['OK']
                    });
                    alert5.present();
                }
            }
        }
    }
}
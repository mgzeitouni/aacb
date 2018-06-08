import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { App } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root='BakerPage';
  tab2Root='ServerPage';
  
  constructor(public nav: NavController, 
    public navParams: NavParams,
    public storageService:Storage,
    public viewCtrl: ViewController,
    private http: HttpClient,
    public appCtrl: App) {

}


  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');


  }
  openPage(store){

    this.storageService.set('store',store)
     // this.nav.setRoot('TabsPage');
     this.appCtrl.getRootNav().setRoot('TabsPage');

     window.location.reload()
    

  }

}

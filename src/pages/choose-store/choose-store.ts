import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ChoosestorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-store',
  templateUrl: 'choose-store.html',
})
export class ChooseStorePage {
  
  constructor(public nav: NavController, 
            public navParams: NavParams,
            public storage:Storage,
            public viewCtrl: ViewController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosestorePage');
  }

    chooseStore(store){
      this.storage.set('store',store).then(value=>{
        this.nav.setRoot('TabsPage');
      })

    }


}

import { Component, ElementRef, Renderer, Directive, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Product } from '../../classes/product';
import { Storage } from '@ionic/storage';
import { ovenSession } from '../../classes/ovenSession';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-baker',
  templateUrl: 'baker.html',
})
export class BakerPage {

  cardsPerRow:number=2;

  productCollectionRef: AngularFirestoreCollection<Product>;
  product$: Observable<Product[]>;
  products: Product[]=[];
  hey: Product[]=[];
  store:string;
  selectedProduct: Product;
  quantity:number;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public firebase: FirebaseProvider,
  public storage:Storage,
  private alertCtrl: AlertController,
  private cd: ChangeDetectorRef,
  private http: HttpClient) {

    // .subscribe(val=>{
    //   console.log(val)
    //   this.loaded=true;
    // });

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad BakerPage');

    var that = this;


    this.storage.get('store').then((store) =>{

        that.store=store;

        that.product$ = that.firebase.getProducts(store);


         var that2 = that;

        
        that.product$.subscribe(products=>{

         that2.products = that2.pairUpProducts(products);
      

        })

    })

  }

  startOven(){
    const date = new Date();
    var formattedDate= date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear();

    var end_time = date.getTime()+(this.selectedProduct.oven_time*60000);
    var session = new ovenSession(
      formattedDate,
      this.selectedProduct,  
      date.toString(),
       this.quantity,
       "",
       end_time,
      false)
    this.firebase.addOvenSession(session);

    }
           


  pairUpProducts(products){
    var productPairs= [];
    var object = [];

    for (let product of products){
      var index = products.indexOf(product);

      object.push(product);
      if( (index+1) % this.cardsPerRow == 0){

        productPairs.push(object);
        object =[];
      }else{

        if (index ==this.products.length-1){
          productPairs.push(object);
        }

      }

    }
    
    return productPairs;

  }

  


  presentPrompt() {
    let alert=this.alertCtrl.create({
      title: 'Choose quantity',
      inputs: [

        {
          name: 'Quantity',
          placeholder: 'Quantity',
          type: 'tel',
          id:'autofocus'
        }
      ],
      cssClass: 'popUp',
      buttons: [
        {
          text: 'Start Oven',
          handler: data => {
            this.quantity=data;
          this.startOven();
          }
        }
      ]
    })

    alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      console.log(firstInput)
      firstInput.focus();
      return;
    });


  }



}

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

  product$: Observable<Product[]>;
  products: Product[]=[];
  store:string;
  selectedProduct: Product;
  quantity:number;

  readyCBOvenSession$: Observable<ovenSession[]>;
  readyCBOvenSessions: ovenSession[];

  readyQuantities: any={};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public firebase: FirebaseProvider,
  public storage:Storage,
  private alertCtrl: AlertController,
  private cd: ChangeDetectorRef,
  private http: HttpClient) {



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

        // Get CB ready ovenSessions
        if (store=='CB'){
          that.readyCBOvenSession$ = that.firebase.readyCBOvenSessions();
          that.readyCBOvenSession$.subscribe(ready=>{
            
            that.readyCBOvenSessions = ready;
            
            that.readyQuantities = {};

            for (let session of that.readyCBOvenSessions ){

              // If object not populated with this product, make it
              if ( !(session.product.id in that.readyQuantities)){
                that.readyQuantities[session.product.id ]= that.readyQuantities[session.quantity ];
              }else{
                // Else, add to exiting
                that.readyQuantities[session.product.id ]= that.readyQuantities[session.product.id ]+that.readyQuantities[session.quantity ];
              }

            }
            
          })
        }

    })

  }

  getQty(product){

    return (product.id in this.readyQuantities) ? this.readyQuantities[product.id] : 0
  }

  startOven(){
    const date = new Date();
    var formatted_date= date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear();

    var end_time = date.getTime()+(this.selectedProduct.oven_time_min*60000);

    var session = new ovenSession(
      formatted_date,
      this.selectedProduct,  
      date.toString(),
      parseInt(this.quantity.toString()),
       "",
       end_time,
      false)

      console.log(session)
    this.firebase.addOvenSession(session);

    }
           
    clickOven(event: Event, product){

      this.selectedProduct=product;
      this.presentPrompt()
    
      
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
            this.quantity=data.Quantity;
          this.startOven();
          }
        }
      ]
    })

    alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });


  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ovenSession } from '../../classes/ovenSession';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from '../../classes/product';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient,
    public afs: AngularFirestore,
            ) {
    console.log('Hello FirebaseProvider Provider');
  }

  addOvenSession(session: ovenSession){

    var d = new Date();
    var date= d.getMonth()+1+"-"+d.getDate()+"-"+d.getFullYear();

    session.id = Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15);

    this.afs.collection('ovenSessions').doc(session.id).set(Object.assign({}, session));
 
  }


  getProducts(store): Observable<Product[]>{

    
    var productCollectionRef = this.afs.collection<Product>('products', ref=>{

      return ref.where('company','==',store)
    });
    
    return productCollectionRef.valueChanges();
    
  }


  getOvenSessions(company): Observable<ovenSession[]>{
    
    var d = new Date();
    var date= d.getMonth()+1+"-"+d.getDate()+"-"+d.getFullYear();

    var ovenSessionsCollectionRef = this.afs.collection<ovenSession>('ovenSessions', ref=> {
      return ref.where('formatted_date','==',date)
                .where("baker_deleted",'==',false)
                .where("product.company","==",company)

    });

    return ovenSessionsCollectionRef.valueChanges();
  }

  readyCBOvenSessions(): Observable<ovenSession[]>{
    var d = new Date();
    var date= d.getMonth()+1+"-"+d.getDate()+"-"+d.getFullYear();

    var ovenSessionsCollectionRef = this.afs.collection<ovenSession>('ovenSessions', ref=> {
      return ref.where('formatted_date','==',date)
                .where("baker_deleted",'==',false)
                .where("product.company","==",'CB')
                .where("end_time","<",Date.now())
                .where("cinnabon_delivered","==",false)

    });

    return ovenSessionsCollectionRef.valueChanges();
  }

  removeSession(session){

    var d = new Date();
    var date= d.getMonth()+1+"-"+d.getDate()+"-"+d.getFullYear();

    session.baker_deleted=true;

    var ovenSessionsCollectionRef = this.afs.collection('ovenSessions').doc(session.id)
    
    ovenSessionsCollectionRef.update({
      baker_deleted:true
    });

      
  }


}

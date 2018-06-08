import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BakerPage } from './baker';

@NgModule({
  declarations: [
    BakerPage,
  ],
  imports: [
    IonicPageModule.forChild(BakerPage),
  ],
})
export class BakerPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseStorePage } from './choose-store';

@NgModule({
  declarations: [
    ChooseStorePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseStorePage),
  ],
})
export class ChooseStorePageModule {}

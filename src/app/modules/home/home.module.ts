import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class HomeModule { }
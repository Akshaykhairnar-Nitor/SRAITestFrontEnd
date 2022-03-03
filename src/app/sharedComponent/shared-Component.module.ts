import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material-module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [HeaderComponent],exports: [HeaderComponent]
})
export class SharedComponentModule {}

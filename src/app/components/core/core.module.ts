import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeService } from './services/theme.service';



@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    ThemeService
  ],
  exports: [
    CommonModule
  ]
})
export class CoreModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { AppAppetizerComponent } from './app-appetizer/app-appetizer.component';
import { AppExitsComponent } from './app-exits/app-exits.component';
import { AppFormComponent } from './app-form/app-form.component';
import { AppListComponent } from './app-list/app-list.component';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { FinanceComponent } from './finance/finance.component';
import { InfoFinanceComponent } from './info-finance/info-finance.component';


@NgModule({
  declarations: [
    AppToolbarComponent,
    AppListComponent,
    AppAppetizerComponent,
    AppExitsComponent,
    AppFormComponent,
    MessagesComponent,
    FinanceComponent,
    InfoFinanceComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ComponentsModule { }

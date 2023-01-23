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
import { ChartExitsComponent } from './chart-exits/chart-exits.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { FinanceComponent } from './finance/finance.component';
import { InfoFinanceComponent } from './info-finance/info-finance.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppToolbarComponent,
    AppListComponent,
    AppAppetizerComponent,
    AppExitsComponent,
    AppFormComponent,

    FinanceComponent,
    InfoFinanceComponent,
    ChartExitsComponent,

    SignupComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ComponentsModule {}

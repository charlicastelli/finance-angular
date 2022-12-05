import { FinanceResolver } from './guards/finance.resolver';
import { AppFormComponent } from './app-form/app-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAppetizerComponent } from './app-appetizer/app-appetizer.component';
import { AppExitsComponent } from './app-exits/app-exits.component';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';

const routes: Routes = [
  { path: '', component: AppToolbarComponent },
  { path: 'appetizer', component: AppAppetizerComponent},
  { path: 'exits', component: AppExitsComponent},
  { path: 'add', component: AppFormComponent, resolve: {finance: FinanceResolver}},
  { path: 'edit/:id', component: AppFormComponent, resolve: {finance: FinanceResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }

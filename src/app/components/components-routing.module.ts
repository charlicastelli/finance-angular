import { PageNotFoundComponent } from './../shared/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAppetizerComponent } from './app-appetizer/app-appetizer.component';
import { AppExitsComponent } from './app-exits/app-exits.component';
import { AppFormComponent } from './app-form/app-form.component';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { FinanceResolver } from './guards/finance.resolver';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  //Adicionei o app-toolbar a frente de todos os endereços para evitar erro de roteamento
  {
    path: 'app-toolbar/edit/:id',
    component: AppFormComponent,
    resolve: { finance: FinanceResolver },
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },

  {
    path: 'app-toolbar/exits',
    component: AppExitsComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },

  {
    path: 'app-toolbar/appetizer',
    component: AppAppetizerComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },

  {
    path: 'app-toolbar/add',
    component: AppFormComponent,
    resolve: { finance: FinanceResolver },
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },

  {
    path: 'app-toolbar',
    component: AppToolbarComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },

  { path: 'signup', component: SignupComponent },

  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}

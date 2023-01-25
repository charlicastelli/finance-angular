import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { MessagesComponent } from './messages/messages.component';
import { MessageErrorComponent } from './message-error/message-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    CategoryPipe,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    MessagesComponent,
    MessageErrorComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, AppMaterialModule],
  exports: [
    CategoryPipe,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    MessagesComponent,
    MessageErrorComponent,
  ],
})
export class SharedModule {}

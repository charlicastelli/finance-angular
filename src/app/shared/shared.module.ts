import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [
    CategoryPipe,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [CommonModule, AppMaterialModule],
  exports: [CategoryPipe, ErrorDialogComponent, ConfirmationDialogComponent],
})
export class SharedModule {}

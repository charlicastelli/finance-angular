import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Model } from 'src/app/model/model';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() finance: Model[] = [];
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['credit', 'description', 'category', 'actions'];

  constructor() {}

  ngOnInit(): void {
    // this.loadList();
    // localStorage.removeItem('drag-drop');
  }

  onEdit(finance: Model) {
    this.edit.emit(finance);
  }

  onDelete(finance: Model) {
    this.remove.emit(finance);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.finance, event.previousIndex, event.currentIndex);
    this.table.renderRows();

    // //salva o movimentação Drag and Drop no localStorage
    // let drag = JSON.stringify(this.finance);
    // localStorage.setItem('drag-drop', drag);
  }

  // // Recupera o estado da lista com os itens movimentados
  // loadList() {
  //   let dragDrop = localStorage.getItem('drag-drop');
  //   if (dragDrop) {
  //     this.finance = JSON.parse(dragDrop!);
  //   }
  // }
}

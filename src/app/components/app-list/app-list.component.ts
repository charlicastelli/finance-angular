import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Model } from 'src/app/model/model';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent implements OnInit {
  @Input() finance: Model[] = [];
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['credit', 'description', 'category', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  onEdit(finance: Model) {
    this.edit.emit(finance);
  }

  onDelete(finance: Model) {
    this.remove.emit(finance);
  }
}

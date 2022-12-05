import { Component, Input, OnInit } from '@angular/core';
import { Model } from 'src/app/model/model';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent implements OnInit {
  @Input() finance: Model[] = [];

  readonly displayedColumns = ['credit', 'description', 'category', 'actions'];

  constructor() {}

  ngOnInit(): void {}
}

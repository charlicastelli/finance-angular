import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-app-exits',
  templateUrl: './app-exits.component.html',
  styleUrls: ['./app-exits.component.scss']
})
export class AppExitsComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.location.back();
  }

}

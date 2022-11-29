import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-appetizer',
  templateUrl: './app-appetizer.component.html',
  styleUrls: ['./app-appetizer.component.scss']
})
export class AppAppetizerComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.location.back();
  }

  

}

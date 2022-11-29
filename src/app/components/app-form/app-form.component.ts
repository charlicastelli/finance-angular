import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Model } from 'src/app/model/model';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
})
export class AppFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    credit: [''],
    description: [''],
    category: [''],
  });

  constructor(
    //sempre que usar o NonNullableFormBuilder tenho que importar no module o ReactiveFormsModule
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const add: Model = this.route.snapshot.data['add'];
    // this.form.setValue({
    //   _id: add._id,
    //   credit: add.credit,
    //   description: add.description,
    //   category: add.category,
    // });
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {}
}

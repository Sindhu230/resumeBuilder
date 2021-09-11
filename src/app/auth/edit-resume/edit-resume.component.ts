import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { FormGroup, FormContol } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { forbiddenNameValidator } from '../resume-custom.validataor';
// import { RegisterService } from '../register.service';
import { CvServeService } from '../cv-serve.service';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css'],
})
export class EditResumeComponent implements OnInit {
  get name() {
    return this.editcv.get('name');
  }

  // editcv: FormGroup;
  constructor(private FB: FormBuilder, private _cvService: CvServeService) {}

  onSubmit() {
    console.log(this.editcv.value);
    this._cvService.register(this.editcv.value).subscribe(
      (response) => console.log('success!', response),
      (error) => console.log('error!', error)
    );
  }

  editcv = this.FB.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/password/),
      ],
    ],
    contact: [''],
    address: [''],
    fb: [''],
    github: [''],
    linkedIn: [''],
    Objective: [''],
    workExperience: [''],
    academicQualification: [''],
  });

  ngOnInit(): void {}

  onclickwe() {
    // console.log("new experinece added")
    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('weFeild');
    newNode.setAttribute('placeholder', 'Enter Here');
    newNode.setAttribute('rows', '3');

    let weOb = document.getElementById('we');
    let weAddButtonOb = document.getElementById('weAddButton');
    weOb.insertBefore(newNode, weAddButtonOb);
  }

  onclickaq() {
    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('aqFeild');
    newNode.setAttribute('placeholder', 'Enter Here');
    newNode.setAttribute('rows', '3');

    let aqOb = document.getElementById('aq');
    let aqAddButtonOb = document.getElementById('aqAddButton');
    aqOb.insertBefore(newNode, aqAddButtonOb);
  }

  generateCV() {
    // console.log("generating")
    let nameFeild = document.getElementById('nameFeild').nodeValue;

    let nameT1 = document.getElementById('nameT1');

    nameT1.innerHTML = nameFeild;
  }

  loadApiData() {
    this._cvService.getdata().subscribe(
      (cv) => {
        console.log(cv);
      },
      (err) => console.log(err)
    );
    
    // this.editcv.patchValue({

    //   name: "sindhu",
    //   contact :"9346171809",
    //   address: "12/592, kotastreet, proddatur",
    //   fb:"sindhufb",
    //   github:"sindhuGithub",
    //   linkedIn:"sindhuLinkedIn",
    //   Objective:"im so and so"

    // })
  }
}

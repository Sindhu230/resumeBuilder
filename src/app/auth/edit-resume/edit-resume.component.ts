
import { Router } from '@angular/router';
import {CvServeService} from '../cv-serve.service'
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css'],
})
export class EditResumeComponent implements OnInit {
  
  resumeForm = new FormGroup({
    
    fullname: new FormControl('',Validators.required),
    position: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    mobile: new FormControl('',[Validators.required]),
    address: new FormControl(''),
    skills: new FormControl(''),
    profile: new FormControl(''),
    linkedin: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    languages: new FormControl(''),
    objective: new FormControl(''),
    experience: new FormArray([new FormControl('')]),
    project: new FormArray([new FormControl('')]),
    certification: new FormArray([new FormControl('')]),
    education: new FormArray([new FormControl('')]),
  },{updateOn:"submit"});
  submitted = false;

  constructor(private _resumeService: CvServeService, private _router: Router) {}

  ngOnInit(): void {
    this._resumeService.getResumeData().subscribe(
      (res) => {
        const exp = JSON.parse(JSON.stringify(res)).experience;
        console.log(exp.length);
        for (let i = 0; i < exp.length - 1; i++) {
          this.onAddExperience();
        }

        const pro = JSON.parse(JSON.stringify(res)).project;
        for (let i = 0; i < pro.length - 1; i++) {
          this.onAddProject();
        }

        const cer = JSON.parse(JSON.stringify(res)).certification;
        for (let i = 0; i < cer.length - 1; i++) {
          this.onAddCertifiction();
        }

        const edu = JSON.parse(JSON.stringify(res)).education;
        for (let i = 0; i < edu.length - 1; i++) {
          this.onAddEducation();
        }

        this.resumeForm.patchValue({
          fullname: JSON.parse(JSON.stringify(res)).fullname,
          position: JSON.parse(JSON.stringify(res)).position,
          email: JSON.parse(JSON.stringify(res)).email,
          mobile: JSON.parse(JSON.stringify(res)).mobile,
          address: JSON.parse(JSON.stringify(res)).address,
          skills: JSON.parse(JSON.stringify(res)).skills,
          profile: JSON.parse(JSON.stringify(res)).profile,
          linkedin: JSON.parse(JSON.stringify(res)).linkedin,
          facebook: JSON.parse(JSON.stringify(res)).facebook,
          instagram: JSON.parse(JSON.stringify(res)).instagram,
          languages: JSON.parse(JSON.stringify(res)).languages,
          objective: JSON.parse(JSON.stringify(res)).objective,
          experience: JSON.parse(JSON.stringify(res)).experience,
          project: JSON.parse(JSON.stringify(res)).project,
          certification: JSON.parse(JSON.stringify(res)).certification,
          education: JSON.parse(JSON.stringify(res)).education,
        });
      },
      (err) => console.error(err)
    );
  }

  get experienceControls() {
    return (<FormArray>this.resumeForm.get('experience')).controls;
  }

  get projectControls() {
    return (<FormArray>this.resumeForm.get('project')).controls;
  }

  get certificationControls() {
    return (<FormArray>this.resumeForm.get('certification')).controls;
  }

  get educationControls() {
    return (<FormArray>this.resumeForm.get('education')).controls;
  }

  onAddExperience() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('experience')).push(control);
  }

  onAddProject() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('project')).push(control);
  }

  onAddCertifiction() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('certification')).push(control);
  }

  onAddEducation() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('education')).push(control);
  }

  onRemoveExperience() {
    (<FormArray>this.resumeForm.get('experience')).removeAt(
      this.experienceControls.length - 1
    );
  }

  onRemoveProject() {
    (<FormArray>this.resumeForm.get('project')).removeAt(
      this.projectControls.length - 1
    );
  }

  onRemoveCertification() {
    (<FormArray>this.resumeForm.get('certification')).removeAt(
      this.certificationControls.length - 1
    );
  }

  onRemoveEducation() {
    (<FormArray>this.resumeForm.get('education')).removeAt(
      this.educationControls.length - 1
    );
  }

  generateResume() {
    // console.log(this.resumeForm.value);
    this.submitted = true;
    this._resumeService.setResumeData(this.resumeForm.value).subscribe(
      (res) => {
        console.log(res);
        this._router.navigate(['/resume']);
      },
      (err) => console.error(err)
    );
  }

  

  //   loadApiData() {
  //   this._resumeService.getResumeData().subscribe(
  //     (resume) => {
  //       console.log(resume);
  //     },
  //     (err) => console.log(err)
  //   );
    
  //   // this.editcv.patchValue({

  //   //   name: "sindhu",
  //   //   contact :"9346171809",
  //   //   address: "12/592, kotastreet, proddatur",
  //   //   fb:"sindhufb",
  //   //   github:"sindhuGithub",
  //   //   linkedIn:"sindhuLinkedIn",
  //   //   Objective:"im so and so"

  //   // })
  // }
  get f() { return this.resumeForm.controls; }

}

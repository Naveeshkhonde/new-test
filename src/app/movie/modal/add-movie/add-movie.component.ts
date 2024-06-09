import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  @Input() type: string = '';
  @Input() details: any;
  title: string = 'Add Movie Details';
  buttonText: string = 'Save';
  addForm: any = FormGroup;
  submitted: boolean = false;
  spinner: boolean = false;
  constructor(
    public modal: NgbActiveModal,
    public api: ApiService,
    private fb: FormBuilder,
    private route: Router

    ) { 
      
    }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: ["", [Validators.required]],
      castMember: ["", [Validators.required]],
      date: ["", [Validators.required]],
      options: this.fb.group({
        published: [''],
        reviews: ['']
      })
    })

     /* On Update: here are patch the values */
    if (this.type == 'edit' && this.details) {
      this.title = 'Edit Movie Details';
      this.buttonText = 'Update';
      this.details.options.published = this.details.options.published == 'yes' ?true:false;
      this.addForm.patchValue(this.details);
    }
  }


  get addControl() {
    return this.addForm.controls;
  }

  /* Add and Edit
   Movies */
  onSubmit() {
    this.spinner = true;
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    let data = this.addForm.value;
    if( data?.options?.published == true){
      data.options.published = 'yes'
    }else{
      data.options.published = 'no'
    }

    data.like = false;
    data.comment = [];
   
    if (this.type == 'add') {   // for add
      this.api.addMovie(data).subscribe({
      next: (data: any) => {
        this.modal.close(true);
      },
      error: (error: any) => {
        console.error(error);
      }
    })} else {  // for edit
      this.api.editMovie(data, this.details.id).subscribe({
      next: (data: any) => {
        this.modal.close(true);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AddMovieComponent } from '../modal/add-movie/add-movie.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit{
  spinner:boolean = false;
  movieList:any= [];
  SelectionType = SelectionType;
  editing :any= {};
  selected :any= [];
  temp:any = [];
  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table:any= DatatableComponent;
  rows :any= [];
  data :any= [
  ]
  columns = [
    { prop: 'title', name: 'Title', filter: true },
    { prop: 'castMember', name: 'Cast Member' , filter: true},
    { prop: 'date', name: 'date' , filter: true},
    { prop: 'options.published', name: 'Published' , filter: true},
    { prop: 'options.reviews', name: 'Reviews' , filter: true},
    { prop: 'action', name: 'Action'},
  ];
  constructor(private modalService: NgbModal, private api: ApiService, private route: Router){
    const type =localStorage.getItem('role');
      if (type === 'user') {
        this.route.navigate(['/movie/movie'])
      }
  }

  ngOnInit(): void {
    this.getMovie();
  }

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();
    console.log(val)
    // filter our data
    const temp = this.temp.filter(function (d:any) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect(e:any) {
    console.log('Select Event', e, this.selected);
  }
  onActivate(event:any) {
    console.log('Activate Event', event);
  }
  updateValue(event:any, cell:any, rowIndex:any) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  likeThumbs(){
    let element:any = document.getElementById('like')
    element.style.color = 'red';
  }

  addEditUser(type:string,data?:any) {
		const modalRef = this.modalService.open(AddMovieComponent, {
			size: "md",
			windowClass: "modal-holder",
			centered: true,
			backdrop: "static",
			keyboard: false,
		});
    modalRef.componentInstance.type = type;
    if(type === 'edit'){
      modalRef.componentInstance.details = data;
    }

		modalRef.result.then((result) => {
			this.getMovie();
		});
	}

  getMovie(){
    this.spinner = true
    this.api.getMovie().subscribe({
        next: (data: any) => {
          this.movieList =data;
          // ------------
          this.data = this.movieList;
          this.temp = [...this.data];
          this.rows = this.data;
          // ------------
          if(this.movieList){
            this.spinner = false;
          }
        },
        error: (error: any) => {
          console.error(error);
          this.spinner = false;
        }
      })
  }

  removeMovie(id:string){
    this.spinner = true
    this.api.deleteMovie(id).subscribe({
      next: (data: any) => {
        this.getMovie();
        if(this.movieList){
          this.spinner = false;
        }
      },
      error: (error: any) => {
        console.error(error);
        this.spinner = false;
      }
  })
  }

}

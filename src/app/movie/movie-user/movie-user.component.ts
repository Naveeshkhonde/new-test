import { Component, OnInit, ViewChild } from '@angular/core';
import { AddMovieComponent } from '../modal/add-movie/add-movie.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-user',
  templateUrl: './movie-user.component.html',
  styleUrls: ['./movie-user.component.scss']
})
export class MovieUserComponent {
  spinner:boolean = false;
  movieList:any= [];
  // --------------------
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
    { prop: 'like', name: 'Like'},
    { prop: 'id', name: 'Id'},
    
  ];

  constructor(private modalService: NgbModal, private api: ApiService, private route: Router){
    const type =localStorage.getItem('role');
      if (type === 'admin') {
        this.route.navigate(['/movie'])
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
    // this.selected = e;
    // console.log('Select Event', e, this.selected);
  }
  onActivate(event:any) {
    // console.log('Activate Event', event);
  }
  updateValue(event:any, cell:any, rowIndex:any) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  likeThumbs(index: number){
    setTimeout(() => {
      let inputData = this.selected[0]
    // let element:any = document.getElementById('like')
    // element.style.color = 'red';

    console.log('index', index)
    inputData.like = !inputData.like;

    this.api.editMovie(inputData, inputData.id).subscribe({
      next: (response: any) => {
        this.selected = []
      },
      error: (error: any) => {
        console.error(error);
      }
    })
    }, 500)
    
  }

  getMovie(){
    this.spinner = true
    this.api.getMovie().subscribe((data: []) => {
      console.log(data)
      this.movieList =data;
      // ------------
      this.data = this.movieList;
      this.temp = [...this.data];
      this.rows = this.data;
      // ------------
      if(this.movieList){
        this.spinner = false;
      }
    },(err)=>{
      this.spinner = false;
      console.log(err)
    })
  }


  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

}

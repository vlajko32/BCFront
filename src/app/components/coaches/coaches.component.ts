import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectionService } from './../../services/selections/selection.service';
import { CoachService } from './../../services/coaches/coach.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Coach } from 'src/app/domain/coach';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {
  displayedColumns: string[] =  ['name', 'surname', 'yearsOfExperience','selection'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  coaches= null;
  coachesWithSelection = null;
  coachesWithoutSelection = null;
  isDesc = false;
  orderAge = false;
  isEditing = false;
  selectionsApi = null;
  editCoachForm: FormGroup;
  searchText: any;
  searchedCoaches: any;
  selectedCoach: Coach;
  updatedCoach: Coach;
  constructor(private coachService: CoachService, private selectionService: SelectionService) { }

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe(data => {
      this.searchedCoaches = this.coaches = data;
      this.coachesWithSelection = this.coaches.filter(function(coach) {
        return coach['selection']!=null;
      })
      this.coachesWithoutSelection= this.coaches.filter(function(coach) {
        return coach['selection']==null;
      })
      this.searchedCoaches = new MatTableDataSource(this.coaches);
      this.searchedCoaches.sort = this.sort;
      this.searchedCoaches.paginator = this.paginator;
    }, error => {
      console.log(error);
    });

    this.selectionService.getSelections().subscribe((data) =>{
      this.selectionsApi = data;
      console.log(this.selectionsApi);
    }, error => {
      console.log(error);
    });

    this.editCoachForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),     
      lastName: new FormControl(null,  [Validators.required, Validators.minLength(3)]),
      yearsOfExperience: new FormControl(null, [Validators.required, Validators.min(0)]),
      selectionID: new FormControl(null)
  })
  this.editCoachForm.disable();
  }

  sortString(info){
    this.isDesc = !this.isDesc;
  
    let direction = this.isDesc ? 1: -1;
  
    this.searchedCoaches.sort(function (a,b) {
  
      if (a[info] < b[info]) {
        return -1 * direction;
      }
      else if(a[info] > b[info]){
        return 1* direction;
      }
      else {
        return 0;
      }
    })
  }

  sortExp(){
    if(this.orderAge)
    {
     this.searchedCoaches.sort((a,b) => a.yearsOfExperience - b.yearsOfExperience);
    }
    else{
      this.searchedCoaches.sort((a,b) => b.yearsOfExperience - a.yearsOfExperience);
  
    }
    this.orderAge = !this.orderAge;
  }


  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchedCoaches.filter = filterValue.trim().toLowerCase();
  }
 onCoach(c)
 {
  this.editCoachForm.setValue({
    firstName: c.name,
    lastName: c.surname,
    yearsOfExperience: c.yearsOfExperience,
    selectionID: c.selectionID
  });
  this.editCoachForm.get('yearsOfExperience').enable();
  this.editCoachForm.get('selectionID').enable();
  this.selectedCoach = c;
  }

    onDelete(){
      this.coachService.deleteCoach(this.selectedCoach.userID).subscribe(data=> {
        this.resetForm();
        this.updateList();
      })
      
    }

    onUpdate(){
     this.updatedCoach = {
       name: this.editCoachForm.get('firstName').value,
       surname: this.editCoachForm.get('lastName').value,
       yearsOfExperience: this.editCoachForm.get('yearsOfExperience').value,
       selectionID: this.editCoachForm.get('selectionID').value
     }
     if(this.updatedCoach.selectionID == null)
     {
       this.updatedCoach.selectionID = 0;
     }
     this.coachService.updateCoach(this.selectedCoach.userID, this.updatedCoach).subscribe(data=>
      {
        this.resetForm();
        this.updateList();
      });
    }

    resetForm()
    {
      this.editCoachForm = new FormGroup({
        firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),     
        lastName: new FormControl(null,  [Validators.required, Validators.minLength(3)]),
        yearsOfExperience: new FormControl(null, Validators.required),
        selectionID: new FormControl(null)
    })
    }

    updateList()
    {
      this.coachService.getCoaches().subscribe(data=>
        {
          this.coaches = this.searchedCoaches = data;
          this.searchedCoaches = new MatTableDataSource(this.coaches);
         this.searchedCoaches.sort = this.sort;
         this.searchedCoaches.paginator = this.paginator;
        })
    }
}

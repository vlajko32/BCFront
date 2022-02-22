import { Router } from '@angular/router';
import { SnackBarService } from './../../../services/snack-bar.service';
import { SelectionService } from './../../../services/selections/selection.service';
import { TrainingService } from './../../../services/trainings/training.service';
import { CoachService } from './../../../services/coaches/coach.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GymService } from './../../../services/gyms/gym.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  minDate: Date;
  gyms: any;
  selectedGym = null;
  selectGym: FormControl;
  selectedDate = null;
  trainingStart: any;
  trainingEnd: any;
  displayedColumns: string[] =  ['date','trainingStart', 'trainingEnd', 'coachID', 'selectionID'];

  dateInput: FormControl;
  trainings: any;
  displayedTrainings = null;
  coachID: any;
  selectionID: any;
  coach: any;
  selection: any;
  selectionName: any;
  trainingDuration: any;

  constructor(private gymService: GymService, private coachService: CoachService, private trainingService: TrainingService,
     private selectionService: SelectionService, private snackBar: SnackBarService, private route: Router) { }

  ngOnInit(): void {
    this.gymService.getGyms().subscribe(data => {
      this.gyms = data;
      console.log(this.gyms);

    })
    this.coachID = localStorage.getItem('userID');
    
    this.coachService.getCoachByID(this.coachID).subscribe(data => {
      this.coach = data;
      this.selectionID = this.coach['selectionID'];
      if(this.selectionID != null)
      {
        this.selectionService.getSelectionByID(this.selectionID).subscribe(data => {
        
          this.selection = data;
          this.selectionName = this.selection['selectionName'];
        })
      }
      else
      {
        this.route.navigateByUrl('/user-home');
      }
      
    });
    this.minDate = new Date();
    this.dateInput = new FormControl(null,Validators.required);

    this.selectGym = new FormControl('', Validators.required);
    this.dateInput.disable();
    this.selectGym.valueChanges.subscribe(selectedValue => {
      
      this.trainingService.getTrainingsByGym(selectedValue.gymID).subscribe(
        data =>
        {
          
          this.trainings = data;
          this.dateInput.setValue(new Date());
        }
      )
      this.dateInput.enable();
    })

  

    this.dateInput.valueChanges.subscribe(selectedValue => {
      
         
      setTimeout(() => {  this.displayedTrainings = this.trainings.filter((data,index) => {

        let dateToCheck = new Date(data['trainingStart']);
        if(selectedValue!= null && selectedValue.getDate() == dateToCheck.getDate())
        {
          return data;

        }
      })  }, 3000);

     
     
    })

   

   

  }

  onClick()
  {
    console.log(this.selectGym.value)
  }

  onChangeDate(){}

  createDateTime(dateStr: string, date: Date): Date
  {
    var timeArr = dateStr.split(':');
    
    return new Date(date.getFullYear(),date.getMonth(),date.getDate() , parseInt(timeArr[0]), parseInt(timeArr[1]));    
  }

  onAdd()
  {
    let training = {
      trainingStart: this.createDateTime(this.trainingStart, this.dateInput.value),
      trainingEnd: this.createDateTime(this.trainingEnd, this.dateInput.value),
      coachID: localStorage.getItem('userID'),
      selectionID: this.selectionID,
      gymID: this.selectGym.value['gymID']
    };
    if(this.checkTrainingDuration())
    {
      
      if(this.checkIfAvailable(training))
      {
        console.log("Available");
        if(this.selectionAvailable(training))
        {
          this.trainingService.addTraining(training).subscribe(data => 
            {
              this.snackBar.openSnackBar("Training scheduled!");
              location.reload();
            });
        }
        else{
          this.snackBar.openSnackBar("Your selection already has training scheduled on that day!");
        }
      }
      else {
        this.snackBar.openSnackBar("Selected hours are already user!");
      }
    }
    else{
      this.snackBar.openSnackBar("Training should not be longer than 2 hours");
    }
   
  }

  selectionAvailable(training: any): boolean
  {
    for (let element in this.selection['trainings']) {
      let date = new Date(this.selection['trainings'][element]['trainingStart']);
      let date2 = new Date(training['trainingStart']);
  

      if (date != null && date2 != null && date.getDate() == date2.getDate() && date.getMonth() == date2.getMonth() && date.getFullYear() == date2.getFullYear())
      {
        console.log("Ovde ne moze");
        console.log(date.getDate);
        console.log(date2.getDate);
        return false;

      }
     
    }
    return true;
    
  }

  trainingsMatch(training2: any, training1: any): boolean
  {
   
    let start1 = new Date(training1['trainingStart']);
    let start2 = new Date(training2['trainingStart']);
    let end1 = new Date(training1['trainingEnd']);
    let end2 = new Date(training2['trainingEnd']);
    if(+end1 === +start2)
    {
      return true;
    }
    if(+end2 === +start1)
    {
      return true;
    }

    if(end1 < start2)
    {
      return false;
    }
    else {
    }
    if(start1>end2)
    {
      return false;

    }
    else {
    }

    return true;
    
   
 
    
 
  }

  checkIfAvailable(training: any): boolean
  {
    for (let element in this.displayedTrainings) {
      if (this.trainingsMatch(this.displayedTrainings[element],training)) {
      
        return false;
        
      }
    }
    return true;
  }

  checkTrainingDuration(): boolean
  {
    var startTime = this.trainingStart.split(':');
    var endTime = this.trainingEnd.split(':');
    console.log(endTime[0]);
    console.log(endTime[1]);
    console.log(startTime[0]);
    console.log(startTime[1]);
    if(endTime[0] - startTime[0] > 2)
    {
      return false;
    }
    if(endTime[0] - startTime[0] ==2)
    {
      if(endTime[1] > startTime[1])
      {
        return false;
      }
    }

    this.trainingDuration = [endTime[0] - startTime[0], endTime[0] - startTime[0] ]
    console.log(this.trainingDuration[0] + 'h ' + this.trainingDuration[1] + 'min');
    return true;
  }



 
  
  
}

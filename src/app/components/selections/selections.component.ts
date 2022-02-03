import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectionService } from './../../services/selections/selection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {

  selectionAges = null;
  selectionAgesSelected = null;
  selectedSelection: Selection;
  selectionsApi = null;
  selectedPlayers = null;
  selectedAges = null;
  selectedSelections: any;
  creating = false;
  createForm: FormGroup;
  constructor( private selectionService: SelectionService) { }

  ngOnInit(): void {
    
    this.selectionService.getSelections().subscribe((data) =>{
      console.log(data);
      this.selectedSelections = this.selectionsApi = data;
    }, error => {
      console.log(error);
    });

    this.selectionService.getSelectionAges().subscribe((data) =>{
      console.log(data);
      this.selectionAges = data;
    }, error => {
      console.log(error);
    });

    this.createForm = new FormGroup({
      selectionName: new FormControl(null, Validators.required),
      selectionAge: new FormControl(null, Validators.required),
      
    });
  }

sortString(info){}

sortAge(){}

onSelection(){
  console.log(this.selectedSelection['players']);
  this.selectedPlayers = this.selectedSelection['players'];
}

activate(sa)
{
  if(this.selectionAgesSelected != sa){
    this.selectionAgesSelected = sa;
    this.creating = false;
    this.selectedSelections = this.selectionsApi.filter((value) =>
    {
      
      if(value.selectionAge['selectionAgeID'] == sa['selectionAgeID'])
        {
       
        return value;
        }
    })
    
  }
  else {
    this.selectionAgesSelected = null;
    this.selectedSelections = this.selectionsApi;
  }
}

createNew(){
  this.creating = !this.creating;
  this.selectionAgesSelected = null;
}

}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectionService } from './../../services/selections/selection.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

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
  constructor( private selectionService: SelectionService,  public dialog: MatDialog) { }

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
      selectionAgeID: new FormControl(null, Validators.required),
      
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

onCreate()
{
  let newSelection = {
    SelectionName: this.createForm.get('selectionName').value,
    SelectionAgeID: this.createForm.get('selectionAgeID').value
  }
  this.selectionService.createSelection(newSelection).subscribe(data=>
    {
      location.reload();
    },
    error => {
      console.log(error);
    })
}

onDelete(selection: any)
{
  this.openDialog(selection)
  // this.selectionService.deleteSelection(selection.selectionID).subscribe(data=>
  //   {
  //     console.log(data);
  //     location.reload();
  //   },
  //   error => {
  //     console.log(error);
  //   })
}

deleteSelection(selection: any)
{
   this.selectionService.deleteSelection(selection.selectionID).subscribe(data=>
    {
      console.log(data);
      location.reload();
    },
    error => {
      console.log(error);
    })

}


openDialog(selection: any)
{
  this.dialog.open(DeleteDialogComponent, 
    {
    
    width: '450px',
    data: selection
  }).afterClosed().subscribe(data=>{
    if(data=="Delete")
    this.deleteSelection(selection);
  })
}
}

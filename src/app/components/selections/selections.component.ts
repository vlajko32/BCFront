import { SelectionService } from './../../services/selections/selection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {

  selectionAges = null;
  selectedSelection: Selection;
  selectionsApi = null;
  selectedPlayers = null;
  constructor( private selectionService: SelectionService) { }

  ngOnInit(): void {
    
    this.selectionService.getSelections().subscribe((data) =>{
      console.log(data);
      this.selectionsApi = data;
    }, error => {
      console.log(error);
    });

    this.selectionService.getSelectionAges().subscribe((data) =>{
      console.log(data);
      this.selectionAges = data;
    }, error => {
      console.log(error);
    });
  }

sortString(info){}

sortAge(){}

onSelection(){
  console.log(this.selectedSelection['players']);
  this.selectedPlayers = this.selectedSelection['players'];
}

}

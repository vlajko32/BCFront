import { SelectionService } from './../../../services/selections/selection.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-selection',
  templateUrl: './view-selection.component.html',
  styleUrls: ['./view-selection.component.css']
})
export class ViewSelectionComponent implements OnInit {
  selectionID: number;
  selection = null;
  players = null;
  coaches = null;
  selectionName: string;
  constructor(private route: ActivatedRoute, private selectionService: SelectionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectionID = +params.get('selectionID');
      this.selectionService.getSelectionByID(this.selectionID).subscribe(data =>
        {
          this.selection = data;
          this.players = this.selection['players'];
          this.coaches = this.selection['coaches'];
          this.selectionName = this.selection['selectionName']
        })
    });
   
    
  }

}

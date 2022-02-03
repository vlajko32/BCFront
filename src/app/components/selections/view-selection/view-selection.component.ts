import { FormGroup, FormControl } from '@angular/forms';
import { CoachService } from './../../../services/coaches/coach.service';
import { Player } from './../../../domain/player';
import { PlayerService } from './../../../services/players/player.service';
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
  addingPlayer = false;
  addingCoach = false;
  playersWithoutSelection = null;
  coachesWithoutSelection = null;
  addedPlayers: Player[] = null;
  removedPlayers: Player[] = null;
  isDisabled = true;
  isDisabledAge = true;
  selectionAge: any;
  selectionAges = null;
  selectionAgeName: any;
  selectionAgeID = null;
  selectionForm: FormGroup;
  constructor(private route: ActivatedRoute, private selectionService: SelectionService, 
    private playerService: PlayerService, private coachService: CoachService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectionID = +params.get('selectionID');
      this.selectionService.getSelectionByID(this.selectionID).subscribe(data =>
        {
          this.selection = data;
          this.players = this.selection['players'];
          this.coaches = this.selection['coaches'];
          this.selectionName = this.selection['selectionName'];
          this.selectionAge = this.selection['selectionAge'];
          this.selectionAgeName = this.selectionAge['selectionAgeName'];
          console.log(this.selectionName)
          this.selectionForm.setValue({
            selectionName: this.selectionName,
            selectionAge: this.selectionAge['selectionAgeID']
          });
        })
        
    });
    this.playerService.getPlayersWithoutSelection().subscribe(data => {
      this.playersWithoutSelection = data;
    });

    this.coachService.getCoachesWithoutSelection().subscribe(data =>
      {
        this.coachesWithoutSelection = data;
      });

    this.selectionService.getSelectionAges().subscribe((data) =>{
      console.log(data);
      this.selectionAges = data;
    }, error => {
      console.log(error);
    });
    
    this.selectionForm = new FormGroup({
      selectionName: new FormControl({value: '', disabled: true}),
      
      selectionAge: new FormControl({value: '', disabled: true})
    });

  
  }

  onDiscard()
  {
    location.reload();
  }

  onConfirm()
  {
    let updated = {
      selectionName: this.selectionForm.get('selectionName').value,
      selectionAgeID: this.selectionForm.get('selectionAge').value,
      addedPlayers: this.addedPlayers,
      removedPlayers: this.removedPlayers

    };
    this.selectionService.updateSelection(this.selectionID, updated).subscribe(data => {
      console.log(data);
    })
  }

  onAdd(p: Player)
  {
    if(this.removedPlayers==null)
    {
      this.players.push(p);
      if(this.addedPlayers==null)
      this.addedPlayers = [p];
      console.log(this.addedPlayers);
    }
    else{
    let index2 = null;;
    this.players.push(p);
    
    let index = this.playersWithoutSelection.indexOf(p);
    if(this.removedPlayers != null){
      index2 = this.removedPlayers.indexOf(p);

    }
    this.playersWithoutSelection.splice(index,1);
    if(!(this.addedPlayers.indexOf(p) > -1))
    {
      this.addedPlayers.push(p);
    }
    if(index2 > -1)
    {
      this.removedPlayers.splice(index2,1);
    }
  }
  }

  onChangeName()
  {
    if(this.selectionForm.disabled)
    this.selectionForm.enable();
    else
    this.selectionForm.disable();

    this.isDisabled = !this.isDisabled;
  }
  onChangeAge()
  {
    this.isDisabledAge = !this.isDisabledAge;
  }
  onRemove(p: Player)
  {
    if(this.removedPlayers == null){
      this.removedPlayers = [p];
      let index = this.players.indexOf(p);
      this.players.splice(index,1);
      this.playersWithoutSelection.push(p);

    }
    else{
    let index = this.players.indexOf(p);
    let index2 = this.addedPlayers.indexOf(p);
    this.players.splice(index,1);
    this.playersWithoutSelection.push(p);
    if(!(this.removedPlayers.indexOf(p) > -1))
    {
      this.removedPlayers.push(p);
    }
    if(index2 > -1)
    {
      this.addedPlayers.splice(index2,1);
    }
  }
  console.log(this.removedPlayers);
  console.log(this.addedPlayers);
  }

  onAddPlayer(){
    this.addingPlayer = !this.addingPlayer;
    
    
  }

  onAddCoach(){
    this.addingCoach = !this.addingCoach;
  }

}

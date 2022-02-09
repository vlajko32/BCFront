import { Router } from '@angular/router';
import { SnackBarService } from './../../../services/snack-bar.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { SelectionService } from './../../../services/selections/selection.service';
import { PlayerService } from './../../../services/players/player.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CoachService } from 'src/app/services/coaches/coach.service';
import { MatTable } from '@angular/material/table';
import { Player } from 'src/app/domain/player';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-my-selection',
  templateUrl: './my-selection.component.html',
  styleUrls: ['./my-selection.component.css']
})
export class MySelectionComponent implements OnInit {
  displayedColumns: string[] =  ['name', 'surname', 'birth-date', 'height', 'weight'];
  players: any;

  @ViewChild(MatTable) table: MatTable<Player>;

  user: any;
  userID: any;
  selection: any;
  coaches: any;
  selectionName: any;
  selectionAge: any;
  selectionAgeName: any;
  numberOfCoaches: any;
  numberOfPlayers: any;
  playersWithoutSelection: any;
  modifiedPlayers: any;
  modifiedPlayersWithoutSelection: any;
  constructor(private coachService: CoachService, private playerService: PlayerService, private selectionService: SelectionService,
    public dialog: MatDialog, private snackService: SnackBarService, private route: Router) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID');
    this.coachService.getCoachByID(this.userID).subscribe(data =>
      {
        
        this.user = data;
        console.log(this.user);
        this.selection = this.user['selection'];
        if(this.selection!=null)
        {
        this.selectionName = this.selection['selectionName']
        this.selectionAge = this.selection['selectionAge']
          
        this.selectionAgeName = this.selectionAge['selectionAgeName']
        this.modifiedPlayers = this.players = this.selection['players'];
        this.coaches = this.selection['coaches'];
        this.numberOfCoaches = this.coaches.length;
        this.numberOfPlayers = this.players.length;
        console.log(this.selection);

        }
        else{
          this.route.navigateByUrl('/user-home');
        }

      })

      this.playerService.getPlayersWithoutSelection().subscribe(data =>
        {
          this.modifiedPlayersWithoutSelection = this.playersWithoutSelection = data;
        })

  }

  onConfirm()
  {
    let playersAdded = [];
    let playersRemoved = [];

    this.modifiedPlayers.forEach(element => {
      if(this.players.indexOf(element)>-1)
      {
        playersAdded.push(element);
      }
    });
    this.modifiedPlayersWithoutSelection.forEach(element => {
      if(this.playersWithoutSelection.indexOf(element)>-1)
      {
        playersRemoved.push(element);
      }
    });

    



    let updated = {
      selectionName: this.selectionName,
      selectionAgeID: this.selectionAge['selectionAgeID'],
      addedPlayers: playersAdded,
      removedPlayers: playersRemoved

    };
    this.selectionService.updateSelection(this.selection['selectionID'], updated).subscribe(data => {
      this.snackService.openSnackBar("Selection updated!");
      location.reload();
    })
  }

  onAdd(p: any)
  {
    this.modifiedPlayers.push(p);
    let index = this.modifiedPlayersWithoutSelection.indexOf(p);
    this.modifiedPlayersWithoutSelection.splice(index,1);
    this.snackService.openSnackBar("Player added!");
    this.table.renderRows();
  }

  onRemove(p: any)
  {
    this.modifiedPlayersWithoutSelection.push(p);
    let index = this.modifiedPlayers.indexOf(p);
    this.modifiedPlayers.splice(index,1);
    this.snackService.openSnackBar("Player removed!");
    this.table.renderRows();
  }

  openDialog(p: any)
  {
    this.dialog.open(EditDialogComponent, 
      {
      
      width: '450px',

      data: p
    }).afterClosed().subscribe(data=>{
      if(data=="Updated")
      this.snackService.openSnackBar("Player updated!");
      
    })
  }
}

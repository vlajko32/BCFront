import { Player } from './player';
import { Coach } from './coach';
import { Training } from './training';

export interface Selection{
    selectionID?: number;
    selectionAge: number;
    selectionName: string;
    coaches: Coach[];
    players: Player[];
    trainings: Training[];
}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayerListComponent} from "./player-list/player-list.component";
import {CreatePlayerComponent} from "./create-player/create-player.component";
import {UpdatePlayerComponent} from "./update-player/update-player.component";
import {PlayerDetailsComponent} from "./player-details/player-details.component";
import {TeamListComponent} from "./team-list/team-list.component";
import {TeamDetailsComponent} from "./team-details/team-details.component";
import {UpdateTeamComponent} from "./update-team/update-team.component";
import {PlayerListByTeamIdComponent} from "./player-list-by-team-id/player-list-by-team-id.component";
import {CreateTeamComponent} from "./create-team/create-team.component";
import {TransferListComponent} from "./transfer-list/transfer-list.component";
import {TransferDetailsComponent} from "./transfer-details/transfer-details.component";
import {CreateTransferComponent} from "./create-transfer/create-transfer.component";

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: 'players', component: PlayerListComponent },
  { path: 'create-player', component: CreatePlayerComponent },
  { path: 'create-team', component: CreateTeamComponent },
  { path: 'update-player/:id', component: UpdatePlayerComponent },
  { path: 'player-details/:id', component: PlayerDetailsComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'team-details/:id', component: TeamDetailsComponent },
  { path: 'update-team/:id', component: UpdateTeamComponent },
  { path: 'teams/:id/players', component: PlayerListByTeamIdComponent },
  {path: 'transfers', component: TransferListComponent},
  {path: 'transfer-details/:id', component: TransferDetailsComponent},
  {path: 'create-transfer', component: CreateTransferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

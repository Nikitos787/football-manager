import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayerListComponent} from "./components/player-list/player-list.component";
import {CreatePlayerComponent} from "./components/create-player/create-player.component";
import {TeamListComponent} from "./components/team-list/team-list.component";
import {CreateTeamComponent} from "./components/create-team/create-team.component";
import {TransferDetailsComponent} from "./components/transfer-details/transfer-details.component";
import {UpdatePlayerComponent} from "./components/update-player/update-player.component";
import {PlayerDetailsComponent} from "./components/player-details/player-details.component";
import {TeamDetailsComponent} from "./components/team-details/team-details.component";
import {UpdateTeamComponent} from "./components/update-team/update-team.component";
import {
  PlayerListByTeamIdComponent
} from "./components/player-list-by-team-id/player-list-by-team-id.component";
import {TransferListComponent} from "./components/transfer-list/transfer-list.component";
import {CreateTransferComponent} from "./components/create-transfer/create-transfer.component";

const routes: Routes = [
  {path: '', redirectTo: '/players', pathMatch: 'full'},
  {path: 'players', component: PlayerListComponent},
  {path: 'create-player', component: CreatePlayerComponent},
  {path: 'create-team', component: CreateTeamComponent},
  {path: 'update-player/:id', component: UpdatePlayerComponent},
  {path: 'player-details/:id', component: PlayerDetailsComponent},
  {path: 'teams', component: TeamListComponent},
  {path: 'team-details/:id', component: TeamDetailsComponent},
  {path: 'update-team/:id', component: UpdateTeamComponent},
  {path: 'teams/:id/players', component: PlayerListByTeamIdComponent},
  {path: 'transfers', component: TransferListComponent},
  {path: 'transfer-details/:id', component: TransferDetailsComponent},
  {path: 'create-transfer', component: CreateTransferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

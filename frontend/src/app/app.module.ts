import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerListComponent } from './player-list/player-list.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { CreatePlayerComponent } from './create-player/create-player.component';
import {FormsModule} from "@angular/forms";
import { UpdatePlayerComponent } from './update-player/update-player.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { PlayerListByTeamIdComponent } from './player-list-by-team-id/player-list-by-team-id.component';
import { CreateTransferComponent } from './create-transfer/create-transfer.component';
import { TransferDetailsComponent } from './transfer-details/transfer-details.component';
import { TransferListComponent } from './transfer-list/transfer-list.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    CreatePlayerComponent,
    UpdatePlayerComponent,
    PlayerDetailsComponent,
    TeamListComponent,
    TeamDetailsComponent,
    UpdateTeamComponent,
    CreateTeamComponent,
    PlayerListByTeamIdComponent,
    CreateTransferComponent,
    TransferDetailsComponent,
    TransferListComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PlayerListComponent} from './components/player-list/player-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {CreatePlayerComponent} from './components/create-player/create-player.component';
import {FormsModule} from "@angular/forms";
import {UpdatePlayerComponent} from './components/update-player/update-player.component';
import {PlayerDetailsComponent} from './components/player-details/player-details.component';
import {TeamListComponent} from './components/team-list/team-list.component';
import {TeamDetailsComponent} from './components/team-details/team-details.component';
import {UpdateTeamComponent} from './components/update-team/update-team.component';
import {CreateTeamComponent} from './components/create-team/create-team.component';
import {
  PlayerListByTeamIdComponent
} from './components/player-list-by-team-id/player-list-by-team-id.component';
import {CreateTransferComponent} from './components/create-transfer/create-transfer.component';
import {TransferDetailsComponent} from './components/transfer-details/transfer-details.component';
import {TransferListComponent} from './components/transfer-list/transfer-list.component';
import {MessagesComponent} from './components/messages/messages.component';

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
export class AppModule {
}

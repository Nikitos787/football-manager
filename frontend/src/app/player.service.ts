import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Player} from "./models/player";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = "/api/players"

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getPlayerList(page: number, size: number): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`${this.baseUrl}?page=${page}&size=${size}`).pipe(
      tap(_ => this.log('fetched players')),
      catchError(this.handleError<Player[]>('getPlayers', []))
    );
  }

  createPlayer(player: Player): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, player, this.httpOptions).pipe(
      tap((player: Player) => this.log(`added player w/ id=${player.id}`)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  search(name: string): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`${this.baseUrl}/search?name=${name}`)
  }

  getPlayerById(id: number): Observable<Player> {
    return this.httpClient.get<Player>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched player id=${id}`)),
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  updatePlayer(id: number, player: Player): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, player, this.httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  deletePlayerById(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<Object>('deletePlayer'))
    );
  }

  firePlayerById(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}/fire`, this.httpOptions).pipe(
      tap(_ => this.log(`fire Player by id=${id}`)),
      catchError(this.handleError<Object>('firePlayer'))
    );
  }

  hirePlayerToTeam(playerId: number, teamId: number): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${playerId}/teams/${teamId}`, {},
      this.httpOptions).pipe(
      tap(_ => this.log(`hire player with id:=${playerId} to
        Team with id:=${teamId}`)),
      catchError(this.handleError<Object>('hirePlayer')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PlayerService: ${message}`);
  }
}

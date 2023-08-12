import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {catchError} from 'rxjs/operators';
import {MessageService} from "./message.service";
import {PlayerRequest, PlayerResponse} from "../models/player";

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

  createPlayer(player: PlayerRequest): Observable<PlayerResponse> {
    return this.httpClient.post<PlayerResponse>(`${this.baseUrl}`, player, this.httpOptions)
      .pipe(
        tap((newPlayer: PlayerResponse) => this.log(`added player w/ id=${newPlayer.id}`)),
        catchError(this.handleError<PlayerResponse>('addPlayer'))
      );
  }

  getPlayerList(page: number, size: number): Observable<PlayerResponse[]> {
    return this.httpClient.get<PlayerResponse[]>(`${this.baseUrl}?page=${page}&size=${size}`).pipe(
      tap(_ => this.log('fetched players')),
      catchError(this.handleError<PlayerResponse[]>('getPlayers', []))
    );
  }

  search(name: string): Observable<PlayerResponse[]> {
    return this.httpClient.get<PlayerResponse[]>(`${this.baseUrl}/search?name=${name}`)
  }

  getPlayerById(id: number): Observable<PlayerResponse> {
    return this.httpClient.get<PlayerResponse>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched player id=${id}`)),
      catchError(this.handleError<PlayerResponse>(`getPlayer id=${id}`))
    );
  }

  updatePlayer(id: number, player: PlayerRequest): Observable<PlayerResponse> {
    return this.httpClient.put<PlayerResponse>(`${this.baseUrl}/${id}`, player, this.httpOptions).pipe(
      tap(_ => this.log(`updated player id=${id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  deletePlayerById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<void>('deletePlayer'))
    );
  }

  firePlayerById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}/fire`, this.httpOptions).pipe(
      tap(_ => this.log(`fire Player by id=${id}`)),
      catchError(this.handleError<void>('firePlayer'))
    );
  }

  hirePlayerToTeam(playerId: number, teamId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${playerId}/teams/${teamId}`, {},
      this.httpOptions).pipe(
      tap(_ => this.log(`hire player with id:=${playerId} to
        Team with id:=${teamId}`)),
      catchError(this.handleError<void>('hirePlayer')));
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
      const errorMessage = JSON.stringify(error.error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${errorMessage}`);

      // You can also include status and any other relevant error information
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PlayerService: ${message}`);
  }
}

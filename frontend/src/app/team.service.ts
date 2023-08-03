import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {Player} from "./player";
import {Team} from "./team";
import {MessageService} from "./message.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = "/api/teams"

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTeamList(): Observable<Team[]>{
    return this.httpClient.get<Team[]>(`${this.baseUrl}`).pipe(
      tap(_ => this.log('fetched teams')),
      catchError(this.handleError<Team[]>('getTeams', []))
    );
  }

  getPlayerListByTeamId(id: number): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`${this.baseUrl}/${id}/players`).pipe(
      tap(_ => this.log(`fetched player list by team id: ${id}`)),
      catchError(this.handleError<Player[]>('getPlayerListBYTeam', []))
    );
  }

  createTeam(team: Team): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, team, this.httpOptions).pipe(
      tap((team: Team) => this.log(`added team w/ id=${team.id}`)),
      catchError(this.handleError<Team>('addTeam'))
    );
  }

  getTeamById(id: number): Observable<Team> {
    return this.httpClient.get<Team>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched team id=${id}`)),
      catchError(this.handleError<Team>(`getTeamId=${id}`))
    );
  }

  updateTeam(id: number, team: Team): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, team, this.httpOptions).pipe(
      tap(_ => this.log(`updated team id=${team.id}`)),
      catchError(this.handleError<any>('updateTeam'))
    );
  }

  deleteTeamById(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted team id=${id}`)),
      catchError(this.handleError<Object>('deleteTeam'))
    );
  }

  fireAllPlayersByTeamId(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}/fire`,this.httpOptions).pipe(
      tap(_ => this.log(`fire Players by team id=${id}`)),
      catchError(this.handleError<Object>('firePlayersByTeam'))
    );
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


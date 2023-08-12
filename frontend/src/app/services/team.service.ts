import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";
import {catchError} from "rxjs/operators";
import {TeamRequest, TeamResponse} from "../models/team";
import {PlayerResponse} from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = "/api/teams"

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getTeamList(page: number, size: number): Observable<TeamResponse[]> {
    return this.httpClient.get<TeamResponse[]>(`${this.baseUrl}?page=${page}&size=${size}`)
      .pipe(
        tap(_ => this.log('fetched teams')),
        catchError(this.handleError<TeamResponse[]>('getTeams', []))
      );
  }

  search(name: String): Observable<TeamResponse[]> {
    return this.httpClient.get<TeamResponse[]>(`${this.baseUrl}/search?name=${name}`).pipe(
      tap(_ => this.log('fetched teams by name')),
      catchError(this.handleError<TeamResponse[]>('getTeamByNae', []))
    );
  }

  getPlayerListByTeamId(id: number): Observable<PlayerResponse[]> {
    return this.httpClient.get<PlayerResponse[]>(`${this.baseUrl}/${id}/players`).pipe(
      tap(_ => this.log(`fetched player list by team id: ${id}`)),
      catchError(this.handleError<PlayerResponse[]>('getPlayerListBYTeam', []))
    );
  }

  createTeam(team: TeamRequest): Observable<TeamResponse> {
    return this.httpClient.post<TeamResponse>(`${this.baseUrl}`, team, this.httpOptions).pipe(
      tap((team: TeamResponse) => this.log(`added team w/ id=${team.id}`)),
      catchError(this.handleError<TeamResponse>('addTeam'))
    );
  }

  getTeamById(id: number): Observable<TeamResponse> {
    return this.httpClient.get<TeamResponse>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched team id=${id}`)),
      catchError(this.handleError<TeamResponse>(`getTeamId=${id}`))
    );
  }

  updateTeam(id: number, team: TeamRequest): Observable<TeamResponse> {
    return this.httpClient.put<TeamResponse>(`${this.baseUrl}/${id}`, team, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated team id=${id}`)),
        catchError(this.handleError<TeamResponse>('updateTeam'))
      );
  }

  deleteTeamById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`deleted team id=${id}`)),
      catchError(this.handleError<void>('deleteTeam'))
    );
  }

  fireAllPlayersByTeamId(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}/fire`, this.httpOptions).pipe(
      tap(_ => this.log(`fire Players by team id=${id}`)),
      catchError(this.handleError<void>('firePlayersByTeam'))
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

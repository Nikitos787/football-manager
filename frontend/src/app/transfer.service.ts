import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {Transfer} from "./transfer";
import {MessageService} from "./message.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private baseUrl = "/api/transfers"

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTransferList(): Observable<Transfer[]> {
    return this.httpClient.get<Transfer[]>(`${this.baseUrl}`).pipe(
      tap(_ => this.log('fetched transfer')),
      catchError(this.handleError<Transfer[]>('getTransfers', []))
    );
  }

  createTransfer(transfer: Transfer): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, transfer, this.httpOptions).pipe(
      tap((transfer: Transfer) => this.log(`added transfer w/ id=${transfer.id}`)),
      catchError(this.handleError<Transfer>('addTransfer'))
    );
  }

  getTransferById(id: number): Observable<Transfer> {
    return this.httpClient.get<Transfer>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched transfer id=${id}`)),
      catchError(this.handleError<Transfer>(`getTransferId=${id}`))
    );
  }

  calculatePrice(playerId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/calculate`, {
      params: {
        playerId: playerId.toString()
      }
    });
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

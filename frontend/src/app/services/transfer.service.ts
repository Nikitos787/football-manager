import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";
import {catchError} from "rxjs/operators";
import {TransferRequest, TransferResponse} from "../models/transfer";

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private baseUrl = "/api/transfers"

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getTransferList(page: number, size: number): Observable<TransferResponse[]> {
    return this.httpClient.get<TransferResponse[]>(`${this.baseUrl}?page=${page}&size=${size}`)
      .pipe(
        tap(_ => this.log('fetched transfer')),
        catchError(this.handleError<TransferResponse[]>('getTransfers', []))
      );
  }

  createTransfer(transfer: TransferRequest): Observable<Object> {
    return this.httpClient.post<TransferResponse>(`${this.baseUrl}`, transfer, this.httpOptions)
      .pipe(
        tap((transfer: TransferResponse) => this.log(`added transfer w/ id=${transfer.id}`)),
        catchError(this.handleError<TransferResponse>('addTransfer'))
      );
  }

  getTransferById(id: number): Observable<TransferResponse> {
    return this.httpClient.get<TransferResponse>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched transfer id=${id}`)),
      catchError(this.handleError<TransferResponse>(`getTransferId=${id}`))
    );
  }

  calculatePrice(playerId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/calculate`, {
      params: {
        playerId: playerId.toString()
      }
    }).pipe(
      tap(_ => this.log(`calculate price of player with id=${playerId}`)),
      catchError(this.handleError<number>(`calculatePlayerPrice`))
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

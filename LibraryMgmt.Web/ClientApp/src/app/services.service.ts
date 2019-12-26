import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  private _baseUrl: string;
  constructor(private hc: HttpClient, @Inject('BASE_URL') baseUrl: string) { this._baseUrl = baseUrl }

  public GetBook(): any {
    return this.hc.get(this._baseUrl + 'api/Book');
  }

  public AddBook(book: any): any {
    return this.hc.post(this._baseUrl + 'api/Book', book, { responseType: 'text' });
  }

  public DeleteBook(id: number): any {
    return this.hc.delete(this._baseUrl + 'api/Book/' + id, { responseType: 'text' });
  }

  public GetBookById(id: number): any {
    return this.hc.get(this._baseUrl + 'api/Book/' + id);
  }

  public EditBook(book: any): any {
    return this.hc.put(this._baseUrl + 'api/Book/', book, { responseType: 'text' });
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo } from './../models/todo';
import { HttpClient } from '@angular/common/http'
import { Constants } from './../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private subject: Subject<Todo> = new Subject<Todo>();

  constructor(private _http: HttpClient) { }

  /**
   * Méthode utilisée pour diffuser le sujet vers les abonnés à ce sujet
   * @param todo 
   */
  public sendTodo(todo: Todo) {
    this.subject.next(todo);
  }

  /**
   * Méthode permettant aux "consommateurs" de souscrire au sujet
   */
  public getTodo(): Observable<Todo> {
    return this.subject.asObservable();
  }

  /**
   * Désabonnement
   */
  public clearTodo(): void {
    this.subject.next();
  }



  public addTodo(todo: Todo): Observable<Todo> {
    return this._http.post<Todo>(Constants.addTodo, todo);
  }

  public getTodos(): Observable<Todo[]> {
    return this._http.get<Todo[]>(Constants.allTodos);
  }

  public deleteTodo(id: number): Observable<number> {
    return this._http.delete<number>(Constants.deleteTodo + id);
  }

  public updateTodos(id: number, todo: Todo): Observable<Todo> {
    return this._http.put<Todo>(Constants.updateTodo + id, todo);
  }

}

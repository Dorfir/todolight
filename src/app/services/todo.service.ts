import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { Todo } from './../models/todo';
import { Constants } from './../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos: Todo[] = [];
  private _todos: Todo[];
  

  constructor(private _http: HttpClient) {}

   public getTodos(): Observable<Todo[]> {
    this._http.get<Todo[]>(Constants.allTodos).subscribe(
      (datas) => {
        this._todos = datas;
        for (let _data of this._todos) {
          let _todo: Todo = new Todo().deserialize(_data);
          this.todos.push(_todo);
         }
      }
    );
    return Observable.of(this.todos);
   }

   public getTodo(id: number): Observable<Todo> {
    return this._http.get<Todo>(Constants.todo + id);
   }

   public addTodo(todo: Todo): void {
     this._http.post<Todo>(Constants.addTodo, todo).subscribe(
       (data) => {
        let _todo: Todo = new Todo().deserialize(data);
        this.todos.push(_todo);
       }
     );
   }

   public deleteTodo(id: number): Observable<number> {
     return this._http.delete<number>(Constants.deleteTodo +  id);
   }

   public updateTodo(id: number, todo: Todo): Observable<Todo> {
     return this._http.put<Todo>(Constants.updateTodo + id, todo);
   }
}

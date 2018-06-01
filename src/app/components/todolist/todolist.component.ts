import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  private subscription: Subscription;
  private _todo: Todo;

  private _todos: Todo[];
  public todos: Todo[] = [];

  // Decorateur @Output()
  @Output() loadTodo: EventEmitter<Todo> = new EventEmitter<Todo>();


  constructor(private _api: TodoService) { 
    // Souscrire aux changements du todo
    this.subscription = this._api.getTodo().subscribe(
      (data) => {
        console.log('Observable Todo : ' + JSON.stringify(data));
        let index = this.todos.findIndex((obj) => obj.idTodo == data.idTodo);
        console.log('Index : ' + index);
        if (index === -1) {
          this.todos.push(data);
        } else {
          this.todos[index] = data;
        }
        
      }
    );
  }

  
  public load(todo: Todo): void {
    console.log("Boutton modification clicked");
    this.loadTodo.emit(todo);
  }

  public delete(todo: Todo):void {
    console.log("Bouton delete clicked");
    this._api.deleteTodo(todo.idTodo).subscribe(
      (data) => {}
    );
    let index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  ngOnInit() {
    
   this._api.getTodos().subscribe(
     (datas) => {
       console.log(JSON.stringify(datas));
       for (let data of datas) {
         this.todos.push(new Todo().deserialize(data));
       }
     },
     (error) => {
       console.log('Erreur : ' + error);
     }
   );
   
  }

}

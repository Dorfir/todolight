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
        this.todos.push(data);
      }
    );
  }

  
  public load(todo: Todo): void {
    console.log("Boutton clicked");
    this.loadTodo.emit(todo);
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

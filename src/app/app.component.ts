import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo';
import { TodoService } from './services/todo.service';
import { Constants } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pageTitle = 'Todo Light';
  private _todo: Todo;
  private _updateMode = false;



  /**
   * Groupe de champs du formulaire
   */
  public todoForm: FormGroup;

  /**
   * Injecte une instance de FormBuilder dans le contrôleur
   * @param formBuilder Instance d'un objet formBuilder injecté
   */
  public constructor(
    private formBuilder: FormBuilder,
    private _api: TodoService) {}

  public get title() {
    return this.todoForm.get('title');
  }

  public get beginDate() {
    return this.todoForm.get('beginDate');
  }

  public get endDate() {
    return this.todoForm.get('endDate');
  }
  /**
   * Méthode invoquée immédiatement après l'instanciation de l'objet
   */
  public ngOnInit(): void {
    this._makeForm();
  }

  private _makeForm(todo: Todo = null): void {
    if (todo == null) {
      todo = new Todo();
    }
    this.todoForm = this.formBuilder.group({
      title: [
        todo.getTitle(),
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      beginDate: [
        todo.getDebut().format('YYYY-MM-DD'),
        [
          Validators.required
        ]
      ],
      endDate: [
        todo.getFin().format('YYYY-MM-DD'),
        [
          Validators.required
        ]
      ]
    });
  }

  public formSubmit(): void {
    if (!this._updateMode) {
      this._api.addTodo(this.todoForm.value).subscribe(
        (data) => {
          this._api.sendTodo(new Todo().deserialize(data[0]));
        }
      );
    } else {
      this.texteBouton = "Ajouter";
      this._updateMode = false;
      this._api.updateTodos(this._todo.idTodo, this.todoForm.value).subscribe(
        (data) => {
          this._todo = new Todo().deserialize(data);
          this._api.sendTodo(this._todo);
        }
      );
      
    }
    
    
  }

  public texteBouton = "Ajouter";

  public receiveTodo(todo: Todo) {
    console.log("Receive recu: "+ JSON.stringify(todo));
    this._updateMode = true;
    this._makeForm(todo); 
    this.texteBouton = "Modifier";
    this._todo = todo;
  }

}

import * as moment from "moment";

export class Todo {

  public idTodo: number;
  public title: string;
  public beginDate: any;
  public endDate: any;

  public constructor() {}

  /**
   * Retourne le titre du todo
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Définit le titre du todo
   * @param title
   * @return Todo
   */
  public setTitle(title: string): Todo {
    this.title = title;
    return this;
  }

  /**
   * Casting d'un objet de type "any" en type Todo
   * @param input Données à traiter
   */
  public deserialize(input: any): Todo {
    Object.assign(this, input);
    return this;
  }

  public getDebut(): moment.Moment {
    return moment(this.beginDate, 'YYYY-MM-DD');
  }

  public getFin(): moment.Moment {
    return moment(this.endDate, 'YYYY-MM-DD');
  }

  public persist(): void {
    let _todos: any;

    if (localStorage.getItem('todos') !== null) {
      // La clé "todos" existe dans le stockage local
      _todos = JSON.parse(localStorage.getItem('todos'));
    } else {
      _todos = []; // Initialise un tableau
    }

    // Alimente le tableau avec la donnée à faire persister
    _todos.push(this);

    // Stocke la nouvelle valeur pour la clé courante
    localStorage.setItem('todos', JSON.stringify(_todos));
  }
}

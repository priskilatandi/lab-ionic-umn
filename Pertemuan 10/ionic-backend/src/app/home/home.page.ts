import { Component } from '@angular/core';
import { Todo, TodoService } from '../pages/todo-details/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos: Todo[];

  constructor(private todosService: TodoService) {}

  ngOnInit(){
    this.todosService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  remove(item){
    this.todosService.removeTodo(item.id);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})

export class RecipesPage implements OnInit {

  recipes: Recipe[];
  arrayRecipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  	this.arrayRecipes = this.recipesService.getAllRecipes();
  }

  // get_Recipes(recipeId: string){
  // 	this.recipes = this.recipesService.getRecipe(recipeId);
  // 	console.log(this.recipes);
  // }

  // delete_Recipes(recipeId: string){
  // 	this.recipesService.deleteRecipe(recipeId);
  // 	this.arrayRecipes = this.recipesService.getAllRecipes();
  // 	console.log(recipeId);
  // }
}

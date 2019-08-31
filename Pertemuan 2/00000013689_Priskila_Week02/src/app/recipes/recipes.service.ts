import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  private recipes: Recipe[] = [
  	{
	  		id: 'r1',
	  		title: 'Gado-gado',
	  		imageUrl: 'https://i1.wp.com/resepkoki.id/wp-content/uploads/2016/12/Resep-Gado-Gado.jpg?fit=2461%2C2359&ssl=1',
	  		ingredients: ['Lontong', 'Sawi', 'Bumbu Kecap', 'Tauge']
  	},
  	{
  			id: 'r2',
  			title: 'Ketupat',
  			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Drawing_of_three_ketupat_-_05.jpg',
  			ingredients: ['Beras', 'Daun Pandan', 'Garam', 'Air']
  	},
  	{
  			id: 'r3',
  			title: 'Pizza Margerita',
  			imageUrl: 'https://st2.depositphotos.com/1835807/6437/i/950/depositphotos_64373829-stock-photo-pizza-margherita-on-white-background.jpg',
  			ingredients: ['Adonan Kulit Pizza', 'Saus Tomat', 'Keju Mozzarella', 'Daun Basil']
  	},
  ];

  constructor() { }

  getAllRecipes(){
  	return [...this.recipes];}

  getRecipe(recipeId: string){
  	return {
		...this.recipes.find(recipe => {
			return recipe.id === recipeId;
		})
	};
  }

  deleteRecipe(recipeId: string){
    this.recipes = this.recipes.filter(recipe => {
		return recipe.id !== recipeId;
	});
  }
  
}

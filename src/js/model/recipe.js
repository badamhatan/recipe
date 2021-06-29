import axios from "axios";
export default class Recipe{
      constructor(id) {
            this.id = id;
      }

      async getRecipe() {
            const result = await axios("https://forkify-api.herokuapp.com/api/get?rId=" + this.id);

            this.publisher = result.data.recipe.publisher;
            this.ingredients = result.data.recipe.ingredients;
            this.source__url = result.data.recipe.source__url;
            this.image__url = result.data.recipe.image__url;
            this.publisher__url = result.data.recipe.publisher__url;
            this.title = result.data.recipe.title;
            this.social_rank = result.data.recipe.social_rank;
            
      }
}
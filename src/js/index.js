require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader} from "./view/base";
import * as searchView from "./view/searchView"
import Recipe from "./model/recipe";
/*
*Web app төлөв
*Хайлтын query, үр дүн
*Лайкласан жорууд
Захиалж байгаа жорын найрлагууд
*/

const state = {};
const controlSearch = async () => {
      // 1. Вэбээс халйтынтүлхүүүр үгийг гаргаж авна.
      const query = searchView.getInput();

      if (query) {
            // 2. Шинээр хайлтын объектийг үүсгэж өгнө.
            state.search = new Search(query);
            // 3. Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
            searchView.clearSearchQuery();
            searchView.clearSearchResult();
            renderLoader(elements.searchResultDiv);

            // 4. Хайлтыг гүйцэтгэнэ.
            await state.search.doSearch();
            // 5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
            clearLoader();
            if (state.search.result === undefined) alert("Хайсан хоолны жор олдсонгүй");
            else searchView.renderRecipes(state.search.result);
      };      
      
}
elements.searchForm.addEventListener("submit", e => {
      e.preventDefault();
      controlSearch();      
})

elements.pageButtons.addEventListener("click", e => {
      const btn = e.target.closest(".btn-inline");
      if (btn) {
            const gotoPageNumber = parseInt(btn.dataset.goto);
            searchView.clearSearchResult();
            searchView.renderRecipes(state.search.result, gotoPageNumber);
      }
});

const r = new Recipe(47746);
r.getRecipe();
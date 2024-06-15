import { Bot } from '../classes/Bot';

export class CookBot extends Bot {
    constructor() {
        super('CookBot', 'https://www.themealdb.com/api/json/v1/1/random.php');
        this.commands = {
            'recipe': this.getRecipe,
            'ingredient': this.getRandomIngredient,
            'tip': this.getCookingTip,
            'help': this.showHelp,
        };
    }

    async getRecipe() {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            const recipe = data.meals[0];
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== '') {
                    ingredients.push(`${ingredient} (${measure})`);
                } else {
                    break;
                }
            }
            const recipeText = `
                Recette: ${recipe.strMeal}
                Catégorie: ${recipe.strCategory}
                Instructions: ${recipe.strInstructions}
                Ingrédients:
                ${ingredients.join('\n')}
            `;
            return recipeText;
        } catch (error) {
            console.error('Error fetching recipe:', error);
            return 'Désolé, je ne peux pas trouver de recette pour le moment.';
        }
    }

    async getRandomIngredient() {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            const recipe = data.meals[0];
            const ingredient = recipe.strIngredient1;
            return `Ingrédient aléatoire: ${ingredient}`;
        } catch (error) {
            console.error('Error fetching random ingredient:', error);
            return 'Désolé, je ne peux pas trouver d\'ingrédient pour le moment.';
        }
    }

    async getCookingTip() {
        const tips = [
            'Toujours préchauffer le four avant de mettre quelque chose dedans.',
            'Utiliser des herbes fraîches pour plus de saveur.',
            'Laisser reposer la viande après la cuisson pour qu\'elle conserve ses jus.',
            'Ne pas hésiter à expérimenter avec de nouvelles épices.',
        ];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        return `Astuce de cuisine: ${randomTip}`;
    }

  

    showHelp() {
        return 'Commandes disponibles : recipe, ingredient, tip, everybody';
    }

    respondTo(message) {
        const command = message.trim().toLowerCase();
        if (command in this.commands) {
            return this.commands[command]();
        } else {
            return 'Commande non reconnue. Tapez "help" pour voir les commandes disponibles.';
        }
    }
}

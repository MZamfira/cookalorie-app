
import { Recipe } from '@/types/recipe';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Salată de năut mediteraneană',
    description: 'O salată plină de proteine cu năut, legume proaspete și un dressing aromat cu lămâie.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      { name: 'Năut', amount: '1', price: 4.50, unit: 'conservă' },
      { name: 'Castravete', amount: '1', price: 3.00, unit: 'mediu' },
      { name: 'Roșii cherry', amount: '1', price: 8.99, unit: 'caserolă' },
      { name: 'Ceapă roșie', amount: '1/4', price: 1.50, unit: '' },
      { name: 'Brânză feta', amount: '100', price: 9.00, unit: 'g' },
      { name: 'Ulei de măsline', amount: '2', price: 2.50, unit: 'linguri' },
      { name: 'Lămâie', amount: '1/2', price: 2.00, unit: '' },
      { name: 'Sare și piper', amount: '', price: 0.50, unit: 'după gust' },
    ],
    instructions: [
      'Clătiți și scurgeți năutul.',
      'Tăiați castravetele, roșiile și ceapa roșie.',
      'Amestecați toate legumele cu năutul într-un bol.',
      'Sfărâmați brânza feta deasupra.',
      'Amestecați uleiul de măsline, sucul de lămâie, sarea și piperul.',
      'Turnați dressingul peste salată și amestecați pentru a combina.',
      'Serviți imediat sau refrigerați până la 24 de ore.'
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    nutritionInfo: {
      calories: 380,
      protein: 15,
      carbs: 42,
      fat: 18,
      fiber: 12,
      sugar: 8
    },
    totalPrice: 32.00,
    pricePerServing: 16.00,
    tags: ['vegetarian', 'high-protein', 'no-cook', 'mediterranean']
  },
  {
    id: '2',
    title: 'Supă de linte economică',
    description: 'O supă hrănitoare și nutritivă care costă mai puțin de 7 RON per porție.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      { name: 'Linte uscată', amount: '200', price: 4.99, unit: 'g' },
      { name: 'Ceapă', amount: '1', price: 1.50, unit: 'medie' },
      { name: 'Morcovi', amount: '2', price: 2.00, unit: 'medii' },
      { name: 'Țelină', amount: '2', price: 2.50, unit: 'tulpini' },
      { name: 'Usturoi', amount: '2', price: 1.00, unit: 'căței' },
      { name: 'Supă de legume', amount: '1', price: 8.99, unit: 'l' },
      { name: 'Roșii cuburi', amount: '1', price: 4.99, unit: 'conservă' },
      { name: 'Foi de dafin', amount: '1', price: 0.50, unit: '' },
      { name: 'Ulei de măsline', amount: '1', price: 1.20, unit: 'lingură' },
      { name: 'Sare și piper', amount: '', price: 0.50, unit: 'după gust' },
    ],
    instructions: [
      'Încălziți uleiul de măsline într-o oală mare la foc mediu.',
      'Adăugați ceapa, morcovii și țelina tocate. Gătiți până se înmoaie, aproximativ 5 minute.',
      'Adăugați usturoiul tocat și gătiți timp de 30 de secunde până devine aromat.',
      'Adăugați lintea, roșiile cuburi, supa de legume și foaia de dafin.',
      'Aduceți la fierbere, apoi reduceți focul și fierbeți la foc mic timp de 25-30 de minute până când lintea este moale.',
      'Condimentați cu sare și piper după gust.',
      'Îndepărtați foaia de dafin înainte de servire.'
    ],
    prepTime: 10,
    cookTime: 35,
    servings: 4,
    nutritionInfo: {
      calories: 250,
      protein: 12,
      carbs: 40,
      fat: 4,
      fiber: 15,
      sugar: 6
    },
    totalPrice: 28.17,
    pricePerServing: 7.04,
    tags: ['vegan', 'budget-friendly', 'high-fiber', 'one-pot']
  },
  {
    id: '3',
    title: 'Pui cu legume la tavă',
    description: 'O cină rapidă de mijloc de săptămână cu proteină slabă și legume de sezon.',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      { name: 'Piept de pui', amount: '500', price: 19.99, unit: 'g' },
      { name: 'Ardei gras', amount: '2', price: 8.99, unit: 'bucăți' },
      { name: 'Broccoli', amount: '1', price: 7.50, unit: 'buchet' },
      { name: 'Ceapă roșie', amount: '1', price: 2.50, unit: 'medie' },
      { name: 'Ulei de măsline', amount: '2', price: 2.50, unit: 'linguri' },
      { name: 'Condiment italian', amount: '1', price: 1.50, unit: 'linguriță' },
      { name: 'Pudră de usturoi', amount: '1/2', price: 1.00, unit: 'linguriță' },
      { name: 'Sare și piper', amount: '', price: 0.50, unit: 'după gust' },
    ],
    instructions: [
      'Preîncălziți cuptorul la 220°C.',
      'Tăiați puiul în bucăți de aproximativ 2-3 cm. Tăiați toate legumele în bucăți de dimensiuni similare.',
      'Într-un bol mare, combinați uleiul de măsline, condimentul italian, pudra de usturoi, sarea și piperul.',
      'Adăugați puiul și legumele în bol și amestecați până când sunt acoperite uniform.',
      'Răspândiți totul într-un singur strat pe o tavă mare de copt.',
      'Coaceți timp de 20-25 de minute, amestecând la jumătatea timpului, până când puiul este gătit și legumele sunt fragede.',
      'Serviți cald.'
    ],
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    nutritionInfo: {
      calories: 320,
      protein: 35,
      carbs: 15,
      fat: 14,
      fiber: 4,
      sugar: 5
    },
    totalPrice: 44.48,
    pricePerServing: 11.12,
    tags: ['high-protein', 'gluten-free', 'one-pan', 'meal-prep-friendly']
  }
];

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  categories = [
    { name: 'Pizzas', image: 'https://source.unsplash.com/400x300/?pizza' },
    { name: 'Burgers', image: 'https://source.unsplash.com/400x300/?burger' },
    { name: 'Desserts', image: 'https://source.unsplash.com/400x300/?dessert' },
    { name: 'Drinks', image: 'https://source.unsplash.com/400x300/?juice,drink' }
  ];

  featuredDishes = [
    {
      name: 'Classic Margherita',
      image: 'https://source.unsplash.com/400x300/?cheese,pizza',
      description: 'Fresh mozzarella, basil & tomato sauce'
    },
    {
      name: 'Double Cheeseburger',
      image: 'https://source.unsplash.com/400x300/?cheeseburger',
      description: 'Loaded with cheese and juicy beef patties'
    },
    {
      name: 'Chocolate Lava Cake',
      image: 'https://source.unsplash.com/400x300/?lava,cake',
      description: 'Hot and gooey chocolate center with ice cream'
    }
  ];
}


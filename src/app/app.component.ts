import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from './service/shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  categories: any[] = [];
  products: [] = [];
  selectedCategory: string = '';

  constructor(private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.sharedService.getCategories().subscribe((categories) => {
      this.categories = categories;
  
      console.log('category',this.categories);
      
      this.products  = this.sharedService.getProductsList();
      console.log('actual sorted list',this.products);
    });
  }

  
  
  groupProductsByCategory(products: any[]): any {

    console.log('list from group',products);
    
    return products.reduce((result, product) => {
      const category = product.category?.name || 'Others';
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(product);
      return result;
    }, {});
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    console.log('selected cat',this.selectedCategory);
    
  }
  
}

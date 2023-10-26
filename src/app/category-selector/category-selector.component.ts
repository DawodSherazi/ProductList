import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent {

  @Input() categories: any[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectedCategory: string = '';

  selectCategory(category: string): void {
    console.log('sdhfgsdh',category);
    
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

}

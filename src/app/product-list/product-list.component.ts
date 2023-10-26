import { Component,Input,SimpleChanges ,OnChanges  } from '@angular/core';
import { SharedServiceService } from '../service/shared-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnChanges {

  electrion:any

  @Input() products: any [] = [];
  @Input() selectedCategory: any = '';
  categories:string[]=[];
 productList:[]=[];
 productsByCategory: [] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      
   
    }
  }

constructor(private sharedService:SharedServiceService){}

ngOnInit(): void {
 
  console.log('Received products:', this.products);
  this.sharedService.getCategories().subscribe((categories) => {

    this.categories = categories;
    this.selectedCategory = categories[0]; 
   
    var categoryID = this.selectedCategory.id 
   
    
    this.fetchProducts();

    
    
    this.products  = this.sharedService.getProductsList();
    
  });
}

fetchProducts(): void {

  interface Product {
    id: number; 
    category:{
      id:number;
    }
    
  }
  this.sharedService.getProducts().subscribe((resp:any) => {
   
    
    // this.products = resp.filter((product:Product)=> product?.category?.id == this.selectedCategory?.id);
    console.log('list filter products',this.products);
    this.products = this.groupProductsByCategory(resp);
    console.log("list by category",this.products);
    
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

onCategorySelected(category: any): void {
  this.selectedCategory = category;

  this.scrollToSection(this.selectedCategory.name)

  this.fetchProducts();
  
  
  debugger
  console.log('selected cat',this.selectedCategory);
  
}

scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
  



}

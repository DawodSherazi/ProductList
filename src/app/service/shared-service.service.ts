import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  productsList:[]=[];

  private baseUrl = 'https://api.escuelajs.co/api/v1';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }


  postProductsList(products:[]){

    this.productsList = products;
    localStorage.setItem("product list", JSON.stringify(products));

  }

getProductsList(){

  try {
    const storedData = localStorage.getItem("product list");
    this.productsList = storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error parsing JSON from local storage:", error);
    this.productsList = [];
  }
  return this.productsList 
}

}

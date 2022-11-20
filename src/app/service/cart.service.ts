import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartitemlist:any = [];
  public productlist = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  constructor() { }
  getProducts()
  {
    return this.productlist.asObservable();
  }
  setProducts(product:any)
  {
    this.cartitemlist.push(...product);
    this.productlist.next(product);
  }
  addtocart(product:any)
  {
    this.cartitemlist.push(product);
    this.productlist.next(this.cartitemlist);
    this.getTotalPrice();
    console.log(this.cartitemlist);
  }
  getTotalPrice() : number
  {
    let grandTatal = 0;
    this.cartitemlist.map((a : any)=>{
      grandTatal = grandTatal + a.total;
    })
    return grandTatal;
  }
  removeCartItem(product : any)
  {
    this.cartitemlist.map((a:any, index:any)=>{
      if(product.id === a.id)
      {
        this.cartitemlist.splice(index,1);
      }
    })
    this.productlist.next(this.cartitemlist);
  }
  removeAllitem()
  {
    this.cartitemlist = [];
    this.productlist.next(this.cartitemlist);
  }
}

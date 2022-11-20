import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public getapidata:any;
  searchKey:string = '';
  public filterCategory :any
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getproduct()
    .subscribe(res=>{
      this.getapidata = res;
      this.filterCategory = res;
      this.getapidata.forEach((a:any) => {
        if(a.category === "women's clothing" ||  a.category==="men's clothing"){
          a.category = "fashion";
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
    })
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addToCart(item : any)
  {
    this.cartService.addtocart(item);
  }
 filter(category : string)
 {
  this.filterCategory = this.getapidata.filter((a:any)=>{
    if(a.category == category || category== "")
    {
      return a;
    }
  })
 }
}

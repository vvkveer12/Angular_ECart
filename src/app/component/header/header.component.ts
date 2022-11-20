import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalcartitem : number = 0;
  public searchTerm :string = '';
  constructor(private cartservice : CartService) { }

  ngOnInit(): void {
    this.cartservice.getProducts()
    .subscribe(res=>{
      this.totalcartitem = res.length;
    })
  }
  search(event:any)
  {
      this.searchTerm = (event.target as HTMLInputElement).value;
      this.cartservice.search.next(this.searchTerm);
  }

}

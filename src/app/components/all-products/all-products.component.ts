import { Component } from '@angular/core';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  products: any[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.listProducts().subscribe((data: any) => {
      this.products = data;
    });
  }
}

import { Component } from '@angular/core';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})
export class AllAdsComponent {

  ads: any[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.listAds().subscribe((data: any) => {
      this.ads = data;
    });
  }
}

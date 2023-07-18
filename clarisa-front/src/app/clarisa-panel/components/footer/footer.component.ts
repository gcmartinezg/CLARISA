import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  routes = [{ path: '/result/results-outlet/results-list' }, { path: '/result/result-detail/', floating: true }, { path: '/type-one-report', floating: true }, { path: '/ipsr/list/innovation-list' }, { path: '/ipsr/detail' }, { path: '/quality-assurance' }, { path: '/init-admin-module', floating: true }, { path: '/admin-module', floating: true }, { path: '/login', floatingFix: true }];
  isFloating = false;
  isFloatingFix = false;
  isHover = false;
  //license = environment.footerUrls.license;
  //termsAndCondition = environment.footerUrls.termsAndCondition;
  constructor(private router: Router) {}
  showIfRouteIsInList() {
    // console.log(this.router.url);
    this.isFloating = false;
    for (const route of this.routes) {
      if (this.router.url.includes(route?.path)) {
        this.isFloating = route.floating;
        this.isFloatingFix = route.floatingFix;
        return true;
      }
    }
    return false;
  }
  onMouseEnter() {
    this.isHover = true;
  }

  onMouseLeave() {
    this.isHover = false;
  }

}

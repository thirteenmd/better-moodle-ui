import { Directive, OnInit, ElementRef } from '@angular/core';

import { UserService } from '@shared/services/user/user.service';
import { USER_STORAGE_KEY } from '@shared/constants';

@Directive({
  selector: '[appHasRole]'
})
export class UserRoleDirective implements OnInit {

  constructor(private userService: UserService,
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    const user = this.userService.getUserLocalStorage(USER_STORAGE_KEY).userRole;
    if (user === 'teacher' || user === 'student') {
      const child: HTMLElement = this.elementRef.nativeElement;
      child.parentNode.removeChild(child);
    }
  }
}
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { GROUPS_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { Group } from '@shared/models/group';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
})
export class UserGroupsComponent implements OnInit, OnDestroy {
  id: string;
  groups: Array<Group> = [];
  @Input() user;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getAllGroups();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAllGroups() {
    const userId = this.user.id;
    this.dashboardService.getItemsOfTeacher(GROUPS_URL, userId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        })
      ).subscribe(groups => {
      this.groups = groups;
    });
  }
}

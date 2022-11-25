import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { UsersManagementComponent } from './users/management/management.component';

@NgModule({
    declarations: [UsersManagementComponent],
    imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookComponent } from './book.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: BookComponent }])],
    exports: [RouterModule],
})
export class BookRoutingModule {}

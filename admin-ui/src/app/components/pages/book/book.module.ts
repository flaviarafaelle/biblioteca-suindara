import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BookRoutingModule } from './book-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { BookComponent } from './book.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        TimelineModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CardModule,
        BookRoutingModule,
        SkeletonModule,
        TableModule,
        CheckboxModule,
    ],
    declarations: [BookComponent],
})
export class BookModule {}

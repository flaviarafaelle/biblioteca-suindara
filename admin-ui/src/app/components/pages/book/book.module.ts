import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BookRoutingModule } from './book-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CreateComponent } from './create/create.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    imports: [
        CommonModule,
        TimelineModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CardModule,
        BookRoutingModule,
        SkeletonModule
    ],
    declarations: [CreateComponent],
})
export class BookModule {}

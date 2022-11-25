import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
    bookQuery: any = '';
    books: Array<any> = [];
    loading: boolean = false;
    constructor(
        private bookService: BookService,
        private cd: ChangeDetectorRef
    ) {}
    search() {
        this.loading = true;
        console.log(this.bookQuery);
        this.bookService.getBookData(this.bookQuery).subscribe(
            (res) => {
                console.log(res);
                if (res.items && res.items.length > 0) this.books = res.items;
                this.loading = false;
            },
            (e) => {
                console.log(e);
                this.loading = true;
            },
            () => {
                this.cd.detectChanges();
            }
        );
    }
}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Book } from 'src/app/api/book';
import { Category } from 'src/app/api/category';
import { BookService } from 'src/app/service/book.service';

@Component({
    selector: 'app-create',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
    bookQuery: any = '';
    books: Array<Book> = [];
    selectedBooks: Array<Book> = [];
    search: any;
    searchBookName: any;
    searchAuthor: any;
    searchPublishingCompany: any;
    searchISBN: any;
    loading: boolean = false;
    categories: Array<Category> = [];
    @ViewChild('dt') table: Table | undefined;
    constructor(
        private bookService: BookService,
        private cd: ChangeDetectorRef
    ) {}
    ngOnInit(): void {
        this.bookService.getBooks().subscribe((res) => {
            this.books = res;
            console.log({ res });
        });

        this.bookService.getCategories().subscribe((res) => {
            this.categories = res;
            console.log({ categories: this.categories });
        });
    }
    applyFilterGlobal($event: any, stringVal: string) {
        this.table?.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }
    applyFilter($event: any, stringVal: string, kind: string) {
        this.table?.filter(
            ($event.target as HTMLInputElement).value,
            stringVal,
            kind
        );
    }
    // search() {
    //     this.loading = true;
    //     console.log(this.bookQuery);
    //     this.bookService.queryBooks(this.bookQuery).subscribe(
    //         (res) => {
    //             console.log(res);
    //             if (res.items && res.items.length > 0) this.books = res.items;
    //             this.loading = false;
    //         },
    //         (e) => {
    //             console.log(e);
    //             this.loading = true;
    //         },
    //         () => {
    //             this.cd.detectChanges();
    //         }
    //     );
    // }
}

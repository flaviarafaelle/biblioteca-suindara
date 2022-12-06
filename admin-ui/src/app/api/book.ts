export interface Book {
    id: number;
    title: string;
    description: string;
    author: string;
    publishingCompany: string;
    publishYear: number;
    isbn: string;
    pages: number;
    isAvailable: Boolean;
    createDate: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    rentMaxDays: number;
    imageURL: string;
}

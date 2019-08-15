export interface Book{
    _id: string;
    title: string;
    description: string;
    price: number;
    urlImg: string;
    hideBook: false;
    hide: true;
    authors: [{id:number, author: string}];
    genres: [string];
    idCart?: number;
    addCartDate?: Date;

}
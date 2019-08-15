import { Book } from './book';

export interface User{
    name: string;
    surname: string;
    birthDate: Date;
    email: string;
    password: string;
    confirmPassword?:string;
    booksCart?: Book[]
}
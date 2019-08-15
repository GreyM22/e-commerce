import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store';
import { Book } from '../../models/book';
import { AuthService } from '../../service/auth.service';

export const ADD_BOOK = 'ADD_BOOK';

export const REMOVE_BOOK = 'REMOVE_BOOK';

export const REMOVE_ALL_BOOKS = 'REMOVE_ALL_BOOKS';

export const LOAD_CART_BOOKS = 'LOAD_CART_BOOKS';


export class AddBook implements Action{

    readonly type = ADD_BOOK

    constructor( public payload :Book){}
}

export class RemoveBook implements Action{

    readonly type = REMOVE_BOOK

    constructor( public payload: number){}
}

export class RemoveAllBooks implements Action{

    readonly type = REMOVE_ALL_BOOKS

    constructor( ){}
}

export class LoadCartBook implements Action{

    readonly type = LOAD_CART_BOOKS


    constructor( public payload: Book[]){
     }
}


export type Actions = AddBook | RemoveBook | RemoveAllBooks | LoadCartBook
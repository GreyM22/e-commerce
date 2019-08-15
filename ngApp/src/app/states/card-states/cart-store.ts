import { Book } from '../../models/book';
import * as BookCartActions from './bookCart.action'

export interface MyCart {
    booksCart: Book[];
}

export const INITIAL_STATE: MyCart = {
    booksCart: []
}

export function reducer(state: MyCart = INITIAL_STATE, action: BookCartActions.Actions) {

    switch (action.type) {
        case BookCartActions.LOAD_CART_BOOKS:
            if(action.payload == null) return []
            return Object.assign({}, state, {
                booksCart: action.payload
            })

        case BookCartActions.ADD_BOOK:
            action.payload.idCart = state.booksCart.length + 1;
            action.payload.addCartDate = new Date()
            return Object.assign({}, state, {
                booksCart: state.booksCart.concat(
                    Object.assign({}, action.payload)
                )
            })
        case BookCartActions.REMOVE_BOOK:
            return Object.assign({}, state, {
                booksCart: state.booksCart.filter(
                    book => book.idCart !== action.payload
                )
            })
        case BookCartActions.REMOVE_ALL_BOOKS:
            return Object.assign({}, state, {
                booksCart: []
            })

    }
    return state
}
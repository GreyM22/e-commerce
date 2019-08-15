import { User } from '../../models/user'
import * as UserActions from '../user-state/user.action'
import { Book } from 'src/app/models/book';

export interface UserData {
    name: string;
    surname: string;
    birthDate: Date;
    email: string;
    password: string;
    booksCart?: Book[]
}

export const INITIAL_STATE: UserData = {
    name: undefined,
    surname: undefined,
    birthDate: undefined,
    email: undefined,
    password: undefined,
    booksCart: undefined
}

export function reducerUser(state: UserData = INITIAL_STATE, action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.LOAD_USER:
            return Object.assign({}, state, action.payload)
        case UserActions.UPDATE_USER:
                return Object.assign({}, state, action.payload)
        case UserActions.LOG_OUT_USER:
            return {
                ...INITIAL_STATE
            }
        }
    return state
    }


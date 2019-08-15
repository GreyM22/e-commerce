import { Action } from '@ngrx/store';
import { User} from '../../models/user'

export const LOAD_USER = 'LOAD_USER';

export const LOG_OUT_USER = 'LOG_OUT_USER';

export const UPDATE_USER = 'UPDATE_USER';

export class LoadUser implements Action{

    readonly type = LOAD_USER

    constructor( public payload :User){}
}

export class LogOutUser implements Action{

    readonly type = LOG_OUT_USER

    constructor( ){}
}

export class UpdateUser implements Action{

    readonly type = UPDATE_USER

    constructor( public payload :User){}
}

export type Actions = LoadUser | LogOutUser | UpdateUser 

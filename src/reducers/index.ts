import { combineReducers } from 'redux';
import * as fromWorld from 'reducers/world';

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
    world: fromWorld.State;
}

/*
 * initialState of the app
 */
export const initialState: State = {
    world: fromWorld.initialState,
};

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
    world: fromWorld.reducer,
});

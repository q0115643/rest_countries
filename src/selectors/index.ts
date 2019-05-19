import {State} from '../reducers';
import {createSelector} from 'reselect';

/*
 * Get the todos state from the root state
 */
const getWorldState = ((state: State) => state.world);

/*
 * Getting todos array from todos State
 */
export const getCountries = createSelector([getWorldState], (s) => s.countries);
export const getVisibleCountries = createSelector([getWorldState], (s) => s.visibleCountries);
export const getIsFetching = createSelector([getWorldState], (s) => s.isFetching);
export const getKeyword = createSelector([getWorldState], (s) => s.keyword);
export const getRule = createSelector([getWorldState], (s) => s.rule);
export const getDirection = createSelector([getWorldState], (s) => s.direction);
export const getAddOpen = createSelector([getWorldState], (s) => s.addOpen);
export const getInputCountry = createSelector([getWorldState], (s) => s.inputCountry);
export const getInputCapital = createSelector([getWorldState], (s) => s.inputCapital);
export const getInputRegion = createSelector([getWorldState], (s) => s.inputRegion);
export const getInputAlpha2 = createSelector([getWorldState], (s) => s.inputAlpha2);
export const getInputCallingCodes = createSelector([getWorldState], (s) => s.inputCallingCodes);
export const getRedCountry = createSelector([getWorldState], (s) => s.redCountry);
export const getRedCapital = createSelector([getWorldState], (s) => s.redCapital);
export const getRedRegion = createSelector([getWorldState], (s) => s.redRegion);
export const getRedAlpha2 = createSelector([getWorldState], (s) => s.redAlpha2);
export const getRedCallingCodes = createSelector([getWorldState], (s) => s.redCallingCodes);

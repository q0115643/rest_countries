import Country from 'models/country'
import site from 'config.yml';


/*
 * every action name constant here
 */
export enum ActionTypes {
  REQUEST_COUNTRIES = 'REQUEST_COUNTRIES',
  GET_COUNTRIES = 'GET_COUNTRIES',
  // SET_COUNTRIES = 'SET_COUNTRIES',
  ADD_COUNTRY = 'ADD_COUNTRY',
  DEL_COUNTRY = 'DEL_COUNTRY',
  SET_KEYWORD = 'SET_KEYWORD',
  SEARCH_COUNTRIES = 'SEARCH_COUNTRIES',
  SORT_COUNTRIES = 'SORT_COUNTRIES',
  SET_INPUT_COUNTRY = 'SET_INPUT_COUNTRY',
  SET_INPUT_CAPITAL = 'SET_INPUT_CAPITAL',
  SET_INPUT_REGION = 'SET_INPUT_REGION',
  SET_INPUT_ALPHA2 = 'SET_INPUT_ALPHA2',
  SET_INPUT_CALLINGCODES = 'SET_INPUT_CALLINGCODES',
  ADD_COUNTRY_NUMBER = 'ADD_COUNTRY_NUMBER',
};

/*
 * Define return types of our actions 
 * Every action returns a type and a payload
 */
export interface RequestCountriesAction { type: ActionTypes.REQUEST_COUNTRIES, payload: { } };
export interface GetCountriesAction { type: ActionTypes.GET_COUNTRIES, payload: { countries: Array<Country> } };
// export interface SetCountriesAction { type: ActionTypes.SET_COUNTRIES, payload: { countries: Array<Country> } };
export interface AddCountryAction { type: ActionTypes.ADD_COUNTRY, payload: { } };
export interface DelCountryAction { type: ActionTypes.DEL_COUNTRY, payload: { alpha2Code: string } };
export interface SearchCountriesAction { type: ActionTypes.SEARCH_COUNTRIES, payload: { } };
export interface SetKeywordAction { type: ActionTypes.SET_KEYWORD, payload: { keyword: string } };
export interface SortCountriesAction { type: ActionTypes.SORT_COUNTRIES, payload: { rule: string } };
export interface SetInputCountryAction { type: ActionTypes.SET_INPUT_COUNTRY, payload: { inputCountry: string } };
export interface SetInputCapAction { type: ActionTypes.SET_INPUT_CAPITAL, payload: { inputCapital: string } };
export interface SetInputRegionAction { type: ActionTypes.SET_INPUT_REGION, payload: { inputRegion: string } };
export interface SetInputAlphaAction { type: ActionTypes.SET_INPUT_ALPHA2, payload: { inputAlpha2: string } };
export interface SetInputCallAction { type: ActionTypes.SET_INPUT_CALLINGCODES, payload: { inputCallingCodes: string } };
export interface AddCountryNumberAction { type: ActionTypes.ADD_COUNTRY_NUMBER, payload: { } };

/*
 * Define actions creators
 */
export function requestCountries(): RequestCountriesAction {
  return { 
    type: ActionTypes.REQUEST_COUNTRIES,
    payload: {}
  };
};

export function getCountries(countries: Array<Country>): GetCountriesAction {
  return { 
    type: ActionTypes.GET_COUNTRIES,
    payload: { countries }
  };
};

// export function setCountries(countries: Array<Country>): SetCountriesAction {
//   return { 
//     type: ActionTypes.SET_COUNTRIES,
//     payload: { countries }
//   };
// };

export function addCountry(): AddCountryAction {

  return {
    type: ActionTypes.ADD_COUNTRY,
    payload: { }
  };
};

export function delCountry(alpha2Code: string): DelCountryAction {

  return {
    type: ActionTypes.DEL_COUNTRY,
    payload: { alpha2Code }
  };
};

export function searchCountries(): SearchCountriesAction {

  return {
    type: ActionTypes.SEARCH_COUNTRIES,
    payload: { }
  };
};

export function setKeyword(keyword: string): SetKeywordAction {

  return {
    type: ActionTypes.SET_KEYWORD,
    payload: { keyword }
  };
};

export function sortCountries(rule: string): SortCountriesAction {

  return {
    type: ActionTypes.SORT_COUNTRIES,
    payload: { rule }
  };
};

export function setInputCountry( inputCountry: string ): SetInputCountryAction {

  return {
    type: ActionTypes.SET_INPUT_COUNTRY,
    payload: { inputCountry }
  };
};

export function setInputCapital( inputCapital: string ): SetInputCapAction {

  return {
    type: ActionTypes.SET_INPUT_CAPITAL,
    payload: { inputCapital }
  };
};

export function setInputRegion( inputRegion: string ): SetInputRegionAction {

  return {
    type: ActionTypes.SET_INPUT_REGION,
    payload: { inputRegion }
  };
};

export function setInputAlpha2( inputAlpha2: string ): SetInputAlphaAction {

  return {
    type: ActionTypes.SET_INPUT_ALPHA2,
    payload: { inputAlpha2 }
  };
};

export function setInputCallingCode( inputCallingCodes: string ): SetInputCallAction {

  return {
    type: ActionTypes.SET_INPUT_CALLINGCODES,
    payload: { inputCallingCodes }
  };
};

export function addCountryNumber( ): AddCountryNumberAction {

  return {
    type: ActionTypes.ADD_COUNTRY_NUMBER,
    payload: { }
  };
};

export const fetchData = () => dispatch => {
  dispatch(requestCountries());
  return getData().then(data => {
    setTimeout(() => {
      return dispatch(getCountries(data))
    }, 100);
  });
};

const getData = () => {  
  return fetch(site.dataUrl, { method: 'GET'})
    .then(response => response.json());
};

export const sortCountriesCall = (rule: string) => dispatch => {
  dispatch(sortCountries(rule));
};

export const setKeywordCall = (keyword: string) => dispatch => {
  dispatch(setKeyword(keyword));
};

export const searchCountriesCall = () => dispatch => {
  dispatch(searchCountries());
};

export const deleteCountryCall = (alpha2Code: string) => dispatch => {
  dispatch(delCountry(alpha2Code));
};

export const addOpenCall = () => dispatch => {
  dispatch(addCountry());
};

export const inputCountryCall = (inputCountry: string) => dispatch => {
  dispatch(setInputCountry(inputCountry));
};

export const inputCapitalCall = (inputCapital: string) => dispatch => {
  dispatch(setInputCapital(inputCapital));
};

export const inputRegionCall = (inputRegion: string) => dispatch => {
  dispatch(setInputRegion(inputRegion));
};

export const inputAlphaCall = (inputAlpha2: string) => dispatch => {
  dispatch(setInputAlpha2(inputAlpha2));
};

export const inputCallCall = (inputCallingCodes: string) => dispatch => {
  dispatch(setInputCallingCode(inputCallingCodes));
};

export const addNumberCall = () => dispatch => {
  dispatch(addCountryNumber());
};


// export const setCountriesCall = (countries: Array<Country>) => dispatch => {
//   dispatch(setCountries(countries));
// };


/*
 * Define the Action type
 */
export type Action = RequestCountriesAction | GetCountriesAction | AddCountryAction | DelCountryAction | SetKeywordAction | SearchCountriesAction | SortCountriesAction | SetInputCountryAction | SetInputCapAction | SetInputRegionAction | SetInputAlphaAction | SetInputCallAction | AddCountryNumberAction;

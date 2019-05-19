import Country from 'models/country';
import { ActionTypes, Action } from 'actions/index';

// Define State interface for the current reducer
export interface State {
    countries: Country[];
    foundCountries: Country[];
    visibleCountries: Country[];
    keyword: string;
    rule: string;
    isFetching: boolean;
    direction: number;
    addOpen: boolean;
    inputCountry: string;
    inputCapital: string;
    inputRegion: string;
    inputAlpha2: string;
    inputCallingCodes: string;
    countryNumber: number;
    redCountry: string;
    redCapital: string;
    redRegion: string;
    redAlpha2: string;
    redCallingCodes: string;
}

// Define initialState
export const initialState: State = {
    countries: [],
    foundCountries: [],
    visibleCountries: [],
    keyword: '',
    rule: 'name',
    isFetching: false,
    direction: 1,
    addOpen: false,
    inputCountry: '',
    inputCapital: '',
    inputRegion: '',
    inputAlpha2: '',
    inputCallingCodes: '',
    countryNumber: 50,
    redCountry: '',
    redCapital: '',
    redRegion: '',
    redAlpha2: '',
    redCallingCodes: '',
};

function compare(origA, origB, a, b, rule, direction) {
    if (rule === 'name') {
        a = a.replace('Å', 'A');
        b = b.replace('Å', 'A');
    }
    if (origA.callingCodes[0] === '1 340' && b && rule === 'call') {
        return 1;
    } else if (origB.callingCodes[0] === '1 340' && a && rule === 'call') {
        return -1;
    }
    if (!a && !b) {
        return 0;
    } else if (!a) {
        return 1;
    } else if (!b) {
        return -1;
    } else if (a > b) {
        return 1*direction;
    } else if (b > a) {
        return -1*direction;
    } else {
        if (rule === 'name') {
            return 0;
        } else {
            return compare(origA, origB, origA.name, origB.name, 'name', direction);
        }
    }
}


/*
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled.
 */
export function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.REQUEST_COUNTRIES: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case ActionTypes.GET_COUNTRIES: {
            return {
                ...state,
                isFetching: false,
                countries: action.payload.countries,
                foundCountries: action.payload.countries,
                visibleCountries: action.payload.countries.slice(0, 50),
                rule: 'name',
                keyword: '',
                addOpen: false,
                inputCountry: '',
                inputCapital: '',
                inputRegion: '',
                inputAlpha2: '',
                inputCallingCodes: '',
                countryNumber: 50,
                redCountry: '',
                redCapital: '',
                redRegion: '',
                redAlpha2: '',
                redCallingCodes: '',
            };
        }

        case ActionTypes.DEL_COUNTRY: {
            const alpha2Code = action.payload.alpha2Code.toUpperCase();
            const countries = state.countries.filter( (country) => {
                return country.alpha2Code.toUpperCase() !== alpha2Code;
            });
            const foundCountries = state.foundCountries.filter( (country) => {
                return country.alpha2Code.toUpperCase() !== alpha2Code;
            });

            return {
                ...state,
                countries: countries,
                foundCountries: foundCountries,
                visibleCountries: foundCountries.slice(0, state.countryNumber),
            };
        }

        case ActionTypes.SET_KEYWORD: {
            return {
                ...state,
                keyword: action.payload.keyword,
            };
        }

        case ActionTypes.SEARCH_COUNTRIES: {
            const keyword = state.keyword.toUpperCase();
            const countries: Country[] = [];
            for (let i = 0; i < state.countries.length; i++) {
                const country = state.countries[i];
                if (country.name.toUpperCase().includes(keyword) ||
          country.alpha2Code.toUpperCase().includes(keyword) ||
          country.callingCodes[0].toUpperCase().includes(keyword) ||
          country.capital.toUpperCase().includes(keyword) ||
          country.region.toUpperCase().includes(keyword)) {
                    countries.push(country);
                }
            }
            return {
                ...state,
                foundCountries: countries,
                visibleCountries: countries.slice(0, state.countryNumber),
            };
        }

        case ActionTypes.SORT_COUNTRIES: {
            let nextDirection = state.direction || 1;
            if (action.payload.rule !== state.rule) {
                nextDirection = 1;
            } else {
                nextDirection *= -1;
            }
            const rule = action.payload.rule || 'name';
            const countriesCopy = state.foundCountries.slice();
            if (rule === 'name') {
                countriesCopy.sort((a, b) => {
                    return compare(a, b, a.name, b.name, rule, nextDirection);
                });
            } else if (rule == 'capital') {
                countriesCopy.sort((a, b) => {
                    return compare(a, b, a.capital, b.capital, rule, nextDirection);
                });
            } else if (rule == 'region') {
                countriesCopy.sort((a, b) => {
                    return compare(a, b, a.region, b.region, rule, nextDirection);
                });
            } else if (rule == 'call') {
                countriesCopy.sort((a, b) => {
                    return compare(a, b, parseInt(a.callingCodes[0]), parseInt(b.callingCodes[0]), rule, nextDirection);
                });
            } else if (rule == 'alpha2') {
                countriesCopy.sort((a, b) => {
                    return compare(a, b, a.alpha2Code, b.alpha2Code, rule, nextDirection);
                });
            }

            return {
                ...state,
                foundCountries: countriesCopy,
                visibleCountries: countriesCopy.slice(0, state.countryNumber),
                rule: action.payload.rule,
                direction: nextDirection,
            };
        }

        case ActionTypes.ADD_COUNTRY: {
            let addOpen = true;
            const countries: Country[] = state.countries.slice();
            const foundCountries: Country[] = state.foundCountries.slice();
            let inputCountry = state.inputCountry;
            let inputCapital = state.inputCapital;
            let inputRegion = state.inputRegion;
            let inputAlpha2 = state.inputAlpha2;
            let inputCallingCodes = state.inputCallingCodes;
            let redCountry = '';
            let redCapital = '';
            let redRegion = '';
            let redAlpha2 = '';
            let redCallingCodes = '';
            if (state.inputCountry && state.inputCapital &&
        state.inputRegion && state.inputAlpha2 && state.inputCallingCodes) {
                let findDuplicates = false;
                for (let i = 0; i < countries.length; i++) {
                    if (countries[i].name === state.inputCountry) {
                        findDuplicates = true;
                        break;
                    }
                }
                if (findDuplicates) {
                    redCountry = 'red';
                } else {
                    const country: Country = {
                        name: state.inputCountry,
                        alpha2Code: state.inputAlpha2,
                        callingCodes: [state.inputCallingCodes],
                        capital: state.inputCapital,
                        region: state.inputRegion,
                    };
                    countries.unshift(country);
                    foundCountries.unshift(country);
                    addOpen = false;
                    inputCountry = '';
                    inputCapital = '';
                    inputRegion = '';
                    inputAlpha2 = '';
                    inputCallingCodes = '';
                }
            } else if (state.addOpen) {
                redCountry = inputCountry === '' ? 'red' : '';
                redCapital = inputCapital === '' ? 'red' : '';
                redRegion = inputRegion === '' ? 'red' : '';
                redAlpha2 = inputAlpha2 === '' ? 'red' : '';
                redCallingCodes = inputCallingCodes === '' ? 'red' : '';
            }

            return {
                ...state,
                countries: countries,
                foundCountries: foundCountries,
                visibleCountries: foundCountries.slice(0, state.countryNumber),
                addOpen: addOpen,
                inputCountry: inputCountry,
                inputCapital: inputCapital,
                inputRegion: inputRegion,
                inputAlpha2: inputAlpha2,
                inputCallingCodes: inputCallingCodes,
                redCountry: redCountry,
                redCapital: redCapital,
                redRegion: redRegion,
                redAlpha2: redAlpha2,
                redCallingCodes: redCallingCodes,
            };
        }

        case ActionTypes.SET_INPUT_COUNTRY: {
            return {
                ...state,
                inputCountry: action.payload.inputCountry,
            };
        }

        case ActionTypes.SET_INPUT_CAPITAL: {
            return {
                ...state,
                inputCapital: action.payload.inputCapital,
            };
        }

        case ActionTypes.SET_INPUT_REGION: {
            return {
                ...state,
                inputRegion: action.payload.inputRegion,
            };
        }

        case ActionTypes.SET_INPUT_ALPHA2: {
            return {
                ...state,
                inputAlpha2: action.payload.inputAlpha2,
            };
        }

        case ActionTypes.SET_INPUT_CALLINGCODES: {
            return {
                ...state,
                inputCallingCodes: action.payload.inputCallingCodes,
            };
        }

        case ActionTypes.ADD_COUNTRY_NUMBER: {
            return {
                ...state,
                visibleCountries: state.foundCountries.slice(0, state.countryNumber + 50),
                countryNumber: state.countryNumber + 50,
            };
        }

        default:
            return state;
    }
}

import * as React from 'react';
import { connect } from 'react-redux';
import { fetchData, deleteCountryCall, addNumberCall } from 'actions';
import { State } from 'reducers';
import { getVisibleCountries, getIsFetching } from 'selectors';
import Country from 'models/country';
import Buttons from 'components/Buttons';
import SVG from 'react-inlinesvg';
import LazyLoad from 'react-lazyload';
import throttle from 'lodash.throttle'
import gun from 'assets/gun.svg';


interface Props {
  countries: Array<Country>,
  isFetching: boolean,
  requestWorld: () => void,
  deleteContry: (string) => void,
  addNumberByScroll: () => void,
}

class List extends React.Component<Props, {}> {
    private _throttledLoad;
    constructor(props) {
        super(props);
        this.removeCountry = this.removeCountry.bind(this);
        this._throttledLoad = throttle(
            this.props.addNumberByScroll
            , 1000, { trailing: false });
    }

    handleScroll = (event) => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = Math.round(windowHeight + window.pageYOffset);
        if (windowBottom >= docHeight) {
            setTimeout(
            this._throttledLoad
            , 500);
        }
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    removeCountry(alpha2Code: string) {
        this.props.deleteContry(alpha2Code);
    }

    componentDidMount() {
        this.props.requestWorld();
    }

    renderCountries() {
        return this.props.countries.map(country => {
            return (
                <li className="country-wrap" key={country.alpha2Code}>
                    <div className="flag-wrap">
                        <div className="image">
                            <LazyLoad>
                                <img className="flag" src={`https://www.countryflags.io/${country.alpha2Code}/flat/64.png`}/>
                            </LazyLoad>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="name field">
                            <span>
                                {country.name || "Not Found"}
                            </span>
                        </div>
                        <div className="capital field">
                            <span>
                                {country.capital || "Not Found"}
                            </span>
                        </div>
                        <div className="region field">
                            <span>
                                {country.region || "Not Found"}
                            </span>
                        </div>
                        <div className="alpha2Code field">
                            <span>
                                {country.alpha2Code || "Not Found"}
                            </span>
                        </div>
                        <div className="callingCodes field">
                            <span>
                                {country.callingCodes[0] || "Not Found"}
                            </span>
                        </div>
                        <div className="delete field">
                            <div className="gun-wrap" onClick={ () => this.removeCountry(country.alpha2Code) }>
                                <SVG className="icon gun" src={ gun }/>
                            </div>
                        </div>
                    </div>
                </li>
            );
        })
    }

    render() {
        return (
            <div className="list-wrapper">
                <Buttons/>
                <ul className="country-list">
                    {this.renderCountries()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
  countries: getVisibleCountries(state),
  isFetching: getIsFetching(state),
});

const mapDispatchToProps = {
  requestWorld: fetchData,
  deleteContry: deleteCountryCall,
  addNumberByScroll: addNumberCall,
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

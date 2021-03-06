import React from 'react';
import { connect } from 'react-redux';
import { fetchData, deleteCountryCall, addNumberCall } from 'actions';
import { State } from 'reducers';
import { getVisibleCountries, getIsFetching } from 'selectors';
import Country from 'models/country';
import Buttons from 'components/Buttons';
import SVG from 'react-inlinesvg';
import LazyLoad from 'react-lazyload';
import throttle from 'lodash.throttle';
import gun from 'assets/gun.svg';


interface Props {
    countries: Country[];
    isFetching: boolean;
    requestWorld: () => void;
    deleteCountry: (string) => void;
    addNumberByScroll: () => void;
}

class List extends React.Component<Props, {}> {
    private readonly _throttledLoad;

    constructor(props) {
        super(props);
        this.removeCountry = this.removeCountry.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this._throttledLoad = throttle(
            this.props.addNumberByScroll,
            1000, { trailing: false },
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.props.requestWorld();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const { body } = document;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = Math.round(windowHeight + window.pageYOffset);
        if (windowBottom >= docHeight) {
            setTimeout(
                this._throttledLoad,
                500,
            );
        }
    }

    removeCountry(alpha2Code: string) {
        this.props.deleteCountry(alpha2Code);
    }

    renderCountries() {
        return this.props.countries.map(country => (
            <li className="country-wrap" key={country.alpha2Code}>
                <div className="flag-wrap">
                    <div className="image">
                        <LazyLoad>
                            <img className="flag" alt="flag" src={`https://www.countryflags.io/${country.alpha2Code}/flat/64.png`} />
                        </LazyLoad>
                    </div>
                </div>
                <div className="fields">
                    <div className="name field">
                        <span>
                            { country.name || 'Not Found' }
                        </span>
                    </div>
                    <div className="capital field">
                        <span>
                            { country.capital || 'Not Found' }
                        </span>
                    </div>
                    <div className="region field">
                        <span>
                            { country.region || 'Not Found' }
                        </span>
                    </div>
                    <div className="alpha2Code field">
                        <span>
                            { country.alpha2Code || 'Not Found' }
                        </span>
                    </div>
                    <div className="callingCodes field">
                        <span>
                            { country.callingCodes[0] || 'Not Found' }
                        </span>
                    </div>
                    <div className="delete field">
                        <div className="gun-wrap" onClick={ () => this.removeCountry(country.alpha2Code) }>
                            <SVG className="icon gun" src={ gun } />
                        </div>
                    </div>
                </div>
            </li>
        ));
    }

    render() {
        return (
            <div className="list-wrapper">
                <Buttons />
                <ul className="country-list">
                    { this.renderCountries() }
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
    deleteCountry: deleteCountryCall,
    addNumberByScroll: addNumberCall,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

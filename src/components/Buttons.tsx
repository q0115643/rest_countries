import * as React from 'react';
import { FaRegFlag } from 'react-icons/fa';
import { connect } from 'react-redux';
import { sortCountriesCall, fetchData } from 'actions';
import { State } from 'reducers';
import { getRule, getDirection, getIsFetching } from 'selectors';


interface Props {
    rule: string;
    direction: number;
    isFetching: boolean;
    sortWorld: (string) => void;
    requestWorld: () => void;
}

interface ButtonState {
    country: string;
    capital: string;
    region: string;
    alpha2: string;
    call: string;
    reset: string;
}

class Buttons extends React.Component<Props, ButtonState> {
    constructor(props) {
        super(props);

        this.state = {
            country: 'button up',
            capital: 'button',
            region: 'button',
            alpha2: 'button',
            call: 'button',
            reset: 'button',
        };

        this.resetClick = this.resetClick.bind(this);
        this.sortByNameClick = this.sortByNameClick.bind(this);
        this.sortByCapClick = this.sortByCapClick.bind(this);
        this.sortByRegClick = this.sortByRegClick.bind(this);
        this.sortByAlphaClick = this.sortByAlphaClick.bind(this);
        this.sortByCallClick = this.sortByCallClick.bind(this);
    }

    async resetClick() {
        // reset by re-fetching data
        await this.props.requestWorld();
        this.setState({
            country: 'button up',
            capital: 'button',
            region: 'button',
            alpha2: 'button',
            call: 'button',
        });
    }

    async sortByNameClick() {
        await this.props.sortWorld('name');
        if (this.props.direction === 1) {
            this.setState({
                country: 'button up',
                capital: 'button',
                region: 'button',
                alpha2: 'button',
                call: 'button',
            });
        } else {
            this.setState({
                country: 'button down',
                capital: 'button',
                region: 'button',
                alpha2: 'button',
                call: 'button',
            });
        }
    }

    async sortByCapClick() {
        await this.props.sortWorld('capital');
        if (this.props.direction === 1) {
            this.setState({
                country: 'button',
                capital: 'button up',
                region: 'button',
                alpha2: 'button',
                call: 'button',
            });
        } else {
            this.setState({
                country: 'button',
                capital: 'button down',
                region: 'button',
                alpha2: 'button',
                call: 'button',
            });
        }
    }

    async sortByRegClick() {
        await this.props.sortWorld('region');
        if (this.props.direction === 1) {
            this.setState({
                country: 'button',
                capital: 'button',
                region: 'button up',
                alpha2: 'button',
                call: 'button',
            });
        } else {
            this.setState({
                country: 'button',
                capital: 'button',
                region: 'button down',
                alpha2: 'button',
                call: 'button',
            });
        }
    }

    async sortByAlphaClick() {
        await this.props.sortWorld('alpha2');
        if (this.props.direction === 1) {
            this.setState({
                country: 'button',
                capital: 'button',
                region: 'button',
                alpha2: 'button up',
                call: 'button',
            });
        } else {
            this.setState({
                country: 'button',
                capital: 'button',
                region: 'button',
                alpha2: 'button down',
                call: 'button',
            });
        }
    }

    async sortByCallClick() {
        await this.props.sortWorld('call');
        if (this.props.direction === 1) {
            this.setState({
                country: 'button',
                capital: 'button',
                region: 'button',
                alpha2: 'button',
                call: 'button up',
            });
        } else {
            this.setState({
                country: 'button',
                capital: 'button',
                region: 'button',
                alpha2: 'button',
                call: 'button down',
            });
        }
    }

    render() {
        return (
            <div className="buttons-wrap">
                <div className="reset-wrap" onClick={ this.resetClick }>
                    <div className="flag-icon-wrap">
                        <FaRegFlag className="icon flag"/>
                    </div>
                    <div className="button-wrap">
                        <span className="reset">
                            reset
                        </span>
                    </div>
                </div>
                <div className="button-list">
                    <div className="button-wrap">
                        <label>
                            <input
                                type="button"
                                name="react-tips"
                                value="country"
                                onClick={ this.sortByNameClick }
                                className={ this.state.country }
                            />
                            <span className="country">
                                country
                            </span>
                        </label>
                    </div>
                    <div className="button-wrap">
                        <label>
                            <input
                                type="button"
                                name="react-tips"
                                value="cap."
                                onClick={ this.sortByCapClick }
                                className={ this.state.capital }
                            />
                            <span className="capital">
                                cap.
                            </span>
                        </label>
                    </div>
                    <div className="button-wrap">
                        <label>
                            <input
                                type="button"
                                name="react-tips"
                                value="region"
                                onClick={ this.sortByRegClick }
                                className={ this.state.region }
                            />
                            <span className="region">
                                region
                            </span>
                        </label>
                    </div>
                    <div className="button-wrap">
                        <label>
                            <input
                                type="button"
                                name="react-tips"
                                value="alpha-2"
                                onClick={ this.sortByAlphaClick }
                                className={ this.state.alpha2 }
                            />
                            <span className="alpha">
                                alpha-2
                            </span>
                        </label>
                    </div>
                    <div className="button-wrap">
                        <label>
                            <input
                                type="button"
                                name="react-tips"
                                value="call"
                                onClick={ this.sortByCallClick }
                                className={ this.state.call }
                            />
                            <span className="call">
                                call
                            </span>
                        </label>
                    </div>
                    <div className="button-wrap remove-wrap">
                        <span className="remove">
                            remove
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    direction: getDirection(state),
    rule: getRule(state),
    isFetching: getIsFetching(state),
});

const mapDispatchToProps = {
    sortWorld: sortCountriesCall,
    requestWorld: fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);

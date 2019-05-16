import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'reducers';
import { getInputCountry, getInputCapital,
    getInputRegion, getInputAlpha2,
    getInputCallingCodes, getRedCountry,
    getRedCapital, getRedRegion,
    getRedAlpha2, getRedCallingCodes } from 'selectors';
import { inputCountryCall, inputCapitalCall,
    inputRegionCall, inputAlphaCall, inputCallCall } from 'actions';


interface Props {
  inputCountry: string,
  inputCapital: string,
  inputRegion: string,
  inputAlpha2: string,
  inputCallingCodes: string,
  changeCountryInput: (string) => void,
  changeCapInput: (string) => void,
  changeRegionInput: (string) => void,
  changeAlpha2Input: (string) => void,
  changeCallInput: (string) => void,
  redCountry: string,
  redCapital: string,
  redRegion: string,
  redAlpha2: string,
  redCallingCodes: string,
}

interface BoxState {
    countrySearchBox: string,
    capitalSearchBox: string,
    regionSearchBox: string,
    alphaSearchBox: string,
    callSearchBox: string,
}

class Add extends React.Component<Props, BoxState> {
    constructor(props) {
        super(props);
        this.state= {
            countrySearchBox: "searchbox",
            capitalSearchBox: "searchbox",
            regionSearchBox: "searchbox",
            alphaSearchBox: "searchbox",
            callSearchBox: "searchbox",
        };
        this.changeCountryValue = this.changeCountryValue.bind(this);
        this.changeCapitalValue = this.changeCapitalValue.bind(this);
        this.changeRegionValue = this.changeRegionValue.bind(this);
        this.changeAlpha2Value = this.changeAlpha2Value.bind(this);
        this.changeCallValue = this.changeCallValue.bind(this);
    }

    changeCountryValue(event) {
        const value = event.target.value;
        this.props.changeCountryInput(value);
    }
    changeCapitalValue(event) {
        const value = event.target.value;
        this.props.changeCapInput(value);
    }
    changeRegionValue(event) {
        const value = event.target.value;
        this.props.changeRegionInput(value);
    }
    changeAlpha2Value(event) {
        const value = event.target.value;
        this.props.changeAlpha2Input(value);
    }
    changeCallValue(event) {
        const value = event.target.value;
        this.props.changeCallInput(value);
    }

    render() {
        return (
            <div className="add-wrap">
                <div className="input-list-wrap">
                    <div className="input-wrap">
                        <input
                            type="text"
                            className={`${this.state.countrySearchBox} ${this.props.redCountry}`}
                            value={this.props.inputCountry}
                            placeholder="country"
                            onChange={this.changeCountryValue}
                            onFocus={() => this.setState({ countrySearchBox: `searchbox active` })}
                            onBlur={() => this.setState({ countrySearchBox: `searchbox` })}
                        />
                    </div>
                    <div className="input-wrap">
                        <input
                            type="text"
                            className={`${this.state.capitalSearchBox} ${this.props.redCapital}`}
                            value={this.props.inputCapital}
                            placeholder="capital"
                            onChange={this.changeCapitalValue}
                            onFocus={() => this.setState({ capitalSearchBox: `searchbox active` })}
                            onBlur={() => this.setState({ capitalSearchBox: `searchbox` })}
                        />
                    </div>
                    <div className="input-wrap">
                        <input
                            type="text"
                            className={`${this.state.regionSearchBox} ${this.props.redRegion}`}
                            value={this.props.inputRegion}
                            placeholder="region"
                            onChange={this.changeRegionValue}
                            onFocus={() => this.setState({ regionSearchBox: `searchbox active` })}
                            onBlur={() => this.setState({ regionSearchBox: `searchbox` })}
                        />
                    </div>
                    <div className="input-wrap">
                        <input
                            type="text"
                            className={`${this.state.alphaSearchBox} ${this.props.redAlpha2}`}
                            value={this.props.inputAlpha2}
                            placeholder="alpha2"
                            onChange={this.changeAlpha2Value}
                            onFocus={() => this.setState({ alphaSearchBox: `searchbox active` })}
                            onBlur={() => this.setState({ alphaSearchBox: `searchbox` })}
                        />
                    </div>
                    <div className="input-wrap">
                        <input
                            type="text"
                            className={`${this.state.callSearchBox} ${this.props.redCallingCodes}`}
                            value={this.props.inputCallingCodes}
                            placeholder="call"
                            onChange={this.changeCallValue}
                            onFocus={() => this.setState({ callSearchBox: `searchbox active` })}
                            onBlur={() => this.setState({ callSearchBox: `searchbox` })}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    inputCountry: getInputCountry(state),
    inputCapital: getInputCapital(state),
    inputRegion: getInputRegion(state),
    inputAlpha2: getInputAlpha2(state),
    inputCallingCodes: getInputCallingCodes(state),
    redCountry: getRedCountry(state),
    redCapital: getRedCapital(state),
    redRegion: getRedRegion(state),
    redAlpha2: getRedAlpha2(state),
    redCallingCodes: getRedCallingCodes(state),
});

const mapDispatchToProps = {
    changeCountryInput: inputCountryCall,
    changeCapInput: inputCapitalCall,
    changeRegionInput: inputRegionCall,
    changeAlpha2Input: inputAlphaCall,
    changeCallInput: inputCallCall,
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);

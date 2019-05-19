import * as React from 'react';
import {connect} from 'react-redux';
import {State} from 'reducers';
import {getKeyword, getAddOpen} from 'selectors';
import {searchCountriesCall, addOpenCall, setKeywordCall} from 'actions';
import debounce from 'lodash.debounce';


interface Props {
    keyword: string;
    addInputForm: boolean;
    searchWorld: () => void;
    addCountryStart: () => void;
    setKeyword: (string) => void;
}

interface SearchState {
    label: string;
    searchBox: string;
    addButton: string;
}

class Search extends React.Component<Props, SearchState> {
    private _debouncedSearch;
    constructor(props) {
        super(props);
        this.state= {
            label: 'search for',
            searchBox: 'searchbox',
            addButton: 'button',
        };
        this.changeValue = this.changeValue.bind(this);
        this.addCountry = this.addCountry.bind(this);
        this._debouncedSearch = debounce(this.props.searchWorld, 200);
        this.checkKey = this.checkKey.bind(this);
    }

    changeValue(event) {
        const value = event.target.value;
        this.props.setKeyword(value);
        this._debouncedSearch();
    }

    addCountry() {
        this.props.addCountryStart();
    }

    checkKey(e) {
        if (e.key==='Enter') {
            this.props.searchWorld();
        }
    }

    render() {
        return (
            <div className="search-wrap">
                <div className="add-button">
                    <span className="add" onClick={this.addCountry}>
                        add
                    </span>
                </div>
                <div className="input-wrap">
                    <input
                        type="text"
                        className={this.state.searchBox}
                        value={this.props.keyword}
                        placeholder={this.state.label}
                        onChange={this.changeValue}
                        onKeyPress={this.checkKey}
                        onFocus={() => this.setState({searchBox: 'searchbox active'})}
                        onBlur={() => this.setState({searchBox: 'searchbox'})}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    keyword: getKeyword(state),
    addInputForm: getAddOpen(state),
});

const mapDispatchToProps = {
    searchWorld: searchCountriesCall,
    addCountryStart: addOpenCall,
    setKeyword: setKeywordCall,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

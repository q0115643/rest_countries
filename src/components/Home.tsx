import * as React from 'react';
import List from 'components/List';
import Search from 'components/Search';
import Add from 'components/Add';
import {connect} from 'react-redux';
import {State} from 'reducers';
import {getAddOpen} from 'selectors';


interface Props {
    addInputForm: boolean;
};

class Home extends React.Component<Props, {}> {
    render() {
        return (
            <div className="home-wrapper">
                <div className="top-wrapper">
                    <div className="description-wrap main-pad">
                        <div className="description">
                            Information about
                            <br/>
                            Countries of the World
                        </div>
                    </div>
                </div>
                <div className="main main-pad">
                    {this.props.addInputForm ? <Add/> : ''}
                    <Search/>
                    <List/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    addInputForm: getAddOpen(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

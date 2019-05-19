import React, {lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {State} from 'reducers';
import {getAddOpen} from 'selectors';
const Add = lazy(() => import('components/Add'));
const List = lazy(() => import('components/List'));
const Search = lazy(() => import('components/Search'));


interface Props {
    addInputForm: boolean;
}

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
                    <Suspense fallback={<div>Loading...</div>}>
                        {this.props.addInputForm ? <Add/> : ''}
                        <Search/>
                        <List/>
                    </Suspense>
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

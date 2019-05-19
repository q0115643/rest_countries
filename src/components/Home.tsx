import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { State } from 'reducers';
import { getAddOpen } from 'selectors';
declare const importName: any;
const Add = lazy(() => importName('components/Add', 'Add'));
const List = lazy(() => importName('components/List', 'List'));
const Search = lazy(() => importName('components/Search', 'Search'));


interface Props {
    addInputForm: boolean;
}

const Home: React.FC<Props> = (props: Props) => (
    <div className="home-wrapper">
        <div className="top-wrapper">
            <div className="description-wrap main-pad">
                <div className="description">
                    Information about
                    <br />
                    Countries of the World
                </div>
            </div>
        </div>
        <div className="main main-pad">
            <Suspense fallback={ <div>Loading...</div> }>
                { props.addInputForm ? <Add /> : '' }
                <Search />
                <List />
            </Suspense>
        </div>
    </div>
);

const mapStateToProps = (state: State) => ({
    addInputForm: getAddOpen(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

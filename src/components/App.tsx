import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import isTouchDevice from 'is-touch-device';
import '../styles/main.scss';
import site from 'config.yml';
import Header from 'components/Header';
import Footer from 'components/Footer';
declare const importName: any;
const Home = lazy(() => importName('components/Home', 'Home'));
const About = lazy(() => importName('components/About', 'About'));
const Page404 = lazy(() => importName('components/Page404', 'Page404'));


interface State {
    touch: boolean;
}

class App extends React.Component<{}, State> {
    state: State = {
        touch: isTouchDevice(),
    };

    render() {
        return (
            <div className="app" data-is-touch={ this.state.touch }>
                <Helmet>
                    <title>{ site.title }</title>
                    <meta
                        name="description"
                        content={ site.description }
                    />
                </Helmet>
                <div className="site">
                    <Header />
                    <main className="site-content">
                        <Suspense fallback={ <div>Loading...</div> }>
                            <Switch>
                                <Route exact path="/" component={ Home } />
                                <Route path="/about" component={ About } />
                                <Route component={ Page404 } />
                            </Switch>
                        </Suspense>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;

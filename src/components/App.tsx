import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {About, Page404, Header, Footer} from 'components';
import Home from 'components/Home';
import isTouchDevice from 'is-touch-device';
import '../styles/main.scss';
import site from 'config.yml';


interface State {
    touch: boolean;
}

export class App extends React.Component<{}, State> {
    state: State = {
        touch: isTouchDevice(),
    };

    render() {
        return (
            <div className="app" data-is-touch={this.state.touch}>
                <Helmet>
                    <title>{ site.title }</title>
                    <meta
                        name="description"
                        content={ site.description }
                    />
                </Helmet>
                <div className="site">
                    <Header/>
                    <main className="site-content">
                        <Switch>
                            <Route exact path="/" component={ Home }/>
                            <Route path="/about" component={ About }/>
                            <Route component={ Page404 } />
                        </Switch>
                    </main>
                    <Footer/>
                </div>
            </div>
        );
    }
}

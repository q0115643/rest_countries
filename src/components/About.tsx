import * as React from 'react';
import site from 'config.yml';


export class About extends React.Component<{}> {
    render() {
        return (
            <div className="about-wrap main-pad">
                <div className="about">
                    { site.description }
                    <br/>
                    <br/>
                    <a href={ site.github_repo } target="_blank" rel="noopener noreferrer">view on github</a>
                </div>
            </div>
        );
    }
}

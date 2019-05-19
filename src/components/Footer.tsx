import * as React from 'react';
import SVG from 'react-inlinesvg';
import {FaEnvelope} from 'react-icons/fa';
import site from 'config.yml';
import blog from 'assets/blog.svg';
import github from 'assets/github.svg';


export const Footer: React.FC<{}> = () => {
    return (
        <div className="footer-wrap main-pad">
            <div className="footer">
                <div className="site-info">
                    <span className="copyright-symbol">
                        ©
                    </span>
                    <span className="copyright-date">
                        { site.copyright_date }
                    </span>
                    <a className="nickname" title="만든 사람 블로그" href="https://rokrokss.com/" target="_blank" rel="noopener noreferrer">
                        { site.author.nickname }
                    </a>
                </div>
                <div className="author-info">
                    <a className="mail" title="메일" href="mailto:hyungrok.kim@kaist.ac.kr">
                        <span>
                            <FaEnvelope className="icon mail"/>
                        </span>
                    </a>
                    <a className="blog" title="블로그" href="https://rokrokss.com" target="_blank" rel="noopener noreferrer">
                        <SVG className="icon blog" src={ blog }/>
                    </a>
                    <a className="github" title="깃헙" href="https://github.com/q0115643" target="_blank" rel="noopener noreferrer">
                        <SVG className="icon github" src={ github }/>
                    </a>
                </div>
            </div>
        </div>
    );
};

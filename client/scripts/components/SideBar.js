import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router';
import { push } from 'react-router-redux';
import autobind from 'autobind-decorator';

import {Navbar, Nav, NavItem, Button, Input, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Loading from './Loading';
import Footer from './Footer';
import {loadWatching} from '../redux/modules/watchlist';

@connect(state => state)
export default class SideBar extends React.Component {

    componentDidMount(){
        this.props.dispatch(loadWatching())
    }

    render () {

        const {watchlist: {ids, entities, loading}} = this.props;

        let watching = null;

        if(loading){
            watching = <Loading />;
        }else if(ids.length === 0){
            watching = <p>You are not watching any playlist.</p>
        }else{
            watching = ids.map(i => {
                const item = entities[i];
                return (
                    <li key={i}>
                        <Link to={`/watching/${i}`} activeClassName="active">
                            <img src={item.cover}/>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                )
            })
        }

        const sidebarOn = this.props.uistate.sidebarOn;
        const _style = classNames('sidebar', {
            'hidden-sm hidden-xs': !sidebarOn
        });

        return (
            <div className={_style} >
                <div className="dashboard-nav">
                    <div className="text-center brand">
                        <a href="#">
                            radiole
                            <i className="fa fa-volume-up" />
                        </a>
                    </div>
                    <ul className="menus list-unstyled">
                        <li>
                            <Link to="/home" activeClassName="active">
                                <i className="fa fa-home"></i>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" activeClassName="active">
                                <i className="fa fa-cog"></i>
                                Settings
                            </Link>
                        </li>
                        <li>
                            <a href="/auth/logout">
                                <i className="fa fa-sign-out">
                                </i>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
                <hr />
                <div className="now-watch">
                    <p><Link to="/watching">Now watching</Link></p>
                    <ul className="watch-list list-unstyled">
                        {watching}
                    </ul>
                </div>
                <Footer />
            </div>
        )
    }
}
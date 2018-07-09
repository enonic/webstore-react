import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

// Containers
import UserPage from './containers/userPage';
import AdminPage from './containers/adminPage';
import NotFound from './containers/notFoundPage';
import TopBar from './containers/TopBar'; 
import SideBar from "./containers/SideBar"; 


// Testing 
import UserViewComponent from './components/UserViewComponent';

export default class App extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            menuVisible : false
        }
    }

    toggleMenu() {
        this.setState({
            menuVisible : !this.state.menuVisible
        }); 
    }
    
    render () {
        return (
            <div>
                <Switch>
                    <Route path="/" component={AdminPage} />
                    <Route path="/user" component={UserPage} />
                    <Route component={NotFound} />
                </Switch>
                {/*<TopBar onToggleMenu={this.toggleMenu.bind(this)}/>
                        'true' to open 
                <SideBar open={this.state.menuVisible} onToggleMenu={this.toggleMenu.bind(this)}/>
                <UserViewComponent/>*/}
            </div>
        )
    }
}
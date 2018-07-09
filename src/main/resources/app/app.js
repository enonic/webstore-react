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
    
    render () {
        return (
            <div>
                <Switch>
                    <Route path="/" component={AdminPage} />
                    <Route path="/user" component={UserPage} />
                    <Route component={NotFound} />
                </Switch>
                
            </div>
        )
    }
}

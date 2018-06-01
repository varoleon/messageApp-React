import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Whoops404 } from './components/Whoops404'
// import { WelcomePage } from './components/WelcomePage'
// import { Menu } from './components/Menu';
// import { SignUp } from './authentication/SignUp';
// import { Login } from './authentication/Login';

// import './stylesheets/bootstrap.css'
// import './stylesheets/style.css'
import { App } from './components/App';
// import { SendMessage } from './components/SendMessage';
// import { LoginRegisterPanel } from './authentication/LoginRegisterPanel';






render(
    <HashRouter>
        <div>
            {/* <Menu /> */}
            {/* <hr /> */}
            {/* <SignUp /> */}
            {/* <WithFetching /> */}


            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/messages" component={App} />
                <Route path="/sendmsg" component={App} /> 
                <Route path="/adminpanel" component={App} /> 
                {/* <Route path="/signup" component={LoginRegisterPanel} />
                {/* <Route path="/mainapp" component={MainApp} /> */}

                <Route path="*" component={Whoops404} />
            </Switch>
        </div>
    </HashRouter>,
    document.getElementById('react-container')
)
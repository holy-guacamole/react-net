import React from 'react'
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './createStore/createStore'
import Posts from './components/Posts'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ProfilePage from './components/ProfilePage'
import Header from './components/Header'
import Post from './components/Post'
import Comment from './components/Comment'
import App from './App'

const isUserLoggined = () => {
  if (
    localStorage.getItem('access-token') &&
    localStorage.getItem('uid') &&
    localStorage.getItem('client')
  ) {
    store.dispatch({type: 'FETCH_USER_PROFILE'})
    return true
  }
  else {
    return false
  }
}

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} 
      render={props => 
        !(isUserLoggined())
        ? <Redirect to='/login' />
        : <Component {...rest} {...props} />
      } 
    />
  )
}

const PublicRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} 
      render={props => 
        isUserLoggined() 
        ? <Redirect to='/posts' />
        : <Component {...rest} {...props} />
      } 
    />
  )
}

ReactDOM.render(
    <Provider store ={ store }>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={ App }>
            <Header />
            <PublicRoute path='/' component={ Login } exact /> 
            <PublicRoute path='/signup' component={ SignUp } exact/> 
            <PublicRoute path='/login' component={ Login } exact /> 
            <PrivateRoute path='/posts' component={ Posts } exact />
            <PrivateRoute path='/posts/:id' component={ Post } /> 
            <PrivateRoute path='/comments/:id' component={ Comment } />
            <PrivateRoute path='/user' component={ ProfilePage } />
          </Route>            
        </Switch>
      </BrowserRouter>  
    </Provider>,
  document.getElementById('root')
)
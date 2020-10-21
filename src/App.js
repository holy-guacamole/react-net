import React from 'react'
import { Link} from 'react-router-dom'
import './App.css'

class App extends React.Component {
    render() {
        return(
            <div>            
                <div className ='container'>
                    <ul className= "nav">
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/user">Profile</Link>
                        </li>
                        <li>
                            <Link to="/posts">Posts</Link>
                        </li>
                    </ul>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../styles/SignUp.css'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { store } from '../createStore/createStore'

export class SignUp extends Component {
    constructor() {
        super()
        this.state = {
                email: '',
                password: '',
                passwrod_confirmation: '',
                first_name: '',
                last_name: '',
                email_error: false,
                password_error: false,
                passwrod_confirmation_error: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const {name, value} = evt.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.email == '') {
            this.setState({
                email_error: true
            })
        } 

        if (this.state.password == '') {
            this.setState({
                password_error: true
            })
        }

        if (this.state.passwrod_confirmation == '') {
            this.setState({
                passwrod_confirmation_error: true
            })
        }

        if (!(this.state.email == '') && !(this.state.password == '') && !(this.state.passwrod_confirmation== '')) {
            if (this.state.password===this.state.passwrod_confirmation) {
                store.dispatch({type: 'FETCH_REGISTER_USER', body: this.state})
            } else {
                alert('passwords do not match!')
            }
        } else {
            alert('complete all fields!')
        } 
    }

    render() {
        const { email, password, passwrod_confirmation, first_name, last_name} = this.state
        if (this.props.user.redirect) {
            return <div><Redirect to='/posts' /></div> 
        } 
        return(
            <div className = "signup">
                <Typography 
                    variant="h4" 
                    gutterBottom>
                        Sign Up
                </Typography>
                <form className="{classes.root} signup-form" name ="signup-form"  noValidate autoComplete="off" onSubmit = {this.handleSubmit}>
                    <TextField
                        error={ this.state.email_error ? true: false}
                        type="email"
                        name="email"
                        label="email"
                        onChange={this.handleChange}
                        value={email}
                        onSubmit={this.handleSubmit}
                        required={true}
                    />
                     <TextField 
                        error={ this.state.password_error ? true: false}
                        type ="password" 
                        name = "password" 
                        label="password" 
                        onChange ={this.handleChange} 
                        value ={password}  
                        onSubmit = {this.handleSubmit} 
                        required={true}
                    />
                    <TextField 
                        error={ this.state.passwrod_confirmation_error ? true: false}
                        type = "password" 
                        name = "passwrod_confirmation" 
                        onChange ={this.handleChange} 
                        label="confirm password" 
                        value ={passwrod_confirmation}  
                        onSubmit = {this.handleSubmit} 
                        required={true}
                    />
                    <TextField 
                        type = "text" 
                        name = "first_name" 
                        label="first name" 
                        onChange ={this.handleChange}
                        value ={first_name}  
                        onSubmit = {this.handleSubmit} 
                    />
                    <TextField 
                        type = "text" 
                        name = "last_name" 
                        label = "last name" 
                        onChange ={this.handleChange} 
                        value ={last_name} 
                        onSubmit = {this.handleSubmit} />
                        <br/>
                    <Button 
                        type ="submit" 
                        className="signup-submit button" 
                        variant="contained" 
                        color="primary">
                                Sign Up
                    </Button>
                    <Link to="/login" className="button">
                        <Button 
                            variant="contained" 
                            color="primary">
                                Cancel
                        </Button>
                    </Link>
                </form>
            </div>
            )
        }
    }

const mapStateToProps = store => {
    return {
        user: store.user,
    }
}

export default connect(mapStateToProps)(SignUp)
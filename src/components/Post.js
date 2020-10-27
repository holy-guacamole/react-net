import React, { Component } from 'react'
import "../styles/Post.css"
import List from './List'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import { store } from '../createStore/createStore'

export class Post extends Component {
    constructor () {
        super()
        this.state = { 
            user_id: null,
            created_at: '',
            title: '',
            description: '',
            message: '',
            reduct: false,
            isAdded: false,
            isVisible: false,
            loading: false,
            
        }

        this.handleReduct = this.handleReduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCommentClear = this.handleCommentClear.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleShowComments = this.handleShowComments.bind(this)
        this.handleHideComments = this.handleHideComments.bind(this)
        this.handleSaveComment = this.handleSaveComment.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id || ''
        store.dispatch({type: 'FETCH_POST', body: id})
        
        this.setState({
            title: this.props.post.title,
            description: this.props.post.description,
        })
    }
    

    handleReduct() {
        this.setState({
            reduct: true,
            isVisible: false
        })
    }

    handleCancel(e) {
        e.preventDefault()
        this.setState ({
            reduct: false
        })   
    }

    handleCommentClear(e) {
        e.preventDefault()
        this.setState ({
            message: '',
        })
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleSave() {
        const id = this.props.match.params.id || ''
        const { title, description } = this.state
        let post = {title,
                    description}
        store.dispatch({type: 'FETCH_SAVE_POST', body: {id, post}})
        this.setState({
            reduct: false
        })
        }

    handleDelete() {
        const id = this.props.match.params.id || ''
        store.dispatch({type: 'FETCH_DELETE_POST', body: id})
        this.props.history.goBack()
    }

    handleShowComments() {
        this.setState({
            isVisible: true
        })  
    }

    handleHideComments() {
        this.setState({
            isVisible: false
        })
    }

    handleSaveComment(e) {
        e.preventDefault()
        this.setState({
            message: '',
        })
        const id = this.props.match.params.id || ''
        const { message } = this.state
        let post_data = this.props.post
        let body = {
            message,
            commentable_type: "Post",
            commentable_id: post_data.id
        }
        store.dispatch({type: 'FETCH_ADD_COMMENT', body: {id, body}})
    }

    render() {
        const { user_id, created_at, title, description } = this.props.post
        const { id } = this.props.user
        const { reduct, isVisible } = this.state
        const { message } = this.state

        const { post_loading } = this.props.one_post
        if (post_loading) {
            return <div className=""><h2>posts</h2></div>
        }
        
        return (
            <div className="post-form">
                <form className = "{classes.root} box-post-edit" noValidate autoComplete="off">
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                {reduct ? 
                                    (
                                    <div>
                                        <div className="post-edit-form">
                                            <TextField
                                                id="outlined-password-input"
                                                label="title"
                                                name="title"
                                                type="text"
                                                autoComplete="current-password"
                                                variant="outlined"
                                                onChange ={this.handleChange} 
                                                defaultValue = {title}
                                            />
                                            <br/>
                                            <TextField
                                                id="outlined-password-input"
                                                label="description"
                                                name="description"
                                                type="text"
                                                autoComplete="current-password"
                                                variant="outlined"
                                                onChange ={this.handleChange} 
                                                defaultValue = {description}
                                            />
                                        </div>
                                        <div className="submit-btns">
                                            <Button 
                                                type ="submit" 
                                                variant="contained" 
                                                color="primary" 
                                                className="controlled-buttons"
                                                onClick ={this.handleSave}>
                                                    save post
                                            </Button>
                                            <span className="margin-span">  </span>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                className="controlled-buttons"
                                                onClick ={this.handleCancel}>
                                                    cancel
                                            </Button>
                                        </div>
                                    </div>
                                    ) 
                                    :
                                    (
                                    <div className="posts-edit">
                                        <h3>Created by <i>{user_id}</i> at <i>{created_at}</i></h3>
                                        <div className="post-box">
                                            <p>{title}</p>
                                            <p>{description}</p>
                                        </div>
                                        {id===user_id ?
                                            (<div className = "post-buttons">
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    onClick={this.handleReduct} >
                                                        edit post
                                                </Button>
                                                <span className="margin-span">  </span>
                                                <Button 
                                                    variant="contained" 
                                                    color="secondary" 
                                                    onClick={this.handleDelete}>
                                                        delete post
                                                </Button>
                                                <span className="margin-span">  </span>
                                                {!isVisible && 
                                                <Button 
                                                    type ="submit" 
                                                    variant="contained" 
                                                    color="primary" 
                                                    className="save-submit controlled-buttons"
                                                    onClick ={this.handleShowComments}>
                                                        show comments
                                                </Button>}
                                                {isVisible && 
                                                <div>
                                                    <Button 
                                                        type ="submit" 
                                                        variant="contained" 
                                                        color="primary" 
                                                        className="save-submit controlled-buttons"
                                                        onClick ={this.handleHideComments}>
                                                            hide comments
                                                </Button>
                                                </div>
                                                }
                                            </div>
                                            )
                                            :
                                            (<div className="post-buttons-comments">
                                                {!isVisible && 
                                                <Button 
                                                    type ="submit" 
                                                    variant="contained" 
                                                    color="primary" 
                                                    className="save-submit controlled-buttons"
                                                    onClick ={this.handleShowComments}>
                                                        show comments
                                                </Button>}
                                                {isVisible && 
                                                    <Button 
                                                    type ="submit" 
                                                    variant="contained" 
                                                    color="primary" 
                                                    className="save-submit controlled-buttons"
                                                    onClick ={this.handleHideComments}>
                                                        hide comments
                                                </Button>
                                                }
                                            </div>
                                            )}
                                    </div>)
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Card>
                </form>
                <br/>
                {!reduct ? 
                (<Card>
                    <CardActionArea>
                        <CardContent>
                            <div className="comment-edit">
                                <TextField
                                    label="message"
                                    name="message"
                                    type="text"
                                    value={message}
                                    autoComplete="current-password"
                                    variant="outlined"
                                    onChange ={this.handleChange} 
                                    fullWidth = {true}
                                    multiline = {true}
                                />
                                <div className="comment-edit-buttons">
                                    <Button 
                                        type ="submit" 
                                        variant="contained" 
                                        color="primary" 
                                        className="save-submit controlled-buttons"
                                        onClick ={this.handleSaveComment}>
                                            add comment
                                    </Button>
                                    <span className="margin-span">  </span>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        className="save-submit controlled-buttons"
                                        onClick ={this.handleCommentClear}>
                                            clear
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>)
                :
                (<div></div>)}
                {isVisible ? 
                (<List />)
                :
                (<div></div>)}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        post: store.post.post,
        user: store.user,
        one_post: store.post
    }
}

 export default connect(mapStateToProps)(Post)
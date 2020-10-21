import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/ProfilePage.css'
import { Typography, Card, CardActionArea } from '@material-ui/core'
import { store } from '../createStore/createStore'
import PostAdding from './PostAdding'

export class ProfilePage extends Component {

    componentDidMount() {
        store.dispatch({type: 'FETCH_POST_LIST'})
    }
    
    render() {
        const { id, firs_name, last_name, email } = this.props.user
        const { data } = this.props.post
        return (
            <div className="user-block">
                <h2 className="user-title">Name: {firs_name} Surname: {last_name}</h2>
                <h2 className="user-email">email: {email}</h2>
                <PostAdding />
                <h2>posts: </h2>
                <ul className="posts">
                    {data.map((item) =>
                        id===item.user_id ? (
                        <li key={item.id}>
                            <Link to={`/posts/${item.id}`}>
                                <Card>
                                    <CardActionArea>
                                        <Typography 
                                            gutterBottom 
                                            variant="h5" 
                                            component="h2">
                                                {item.title}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            color="textSecondary" 
                                            component="p">
                                                {item.description}
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </li>
                        )
                        : 
                        (<div></div>)
                    )}
                </ul> 
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
        post: store.post,
    }
}

export default connect(mapStateToProps)(ProfilePage)
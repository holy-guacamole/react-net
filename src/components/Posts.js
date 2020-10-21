import React from 'react'
import '../styles/Posts.css'
import { Link } from 'react-router-dom'
import { Typography, Card, CardActionArea} from '@material-ui/core'
import PostAdding from './PostAdding'
import { connect } from 'react-redux'
import { store } from '../createStore/createStore'

export class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: []
        }
    }

    componentDidMount() {
        store.dispatch({type: 'FETCH_POST_LIST'})
        console.log('id', this.props.post.post.id)
    }
    
    render() { 
        const { loading, data } = this.props.post
        if (loading) {
            return <div className="posts-container"><h2>loading...</h2></div>
        }
        return (
            <div>
                <PostAdding />
                <div className="posts-container">
                    <h2>posts: {data.length}</h2>
                    <ul className="posts">
                        {data.map((item) =>
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
                        )}
                    </ul> 
                </div>
            </div>      
        )
    }
        
}

const mapStateToProps = store => {
    return {
        post: store.post,
    }
}

export default connect(mapStateToProps)(Posts)
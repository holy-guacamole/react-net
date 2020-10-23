import React from 'react'
import '../styles/List.css'
import { store } from '../createStore/createStore'
import { connect } from 'react-redux'

export class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            commentable_id: null,
            loading: false,
            reduct: false,
            add: false,
            comments: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleReduct = this.handleReduct.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }
    componentDidMount() {
        store.dispatch({type: 'FETCH_SHOW_COMMENTS'})
    }
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleReduct() {
        this.setState({
            reduct: true
        })
    }
    handleCancel() {
        this.setState({
            reduct: false,
            add: false
        })
    }
    handleSave() {
        const id = this.props.match.params.id || ''
        let message = this.state
        store.dispatch({type: 'FETCH_SAVE_COMMENT', body: {id, message}})
    }
    handleAdd() {
        this.setState({
            add: true
        })
    }
    handleDelete() {
        const id = this.props.match.params.id || ''
        store.dispatch({type: 'FETCH_DELETE_COMMENT', body: id})
    }
    render() {
        let loading = false
        const data = this.props.comment && this.props.comment.data.length > 1 && this.props.comment.data
        if (loading) {
            return <div className="posts-container"><h2>loading...</h2></div>
        }

        return (
            <div>

                <div className="comment-template">
                        <ul className="comments-list">
                            {data && data.map((item) => (
                                <li key={item.id}
                                        id={item.id}>
                                        {item.message}
                                </li>
                            )
                        ) }
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = store => {
    return {
        comment: store.comment,
        post: store.post.post,
        user: store.user,
    }
}
export default connect(mapStateToProps)(List)
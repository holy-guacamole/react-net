import React from 'react'
import '../styles/List.css'
import { store } from '../createStore/createStore'
import { connect } from 'react-redux'
// import Comment from './Comment'

export class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            commentable_id: null,
            loading: false,
            reduct: false,
            add: false,
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
        const { data, loading } = this.props.comment
        if (loading) {
            return <div className="posts-container"><h2>loading...</h2></div>
        }
        let post_data = this.props.post
        let flt_ids = []

        let filtered_data = data.filter(function(el) {
            if (el.commentable_type==="Post" && el.commentable_id===post_data.id) {
                flt_ids.push(el.id) 
                return true
            }
            else
                return false
        })

        if (filtered_data.length != 0) {

            function recurseFilter(filterAr){
                let flt_id = []
                let flt_cmt_data = data.filter(function(el) {
                    if (el.commentable_type==="Comment" && filterAr.includes(el.commentable_id)) {
                        flt_id.push(el.id) 
                        return true
                    }
                    else
                        return false                    
                })

                if (flt_cmt_data.length !=0 ){
                    flt_cmt_data = flt_cmt_data.concat(recurseFilter(flt_id))
                }

                return flt_cmt_data
            }

            filtered_data = filtered_data.concat(recurseFilter(flt_ids))

            filtered_data.sort(function(a, b){return (b.created_at > a.created_at)?-1:1})

        }

        function subComment(filterID, n){
            let flt_cmt_data = filtered_data.filter(function(el) {
                return (el.commentable_type==="Comment" && el.commentable_id===filterID)                
            })
            let overall = []

            for (let elem in flt_cmt_data){
                let el = flt_cmt_data[elem]
                let a = (<li key={el.id}>
                            <List 
                                id={el.id}
                                message={el.message}
                                created_at={el.created_at}
                                commentable_id={el.commentable_id}
                                author_id={el.user_id}
                                recurs_num={n}
                                />
                        </li>)
                let b = [a]
                b = b.concat(subComment(el.id,n+1))       
                overall.push(b)
            }
            return overall

        }
        const commentsList = data.filter(function(el) {
            return (el.commentable_type==="Post" && el.commentable_id===post_data.id)
        })
        return (
            <div>
                <h2>comments: {filtered_data.length}</h2>
                <div className="comment-template">
                        <ul className="comments-list">
                            { commentsList.map((item) => (
                                <li key={item.id}>
                                    <List 
                                        id={item.id}
                                        message={item.message}
                                        created_at={item.created_at}
                                        commentable_id={item.commentable_id}
                                        author_id={item.user_id}
                                        />
                                    {subComment(item.id,1)}    
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
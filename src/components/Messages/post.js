import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './post.css';
import Textfield from '@material-ui/core/TextField';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Icon, TextField } from '@material-ui/core';
import { app } from '../Firebase/firebase';
import 'firebase/firestore';
import Button from '@material-ui/core/Button';
import Comment from './comment';

class Post extends Component
{
    constructor(props)
    {
        super(props);
        this.postCollRef = app.firestore().collection('posts');
        this.handleEditEditorInput = this.handleEditEditorInput.bind(this);
        this.handleCommentEditorInput = this.handleCommentEditorInput.bind(this);
        this.editPost = this.editPost.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.updateCommentsList = this.updateCommentsList.bind(this);
        this.rerenderHandler = this.rerenderHandler.bind(this);
        this.processPostBody = this.processPostBody.bind(this);
        this.id = props.id;

        const processedPostBody = this.processPostBody(this.props.postBody);

        this.state = {
            liked: 'false',
            thumbColor: 'grey',
            upvotes: this.props.upvotes,    
            edit: 'false',
            comment: 'false',
            commentsList: [],
            commentEditorBody: '',
            postBody: processedPostBody,
        };
    }

    processPostBody(list)
    {
        var result = '';
        for(var i = 0; i < list.length; i++)
            result += (list[i] + '\r\n');
        
        return result;
    }

    componentWillMount()
    {
        this.postCollRef.doc(this.id).collection('comments').onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                const index = this.state.commentsList.findIndex(comment => comment.id === doc.id );
                if(index < 0)
                    this.updateCommentsList(doc);
            });
        });
    }

    handleLike(e)
    {
        var tempState = Object.assign({}, this.state);
        var newUpvotes;
        if(this.state.liked === 'true')
        {
            newUpvotes = this.state.upvotes - 1;

            tempState = {
                liked: 'false',
                thumbColor: 'grey',
                upvotes: newUpvotes,
            };
        }
        else
        {
            newUpvotes = this.state.upvotes + 1;

            tempState = {
                liked: 'true',
                thumbColor: 'blue',
                upvotes: newUpvotes,
            }
        }
        
        this.setState(tempState);

        this.postCollRef.doc(this.id).set({
            upvotes: newUpvotes,
        }, { merge: true });
    }

    convertTimestamp(timestamp)
    {
        return new Date(timestamp).toDateString() + " " + new Date(timestamp).toLocaleTimeString();
    }

    handleDelete(e)
    {
        this.postCollRef.doc(this.id).delete();
        this.props.rerenderHandler();
    }

    handleEdit(e)
    {
        if(this.state.edit === 'false')
        {
            this.setState({
                edit: 'true',
            });
            document.getElementsByClassName("body-field")[this.props.index].style.display = 'none';
            document.getElementsByClassName("edit-field")[this.props.index].style.display = 'block';
            document.getElementsByClassName("submit-button")[this.props.index].style.display = 'block';
        }
        else
        {
            this.setState({
                edit: 'false',
            });
            document.getElementsByClassName("body-field")[this.props.index].style.display = 'block';
            document.getElementsByClassName("edit-field")[this.props.index].style.display = 'none';
            document.getElementsByClassName("submit-button")[this.props.index].style.display = 'none';
        }
    }

    handleEditEditorInput(e)
    {
        this.setState({
            postBody: e.target.value,
        });
    }

    editPost()
    {
        if(this.state.postBody.replace(/\s/g, '').length)
        {
            this.postCollRef.doc(this.id).set({
                postBody: this.state.postBody,
            }, { merge: true });
            this.props.rerenderHandler();
        }
    }

    toggleComments(e)
    {
        if(this.state.comment == 'true')
        {
            this.setState({
                comment: 'false',
            });

            document.getElementsByClassName("comment-editor")[this.props.index].style.display = 'none';
        }
        else
        {
            this.setState({
                comment: 'true',
            });

            document.getElementsByClassName("comment-editor")[this.props.index].style.display = 'block';
        }
    }

    handleCommentEditorInput(e)
    {
        this.setState({
            commentEditorBody: e.target.value,
        });
    }

    submitComment()
    {
        if(this.state.commentEditorBody.replace(/\s/g, '').length)
        {
            const date = new Date();
            const timestamp = date.getTime();
            this.postCollRef.doc(this.id).collection('comments').add({
                postBody: this.state.commentEditorBody,
                upvotes: 0,
                timestamp: timestamp,
            });
            this.setState({
                commentEditorBody: '',
            });
        }
    }

    rerenderHandler()
    {
        this.setState({
            commentsList: [],
        });
    }

    updateCommentsList(doc)
    {
        const commentData = doc.data();
        const comments = this.state.commentsList;
        const commentObj = {
            id: doc.id,
            postBody: commentData.postBody.split(/[\r\n]/g),
            upvotes: commentData.upvotes,
            timestamp: commentData.timestamp,
        };
        comments.push(commentObj);
        comments.sort(function(x, y) {
            return x.timestamp - y.timestamp;
        });

        this.setState({
            commentsList: comments,
        });
    }

    render()
    {
        return (
            <div>
                <Paper className="root">
                    <Grid container direction='row'>
                        <Grid item xs={11} className="body-field">
                                { this.props.postBody.map((postPart, idx) => (
                                    <div key={idx}>
                                        {postPart}
                                    </div>
                                    )) 
                                }
                        </Grid>
                        <Grid item xs={11} className="edit-field">
                            <TextField
                                defaultValue={this.props.postBody}
                                fullWidth
                                onChange={this.handleEditEditorInput}>
                            </TextField>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton style={{ marginRight: '10px' }} size="small" onClick={(e) => this.handleDelete()}>
                                <TrashIcon />
                            </IconButton>
                            <IconButton style={{ marginRight: '10px' }} size="small" onClick={(e) => this.handleEdit()}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <div className="upvotes">
                                    { this.state.upvotes }
                                </div>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton style={{ margin: '0 20px' }} size="small" onClick={(e) => this.handleLike()}>
                                    <ThumbUpIcon style={{ color: this.state.thumbColor }} fontSize="small"/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="timestamp"> 
                                    { this.convertTimestamp(this.props.timestamp) }
                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="comments" onClick={(e) => this.toggleComments()}>Comments
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="submit-button">
                                    <Button variant="contained" color="primary" onClick={this.editPost} size="small">
                                        Submit
                                    </Button> 
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <div className="comment-editor">
                    {this.state.commentsList.map((comment, index) => {
                        return (
                            <Paper key={comment.id}>
                                <Comment 
                                    postBody={comment.postBody} 
                                    upvotes={comment.upvotes} 
                                    timestamp={comment.timestamp}
                                    parentId={this.id}
                                    id={comment.id}
                                    rerenderHandler={this.rerenderHandler}
                                    index={index}/>
                            </Paper>
                        );
                    })}
                    <Paper className="root">
                        <Grid container>
                            <Grid item xs={11}>
                                <TextField
                                    value={this.state.commentEditorBody}
                                    fullWidth
                                    placeholder='Write your comment here...'
                                    onChange={this.handleCommentEditorInput}
                                    >
                                </TextField>
                            </Grid>
                            <Grid item xs={1}>
                                <Button variant="contained" color="primary" onClick={this.submitComment} size="small">
                                    Submit
                                </Button> 
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Post;
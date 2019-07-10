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

class Comment extends Component
{
    constructor(props)
    {
        super(props);
        this.parentId = this.props.parentId;
        this.id = this.props.id;
        this.commentCollRef = app.firestore().collection('posts').doc(this.parentId).collection('comments');
        this.convertTimestamp = this.convertTimestamp.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditEditorInput = this.handleEditEditorInput.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.editPost = this.editPost.bind(this);
        this.processPostBody = this.processPostBody.bind(this);

        const processedPostBody = this.processPostBody(this.props.postBody);

        this.state = {
            liked: 'false',
            thumbColor: 'grey',
            upvotes: this.props.upvotes,    
            edit: 'false',
            comment: 'false',
            commentsList: [],
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

    convertTimestamp(timestamp)
    {
        return new Date(timestamp).toDateString() + " " + new Date(timestamp).toLocaleTimeString();
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

        this.commentCollRef.doc(this.id).set({
            upvotes: newUpvotes,
        }, { merge: true });
    }

    handleDelete(e)
    {
        this.commentCollRef.doc(this.id).delete();
        this.props.rerenderHandler();
    }

    handleEdit(e)
    {
        if(this.state.edit === 'false')
        {
            this.setState({
                edit: 'true',
            });
            document.getElementsByClassName(this.parentId + "-body")[this.props.index].style.display = 'none';
            document.getElementsByClassName(this.parentId + "-editor")[this.props.index].style.display = 'block';
            document.getElementsByClassName(this.parentId + "-submit")[this.props.index].style.display = 'block';
        }
        else
        {
            this.setState({
                edit: 'false',
            });
            document.getElementsByClassName(this.parentId + "-body")[this.props.index].style.display = 'block';
            document.getElementsByClassName(this.parentId + "-editor")[this.props.index].style.display = 'none';
            document.getElementsByClassName(this.parentId + "-submit")[this.props.index].style.display = 'none';
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
            this.commentCollRef.doc(this.id).set({
                postBody: this.state.postBody,
            }, { merge: true });
            this.props.rerenderHandler();
        }
    }

    render()
    {
        return (
            <Paper className="root">
                <Grid container direction='row'>
                    <Grid item xs={10} className={['comment-body-field', this.parentId + '-body'].join(' ')}>
                            { this.props.postBody.map((postPart, idx) => (
                                <div key={idx}>
                                    {postPart}
                                </div>
                                )) 
                            }
                    </Grid>
                    <Grid item xs={10} className={["comment-edit-field", this.parentId + '-editor'].join(' ')}>
                        <TextField
                            defaultValue={this.props.postBody}
                            fullWidth
                            onChange={this.handleEditEditorInput}>
                        </TextField>
                    </Grid>
                    <Grid container justify='flex-end'>
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
                        <Grid item xs={11}>
                            <div className="timestamp"> 
                                { this.convertTimestamp(this.props.timestamp) }
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={["comment-submit-button", this.parentId + '-submit'].join(' ')}>
                                <Button variant="contained" color="primary" onClick={this.editPost} size="small">
                                    Submit
                                </Button> 
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Comment;
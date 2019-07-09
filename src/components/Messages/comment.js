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
        this.handleLike = this.handleLike.bind(this);
        this.state = {
            liked: 'false',
            thumbColor: 'grey',
            upvotes: this.props.upvotes,    
            edit: 'false',
            comment: 'false',
            commentsList: [],
            commentEditorBody: '',
        };
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

    }

    handleEditorInput()
    {

    }


    render()
    {
        return (
            <Paper className="root">
                <Grid container direction='row'>
                    <Grid item xs={10} className="body-field">
                            { this.props.postBody.map((postPart, idx) => (
                                <div key={idx}>
                                    {postPart}
                                </div>
                                )) 
                            }
                    </Grid>
                    <Grid item xs={10} className="edit-field">
                        <TextField
                            defaultValue={this.props.postBody}
                            fullWidth
                            onChange={this.handleEditorInput}>
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
                        <Grid item xs={2}>
                            <div className="timestamp"> 
                                { this.convertTimestamp(this.props.timestamp) }
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Comment;
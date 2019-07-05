import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './post.css';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown'; 
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Icon } from '@material-ui/core';
import { app } from '../Firebase/firebase';
import 'firebase/firestore';

class Post extends Component
{
    constructor(props)
    {
        super(props);
        this.databaseRef = app.firestore();
        this.id = props.id;
        this.state = {
            liked: 'false',
            thumbColor: 'grey',
            upvotes: this.props.upvotes,    
        };
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

        this.databaseRef.ref('/posts/' + this.id).child('upvotes').set(newUpvotes);
    }

    render()
    {
        return (
            <Paper className="root">
                <Grid container direction='row'>
                    <Grid item xs={11} >

                            { this.props.postBody.map((postPart, idx) => (
                                <div key={idx}>
                                    {postPart}
                                </div>
                                )) 
                            }

                    </Grid>
                    <Grid item xs={1}>
                        <IconButton style={{ marginRight: '10px' }} size="small">
                            <TrashIcon />
                        </IconButton>
                        <IconButton style={{ marginRight: '10px' }} size="small">
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography fontSize='1'>
                                { this.props.upvotes }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton style={{ margin: '0 20px' }} size="small" onClick={(e) => this.handleLike()}>
                                <ThumbUpIcon style={{ color: this.state.thumbColor }} fontSize="small"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Post;
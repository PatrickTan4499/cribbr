import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import './postEditor.css';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

class PostEditor extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            newPostBody: '', 
        }
        this.handlePostEditorInput = this.handlePostEditorInput.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    handlePostEditorInput(e)
    {
      this.setState({
        newPostBody: e.target.value
      });
    }

    createPost()
    {
        this.props.addPost(this.state.newPostBody);
        this.setState({
            newPostBody: '',
        });
    }

    render()
    {
        return (
            <Paper className="editor-container">
                <Grid container>
                    <Grid item xs={12}>
                        <Textfield 
                            value={this.state.newPostBody} 
                            placeholder='Write your message here...' 
                            fullWidth 
                            multiline
                            onChange={this.handlePostEditorInput}>
                        </Textfield>
                    </Grid>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" className="submit-button" onClick={this.createPost}>
                            Submit
                        </Button>   
                    </Grid>
                </Grid>

            </Paper>
        );
    }
}

export default PostEditor;
import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';

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
            <div className="card post-edtior">
                <div className="card-body">
                    <textarea className="form-control" value={this.state.newPostBody} type="text" onChange={this.handlePostEditorInput}>
                    </textarea>
                    <Button className="submit-button" onClick={this.createPost}>
                        Submit
                    </Button>             
                </div>
            </div>
        );
    }
}

export default PostEditor;
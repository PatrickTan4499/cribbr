import React, { Component } from 'react';
import { app } from '../Firebase/firebase';
import Container from '@material-ui/core/Container';
import './messagesBoard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/firebase/database'
import Post from './post';
import PostEditor from './postEditor';

const MessagesPage = () => (
  <Container>
    <Messages />
  </Container>
);

class Messages extends Component
{
  constructor(props)
  {
    super(props);
    this.database = app.database();
    this.databaseRef = this.database.ref('/posts');
    this.addPost = this.addPost.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
    this.state = {
      posts: [],
    };
  }

  componentWillMount()
  {
    const { updateLocalState } = this;
    this.databaseRef.on('child_added', snapshot => {
      const response = snapshot.val();
      updateLocalState(response);
    });
  }

  updateLocalState(response)
  {
    const posts = this.state.posts;
    const brokenDownPost = response.postBody.split(/[\r\n]/g); 
    posts.push(brokenDownPost);
    this.setState({
      posts: posts,
    });
  }

  addPost(postBody)
  {
    const postToSave = {postBody};
    this.databaseRef.push().set(postToSave);
  }

  render()
  {
    return(
      <div>
        <h2>Messages</h2>
        { this.state.posts.map((postBody, idx) => {
            return (
              <Post key={idx} postBody={postBody} />
            );
          })
        }
        <PostEditor addPost={this.addPost} />
      </div>
    );
  }
};

export default MessagesPage;
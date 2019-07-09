import React, { Component } from 'react';
import { app } from '../Firebase/firebase';
import Container from '@material-ui/core/Container';
import './messagesBoard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/firebase/database'
import Post from './post';
import PostEditor from './postEditor';
import 'firebase/firestore';

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
    this.database = app.firestore();
    this.postCollRef = this.database.collection('posts');
    this.userCollRef = this.database.collection('users');
    this.addPost = this.addPost.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
    this.rerenderHandler = this.rerenderHandler.bind(this);
    this.state = {
      posts: [],
    };
  }

  componentWillMount()
  {
    const { updateLocalState } = this;
    this.postCollRef.onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const index = this.state.posts.findIndex(post => post.id === doc.id );
        if(index < 0)
          updateLocalState(doc);
      });
    });
  }

  updateLocalState(doc)
  {
    const response = doc.data();
    const posts = this.state.posts;
    const brokenDownPost = response.postBody.split(/[\r\n]/g); 
    var postObj = response;
    postObj.postBody = brokenDownPost;
    postObj.id = doc.id;
    posts.unshift(postObj);
    posts.sort(function(x, y) {
      return y.timestamp - x.timestamp;
    });
    this.setState({
      posts: posts,
    });
  }

  addPost(postBody)
  {
    const date = new Date();
    const timestamp = date.getTime();
    this.postCollRef.add({
      postBody: postBody,
      upvotes: 0,
      timestamp: timestamp,
    });
  }

  rerenderHandler()
  {
    this.setState({
      posts: [],
    });
  }

  render()
  {
    return(
      <div>
        <h2>Messages</h2>
        { this.state.posts.map((post, idx) => {
            return (
              <Post key={post.id} postBody={post.postBody} upvotes={post.upvotes} timestamp={post.timestamp} id={post.id} rerenderHandler={this.rerenderHandler} index={idx} />
            );
          })
        }
        <PostEditor addPost={this.addPost} />
      </div>
    );
  }
};

export default MessagesPage;
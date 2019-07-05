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
    this.addPost = this.addPost.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
    this.state = {
      posts: [],
    };
  }

  componentWillMount()
  {
    const { updateLocalState } = this;
    this.postCollRef.onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const obj = this.state.posts.filter(post => {
          return post.id === doc.id;
        });
        console.log(obj);
        if(!obj)
        {
          updateLocalState(doc);
        }
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
    posts.push(postObj);
    this.setState({
      posts: posts,
    });
  }

  addPost(postBody)
  {
    const newPostRef = this.postCollRef.add({
      postBody: postBody,
      upvotes: 0
    });
    console.log("newpostref: " + newPostRef);
    //newPostRef.set(postToSave);
  }

  render()
  {
    return(
      <div>
        <h2>Messages</h2>
        { this.state.posts.map((post, idx) => {
            return (
              <Post key={idx} postBody={post.postBody} upvotes={post.upvotes} id={post.id}/>
            );
          })
        }
        <PostEditor addPost={this.addPost} />
      </div>
    );
  }
};

export default MessagesPage;
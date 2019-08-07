import React, { Component } from 'react';
import { app } from '../Firebase/firebase';
import Container from '@material-ui/core/Container';
import './messagesBoard.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/firebase/database'
import Post from './post';
import PostEditor from './postEditor';
import 'firebase/firestore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

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
    this.handleSelectedDate = this.handleSelectedDate.bind(this);
    this.handleDoneLoading = this.handleDoneLoading.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.state = {
      posts: [],
      loading: true,
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

  handleSelectedDate(selectedContext)
  {
    this.setState({
      selectedDate: selectedContext,
    });
  }
  
  handleDoneLoading()
  {
    if(this.state.loading)
    {
      this.setState({
        loading: false,
      });

      document.getElementById("loading-spinner").style.display = 'none';
      document.getElementById("messages-board").style.display = 'block';
    }
  }

  handleLoading()
  {
    if(!this.state.loading)
    {
      this.setState({
        loading: true,
      });

      document.getElementById("loading-spinner").style.display = 'flex';
      document.getElementById("messages-board").style.display = 'none';
    }
  }

  render()
  {
    return(
      <div>
        <Grid container
          id="loading-spinner"
          alignItems="center"
          direction="column"
          justify="center"
          style={{ marginTop: 50 }}
          >
          <Grid item xs={3}>
            <CircularProgress />
          </Grid>
        </Grid>
        <Container
          id="messages-board">
          { this.state.posts.map((post, idx) => {
              var lastPost = false;
              if(idx === this.state.posts.length - 1)
                lastPost = true;

              return (
                <Post 
                  key={post.id} 
                  postBody={post.postBody} 
                  upvotes={post.upvotes} 
                  timestamp={post.timestamp} 
                  id={post.id} 
                  rerenderHandler={this.rerenderHandler} 
                  index={idx} 
                  onDoneLoading={this.handleDoneLoading}
                  parentLoading={this.state.loading}
                  isLastPost={lastPost}
                  />
              );
            })
          }
          <PostEditor addPost={this.addPost} />
        </Container>
      </div>
    );
  }
};

export default MessagesPage;
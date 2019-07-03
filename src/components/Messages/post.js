import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './post.css';

const Post = (props) => (
    <div>
        <div className="card post-body">
            { props.postBody.map((postPart, idx) => (
                <div key={idx}>
                    {postPart}
                </div>
                )) 
            }
        </div>
    </div>
);

export default Post;
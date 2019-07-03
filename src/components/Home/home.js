import React from 'react';
import Typography from '@material-ui/core/Typography';
import JoinGroup from './joinGroup';

const Home = () => (
  <div>
    <Typography variant="h4" align="center">Your groups</Typography>
    <JoinGroup/>
  </div>
);

export default Home;
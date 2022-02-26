import React from 'react';
import { Grid } from 'semantic-ui-react';

/**
 * App and dataset description on the landing page
 * @param {*} media breakpoints
 */
const Intro = ({mobile, tablet, desktop}) => {
  const mobile_style = {
    row: {
      padding: '1em 2em',
      fontSize: '1em',
      color: '#fff' 
      },
    p: {
      lineHeight: 'calc(1.8em + 1vh)'
    }
  }

  const tablet_style = {
    row: { 
      paddingLeft: '5em', 
      paddingRight: '5em', 
      paddingTop: 'calc(2em + 1vh)',
      fontSize: '1.1em', 
      color: '#fff' 
    },
    p: {
      lineHeight: 'calc(1.8em + 1vh)'
    }
  }

  const desktop_style = {
    row:{ 
      paddingLeft: '8em', 
      paddingRight: '8em', 
      paddingTop: 'calc(2.5em + 1vh)',
      fontSize: '1.5em',
      color: '#fff'  
    },
    p: {
      lineHeight: 'calc(1.5em + 1vh)'
    }
  }

  return (
    <Grid.Row style={
      mobile ? mobile_style.row : tablet ? tablet_style.row : desktop_style.row
      }>
      <Grid.Column textAlign="center">
        <p style={
          mobile ? mobile_style.p : tablet ? tablet_style.p : desktop_style.p
          }>
          Over 15,000 datasets of homes that were sold from Jan 2018 to Jan 2020 were analyzed and evaluated to predict house prices in Austin, TX.
        </p>
        <p style={
          mobile ? mobile_style.p : tablet ? tablet_style.p : desktop_style.p
          }>
          Housing prices have skyrocketed in recent years. <br/>It would be interesting to see what we get.
        </p>
      </Grid.Column>
    </Grid.Row>
  );
};


export default Intro;

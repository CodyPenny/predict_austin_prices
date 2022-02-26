import React from 'react';
import { Icon, Header, Divider } from 'semantic-ui-react';

/**
 * Header for the results page
 * @param {*} locations - address being looked up
 */
const HeaderPageFour = ({ locations }) => {
  return (
    <div>
      <Divider horizontal>
        <Header as="h2" color="purple">
          <Icon name="bar chart" />
          Prediction
        </Header>
      </Divider>
      <Header
        size="medium"
        inverted
        color="grey"
        textAlign="center"
        style={{ marginBottom: '25px' }}
      >
        {locations.label}
      </Header>
    </div>
  );
};

export default HeaderPageFour;

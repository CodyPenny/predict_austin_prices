import React, { useContext } from 'react';
import { MyContext } from '../stores/Store';
import { Header, Segment } from 'semantic-ui-react';

/**
 * Displays the computed value of the property
 */
const Prediction = () => {
  const { prediction } = useContext(MyContext);
  return (
    <Segment textAlign="center">
      <Header size="large">$ {prediction.prediction.toLocaleString()}</Header>
    </Segment>
  );
};

export default Prediction;

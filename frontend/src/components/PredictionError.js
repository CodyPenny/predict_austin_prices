import React from 'react';
import { Modal, Header, Icon, Button } from 'semantic-ui-react';

/**
 * Modal that displays an error if a prediction can not be calculated
 */
const PredictionError = ({ open, setOpen }) => {
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <Header icon>
        <Icon name="terminal" />
        Bad Prediction
      </Header>
      <Modal.Content style={{ textAlign: 'center' }}>
        <p>We could not get a prediction based on the selected criteria.</p>
        <p>Please try again.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={() => setOpen(false)}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PredictionError;

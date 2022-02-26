import React from 'react'
import { Button, Icon } from 'semantic-ui-react';

/**
 * Back and Next buttons between the forms
 */
const NavigationButtons = ({changePage, back, text, mobile, tablet, desktop}) => {
  return (
    <div>
      <Button
          inverted
          color="orange"
          size={mobile ? "medium" : tablet ? "huge" : "huge"}
          floated="left"
          onClick={() => changePage(back)}
        >
          <Icon name="left arrow" />
          Go Back
        </Button>
        <Button
          icon
          primary
          size={mobile ? "medium" : tablet ? "huge" : "huge"}
          labelPosition="right"
          floated="right"
        >
          {text}
          <Icon name="right arrow" />
        </Button>
    </div>
  )
}

export default NavigationButtons

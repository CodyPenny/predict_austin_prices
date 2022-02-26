import React from 'react';
import { Message } from 'semantic-ui-react';
import { StyledErrorWrapper } from '../styled/StyledContainer';

/**
 * Displays the error message associated with bad address input
 */
export const BadAddressMessage = () => (
  <Message negative>
    <Message.Header>Invalid Address</Message.Header>
    <p>Please try entering the address using this format:</p>{' '}
    <p>"1234 Some Street Way"</p>{' '}
    <p>You can omit the city and state but ensure it is a location in Austin</p>
  </Message>
);

/**
 * Displays message if no comparable data has been returned from the server
 */
export const NoGraph = () => (
  <Message negative>
    <Message.Header>No Results</Message.Header>
    <p>
      There were no other comparable data that matched the house characteristics
    </p>
  </Message>
);

/**
 * Errors associated with bad form input 
 * @param {*} errors
 * @returns reason for the error
 */
export const FormErrors = ({ errors }) => (
  <StyledErrorWrapper>
    {errors.homeType && <p>{errors.homeType?.message}</p>}
    {errors.parkingSpaces && <p>{errors.parkingSpaces?.message}</p>}
    {errors.garageSpaces && <p>{errors.garageSpaces?.message}</p>}
    {errors.numOfBedrooms && <p>{errors.numOfBedrooms?.message}</p>}
    {errors.numOfBathrooms && <p>{errors.numOfBathrooms?.message}</p>}
    {errors.numOfStories && <p>{errors.numOfStories?.message}</p>}
    {errors.lotSizeSqFt?.type == 'required' && (
      <p>Lot Size is a required field.</p>
    )}
    {errors.lotSizeSqFt?.type == 'typeError' && (
      <p>Lot Size must be a number.</p>
    )}
    {errors.livingAreaSqFt?.type == 'required' && (
      <p>Living Area is a required field.</p>
    )}
    {errors.livingAreaSqFt?.type == 'typeError' && (
      <p>Living Area must be a number.</p>
    )}
    {errors.yearBuilt?.type == 'required' && (
      <p>Year Built is a required field.</p>
    )}
    {errors.yearBuilt?.type == 'typeError' && (
      <p>Year Built must be a number.</p>
    )}
    {errors.yearBuilt?.type == 'min' && (
      <p>Year Built should be greater than or equal to 1950.</p>
    )}
    {errors.yearBuilt?.type == 'max' && (
      <p>Year Built should not exceed the current year.</p>
    )}
</StyledErrorWrapper>
);

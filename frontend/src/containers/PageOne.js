import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { MyContext } from '../stores/Store';
import { BadAddressMessage } from '../components/Errors';
import Intro from '../components/Intro';
import { BASEURL, LOCATION } from '../stores/constants';
import { requiredField } from '../utils/utils';
import { Grid, Segment, Icon, Form, Message } from 'semantic-ui-react';

/**
 * Schema for input validation
 */
const schema = yup.object().shape({
  address: yup.string().max(50).required(requiredField('Street address')),
});

/**
 * Accepts the property address and validates it via geolocation
 * If the location is valid, will get back lat, long, and the zipcode
 * @param {*} media breakpoints
 * @returns 
 */
const PageOne = ({ changePage, mobile, tablet, desktop }) => {
  const mobile_style = {
    grid: { padding: '2em 0em' },
    row: {maxWidth: 300},
    input: {fontSize: ".75em"},
    button: { 
      marginTop: '1.6em',
      fontSize: "1em"
    }
  }

  const tablet_style = {
    grid: { padding: '2.5em 0em' },
    row: {maxWidth: 450},
    input: {fontSize: "1em"},
    button: { 
      marginTop: '1.8em',
      fontSize: "1.3em"
    }
  }

  const desktop_style = {
    grid: { padding: '3em 0em' },
    row: {maxWidth: 520},
    input: {fontSize: "1.2em"},
    button: { 
      marginTop: '2em',
      fontSize: "1.5em"
    }
  }

  const { changeLocation } = useContext(MyContext);
  const [isBadAddress, setBadAddress] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formatAddress = (str) => {
    // trim white space
    let new_str = str.trim();
    // append comma at end as it affects api response
    if (new_str.charAt(new_str.length - 1) !== ',') {
      return new_str + ',';
    }
    return new_str;
  };

  const onChange = (e) => {
    setValue('address', e.target.value);
  };

  const getCoordinates = async (data) => {
    let cleaner_address = formatAddress(data.address);
   
    try {
      const response = await axios.post(`${BASEURL}${LOCATION}`, {
        street: `${cleaner_address}`,
      });
      if (!response.data.status) {
        // display error
        setBadAddress(true);
        return;
      }
      if (response.data.status) {
        if (!response.data.data.zipcode) {
          setBadAddress(true);
          return;
        }
        for (const [key, value] of Object.entries(response.data.data)) {
          changeLocation(key, value);
        }
        // go to the next page
        changePage(2);
      } else {
        // throw error
        setBadAddress(true);
        return;
      }
    } catch (err) {
      setBadAddress(true);
    }
  };

  const submitForm = (data) => {
    getCoordinates(data);
  };

  const getIntro = () => {
    if(mobile)
    return (
      <Intro mobile />
    )
    else if(tablet)
      return (
        <Intro tablet />
      )
    else
      return (
        <Intro desktop />
      )
  }

  return (
    <Grid container 
          stackable 
          centered 
          style={mobile ? mobile_style.grid : tablet ? tablet_style.grid : desktop_style.grid}>
      <Grid.Row textAlign="center">
        <Grid.Column 
          style={mobile ? mobile_style.row : tablet ? tablet_style.row : desktop_style.row} 
          verticalAlign="middle"
          >
          <Form size="large" onSubmit={handleSubmit(submitForm)} error>
            <Segment stacked>
              <input
                style={
                  mobile ? mobile_style.input : tablet ? tablet_style.input : desktop_style.input
                }
                placeholder="Street Address  (e.g. 1600 Pennsylvania Avenue NW)"
                {...register('address')}
                onChange={onChange}
              />
              <Message error content={errors.address?.message} />
              {isBadAddress && <BadAddressMessage />}
            </Segment>
            <Grid.Row>
              <Form.Button
                primary
                size="huge"
                style={
                  mobile ? mobile_style.button : tablet ? tablet_style.button : desktop_style.button
                }
              >
                Start Prediction 
                <Icon name="right arrow" />
              </Form.Button>
            </Grid.Row>
          </Form>
        </Grid.Column>
      </Grid.Row>
        {getIntro()}
    </Grid>
  );
};

export default PageOne;

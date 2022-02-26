import React, { useContext, useEffect, createRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MyContext } from '../stores/Store';
import NavigationButtons from '../components/NavigationButtons';
import { FormErrors } from '../components/Errors';
import { HOME, BED as space, BATH, STORY, YEAR, MIN_YEAR } from '../stores/constants';
import { requiredField } from '../utils/utils';
import { Grid, Form, Input, Ref, Divider } from 'semantic-ui-react';

/**
 * Set schema for the form input validation
 */
const schema = yup.object().shape({
  lotSizeSqFt: yup.number().required(requiredField('Lot size')),
  livingAreaSqFt: yup.number().required(requiredField('Living Area')),
  homeType: yup.string().required(requiredField('Home type')),
  parkingSpaces: yup.number().required(requiredField('Parking spaces')),
  garageSpaces: yup.number().required(requiredField('Garage spaces')),
  numOfBedrooms: yup.number().required(requiredField('Bedrooms')),
  numOfBathrooms: yup.number().required(requiredField('Bathrooms')),
  numOfStories: yup.number().required(requiredField('Stories')),
  yearBuilt: yup.number().min(MIN_YEAR).max(YEAR).required(requiredField('Year built'))
});

/**
 * Takes property details
 */
const PageTwo = ({ changePage, isPageTwoNew, setPageTwo, mobile, tablet, desktop }) => {
  const { details, changeDetails } = useContext(MyContext);
  // access the DOM node to use with the form input validation process
  const lotSizeSqFtRef = createRef();
  const livingAreaSqFtRef = createRef();
  const homeTypeRef = createRef();
  const parkingRef = createRef();
  const garageRef = createRef();
  const bedroomRef = createRef();
  const bathroomRef = createRef();
  const storyRef = createRef();
  const yearRef = createRef();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        changeDetails(key, value);
      }
      changePage(3);
      if (isPageTwoNew) {
        setPageTwo(false);
      }
    } else {
      return;
    }
  };

  const showButtons = () => {
    if(mobile) 
    return <NavigationButtons changePage={changePage} back={1} text={'Next'} mobile/>;
    else if(tablet)
    return <NavigationButtons changePage={changePage} back={1} text={'Next'} tablet/>;
    else return <NavigationButtons changePage={changePage} back={1} text={'Next'} desktop/>;
  }

  useEffect(() => {
    if (!isPageTwoNew) {
      for (const [key, value] of Object.entries(details)) {
        setValue(key, value);
      }
    }
  }, []);

  return (
    <Grid container stackable centered verticalAlign="middle" 
    style={{
      padding: mobile ? "2em 0" : tablet ? "3em 0" : "4em 0"
      }}>
      <Form inverted onSubmit={handleSubmit(submitForm)}>
        <Form.Group widths="equal">
          <Ref innerRef={homeTypeRef}>
            <Form.Select
              label="Home Type"
              name="homeType"
              options={HOME}
              placeholder="Select Home Type"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.homeType ? true : false}
              defaultValue={isPageTwoNew ? false : details['homeType']}
            />
          </Ref>
          <Ref innerRef={parkingRef}>
            <Form.Select
              label="Parking Spaces"
              options={space}
              placeholder="Select Parking Spaces"
              name="parkingSpaces"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.parkingSpaces ? true : false}
              defaultValue={isPageTwoNew ? false : details['parkingSpaces']}
            />
          </Ref>
        </Form.Group>
        <Divider hidden></Divider>
        <Form.Group widths="equal">
          <Ref innerRef={garageRef}>
            <Form.Select
              label="Garage Spaces"
              options={space}
              placeholder="Select Garage Spaces"
              name="garageSpaces"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.garageSpaces ? true : false}
              defaultValue={isPageTwoNew ? false : details['garageSpaces']}
            />
          </Ref>
          <Ref innerRef={bedroomRef}>
            <Form.Select
              label="Bedrooms"
              options={space}
              placeholder="Select Bedrooms"
              name="numOfBedrooms"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.numOfBedrooms ? true : false}
              defaultValue={isPageTwoNew ? false : details['numOfBedrooms']}
            />
          </Ref>
        </Form.Group>
        <Divider hidden></Divider>
        <Form.Group widths="equal">
          <Ref innerRef={bathroomRef}>
            <Form.Select
              label="Bathrooms"
              options={BATH}
              placeholder="Select Bathrooms"
              name="numOfBathrooms"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.numOfBathrooms ? true : false}
              defaultValue={isPageTwoNew ? false : details['numOfBathrooms']}
            />
          </Ref>
          <Ref innerRef={storyRef}>
            <Form.Select
              label="Stories"
              options={STORY}
              placeholder="Select Story"
              name="numOfStories"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.numOfStories ? true : false}
              defaultValue={isPageTwoNew ? false : details['numOfStories']}
            />
          </Ref>
        </Form.Group>

        <Divider hidden></Divider>
        <Form.Group widths="equal">
          <Ref innerRef={lotSizeSqFtRef}>
            <Form.Field
              control={Input}
              label="Lot Size (sqft)"
              name="lotSizeSqFt"
              placeholder="Enter Lot Size e.g. 2000"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.lotSizeSqFt ? true : false}
              defaultValue={isPageTwoNew ? '' : details['lotSizeSqFt']}
            />
          </Ref>

          <Ref innerRef={livingAreaSqFtRef}>
            <Form.Field
              control={Input}
              label="Living Area (sqft)"
              name="livingAreaSqFt"
              placeholder="Enter sqft e.g. 1000"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.livingAreaSqFt ? true : false}
              defaultValue={isPageTwoNew ? '' : details['livingAreaSqFt']}
            />
          </Ref>
          <Ref innerRef={yearRef}>
            <Form.Field
              control={Input}
              label="Year Built"
              name="yearBuilt"
              placeholder="Enter year e.g. 2018"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.yearBuilt ? true : false}
              defaultValue={isPageTwoNew ? '' : details['yearBuilt']}
            />
          </Ref>
        </Form.Group>
        <FormErrors errors={errors} />
        <Divider hidden 
          style={{
            padding:mobile ? ".3em" : tablet ? ".5em" : "1em"
          }}
        ></Divider>
        {showButtons()}
      </Form>
    </Grid>
  );
};

export default PageTwo;

import React, { useContext } from 'react';
import { MyContext } from '../stores/Store';
import NavigationButtons from '../components/NavigationButtons';
import PredictionError from '../components/PredictionError';
import { BASEURL, PREDICT } from '../stores/constants';
import axios from 'axios';
import { Segment, Checkbox, Divider, Form } from 'semantic-ui-react';

/**
 * Takes amenity details of the property
 */
const PageThree = ({ changePage, mobile, tablet, desktop }) => {
  const { amenities, details, locations, changeAmenities, changePrediction } =
    useContext(MyContext);
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    getPrediction();
  };

  const getPrediction = async () => {
    try {
      const response = await axios.post(`${BASEURL}${PREDICT}`, {
        latitude: locations.latitude,
        longitude: locations.longitude,
        zipcode: locations.zipcode,
        homeType: details.homeType,
        parkingSpaces: details.parkingSpaces,
        garageSpaces: details.garageSpaces,
        numOfBathrooms: details.numOfBathrooms,
        numOfBedrooms: details.numOfBedrooms,
        numOfStories: details.numOfStories,
        lotSizeSqFt: details.lotSizeSqFt,
        livingAreaSqFt: details.livingAreaSqFt,
        yearBuilt: details.yearBuilt,
        hasAssociation: amenities.hasAssociation,
        hasCooling: amenities.hasCooling,
        hasGarage: amenities.hasGarage,
        hasSpa: amenities.hasSpa,
        hasView: amenities.hasView,
        hasHeating: amenities.hasHeating,
      });
      // handle bad prediction result
      if(response.data.statusCode === 500){
        setOpen(true)
        return
      }
      changePrediction('prediction', response.data.result);
      changePage(4);
    } catch (err) {
      setOpen(true)
    }
  };

  const showButtons = () => {
    if(mobile) 
    return <NavigationButtons changePage={changePage} back={2} text={'Predict'} mobile/>;
    else if(tablet)
    return <NavigationButtons changePage={changePage} back={2} text={'Predict'} tablet/>;
    else return <NavigationButtons changePage={changePage} back={2} text={'Predict'} desktop/>;
  }

  return (
    <Form
      style={{ 
        margin: mobile ? '0% 10%' : tablet ? '0% 15%' : '0% 20%', 
        paddingBottom: '25%' }}
      onSubmit={(e) => handleSubmit(e)}
    >
      {open && <PredictionError open={open} setOpen={setOpen}/>}
      <Segment.Group horizontal size="huge">
        <Segment>
          <Form.Field>
            <Checkbox
              label="Has HOA"
              name="hasAssociation"
              onChange={(e, { name, checked }) => {
                changeAmenities(name, checked);
              }}
            />
          </Form.Field>
        </Segment>
        <Segment>
          <Form.Field>
            <Checkbox
              label="Has Garage"
              name="hasGarage"
              onChange={(e, { name, checked }) => {
                changeAmenities(name, checked);
              }}
            />
          </Form.Field>
        </Segment>
      </Segment.Group>
      <Divider hidden></Divider>

      <Segment.Group horizontal size="huge">
        <Segment>
          <Form.Field>
            <Checkbox
              label="Has Cooling"
              name="hasCooling"
              onChange={(e, { name, checked }) => {
                changeAmenities(name, checked);
              }}
            />
          </Form.Field>
        </Segment>
        <Segment>
          <Form.Field>
            <Checkbox
              label="Has Heating"
              name="hasHeating"
              onChange={(e, { name, checked }) => {
                changeAmenities(name, checked);
              }}
            />
          </Form.Field>
        </Segment>
      </Segment.Group>
      <Divider hidden></Divider>
      <Segment.Group horizontal size="huge">
        <Segment>
          <Form.Field>
            <Checkbox
              label="Has a View"
              name="hasView"
              onChange={(e, { name, checked }) => {
                changeAmenities(name, checked);
              }}
            />
          </Form.Field>
        </Segment>
        <Segment>
          <Form.Field>
            <Checkbox
              label="Has a Spa"
              name="hasSpa"
              onChange={(e, { name, checked }) => {
                changeAmenities(name, checked);
              }}
            />
          </Form.Field>
        </Segment>
      </Segment.Group>
      <Divider hidden
        style={{
          padding:mobile ? ".3em" : tablet ? ".5em" : "1em"
        }}
      ></Divider>
      {showButtons()}
    </Form>
  );
};

export default PageThree;

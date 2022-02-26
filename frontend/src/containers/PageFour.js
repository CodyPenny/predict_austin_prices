import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../stores/Store';
import ChartWrapper from '../visualizations/ChartWrapper';
import Chart2Wrapper from '../visualizations/Chart2Wrapper';
import Prediction from '../components/Prediction';
import { NoGraph } from '../components/Errors';
import HeaderPageFour from '../components/HeaderPageFour';
import { StyledButtonWrapper } from '../styled/StyledHeader';
import { GRAPHS } from '../stores/constants';
import axios from 'axios';

import { Container, Header, Segment, Button, Icon } from 'semantic-ui-react';

/**
 * Results page
 * Displays the prediction and graphs
 * @param {*} 
 */
const PageFour = ({ changePage, mobile, tablet, desktop }) => {
  const {
    details,
    locations,
    initialLocations,
    initialDetails,
    initialAmenities,
    changeLocation,
    changeDetails,
    changeAmenities,
  } = useContext(MyContext);
  const [dataGraph1, setDataGraph1] = useState(null);
  const [dataGraph2, setDataGraph2] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const refresh = () => {
    for (const [key, value] of Object.entries(initialLocations)) {
      changeLocation(key, value);
    }
    for (const [key, value] of Object.entries(initialDetails)) {
      changeDetails(key, value);
    }
    for (const [key, value] of Object.entries(initialAmenities)) {
      changeAmenities(key, value);
    }
    changePage(1);
  };

  useEffect(() => {
    const fetchDataGraph1 = async () => {
      const graph1 = await axios.get(`${GRAPHS}`);
      setDataGraph1(graph1.data.result);
    };
    const fetchDataGraph2 = async () => {
      const graph2 = await axios.post(`${GRAPHS}`, {
        homeType: details['homeType'],
        yearBuilt: details['yearBuilt'],
        numOfBedrooms: details['numOfBedrooms'],
        numOfBathrooms: details['numOfBathrooms'],
      });
      const results = JSON.parse(graph2.data.result);
      if (results.length < 1) {
        setNoResults(true);
      } else {
        setDataGraph2(results);
      }
    };
    if (!dataGraph1) {
      try {
        fetchDataGraph1();
      } catch (error) {
        setNoResults(true);
      }
    }
    if (!dataGraph2) {
      try {
        fetchDataGraph2();
      } catch (error) {
        setNoResults(true);
      }
    }
  }, [noResults]);

  const getGraph = (num) => {
    if(num === 1){
      if(mobile)
      return <ChartWrapper data={dataGraph1} mobile/>
      else if(tablet)
      return <ChartWrapper data={dataGraph1} tablet/>
      else 
      return <ChartWrapper data={dataGraph1} desktop/>
    } else {
      if(mobile)
      return <Chart2Wrapper data={dataGraph2} mobile/>
      else if(tablet)
      return <Chart2Wrapper data={dataGraph2} tablet/>
      else 
      return <Chart2Wrapper data={dataGraph2} desktop/>
    }
  }

  return (
    <Container style={{
      padding: mobile ? "0 0" : tablet ? "0 2em" : "0 3em"
    }}>
      <HeaderPageFour locations={locations} />
      <Prediction />
      <Segment 
        textAlign="center" 
        >
        <Header>Number of Homes Sold from 2018-2021 by Built Year</Header>
        {getGraph(1)}
      </Segment>
      <Segment 
        textAlign="center" 
        >
        <Header>Comparable Prices of the Same Home-Type/Bed/Bath</Header>
        {noResults ? <NoGraph /> : getGraph(2) }
      </Segment>
      <StyledButtonWrapper>
        <Button
          inverted
          color="orange"
          size={mobile ? "medium" : tablet ? "large" : "huge"}
          floated="left"
          onClick={() => changePage(3)}
        >
          <Icon name="left arrow" />
          Go Back
        </Button>
        <Button
          icon
          primary
          size={mobile ? "medium" : tablet ? "large" : "huge"}
          floated="right"
          onClick={() => refresh()}
        >
          Startover <Icon name="home" />
        </Button>
      </StyledButtonWrapper>
    </Container>
  );
};

export default PageFour;

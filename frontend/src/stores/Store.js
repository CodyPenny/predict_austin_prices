import React, { createContext, useReducer } from 'react';

export const MyContext = createContext();

/**
 * Global data
 */
export const Store = ({ children }) => {
  const initialLocations = {
    latitude: 0,
    longitude: 0,
    zipcode: '',
    label: ''
  };

  const initialDetails = {
    homeType: '',
    parkingSpaces: 0,
    garageSpaces: 0,
    numOfBathrooms: 0,
    numOfBedrooms: 0,
    numOfStories: 0,
    lotSizeSqFt: 0,
    livingAreaSqFt: 0,
    yearBuilt: 0,
  };

  const initialAmenities ={
    hasAssociation: false,
    hasCooling: false,
    hasGarage: false,
    hasSpa: false,
    hasView: false,
    hasHeating: false,
  }

  const initialPrediction = {
    prediction : 0
  }

  // resolve resize refresh issue, (goes back to homepage on resize)
  const initialPage = {
    page: 1
  }

  const reducer = (currVals, newVals) => ({ ...currVals, ...newVals });

  const [locations, setLocations] = useReducer(reducer, initialLocations);
  const [details, setDetails] = useReducer(reducer, initialDetails);
  const [amenities, setAmenities] = useReducer(reducer, initialAmenities);
  const [prediction, setPrediction] = useReducer(reducer, initialPrediction);
  const [page, setPage] = useReducer(reducer, initialPage);

  const value = {
    amenities,
    details,
    locations,
    prediction,
    initialLocations,
    initialDetails,
    initialAmenities,
    page,
    changeLocation: (name, value) => {
      setLocations({ [name]: value });
    },
    changeDetails: (name, value) => {
      setDetails({ [name]: value });
    },
    changeAmenities: (name, value) => {
      setAmenities({ [name]: value });
    },
    changePrediction: (name, value) => {
      setPrediction({ [name]: value });
    },
    changeNextPage: (name, value) => {
      setPage({ [name]: value });
    },
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

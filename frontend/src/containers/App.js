import React from 'react';
import { createMedia } from '@artsy/fresnel'
import { Store } from '../stores/Store';
import Homepages from './Homepages';
import { MainContainerWrapper, MainStyledContainer } from '../styled/StyledContainer';

/**
 * Media breakpoints
 */
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
})

/**
 * Entry point to Landing page
 * Renders the homepage per media breakpoint
 */
const App = () => (
    <MediaContextProvider>
      <MainContainerWrapper>
      <Store>
        <MainStyledContainer
            fluid
          >
            <Media at="mobile">
              <Homepages mobile/>
            </Media>
            <Media at="tablet">
                <Homepages tablet/>
            </Media>
            <Media greaterThanOrEqual="desktop">
              <Homepages desktop/>
            </Media>
      </MainStyledContainer>
    </Store>
    </MainContainerWrapper>
  </MediaContextProvider>
 );

export default App;

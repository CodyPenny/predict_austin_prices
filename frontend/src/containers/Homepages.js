import React, { useContext, useState } from 'react';
import { MyContext } from '../stores/Store';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageFour from './PageFour';
import { Header } from 'semantic-ui-react';
import { StyledSegmentWrapper } from '../styled/StyledSegment';
import * as Styled from '../styled/StyledHeader';

/**
 * Landing page
 * @param {*} mobile, tablet, computer - media breakpoints 
 */
const Homepages = ({mobile, tablet, desktop}) => {
  // Use context to keep globat state between refreshes and resizes
  const { page, changeNextPage } = useContext(MyContext)
  // A flag to keep tabs on form data between back navs
  const [isPageTwoNew, setIsPageTwoNew] = useState(true);

  const changePage = (num) => {
    changeNextPage( "page", num)
  };
 
  /**
   * Renders the different forms in order per media breakpoint
   */
  const renderPage = () => {
    if (page.page == 1) {
      if(mobile)
      return <PageOne changePage={changePage} mobile/>;
      else if(tablet)
      return <PageOne changePage={changePage} tablet/>;
      else
      return <PageOne changePage={changePage} desktop/>;
    }
    if (page.page == 2) {
        if(mobile)
        return <PageTwo
          changePage={changePage}
          isPageTwoNew={isPageTwoNew}
          setPageTwo={setIsPageTwoNew}
          mobile
          />
        else if(tablet)
        return <PageTwo
        changePage={changePage}
        isPageTwoNew={isPageTwoNew}
        setPageTwo={setIsPageTwoNew}
        tablet
         />
        else
        return <PageTwo
        changePage={changePage}
        isPageTwoNew={isPageTwoNew}
        setPageTwo={setIsPageTwoNew}
        desktop
          />
    }
    if (page.page == 3) {
      if(mobile)
      return <PageThree changePage={changePage} mobile/>;
      else if(tablet)
      return <PageThree changePage={changePage} tablet/>;
      else
      return <PageThree changePage={changePage} desktop/>;

    }
    if (page.page == 4) {
      if(mobile)
      return <PageFour changePage={changePage} mobile/>;
      else if(tablet)
      return <PageFour changePage={changePage} tablet/>;
      else
      return <PageFour changePage={changePage} desktop/>;
    }
  };

  if(mobile) 
  return (
    <>
      <Styled.StyledHeaderMobile_A> 
        <Header 
          as="h1"
          content="Austin Real Estate"
          inverted
         />
      </Styled.StyledHeaderMobile_A> 

      <Styled.StyledHeaderMobile_B>
          This is a machine learning model that determines the value of your property using regression analysis.
      </Styled.StyledHeaderMobile_B>

      <StyledSegmentWrapper>
          {renderPage()} 
    </StyledSegmentWrapper> 
    </>
  );

  else if(tablet)
  return(
    <>
      <Styled.StyledHeaderTablet_A> 
        Austin Real Estate
      </Styled.StyledHeaderTablet_A> 

      <Styled.StyledHeaderTablet_B>
          This is a machine learning model that determines the value of your property using regression analysis.
      </Styled.StyledHeaderTablet_B>

     <StyledSegmentWrapper>
        {renderPage()} 
      </StyledSegmentWrapper> 
   </>
  )

  else
  return(
    <>
    <Styled.StyledHeaderDeskTop_A> 
      Austin Real Estate
    </Styled.StyledHeaderDeskTop_A> 

    <Styled.StyledHeaderDeskTop_B>
        This is a machine learning model that determines the value of your property using regression analysis.
    </Styled.StyledHeaderDeskTop_B>

    <StyledSegmentWrapper>
       {renderPage()}
     </StyledSegmentWrapper> 
  </>
  )
};

export default Homepages;



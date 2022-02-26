import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import bg from '../../images/houses.jpg'

/**
 * Styled components
 */
export const MainStyledContainer = styled(Container)`
    min-height: 100vh; 
    background-image: url(${bg}); 
    background-size: cover;
    margin: 0;
`;
  
// covers the white sides in mobile view
export const MainContainerWrapper = styled.div`
.ui.fluid.container {
    margin-left: 0 !important;
    margin-right: 0 !important;
}
`

export const StyledErrorWrapper = styled.div` {
    color: #fff;
    padding-top: 2em;
}
`

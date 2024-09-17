import React from 'react';
import Helmet from 'react-helmet';

const TitleComponent = ({ title }) => {
    var defaultTitle = 'AnselBank';
    let init = 'AnselBank | '
    return (
        <Helmet>
            <title>{title ? init + title : defaultTitle}</title>
        </Helmet>
    );
};
 
export default TitleComponent;
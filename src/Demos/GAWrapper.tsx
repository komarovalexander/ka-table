import React, { useEffect } from 'react';
import { FieldsObject } from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';

import { trackPage } from './ga';

export const withTracker = <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  options: FieldsObject = {},
) => {

  return (props: P) => {
    useEffect(() => {
      trackPage(props.location.pathname, options);
    }, [props.location.pathname]);

    return <WrappedComponent {...props} />;
  };
};

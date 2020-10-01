import React from 'react';

import NormalNavBar from './NormalNavBar';
import SegmentNavBar from './SegmentNavBar';
import Container from './Container';

const BaseScreen = props => {
  return (
    <Container>
      {props.navType === 'SEGMENT' ?
        (<SegmentNavBar titles={props.titles} onSelect={props.onSelect} onRight={props.onRight} onLeft={props.onLeft} tabIndex={props.tabIndex}/>)
        :
        (<NormalNavBar title={props.title} onClose={props.onClose} modal={props.modal} />)}
      {props.children}
    </Container>
  );
};

export default BaseScreen;

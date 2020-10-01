import React from 'react';
import styled from 'styled-components/native';
import { get } from 'lodash';

import { MainRegularFont, MainBoldFont } from '@/views/Components';
import { Spacing } from '@/styles/Dimension';
import { Colors } from '@/styles';

export default OrderSummaryYellowBox = ({ style, order }) => {
  return (
    <YellowBox style={style}>
      <LightInfo name="Subtotal" value={"$" + order.subtotal?.toFixed(2)} />
      <LightInfo name="Tax" value={"$" + order.tax?.toFixed(2)} />
      <LightInfo name="Tip" value={"$" + order.tip?.toFixed(2)} />
      {(order.discount && order.discount !== 0) &&
        <RedInfo name="Discount" value={"$" + get(order, "discount")} eventName={get(order, "event.name")} />
      }
      <BoldInfo name="Grand Total" value={"$" + order.total?.toFixed(2)} />
    </YellowBox>
  )
}

const YellowBox = styled.View`
  align-self:stretch;
  background-color: ${Colors.yellow};
  border-radius: 25px;
  padding-horizontal: ${Spacing.MD}px;
  padding-vertical: ${Spacing.LG}px;
`
const InfoItem = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const LightText = styled(MainRegularFont)`
  color: #3F3F3F;
  font-size: 13px;
  line-height: 19px;
`

const BoldText = styled(MainBoldFont)`
  color: black;
  font-size: 13px;
  line-height: 19px;
`

const RedText = styled(MainBoldFont)`
  color: red;
  font-size: 13px;
  line-height: 19px;
`

const LightInfo = ({ name, value }) => (
  <InfoItem>
    <LightText>{name}</LightText>
    <LightText>{value}</LightText>
  </InfoItem>
)

const BoldInfo = ({ name, value }) => (
  <InfoItem>
    <BoldText>{name}</BoldText>
    <BoldText>{value}</BoldText>
  </InfoItem>
)

const RedInfo = ({ name, value, eventName }) => (
  <InfoItem>
    <RedText>{name + " (" + eventName + ")"}</RedText>
    <RedText>{value}</RedText>
  </InfoItem>
);

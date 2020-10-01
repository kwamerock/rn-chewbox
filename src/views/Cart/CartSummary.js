import React from 'react';
import styled from 'styled-components';

import { TipSelector } from '@/views/Orders/OrderItem';
import { Colors } from '@/styles/Colors';
import { MainRegularFont, MainBoldFont, MainLightFont } from '@/views/Components';

function getType(p) {
  if (p == undefined ||
    Math.abs(p - 10) < 0.001 ||
    Math.abs(p - 15) < 0.001 ||
    Math.abs(p - 20) < 0.001) {

    return "$"
  }

  return "%"
}

// @observables
export default class CartSummary extends React.Component {
  // @observable
  tipAmount = this.props.tip || 0;
  tipType = getType(this.props.tipPercentage);
  tipPercentage = this.props.tipPercentage;

  subtotal = this.props.subtotal || 0;
  tax = this.props.tax || 0;
  total = this.props.total || 0;
  discount = this.props.discount || 0;
  eventName = this.props.eventName || "";

  componentWillReceiveProps(next) {
    if (!this.lock) {
      this.tipAmount = next.tip || 0;
      this.tipType = getType(next.tipPercentage);
      this.tipPercentage = next.tipPercentage;
      this.subtotal = next.subtotal || 0;
      this.total = next.total || 0;
    }
  }

  getTip() {
    if (this.tipType === "$") {
      return this.tipAmount;
    } else {
      return this.subtotal * this.tipAmount / 100;
    }
  }

  onChangeTip(value) {
    if (value.tipAmount.toString().indexOf('.') >= 0 && value.tipAmount.toString().split('.')[1].length > 2) {
      this.tipAmount = parseFloat(value.tipAmount.toString().split('.')[0] + '.' + value.tipAmount.toString().split('.')[1].substring(0, 2));
      return;
    }
    this.lock = true
    this.props.onChangeTip && this.props.onChangeTip(value);
    setTimeout(() => {
      this.lock = false;
    }, 100)

    this.tipAmount = value.tipAmount;
    this.tipType = value.tipType;

    this.total = this.subtotal + this.getTip() + this.tax - this.discount;
  }

  render() {
    const { subtotal, tax, tipAmount, tipPercentage, total, tipType, discount, eventName } = this;
    return (
      <Container>
        <TipSelector
          total={subtotal}
          onChange={value => this.onChangeTip(value)}
          tip={tipAmount}
          percent={tipPercentage}
        />

        <YellowBox>
          <LightInfo name="Subtotal" value={"$" + subtotal.toFixed(2)} />
          <LightInfo name="Tax" value={"$" + tax.toFixed(2)} />
          <LightInfo name="Tip" value={"$" + this.getTip().toFixed(2)} />
          {discount !== 0 && <RedInfo name="Discount" value={"$" + discount.toFixed(2)} eventName={eventName} />}
          <BoldInfo name="Grand Total" value={"$" + total.toFixed(2)} />
        </YellowBox>
      </Container>
    )
  }
}

const Container = styled.View`
  padding-horizontal: 20px;
  margin-vertical: 9px;
  background-color: #FFFFFF;
`

const YellowBox = styled.View`
  width: 100%;
  background-color: ${Colors.yellow};
  border-radius: 12px;
  padding-horizontal: 20px;
  padding-vertical: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
`

const InfoItem = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const LightText = styled(MainLightFont)`
  color: #3F3F3F;
  font-weight: 500;
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
  font-weight: 500;
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

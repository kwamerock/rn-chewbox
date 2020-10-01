import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

const TransactionItem = (props) => (
  <Container>
    <Avatar source={{ uri: props.avatar }} />
    <Body>
      <Name>Delivery: {props.name}</Name>
      <Status>{props.status}</Status>
    </Body>
    <Right>
      <PriceContainer>
        <Price>+ ${props.price}</Price><Penny>00</Penny>
      </PriceContainer>
      <Date>{moment(props.date).format("MM/DD")}</Date>
    </Right>
  </Container>
)

export default TransactionItem;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  height: 70px;
  padding-horizontal: 20px;
`

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  background-color: #D8D8D8;
  border-radius: 25px;
`

const Body = styled.View`
  flex: 1;
  margin-left: 10px;
`

const Right = styled.View`
  align-items: center;
`

const Name = styled.Text`
  font-size: 14px;
  color: black;
`

const Status = styled.Text`
  font-size: 12px;
  color: black;
  opacity: 0.42;
  font-style: italic;
`

const Price = styled.Text`
  font-size: 15px;
  color: black;
  font-weight: bold;
`

const Penny = styled.Text`
  font-size: 9px;
`

const PriceContainer = styled.View`
  flex-direction: row;
`

const Date = styled.Text`
  font-size: 12px;
  color: black;
  opacity: 0.42;
`
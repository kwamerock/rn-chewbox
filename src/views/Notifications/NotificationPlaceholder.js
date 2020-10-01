import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import styled from 'styled-components';

const PlaceholderItem = ({ duration = 1500 }) => (
  <ItemContainer>
    <AvatarPlaceholder duration={duration} autoRun />
    <Content>
      <LongBarPlaceholder duration={duration} autoRun />
      <SmallBarPlaceholder duration={duration} autoRun />
    </Content>
  </ItemContainer>
)

const NotificationPlaceholder = ({ isLoading }) => isLoading ? (
  <Container>
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
    <PlaceholderItem />
  </Container>
) : null;

export default NotificationPlaceholder;

const Container = styled.View`
  padding: 20px;
  background-color: white;
`

const ItemContainer = styled.View`
  flex-direction: row;
  padding-vertical: 15px;
`

const Content = styled.View`
  justify-content: space-between;
  margin-left: 10px;
  flex: 1px;
`

const AvatarPlaceholder = styled(ShimmerPlaceHolder)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`

const LongBarPlaceholder = styled(ShimmerPlaceHolder)`
  height: 14px;
  width: 100%;
  border-radius: 7px;
`

const SmallBarPlaceholder = styled(LongBarPlaceholder)`
  width: 50%;
`
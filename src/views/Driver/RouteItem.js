import React from 'react';
import styled from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RouteItems = (props) => {
  const navigation = useNavigation();

  const goDetail = () => {
    navigation.navigate("RouteDetail", props)
  }

  return (
    <Container onPress={goDetail}>
      <Top>
        <Left>
          <Name>{props.name}</Name>
          <Site>{props.site}</Site>
          <Location>{props.location}</Location>
        </Left>
        <Right>
          <Distance>{props.distance}</Distance>
          <Distance>{props.duration}</Distance>
          <Status>{props.status}</Status>
        </Right>
      </Top>
      <Bottom>
        <UserInfo>
          <Avatar source={{ uri: props.avatar }} />
          <Info>{props.info}</Info>
        </UserInfo>
        <Feather name="chevron-right" size={20} color="#7D7979" />
      </Bottom>
    </Container>
  )
}

export default RouteItems;

const Container = styled.TouchableOpacity`
  height: 130px;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: white;
  justify-content: space-between;
`

const Left = styled(View)`
  flex: 1;
`

const Right = styled(View)`
  align-items: flex-end;
`

const Top = styled(View)`
  flex-direction: row;
  width: 100%;
`

const Bottom = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #202020;
`

const Site = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: #202020;
`

const Location = styled.Text`
  font-size: 9px;
  color: #202020;
`

const Distance = styled.Text`
  font-size: 10px;
  color: black;
  font-weight: bold;
`

const Status = styled.Text`
  font-size: 9px;
  color: black;
`

const UserInfo = styled.View`

`

const Avatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #D8D8D8;
`

const Info = styled.Text`
  font-size: 7px;
  color: #202020;
  margin-top: 5px;
`
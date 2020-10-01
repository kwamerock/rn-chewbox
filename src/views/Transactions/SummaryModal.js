import React from 'react'
import styled from 'styled-components/native';
import { Modal } from 'react-native';

const SummaryModal = (props) => (
  <Modal
    transparent
    visible={props.visible}
    animationType="slide"
    onRequestClose={() => { }}
  >
    <Container>
      <Back onPress={props.onClose} />
      <Content>
        <Header>
          <Title>EARNINGS SUMMARY</Title>
        </Header>
        <Body>
          <Cell>
            <SmallText>UNPAID</SmallText>
            <BigText>$312</BigText>
          </Cell>
          <Cell style={{ opacity: 0.5 }}>
            <SmallText>LAST 30</SmallText>
            <BigText>$1,212</BigText>
          </Cell>
          <Cell style={{ opacity: 0.5 }}>
            <SmallText>LIFETIME</SmallText>
            <BigText>$3,233</BigText>
          </Cell>
        </Body>
      </Content>
    </Container>
  </Modal>
)

export default SummaryModal;

const Container = styled.View`
  flex: 1;
`

const Content = styled.View`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
  shadow-opacity: 0.2;
  shadow-color: black;
  shadow-radius: 2px;
  elevation: 2;
`

const Header = styled.View`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  align-items: center;
  justify-content: center;
  height: 50px;
`

const Body = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 20px;
`

const Cell = styled.View`
  flex: 1;
  align-items: center;
`

const SmallText = styled.Text`
  font-size: 12px;
  color: black;
  font-weight: bold;
`

const BigText = styled(SmallText)`
  font-size: 24px;
`

const Back = styled.TouchableOpacity`
  flex: 1;
`

const Title = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
`
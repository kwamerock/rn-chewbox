import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Modal, KeyboardAvoidingView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { MyTextArea, BlackButton, MainRegularFont } from '@/views/Components';

const DeliverModal = (props) => {
  const [selected, setSelect] = useState(false);

  return (
    <Modal
      transparent
      visible={props.visible}
      animationType="slide"
      onRequestClose={() => { }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Container>
          <Back onPress={props.onClose} />
          <Content>
            <Header>
              <Title>MARK AS DELIVERED</Title>
            </Header>
            <Body>
              <TextArea noBorder title="COMMENT" description="50 characters limit" />
              <OptionContainer>
                <Option onPress={() => setSelect(false)}>
                  <CheckBox style={{ backgroundColor: !selected ? "black" : "#DBDBDB" }}>
                    {!selected && <Feather name="check" size={14} color="white" />}
                  </CheckBox>
                  <OptionText>Failed Delivery</OptionText>
                </Option>
                <Option onPress={() => setSelect(true)}>
                  <CheckBox style={{ backgroundColor: selected ? "black" : "#DBDBDB" }}>
                    {selected && <Feather name="check" size={14} color="white" />}
                  </CheckBox>
                  <OptionText>Successful Delivery</OptionText>
                </Option>
              </OptionContainer>
            </Body>
          </Content>
          <Bottom>
            <BlackButton onPress={props.onClose}>SUBMIT</BlackButton>
          </Bottom>
        </Container>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default DeliverModal;

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5)
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
  align-items: center;
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

const Bottom = styled.View`
  height: 80px;
  width: 100%;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
  border-top-width: 1px;
  border-top-color: #ccc;
`

const TextArea = styled(MyTextArea)`
`

const OptionContainer = styled.View`
  padding: 10px;
`

const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-vertical: 5px;
`

const CheckBox = styled.View`
  width : 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #DBDBDB;
  align-items: center;
  justify-content:center;
  padding-top: 2px;
`

const OptionText = styled(MainRegularFont)`
  font-size: 12px;
  color: black;
  font-weight: 600;
  margin-left: 10px;
`
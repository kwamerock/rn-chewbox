import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather'

import TransactionItem from '@/views/Transactions/TransactionItem';
import SummaryModal from '@/views/Transactions/SummaryModal';

const Transactions = () => {
  const [visible, setVisible] = useState(false)
  const data = [
    { avatar: "", name: "Dre Ducan", status: "pending", price: 38, date: new Date() },
    { avatar: "", name: "Dre Ducan", status: "pending", price: 38, date: new Date() },
    { avatar: "", name: "Dre Ducan", status: "pending", price: 38, date: new Date() },
    { avatar: "", name: "Dre Ducan", status: "pending", price: 38, date: new Date() },
  ]

  const onSummary = () => {
    setVisible(true)
  }

  return (
    <Container>
      <Header>
        <Search placeholder="Search Transactions" />
        <RightButton onPress={onSummary}>
          <Feather name="sliders" color="black" size={24} />
        </RightButton>
      </Header>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TransactionItem {...item} />}
      />
      <SummaryModal visible={visible} onClose={() => setVisible(false)} />
    </Container>
  )
}

export default Transactions;

const Container = styled(View)`
  flex: 1;
`

const Header = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  padding-horizontal: 5px;
`

const RightButton = styled.TouchableOpacity`
  padding: 10px;
`

const Search = styled.TextInput`
  flex: 1;
  margin-left: 10px;
`
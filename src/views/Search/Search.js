import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import styled from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';
import { reduce } from 'lodash';

import { BaseTextInput, MainRegularFont, MainBoldFont } from '@/views/Components';
import { Colors } from '@/styles';
import { ResultSection } from '@/views/Search/SearchItem';
import { useDelay } from '@/hooks/Utils';
import { useOvermind } from '@/store';

const tag = 'Search::'

const Search = (props) => {
  const { state } = useOvermind();
  const { currentUser } = state;

  const [search, { data, error, loading }] = useSearch()
  const scheduleSearch = useDelay(search)
  const [keyword, setKeyword] = useState(props.route.params?.keyword || "")

  const resultCount = reduce(data, (count, array) => count + array.length, 0)

  const onSearch = (text) => {
    setKeyword(text)
    scheduleSearch(text)
  }

  useEffect(() => {
    scheduleSearch(keyword)
  }, [])

  console.log("search", data)

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled={Platform.OS === "ios"}>
      <Container>
        <Header>
          <Title>Search</Title>
          <ResultText>{resultCount} Results</ResultText>
        </Header>
        <SearchInput
          placeholder="Enter Search Terms"
          placeholderColor="#A3A3A3"
          value={keyword}
          onChangeText={onSearch}
        />
        <FlatList
          refreshing={loading}
          data={Object.keys(data)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <ResultSection data={data[item]} title={item} />}
          ListFooterComponent={() => <PaddinBottom />}
        />
        <CloseButton onPress={() => props.navigation.pop()}>
          <Feather name="x" size={24} color="white" />
        </CloseButton>
      </Container>
    </KeyboardAvoidingView>
  )
}

export default Search;

const Container = styled.View`
  flex:1;
  background-color: #f9f9f9;
`

const SearchInput = styled(BaseTextInput)`
  height: 54px;
  width: 100%;
  background-color: #E9E9E9;
  font-size: 14px;
  line-height: 19px;
  color:black;
  padding:15px;
`

const Header = styled.View`
  height: 60px;
  width: 100%;
  padding-horizontal: 20px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #DDDDDD
  background-color: white;
`
const Title = styled(MainBoldFont)`
	font-size: 14px;
	color: black;
`

const ResultText = styled(MainRegularFont)`
	font-size: 13px;
	color: #000000
`

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 15px;
  width:30px;
  height:30px;
  borderRadius: 15px;
  backgroundColor: black;
  alignItems: center;
  padding-left:1px;
  padding-top:1px;
  justifyContent: center;
`

const PaddinBottom = styled.View`
  height: 50px;
`

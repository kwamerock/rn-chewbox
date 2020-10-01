import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import styled from 'styled-components/native';
import { isNil, isEmpty, get, defaultTo } from 'lodash';
import Geolocation from '@react-native-community/geolocation';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { Styles, Images, Colors, Sizes } from '@/styles';
import { FontSize, Spacing } from '@/styles/Sizes';
import { BaseTextInput, TextButton, MainSemiBoldFont, CloseButton, ItemContainer, ItemSeparator } from '@/views/Components';

import { useDelay } from '@/hooks/Utils';
import { useOvermind } from '@/store';
import { themeProp as theme } from '@/utils/CssUtil';
import { addressNoCountry } from '@/utils/MiscUtil';
// import { useSearchGooglePlaces } from '../hooks/Queries'

export default GooglePlaceSelector = (props) => {
  const params = props.route.params;

  const [address, setAddress] = useState(params.address || '');
  const [searchApi, { data: places, error, loading }] = useSearchGooglePlaces();
  const [keyword, setKeyword] = useState('');
  const { state, actions } = useOvermind();
  const { user, alert } = state;

  console.log('GooglePlaceSelector:: Searched Places', places);

  const delayedSearch = useDelay(searchApi)

  useEffect(
    () => {
      delayedSearch(keyword)
    }
    , [keyword])

  const finish = (place) => {
    params.onSelect && params.onSelect(place)
    props.navigation.pop()
  }

  const onSelect = (place) => {
    finish({
      name: place.name,
      address: place.formatted_address,
      details: place
    })
  }

  const onSelectMyLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log('GooglePlaceSelector:: getCurrentPosition() - ', info)
        const loc = `${info.coords.latitude.toFixed(3)}, ${info.coords.longitude.toFixed(3)}`
        finish({
          name: `Use current location`,
          address: loc,
          details: info
        })
      },
      error => {
        // display error when it is denied.
        console.log('GooglePlaceSelector:: getCurrentPosition() - ', error)
        actions.alert.showError(error.message, 'Location')
      })
  }

  console.log(places, "===================");

  const addresses = places.filter(p => !isEmpty(p.formatted_address) && p.formatted_address.split(", ").length >= 4)

  return (
    <KeyboardAvoiding behavior="padding" enabled={Platform.OS === "ios"}>
      <Container>
        <InputContainer>
          <FilterInput
            placeholder={"Enter location..."}
            placeholderTextColor={'grey'}
            value={keyword}
            onChangeText={setKeyword}
          />
          <ClearButton onPress={() => setKeyword("")}>CLEAR</ClearButton>
          <CloseButton onPress={() => props.navigation.pop()} />
        </InputContainer>
        <FlatList
          data={addresses}
          keyExtrator={(item, index) => index.toString()}
          ListHeaderComponent={(<MyLocation onPress={onSelectMyLocation} />)}
          renderItem={({ item }) => (
            <PlaceItem onPress={() => onSelect(item)} item={item} />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </Container>
    </KeyboardAvoiding>
  )
}

const MyLocation = ({ onPress }) => {
  return (
    <MyLocationContainer onPress={onPress}>
      <FAIcon name='location-arrow' color="#9b9b9b" size={16} />
      <ItemTitle>
        Current Location
      </ItemTitle>
    </MyLocationContainer>
  )
}

const PlaceItem = ({ item, onPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <ItemTitle>{addressNoCountry(item.formatted_address)}</ItemTitle>
    </ItemContainer>
  );
}

const MyLocationContainer = styled(ItemContainer)`
  border-bottom-color: ${theme('colorListDivider')};
  border-bottom-width:${theme('szListDivider')};
`

const KeyboardAvoiding = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Container = styled.View`
  background-color:white;
  flex: 1;
`;

const InputContainer = styled.View`
  ${Styles.start_center}
  border-bottom-width: 1px;
  border-bottom-color: #bbb;
  flex-direction: row;
  height: ${Sizes.scale(60)}px;
  padding-left:${Spacing.LG}px;
  padding-right:${Spacing.XS}px;
`;

const FilterInput = styled(BaseTextInput)`
  font-size: ${FontSize.Large}px;
  flex: 1;
`;

const ClearButton = styled(TextButton)`
  font-size: ${FontSize.Small}px;
  color: ${Colors.darkText};
`;

const ItemTitle = styled(MainSemiBoldFont)`
  color:#676767;
  font-size:14px;
  margin-left: 15px;
`

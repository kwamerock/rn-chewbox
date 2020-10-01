import React, { useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';

import { daysAgo } from '@/utils/DateUtil';
import { Container, TabScreen, MainBoldFont, BlackButton, YellowButton } from '@/views/Components';
import { Colors, Images } from '@/styles';
import { useOvermind } from '@/store';

/*
*
*/
function getAvatar(currentUser) {
  if (currentUser == null || currentUser.avatar == null || currentUser.avatar == "null") return Images.icons.Avatar;
  return { uri: currentUser.avatar }
}

/*
*
*/
const ListItem = ({ sentFrom, dueToReceiver, sentTo, createdAt }) => {
  const { state } = useOvermind();
  const { currentUser } = state;

  return (
    <ItemContainer>
      <AvatarContainer>
        <FromImage source={getAvatar(sentFrom)} />
        <ToImage source={getAvatar(sentTo)} />
      </AvatarContainer>
      <Content>
        {sentFrom != null && sentTo != null && <Description>
          {sentFrom.id != currentUser.id ? `${sentFrom.firstName} sent you ${dueToReceiver} in meal credit` :
            `You sent ${sentTo.firstName} ${dueToReceiver} in meal credit`}
        </Description>}
        <DateText>{daysAgo(createdAt)}</DateText>
      </Content>
    </ItemContainer>
  );
};

/*
*
*/
const Balance = props => {
  const { state, actions } = useOvermind();
  
  useEffect(() => {
    actions.wallet.getWalletBalance({userId: state.currentUser.id});
    actions.transaction.getTransactions({userId: state.currentUser.id});
    console.log("====>transactions", state.transaction.transactionList(state.transaction))
  }, []);
  
  if (state.wallet.isLoading || state.transaction.isLoading) {
    actions.hud.show();
  } else {
    actions.hud.hide();
  }

  const onSendPoints = () => {
    if (state.currentUser.balance > 0) {
      props.navigation.navigate("SendGift");

    } else {
      Alert.alert(
        "Send Points",
        "When you order from Chewbox on consecutive days," +
        "100 points ($1 value) is credited to your account. Use your " +
        "points to purchase meals, or send points to other Chewbox users."
      )
    }
  }

  const transactions = state.transaction.transactionList(state.transaction);

  return (
    <TabScreen {...props}>
      {/*<AdsImage source={Images.background.Ads} />*/}
      <Container>
        <TopArea>
          <BalanceTitle>POINT BALANCE</BalanceTitle>
          <BalanceAmount>{state.currentUser.balance}</BalanceAmount>
          <SendButton onPress={onSendPoints}>SEND POINTS</SendButton>
        </TopArea>

        {transactions && transactions.length == 0 &&
          <EmptyContainer>
            <EmptyLogo source={Images.icons.CoinB} />
            <BigString>Ready. Set. Go!</BigString>
            <EmptyString> You earn 100 points ($1 value) for every consecutive day you order a meal from a Kitchen on Chewbox. Use points towards buying meals. Or send to and receive from other users as many points as you'd like.</EmptyString>
          </EmptyContainer>
        }

        {transactions && transactions.length > 0 &&
          <FlatList
            refreshing={state.transaction.isLoading}
            onRefresh={actions.transaction.getTransactions({userId: state.currentUser.id})}
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ListItem {...item} />}
          />
        }
      </Container>
    </TabScreen>
  );
};

const BalanceTitle = styled(MainBoldFont)`
  font-size: 14px;
  line-height: 17px;
  color: black;
`;

const BalanceAmount = styled(MainBoldFont)`
  font-size: 38px;
  line-height: 46px;
  margin-bottom: 15px;
`;

const TopArea = styled.View`
  align-items: center;
  padding-horizontal: 50px;
  padding-vertical: 30px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
`;

const AdsImage = styled.Image`
  width: 100%;
  height: 80px;
  resize-mode: cover;
`

const SendButton = styled(BlackButton)`
  height: 46px;
  width: 300px;
`

const ItemContainer = styled.View`
  flex-direction: row;
  padding-horizontal: 15px;
  height: 54px;
  width: 100%;
  align-items: center;
`

const AvatarContainer = styled.View`
  width: 65px;
  height: 40px;
`

const FromImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  opacity: 0.5;
  background-color: #BCBCBC;
`

const ToImage = styled(FromImage)`
  position: absolute;
  right:0;
  top:0;
  opacity: 1;
`

const Content = styled.View`
  flex:1
  margin-horizontal: 10px;
`
const RightIcon = styled.View`
`

const Description = styled(MainBoldFont)`
  font-size: 12px;
  line-height: 16px;
  color: black;
`

const DateText = styled(Description)`
  color: ${Colors.greyText}
`

const EmptyContainer = styled.View`
  padding:30px;
  align-items:center;
`

const EmptyString = styled(MainBoldFont)`
  font-size: 12px;
  color:#B8B8B8
  line-height: 20px;
  text-align:center;
`

const BigString = styled(MainBoldFont)`
  font-size: 24px;
  color: #B8B8B8;
  padding-bottom: 10px;
`

const EmptyLogo = styled.Image`
  opacity: 0.25;
  width: 180px;
  height: 180px;
  resize-mode: contain;
`

const SendFriendsButton = styled(YellowButton)`
  height: 24px;
  border-radius: 4px;
  width: 200px;
  margin-top: 20px;
`

export default Balance;

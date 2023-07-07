import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as CISAPPApi from '../apis/CISAPPApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Icon,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const QuickPayScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const buildString = Scno => {
    console.log(`billing/rest/getBillDataWss/${Scno}`);
    return `billing/rest/getBillDataWss/${Scno}`;
  };

  const { theme } = props;
  const { navigation } = props;

  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [viewbilldetails, setViewbilldetails] = React.useState({});

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Header 2'],
          dimensions.width
        )}
      >
        {/* Back Click */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: 48,
              justifyContent: 'center',
              width: 48,
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon
              size={24}
              name={'Ionicons/arrow-back-sharp'}
              color={theme.colors['Custom Color_2']}
            />
          </Touchable>
        </View>
        {/* heading */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors['Strong'],
              fontFamily: 'Roboto_700Bold',
              fontSize: 18,
              marginLeft: 12,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'Quick Pay'}
        </Text>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'flex-start',
            alignItems: 'stretch',
            alignSelf: 'stretch',
            flexWrap: 'nowrap',
            justifyContent: 'space-around',
            paddingBottom: 20,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 20,
          },
          dimensions.width
        )}
      >
        {/* Enter custmoer service number */}
        <View
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ViewStyles(theme)['user name'], {
              marginTop: 20,
            }),
            dimensions.width
          )}
        >
          <Icon
            size={24}
            color={theme.colors['Custom Color_20']}
            name={'MaterialIcons/house'}
          />
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, paddingLeft: 10, paddingRight: 10 },
              dimensions.width
            )}
          >
            <TextInput
              onChangeText={newTextInputValue => {
                try {
                  setTextInputValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 8,
                  fontFamily: 'Roboto_400Regular',
                  paddingBottom: 8,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
              value={textInputValue}
              placeholder={'Enter service connection number'}
              editable={true}
              placeholderTextColor={theme.colors['Custom Color_20']}
            />
          </View>
        </View>
        {/* Send OTP  Submit */}
        <Button
          onPress={() => {
            const handler = async () => {
              try {
                const Viewbilldetailsjson = await CISAPPApi.viewBillDetailsPOST(
                  Constants,
                  { action: buildString(textInputValue) }
                );
                buildString(textInputValue);

                const valueaueixQRY =
                  Viewbilldetailsjson &&
                  Viewbilldetailsjson[0].data.BillDataJson[0];
                setViewbilldetails(valueaueixQRY);
                const Viewbilldetailslog = valueaueixQRY;
                console.log(Viewbilldetailslog);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={StyleSheet.applyWidth(
            {
              fontFamily: 'Roboto_400Regular',
              fontSize: 14,
              marginTop: 30,
              width: '100%',
            },
            dimensions.width
          )}
          title={'View Details'}
        />
      </View>
      {/* Details fetaching */}
      <>
        {!viewbilldetails?.Name ? null : (
          <View>
            {/* card */}
            <View
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ViewStyles(theme)['card'], {
                  backgroundColor: theme.colors['Background'],
                  borderColor: 'rgb(199, 198, 198)',
                  borderWidth: 1,
                  marginLeft: 20,
                  marginRight: 20,
                }),
                dimensions.width
              )}
            >
              {/* Name */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_700Bold',
                    fontSize: 16,
                  },
                  dimensions.width
                )}
              >
                {(() => {
                  const e = viewbilldetails?.Name;
                  console.log(e);
                  return e;
                })()}
              </Text>
              {/* Sub title */}
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'Roboto_700Bold',
                    fontSize: 12,
                    marginTop: 5,
                    opacity: 0.83,
                  },
                  dimensions.width
                )}
              >
                {viewbilldetails?.AccNo}
              </Text>
            </View>
            {/* card */}
            <View
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ViewStyles(theme)['card'], {
                  backgroundColor: 'rgb(255, 255, 255)',
                  borderColor: 'rgb(199, 198, 198)',
                  borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 25,
                }),
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignSelf: 'auto' },
                  dimensions.width
                )}
              >
                {/* Amount due */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      fontFamily: 'Roboto_700Bold',
                      fontSize: 16,
                      opacity: 0.64,
                    },
                    dimensions.width
                  )}
                >
                  {'Amount due'}
                </Text>
                {/* Amount  */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      fontFamily: 'Roboto_700Bold',
                      fontSize: 16,
                      opacity: 0.96,
                    },
                    dimensions.width
                  )}
                >
                  {viewbilldetails?.BillAmount}
                </Text>
                {/* Sub title */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      fontFamily: 'Roboto_300Light',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 0.5,
                    },
                    dimensions.width
                  )}
                >
                  {'Due date: '}
                  {viewbilldetails?.BillDueDate}
                </Text>
              </View>
              {/* Pay Now */}
              <Button
                onPress={() => {
                  try {
                    navigation.navigate('MakePaymentGuestScreen', {
                      Name: viewbilldetails?.Name,
                      Scno: viewbilldetails?.Scno,
                      BillMonth: viewbilldetails?.BillMonth,
                      BillDame: viewbilldetails?.BillIssueDate,
                      BillNo: viewbilldetails?.BillNo,
                      BillDueDate: viewbilldetails?.BillDueDate,
                      BillAmount: viewbilldetails?.BillAmount,
                      Arrear: viewbilldetails?.Arrear,
                      RebateGiven: viewbilldetails?.RebateGiven,
                      netcurrbill: viewbilldetails?.netcurrbill,
                      BillIssueDate: viewbilldetails?.BillIssueDate,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['GetFit Orange'],
                    borderRadius: 8,
                    fontFamily: 'Roboto_400Regular',
                    height: 36,
                    marginTop: 20,
                    textAlign: 'center',
                    width: '45%',
                  },
                  dimensions.width
                )}
                title={'Pay Now'}
              />
            </View>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(QuickPayScreen);
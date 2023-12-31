import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as CISAPPApi from '../apis/CISAPPApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CustomCode from '../custom-files/CustomCode';
import * as PrepaidUsage from '../custom-files/PrepaidUsage';
import * as Usage from '../custom-files/Usage';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Checkbox,
  Circle,
  CircleImage,
  Icon,
  Picker,
  ScreenContainer,
  Surface,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import * as WebBrowser from 'expo-web-browser';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const UsageScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const prepaidBillingString = meterNo => {
    console.log(
      `/SPM/getAllSpmMonthlyBillDetailsTByAccountNoOrMeterNumber?accountNoOrMeterNumber=${meterNo}`
    );
    return `/SPM/getAllSpmMonthlyBillDetailsTByAccountNoOrMeterNumber?accountNoOrMeterNumber=${meterNo}`;
  };

  const buildBillingString = Scno => {
    console.log(`billing/rest/getBillDataService/${Scno}`);
    return `billing/rest/getBillDataService/${Scno}`;
  };

  const manageAccountFun = ManageAccountDetails => {
    return ManageAccountDetails.map(team => {
      return { label: team.new_added_account, value: team.new_added_account };
    });
  };

  const buildConsumerString = Scno => {
    console.log(`billing/rest/AccountInfo/${Scno}`);
    return `billing/rest/AccountInfo/${Scno}`;
  };

  const convertMonthNoToMonthName = monthNo => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthName = monthNames[monthNo - 1];
    console.log(monthName);
    return monthName;
  };

  const convertDateTimeToDate = dateTime => {
    const date = dateTime.split(' ');
    console.log('date' + date);

    const str = date[0];

    return str;
  };

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        setTextInputValue(Constants['name']);
        const consumerDetailsJson = (
          await CISAPPApi.consumerDetailsPOST(Constants, {
            accno: Constants['name'],
          })
        )?.json;
        console.log(consumerDetailsJson);
        buildConsumerString(Constants['name']);
        const prepaidFlag = (consumerDetailsJson && consumerDetailsJson[0])
          ?.data?.prepaidFlag;
        setPrepaidFlag(prepaidFlag);
        console.log(prepaidFlag);
        const meterNo = (consumerDetailsJson && consumerDetailsJson[0])?.data
          ?.meterNumber;
        setMeterNumber(meterNo);
        console.log(meterNo);
        const BillingHistoryJson = (
          await CISAPPApi.billingHistoryPOST(Constants, {
            action: buildBillingString(Constants['name']),
          })
        )?.json;
        console.log(BillingHistoryJson);
        buildBillingString(Constants['name']);

        const valueFZLBTgGb =
          BillingHistoryJson && BillingHistoryJson[0].data.BillDataJson;
        setBillingHistoryScreen(valueFZLBTgGb);
        const billHistory = valueFZLBTgGb;
        const prepaidBillingHistoryJson = await (async () => {
          if (prepaidFlag === 'Y') {
            return (
              await CISAPPApi.billingHistoryPrepaidPOST(Constants, {
                action: prepaidBillingString(meterNo),
              })
            )?.json;
          }
        })();
        prepaidBillingString(meterNo);
        console.log(prepaidBillingHistoryJson);
        const prepaidBillingHistoryResult =
          prepaidBillingHistoryJson && prepaidBillingHistoryJson[0].data.data;
        setPrepaidBillingHistory(prepaidBillingHistoryResult);
        console.log(prepaidBillingHistoryResult);
        const ManageAccountDetails = (
          await CISAPPApi.manageAccountsPOST(Constants, {
            accountNumber: Constants['name'],
          })
        )?.json;
        console.log(ManageAccountDetails);
        const result = setGlobalVariableValue({
          key: 'manageaccount_picker',
          value: manageAccountFun(
            ManageAccountDetails && ManageAccountDetails[0].data[0].data
          ),
        });
        console.log(result);
        setServiceConNumber(props.route?.params?.Name ?? '');
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);
  const [ShowNav, setShowNav] = React.useState(false);
  const [availableBalance, setAvailableBalance] = React.useState('');
  const [billingHistoryScreen, setBillingHistoryScreen] = React.useState({});
  const [hiddenHindi, setHiddenHindi] = React.useState(true);
  const [meterNumber, setMeterNumber] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [prepaidBillingHistory, setPrepaidBillingHistory] = React.useState({});
  const [prepaidFlag, setPrepaidFlag] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('Dashboard');
  const [selectedTab2, setSelectedTab2] = React.useState('prepaidchart');
  const [serviceConNumber, setServiceConNumber] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [visibleHindi, setVisibleHindi] = React.useState(false);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        { flex: 1, flexDirection: 'column' },
        dimensions.width
      )}
      hasTopSafeArea={false}
    >
      {/* Drawer */}
      <>
        {!ShowNav ? null : (
          <Surface
            style={StyleSheet.applyWidth(
              {
                backgroundColor: '"rgba(0, 0, 0, 0)"',
                flex: 2,
                flexDirection: 'row',
                height: '100%',
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: 5,
              },
              dimensions.width
            )}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Surface'],
                  paddingTop: 40,
                  width: '80%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, paddingBottom: 16, paddingTop: 16 },
                  dimensions.width
                )}
              >
                {/* Home */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('DashboardScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'Feather/home'} size={24} />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Home'}
                    </Text>
                  </View>
                </Touchable>
                {/* Manage Account */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('ManageAccountScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      name={
                        'MaterialCommunityIcons/account-arrow-right-outline'
                      }
                      size={24}
                    />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Manage Account'}
                    </Text>
                  </View>
                </Touchable>
                {/* Notifications */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('NotificationsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon
                      name={'Ionicons/ios-notifications-circle-outline'}
                      size={24}
                    />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Notifications'}
                    </Text>
                  </View>
                </Touchable>
                {/* Load and Quality */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('LoadQualityScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'Feather/loader'} size={24} />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Load & Quality'}
                    </Text>
                  </View>
                </Touchable>
                {/* Load Enhancement */}
                <>
                  {!(prepaidFlag === 'N') ? null : (
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            navigation.navigate('LoadQualityScreen');
                            await WebBrowser.openBrowserAsync(
                              'http://20.192.2.50:9388/cportal/#/bltLec/KUM188'
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingBottom: 12,
                            paddingLeft: 24,
                            paddingRight: 24,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          name={'MaterialCommunityIcons/alert-outline'}
                          size={24}
                        />
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Strong'],
                              fontFamily: 'Roboto_400Regular',
                              fontSize: 16,
                              marginLeft: 8,
                            },
                            dimensions.width
                          )}
                        >
                          {'Load Enhancement'}
                        </Text>
                      </View>
                    </Touchable>
                  )}
                </>
                {/* Load Reduction */}
                <>
                  {!(prepaidFlag === 'N') ? null : (
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            navigation.navigate('LoadQualityScreen');
                            await WebBrowser.openBrowserAsync(
                              'http://20.192.2.50:9388/cportal/#/bltLrc/KUM188'
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingBottom: 12,
                            paddingLeft: 24,
                            paddingRight: 24,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          name={'FontAwesome/exclamation-triangle'}
                          size={24}
                        />
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Strong'],
                              fontFamily: 'Roboto_400Regular',
                              fontSize: 16,
                              marginLeft: 8,
                            },
                            dimensions.width
                          )}
                        >
                          {'Load Reduction'}
                        </Text>
                      </View>
                    </Touchable>
                  )}
                </>
                {/* Downloads */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('DownloadsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'Feather/download'} size={24} />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Downloads'}
                    </Text>
                  </View>
                </Touchable>
                {/* Help */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('HelpScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'Feather/help-circle'} size={24} />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Help'}
                    </Text>
                  </View>
                </Touchable>
                {/* Feedback */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('FeedbackScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'MaterialIcons/feedback'} size={24} />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Feedback'}
                    </Text>
                  </View>
                </Touchable>
                {/* Contact Us */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('ContactUsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'Ionicons/md-help-buoy-outline'} size={24} />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Contact Us'}
                    </Text>
                  </View>
                </Touchable>
                {/* Energy Tips */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('EnergyTipsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'SimpleLineIcons/energy'} size={24} />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Energy Tips'}
                    </Text>
                  </View>
                </Touchable>
                {/* Privacy Policy */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('PrivacyPolicyScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'MaterialCommunityIcons/security'} size={24} />
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Strong'],
                          fontFamily: 'Roboto_400Regular',
                          fontSize: 16,
                          marginLeft: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'Privacy Policy'}
                    </Text>
                  </View>
                </Touchable>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Background'],
                    marginTop: -20,
                    paddingBottom: 24,
                    paddingLeft: 24,
                    paddingRight: 24,
                  },
                  dimensions.width
                )}
              ></View>
            </View>

            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: '"rgba(0, 0, 0, 0)"', flex: 1 },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setShowNav(!ShowNav);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { height: '100%', width: '100%' },
                  dimensions.width
                )}
              />
            </View>
          </Surface>
        )}
      </>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
          },
          dimensions.width
        )}
      >
        <Checkbox
          onPress={newCheckboxValue => {
            try {
              setShowNav(newCheckboxValue);
            } catch (err) {
              console.error(err);
            }
          }}
          status={ShowNav}
          checkedIcon={'Feather/x'}
          color={theme.colors['Custom Color_22']}
          size={32}
          uncheckedColor={theme.colors['Custom Color_22']}
          uncheckedIcon={'Feather/menu'}
        />
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flex: 1, flexDirection: 'row' },
            dimensions.width
          )}
        >
          <Text
            style={StyleSheet.applyWidth(
              {
                flex: 1,
                fontFamily: 'Roboto_700Bold',
                fontSize: 18,
                marginLeft: 6,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'Usage'}
          </Text>
          <>
            {!hiddenHindi ? null : (
              <Touchable
                onPress={() => {
                  try {
                    setVisibleHindi(true);
                    setHiddenHindi(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* EN */}
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      paddingRight: 2,
                    }),
                    dimensions.width
                  )}
                >
                  {'EN'}
                </Text>
              </Touchable>
            )}
          </>
          <>
            {!visibleHindi ? null : (
              <Touchable
                onPress={() => {
                  try {
                    setHiddenHindi(true);
                    setVisibleHindi(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* HI */}
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      paddingLeft: 5,
                      paddingRight: 2,
                    }),
                    dimensions.width
                  )}
                >
                  {'HI'}
                </Text>
              </Touchable>
            )}
          </>
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('NotificationsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon
              color={theme.colors['Community_Light_Black']}
              name={'Ionicons/md-notifications-circle-outline'}
              size={24}
            />
          </Touchable>

          <Touchable
            onPress={() => {
              try {
                navigation.navigate('ProfileOptionsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Icon
              color={theme.colors['Community_Light_Black']}
              name={'Ionicons/person-circle-outline'}
              size={24}
            />
          </Touchable>
        </View>
      </View>
      {/* Content */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'space-around' },
          dimensions.width
        )}
      >
        <ScrollView
          bounces={true}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
        >
          {/* Body */}
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, justifyContent: 'space-around' },
              dimensions.width
            )}
          >
            {/* amblock */}
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, paddingLeft: 20, paddingRight: 20 },
                dimensions.width
              )}
            >
              {/* Service connection number */}
              <View
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['category'],
                    {
                      borderBottomWidth: 1,
                      borderColor: theme.colors['Divider'],
                      borderLeftWidth: 1,
                      borderRadius: 16,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      marginBottom: 30,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }
                  ),
                  dimensions.width
                )}
              >
                <Icon
                  color={theme.colors['Medium']}
                  name={'MaterialIcons/house'}
                  size={24}
                />
                <Picker
                  onValueChange={newPickerValue => {
                    const handler = async () => {
                      try {
                        setTextInputValue(newPickerValue);
                        const consumerDetailsJson = (
                          await CISAPPApi.consumerDetailsPOST(Constants, {
                            accno: Constants['name'],
                          })
                        )?.json;
                        console.log(consumerDetailsJson);
                        buildConsumerString(newPickerValue);
                        const prepaidFlag = (
                          consumerDetailsJson && consumerDetailsJson[0]
                        )?.data?.prepaidFlag;
                        setPrepaidFlag(prepaidFlag);
                        console.log(prepaidFlag);
                        const meterNo = (
                          consumerDetailsJson && consumerDetailsJson[0]
                        )?.data?.meterNumber;
                        setMeterNumber(meterNo);
                        console.log(meterNo);
                        const BillingHistoryJson = (
                          await CISAPPApi.billingHistoryPOST(Constants, {
                            action: buildBillingString(newPickerValue),
                          })
                        )?.json;
                        console.log(BillingHistoryJson);
                        buildBillingString(newPickerValue);

                        const valued0YkrErY =
                          BillingHistoryJson &&
                          BillingHistoryJson[0].data.BillDataJson;
                        setBillingHistoryScreen(valued0YkrErY);
                        const billHistory = valued0YkrErY;
                        const prepaidBillingHistoryJson = await (async () => {
                          if (prepaidFlag === 'Y') {
                            return (
                              await CISAPPApi.billingHistoryPrepaidPOST(
                                Constants,
                                { action: prepaidBillingString(meterNo) }
                              )
                            )?.json;
                          }
                        })();
                        prepaidBillingString(meterNo);
                        console.log(prepaidBillingHistoryJson);
                        const prepaidBillingHistoryResult =
                          prepaidBillingHistoryJson &&
                          prepaidBillingHistoryJson[0].data.data;
                        setPrepaidBillingHistory(prepaidBillingHistoryResult);
                        console.log(prepaidBillingHistoryResult);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: theme.colors['Background'],
                      borderWidth: 1,
                      fontFamily: 'Roboto_400Regular',
                      width: '95%',
                    },
                    dimensions.width
                  )}
                  value={textInputValue}
                  options={Constants['manageaccount_picker']}
                  autoDismissKeyboard={true}
                  iconColor={theme.colors['Medium']}
                  iconSize={24}
                  leftIconMode={'inset'}
                  rightIconName={'Feather/chevron-down'}
                  type={'solid'}
                />
              </View>

              <View
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)['postpaid view 3'],
                    { marginTop: -20 }
                  ),
                  dimensions.width
                )}
              >
                {/* Prepaid */}
                <>
                  {!(prepaidFlag === 'Y') ? null : (
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            fontFamily: 'Roboto_400Regular',
                            textAlign: 'right',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Prepaid'}
                    </Text>
                  )}
                </>
                {/* Postpaid */}
                <>
                  {!(prepaidFlag === 'N') ? null : (
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            fontFamily: 'Roboto_400Regular',
                            textAlign: 'right',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Postpaid'}
                    </Text>
                  )}
                </>
              </View>
              {/* Prepaid View */}
              <>
                {!(prepaidFlag === 'Y') ? null : (
                  <View>
                    {/* Prepaid Section header */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'center',
                              paddingBottom: 12,
                              paddingLeft: 20,
                              paddingRight: 20,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Heading */}
                          <Text
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'],
                                {
                                  alignSelf: 'center',
                                  color: theme.colors['ShopAppBlue'],
                                  fontFamily: 'Roboto_400Regular',
                                  fontSize: 16,
                                  textAlign: 'center',
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Usage'}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* prepaidtabs */}
                    <>
                      {!(prepaidFlag === 'Y') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width
                          )}
                        >
                          {/* chart */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaidchart */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(selectedTab2 === 'prepaidchart') ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ],
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {'Chart'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(selectedTab2 !== 'prepaidchart') ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedTab2('prepaidchart');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ],
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {'Chart'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                          {/* table */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* prepaidtable */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(selectedTab2 === 'prepaidtable') ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor: theme.colors['Primary'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ],
                                            {
                                              color:
                                                theme.colors['Custom Color'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {'Table'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(selectedTab2 !== 'prepaidtable') ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedTab2('prepaidtable');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ],
                                            {
                                              color: theme.colors['Light'],
                                              fontFamily: 'Roboto_400Regular',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {'Table'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaidchart */}
                    <>
                      {!(selectedTab2 === 'prepaidchart') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <>
                            {!prepaidBillingHistory?.length ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                    paddingRight: 10,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <>
                                  {!(prepaidFlag === 'Y') ? null : (
                                    <Utils.CustomCodeErrorBoundary>
                                      <PrepaidUsage.LineChartComponent
                                        prepaidBillingHistory={
                                          prepaidBillingHistory
                                        }
                                      />
                                    </Utils.CustomCodeErrorBoundary>
                                  )}
                                </>
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    {/* prepaidtable */}
                    <>
                      {!(selectedTab2 === 'prepaidtable') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: 'rgb(211, 211, 211)',
                              borderBottomWidth: 1,
                              borderColor: 'rgb(211, 211, 211)',
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                              borderTopWidth: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Bill Month */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'Bill month'}
                              </Text>
                            </View>
                          </View>
                          {/* Units */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'Units(Kvah)'}
                              </Text>
                            </View>
                          </View>
                          {/* Amount */}
                          <View
                            style={StyleSheet.applyWidth(
                              { borderColor: theme.colors['White'], flex: 1 },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['ViewBG'],
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    {
                                      color: 'rgb(42, 42, 42)',
                                      fontFamily: 'Roboto_700Bold',
                                      textAlign: 'center',
                                      textTransform: 'capitalize',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {'Bill Amount'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* prepaid list */}
                    <FlatList
                      renderItem={({ item }) => {
                        const prepaidListData = item;
                        return (
                          <>
                            {/* prepaidtable */}
                            <>
                              {!(selectedTab2 === 'prepaidtable') ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      borderBottomWidth: 1,
                                      borderColor: 'rgb(211, 211, 211)',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                      paddingLeft: 20,
                                      paddingRight: 20,
                                      paddingTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Bill Month */}
                                  <View>
                                    {/* text */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {convertMonthNoToMonthName(
                                        prepaidListData?.billmonth
                                      )}
                                      {' - '}
                                      {prepaidListData?.billyear}
                                    </Text>
                                  </View>
                                  {/* Units */}
                                  <View>
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {(() => {
                                        const e = prepaidListData?.billUnits;
                                        console.log(e);
                                        return e;
                                      })()}
                                    </Text>
                                  </View>
                                  {/* Amount */}
                                  <View>
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {'₹'}
                                      {prepaidListData?.closingBalance}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </>
                          </>
                        );
                      }}
                      data={prepaidBillingHistory}
                      listKey={'WO9eZkex'}
                      keyExtractor={prepaidListData =>
                        prepaidListData?.id ||
                        prepaidListData?.uuid ||
                        JSON.stringify(prepaidListData)
                      }
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                )}
              </>
              {/* Postpaid View */}
              <>
                {!(prepaidFlag === 'N') ? null : (
                  <View>
                    {/* section header */}
                    <>
                      {!(prepaidFlag === 'N') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)[
                                'section header 2'
                              ],
                              { justifyContent: 'center', paddingBottom: 12 }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Heading */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                alignSelf: 'center',
                                color: theme.colors['ShopAppBlue'],
                                fontFamily: 'Roboto_400Regular',
                                fontSize: 16,
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {'Usage'}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* Tabs */}
                    <>
                      {!(prepaidFlag === 'N') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            GlobalStyles.ViewStyles(theme)['Tabs'],
                            dimensions.width
                          )}
                        >
                          {/* tab1 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Dashboard */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(selectedTab === 'Dashboard') ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor:
                                            theme.colors['Custom Color'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Custom Color'],
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 14,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Chart'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(selectedTab !== 'Dashboard') ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedTab('Dashboard');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Light'],
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 14,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Chart'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                          {/* tab2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Content */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1 },
                                dimensions.width
                              )}
                            >
                              {/* selected */}
                              <>
                                {!(selectedTab === 'content') ? null : (
                                  <Touchable>
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 3,
                                          borderColor:
                                            theme.colors['Custom Color'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Custom Color'],
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 14,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Table'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                              {/* unselected */}
                              <>
                                {!(selectedTab !== 'content') ? null : (
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setSelectedTab('content');
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors['Light'],
                                          height: 25,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Light'],
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 14,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Table'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                )}
                              </>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* Dashboard */}
                    <>
                      {!(selectedTab === 'Dashboard') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            GlobalStyles.ViewStyles(theme)['Dashboard'],
                            dimensions.width
                          )}
                        >
                          <>
                            {!billingHistoryScreen?.length ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flex: 1,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <>
                                  {!(prepaidFlag === 'N') ? null : (
                                    <Utils.CustomCodeErrorBoundary>
                                      <Usage.LineChartComponent
                                        billingHistoryScreen={
                                          billingHistoryScreen
                                        }
                                      />
                                    </Utils.CustomCodeErrorBoundary>
                                  )}
                                </>
                              </View>
                            )}
                          </>
                        </View>
                      )}
                    </>
                    {/* Details */}
                    <>
                      {!(selectedTab === 'content') ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ViewStyles(theme)['Details'],
                              {
                                backgroundColor: 'rgb(211, 211, 211)',
                                borderBottomWidth: 1,
                                borderColor: theme.colors['White'],
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                borderTopWidth: 1,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {/* Bill Month */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.viewBG,
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: 'rgb(42, 42, 42)',
                                    fontFamily: 'Roboto_700Bold',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                  },
                                  dimensions.width
                                )}
                              >
                                {'Bill month'}
                              </Text>
                            </View>
                          </View>
                          {/* Units */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors['White'],
                                borderRightWidth: 1,
                                flex: 1,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.viewBG,
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: 'rgb(42, 42, 42)',
                                    fontFamily: 'Roboto_700Bold',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                  },
                                  dimensions.width
                                )}
                              >
                                {'Units(Kvah)'}
                              </Text>
                            </View>
                          </View>
                          {/* Cost */}
                          <View
                            style={StyleSheet.applyWidth(
                              { flex: 1 },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.viewBG,
                                  height: 40,
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: 'rgb(42, 42, 42)',
                                    fontFamily: 'Roboto_700Bold',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                  },
                                  dimensions.width
                                )}
                              >
                                {'Bill Amount'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                    {/* postpaidList */}
                    <FlatList
                      renderItem={({ item }) => {
                        const postpaidListData = item;
                        return (
                          <>
                            {/* Details */}
                            <>
                              {!(selectedTab === 'content') ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      borderBottomWidth: 1,
                                      borderColor: 'rgb(194, 190, 190)',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      paddingBottom: 10,
                                      paddingLeft: 20,
                                      paddingRight: 20,
                                      paddingTop: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Bill Month */}
                                  <View>
                                    {/* text */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {convertMonthNoToMonthName(
                                        postpaidListData?.BillMonth
                                      )}
                                      {' - '}
                                      {postpaidListData?.BillYear}
                                    </Text>
                                  </View>
                                  {/* Units */}
                                  <View>
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                            textAlign: 'right',
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {postpaidListData?.BillUnits}
                                    </Text>
                                  </View>
                                  {/* Cost */}
                                  <View>
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ],
                                          {
                                            alignSelf: 'flex-start',
                                            color: 'rgb(42, 42, 42)',
                                            fontFamily: 'Roboto_400Regular',
                                            fontSize: 16,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {'₹'}
                                      {postpaidListData?.BillAmount}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </>
                          </>
                        );
                      }}
                      data={billingHistoryScreen}
                      listKey={'tJZNsw7Z'}
                      keyExtractor={postpaidListData =>
                        postpaidListData?.id ||
                        postpaidListData?.uuid ||
                        JSON.stringify(postpaidListData)
                      }
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                )}
              </>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* botem tab1 */}
      <View
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ViewStyles(theme)['botem tab'], {
            alignItems: 'stretch',
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
          }),
          dimensions.width
        )}
      >
        {/* Home */}
        <Touchable
          onPress={() => {
            try {
              setServiceConNumber(props.route?.params?.Name ?? '');
              navigation.navigate('DashboardScreen', {
                name: Constants['name'],
              });
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.8}
          disabledOpacity={0.8}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 50,
              },
              dimensions.width
            )}
          >
            <Icon
              color={theme.colors['Community_Light_Black']}
              name={'Entypo/home'}
              size={24}
            />
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Community_Light_Black'],
                  fontFamily: 'Roboto_400Regular',
                }),
                dimensions.width
              )}
            >
              {'Home'}
            </Text>
          </View>
        </Touchable>
        {/* Usage */}
        <Touchable
          onPress={() => {
            try {
              setServiceConNumber(props.route?.params?.Name ?? '');
              navigation.navigate('UsageScreen', { name: Constants['name'] });
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.8}
          disabledOpacity={0.8}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 50,
              },
              dimensions.width
            )}
          >
            <Icon
              color={theme.colors['Community_Dark_UI']}
              name={'FontAwesome/bar-chart-o'}
              size={24}
            />
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Community_Dark_UI'],
                  fontFamily: 'Roboto_400Regular',
                }),
                dimensions.width
              )}
            >
              {'Usage'}
            </Text>
          </View>
        </Touchable>
        {/* Billing */}
        <Touchable
          onPress={() => {
            try {
              setServiceConNumber(props.route?.params?.Name ?? '');
              navigation.navigate('BillingScreen', { name: Constants['name'] });
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.8}
          disabledOpacity={0.8}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 50,
              },
              dimensions.width
            )}
          >
            <Icon
              color={theme.colors['Community_Light_Black']}
              name={'Entypo/text-document-inverted'}
              size={24}
            />
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Community_Light_Black'],
                  fontFamily: 'Roboto_400Regular',
                }),
                dimensions.width
              )}
            >
              {'Billing'}
            </Text>
          </View>
        </Touchable>
        {/* Payments */}
        <Touchable
          onPress={() => {
            try {
              setServiceConNumber(props.route?.params?.Name ?? '');
              navigation.navigate('PaymentsScreen', {
                name: Constants['name'],
              });
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.8}
          disabledOpacity={0.8}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 65,
              },
              dimensions.width
            )}
          >
            <Icon
              color={theme.colors['Community_Light_Black']}
              name={'MaterialIcons/payments'}
              size={24}
            />
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Community_Light_Black'],
                  fontFamily: 'Roboto_400Regular',
                }),
                dimensions.width
              )}
            >
              {'Payments'}
            </Text>
          </View>
        </Touchable>
        {/* Support */}
        <>
          {!(prepaidFlag === 'N') ? null : (
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('CheckTicketStatusScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              disabled={false}
              activeOpacity={0.8}
              disabledOpacity={0.8}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 48,
                    justifyContent: 'center',
                    width: 55,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  color={theme.colors['Community_Light_Black']}
                  name={'MaterialIcons/support-agent'}
                  size={24}
                />
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Community_Light_Black'],
                      fontFamily: 'Roboto_400Regular',
                    }),
                    dimensions.width
                  )}
                >
                  {'Support'}
                </Text>
              </View>
            </Touchable>
          )}
        </>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(UsageScreen);

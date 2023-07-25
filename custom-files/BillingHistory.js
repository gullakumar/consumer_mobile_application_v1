import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function LineChartComponent1({ billingHistoryScreen }) {
  let newData = [];
  let newBillDates = [];

  if (billingHistoryScreen.length) {
    newData = billingHistoryScreen.map(item => item.BillAmount);
    newBillDates = billingHistoryScreen.map(item => item.BillMonth);
  }
  console.log('from custom code', billingHistoryScreen);

  const data = {
    //lables: billingHistoryScreen.BillIssueDate,
    labels: newBillDates,
    //labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: newData,
        //  data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <LineChart
        data={data}
        width={400}
        height={220}
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(26, 25, 16, ${opacity})`,
        }}
        bezier
        style={{
          margin: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

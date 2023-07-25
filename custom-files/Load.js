import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function LineChartComponent2({ loadpatterndeatils }) {
  let newData = [];
  let newBillDates = [];

  if (loadpatterndeatils.length) {
    console.log('details' + loadpatterndeatils.length);
    // console.log("loadpatterndeatils"+loadpatterndeatils.length);

    newData = loadpatterndeatils.map(item => item.date);

    newBillDates = loadpatterndeatils.map(item => item.kVaImp);
  }
  console.log('from custom code', loadpatterndeatils);
  const data = {
    //lables: billingHistoryScreen.BillIssueDate,
    labels: newData,
    //labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: newBillDates,
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
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

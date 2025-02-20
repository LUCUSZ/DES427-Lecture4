import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {
  LineChart,
} from 'react-native-chart-kit'

import StockButton from './StockButton'; // Assuming you have this component

interface DataPoint {
  labels: string[];
  datasets: {
      data: number[];
      color: (opacity: number) => string;
      strokeWidth?: number;
  }[];
}

interface ChartConfig {
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  color: (opacity: number) => string;
  strokeWidth?: number;
}

const Stocks: React.FC = () => {

  const data: DataPoint = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [ 20, 45, 28, 80, 99, 43 ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2 
    }]
  };

  const chartConfig: ChartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, 
    strokeWidth: 2 
  };

  const changeIndex = (stockCode: string, stockName: string) => {
    console.log(stockCode, stockName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LineChart
          data={data}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={chartConfig}
          style={{paddingVertical:10}}
        />
      </View>
      <View style={styles.footer}>
        <StockButton code='AAPL' name='Apple' onPress={changeIndex}/>
        <StockButton code='GOOGL' name='Google' onPress={changeIndex}/>
        <StockButton code='UBER' name='Uber' onPress={changeIndex}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow'
    },
    footer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: 'pink'
    },
    button: {
      margin: 10,
      borderWidth: 1,
      width: 100,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgray'
    }
  });

export default Stocks;
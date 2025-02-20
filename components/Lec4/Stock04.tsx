import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Switch } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import StockButton from './StockButton'; // Assuming this exists
import API from '@/components/Lec4/api_no_key'; // Assuming this exists

interface StockData {
  "Time Series (Daily)"?: {
    [date: string]: { "4. close": string };
  };
  "Weekly Time Series"?: {
    [date: string]: { "4. close": string };
  };
}

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2
};

const Stocks: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [stockName, setStockName] = useState<string>('Apple'); // Default stock name
  const [isWeekly, setIsWeekly] = useState<boolean>(false); // Switch state

  const changeIndex = (stockCode: string, stockName: string) => {
    setStockName(stockName); // Update the stock name

    API(stockCode, isWeekly) // Pass switch state to API
      .then((stock: StockData) => {
        console.log("Pass ", stock);
        const timeSeries = isWeekly ? stock["Weekly Time Series"] : stock["Time Series (Daily)"];
        if (!timeSeries) return;

        const datesArray = Object.keys(timeSeries).slice(0, 7); // Last 7 entries
        const closingPrice = datesArray.map(day => parseFloat(timeSeries[day]["4. close"]));

        // Format dates to show only day/month (e.g., "12/Feb")
        const formattedDates = datesArray
          .map(date => {
            const d = new Date(date);
            return `${d.getDate()}/${d.toLocaleString('default', { month: 'short' })}`;
          })
          .reverse();

        setDates(formattedDates);
        setPrices(closingPrice);
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
      });
  };

  useEffect(() => {
    changeIndex('AAPL', 'Apple'); // Load default stock data
  }, [isWeekly]); // Re-fetch data when switch changes

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stockName}>{stockName}</Text>
        <Text style={styles.modeText}>{isWeekly ? 'Weekly Prices' : 'Daily Prices'}</Text>

        <LineChart
          data={{
            labels: dates,
            datasets: [{
              data: prices,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2
            }]
          }}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={chartConfig}
          style={{ paddingVertical: 10 }}
        />
      </View>

      <View style={styles.footer}>
        <StockButton code='AAPL' name='Apple' onPress={() => changeIndex('AAPL', 'Apple')} />
        <StockButton code='GOOGL' name='Google' onPress={() => changeIndex('GOOGL', 'Google')} />
        <StockButton code='UBER' name='Uber' onPress={() => changeIndex('UBER', 'Uber')} />
      </View>

      <View style={styles.switchContainer}>
        <Text>{isWeekly ? 'Weekly' : 'Daily'}</Text>
        <Switch
          value={isWeekly}
          onValueChange={(value) => setIsWeekly(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingTop: 20,
  },
  stockName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'pink',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  }
});

export default Stocks;

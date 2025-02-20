import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
    LineChart
} from 'react-native-chart-kit';

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
    backgroundColor?: string;
    decimalPlaces?: number;
    style?: {
        borderRadius?: number;
    };
}

const App: React.FC = () => {
    const data: DataPoint = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            data: [20, 45, 28, 80, 99, 43],
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

    return (
        <View>
            <Text style={{ paddingTop: 30 }}>
                Simple Line Chart
            </Text>
            <LineChart
                data={data}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={chartConfig}
                style={{ paddingVertical: 10 }}
            />
            <Text>
                Bezier Line Chart
            </Text>
            <LineChart
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [{
                        data: Array.from({ length: 6 }, () => Math.random() * 100)
                    }]
                }}
                width={Dimensions.get('window').width}
                height={300}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    paddingVertical: 10,
                    borderRadius: 16
                }}
            />
        </View>
    );
};

export default App;
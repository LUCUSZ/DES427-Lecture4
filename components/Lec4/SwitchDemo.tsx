import React, { useState } from 'react';
import {
  Platform, StyleSheet, Text, View, Switch
} from 'react-native';

const App: React.FC = () => {

  const [switchValue, setSwitchValue] = useState<boolean>(false);

  const message = switchValue ? 'True' : 'False';

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>{message}</Text>
      <Switch
        onValueChange={() => setSwitchValue(!switchValue)}
        value={switchValue}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default App;
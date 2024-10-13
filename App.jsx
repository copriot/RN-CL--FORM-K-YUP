import {View} from 'react-native';
import React from 'react';
import ForkmikYup from './src/ForkmikYup';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout} from '@ui-kitten/components';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ForkmikYup />
    </ApplicationProvider>
  );
};

export default App;

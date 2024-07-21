// import 'react-native-gesture-handler'
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { HOMESCREEN } from './src/Components/Screen/Home';
import { DETAILSCREEN } from './src/Components/Screen/Detail';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import RenderCommentsScreen from './src/Components/Screen/Detail/renderComments';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HOMESCREEN} />
            <Stack.Screen name="Detail" component={DETAILSCREEN} />
            <Stack.Screen name="RenderComments" component={RenderCommentsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;

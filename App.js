import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/screenState';
import { MainLayout } from './src/MainLayout';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
        })
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <View onLayout={onLayoutRootView}>
      <ScreenState>
        <TodoState>
          <MainLayout />
        </TodoState>
      </ScreenState>  
    </View>
  );
}



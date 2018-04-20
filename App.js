import React from 'react'
import Main from "./src/Main"
import { StackNavigator } from 'react-navigation'
import { Constants } from "expo"
import allReducers from "./src/reducers"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import Expo from "expo"
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from "remote-redux-devtools"
import Result from "./src/Result"
import { Platform, SafeAreaView } from "react-native"
import { Root } from "native-base"

const middleware = [createSagaMiddleware()]
const store = createStore(allReducers, composeWithDevTools(
  applyMiddleware(...middleware)
))


const AppNavigator = StackNavigator({
  Main: {screen: Main},
  Result: {screen: Result}
}, {
  initialRouteName: 'Main',
  // cardStyle: {
    // marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
  // },
  // navigationOptions: {
  // }
})

console.ignoredYellowBox = [
  'Warning: componentWill',
  'Warning: Remote debugger',
]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({isReady: true})
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading/>
    }

    return (
      <Provider store={store}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#000000', paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
          <Root>
            <AppNavigator/>
          </Root>
        </SafeAreaView>
      </Provider>
    )
  }
}


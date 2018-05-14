import React from 'react'
import Main from "./src/Main"
import { StackNavigator } from 'react-navigation'
import allReducers from "./src/reducers"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from "remote-redux-devtools"
import Result from "./src/Result"
import { Platform, SafeAreaView } from "react-native"
import { Root, View } from "native-base"

const middleware = [createSagaMiddleware()]
const store = createStore(allReducers, composeWithDevTools(
  applyMiddleware(...middleware)
))


const AppNavigator = StackNavigator({
  Main: {screen: Main},
  Result: {screen: Result}
}, {
  initialRouteName: 'Main',
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
    this.setState({isReady: true})
  }

  render() {
    if (!this.state.isReady) {
      return <View>Loading...</View>
    }

    return (
      <Provider store={store}>
        <Root>
          <AppNavigator/>
        </Root>
      </Provider>
    )
  }
}


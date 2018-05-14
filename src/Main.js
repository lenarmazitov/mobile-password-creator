import React from "react"
import PasswordCreator from "./components/forms/PasswordCreator"
import { Body, Header, Left, Right, Title } from "native-base"
import { Platform, StyleSheet } from "react-native"

export default class Main extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Body>
        <Title>Генератор паролей</Title>
        </Body>
      </Header>
    )
  })

  render() {
    return (
      <PasswordCreator navigation={this.props.navigation}/>
    )
  }
}
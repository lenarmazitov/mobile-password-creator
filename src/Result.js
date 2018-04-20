import React from "react"
import { Clipboard, Platform, StyleSheet } from 'react-native'
import {
  Body, Button, Card, CardItem, Container, Content, Footer, FooterTab, Header, Icon, Left, Right, Root, Text, Title,
  Toast
} from "native-base"
import { Constants } from "expo"

const statusBarStyle = StyleSheet.create({
  marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
})

export default class Result extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back"/>
          </Button>
        </Left>
        <Body>
        <Title>Ваш пароль</Title>
        </Body>
        <Right/>
      </Header>
    )
  })

  copy() {
    const password = this.props.navigation.getParam('password', '')
    Clipboard.setString(password)
    Toast.show({
      text: "Скопировано",
      duration: 3000,
      type: "success",
      position: "top",
    })
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
              <Text>Название пароля</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text>{this.props.navigation.getParam('name', 'Не задано')}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Соль</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text>{this.props.navigation.getParam('salt', 'Не задано')}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Пароль</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text>{this.props.navigation.getParam('password', 'Не задано')}</Text>

              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={this.copy.bind(this)}>
              <Text>Копировать пароль</Text>
              <Icon active name="copy"/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
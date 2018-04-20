import React, { Component } from 'react'
import {
  Container, Content, Input, Button, Text, Footer, FooterTab, View, Icon, Item, Label, Picker, Form
} from "native-base"
import { Field, reduxForm } from "redux-form"
import generator from "../../utils/generator"
import { connect } from "react-redux"
import { Col, Row, Grid } from 'react-native-easy-grid'


let getInput = (props) => (
  <View>
    <Item stackedLabel error={props.touched && props.error}>
      <Label>{props.floatingLabel}</Label>
      <Input type="text" {...props.input} />
    </Item>
    {props.hint && <Text style={{color: "#666", fontSize: 12}}>{props.hint}</Text>}
  </View>
)

class PasswordCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  generate(values) {
    generator(values.name, values.salt).then((password) => {
      values.password = password
      this.props.navigation.navigate('Result', values)
    })
  }


  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Field name="name"
                   type="text"
                   floatingLabel="Название пароля"
                   hint="Придумайте мнемоническое название для вашего пароля. ВНИМАНИЕ! Очень важно точно запомнить название вашего пароля."
                   component={getInput}/>
            <Field name="salt"
                   type="text"
                   floatingLabel="Соль"
                   hint="Придумайте соль для того чтобы ваш пароль был уникальным. Солью может быть любое слово, либо какой-нибудь ваш личный пароль, который вы точно не забудете. Зная соль и название вашего пароля вы можете восстановить ваш сгенерированный пароль."
                   component={getInput}/>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={this.props.handleSubmit(this.generate.bind(this))}>
              <Text>Сгенерировать пароль</Text>
              <Icon type="FontAwesome" name='gears'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

let form = reduxForm({
  form: 'passwordForm',
})(PasswordCreator)

form = connect((state) => ({}))(form)

export default form
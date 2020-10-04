import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import logo from "../logo.svg";
import { register } from "../services/UserServices";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      phone_number: "",
      password: "",
      phone_numberValid: false,
      passwordValid: false,
    };
  }
  onChangePhone_number = (e) => {
    if (!isNaN(e.target.value) && e.target.value.length !== 10) {
      this.setState({
        phone_number: e.target.value,
        phone_numberValid: "Enter Valid Phone number",
      });
    } else {
      this.setState({
        phone_number: e.target.value,
        phone_numberValid: false,
      });
    }
  };
  onChangePassword = (e) => {
    if (e.target.value.length < 6) {
      this.setState({
        password: e.target.value,
        passwordValid: "Password have minimum 6 characters",
      });
    } else {
      this.setState({
        password: e.target.value,
        passwordValid: false,
      });
    }
  };
  onRegister = (e) => {
    e.preventDefault();

    const newUser = {
      phone_number: this.state.phone_number,
      password: this.state.password,
    };

    register(newUser).then((res) => {
      if (res) {
        this.props.history.push(`/`);
      }
    });
  };
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="black" textAlign="center">
            <Image src={logo} /> Register your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                type="text"
                fluid
                icon="mobile"
                iconPosition="left"
                name="phone_number"
                placeholder="Phone Number"
                value={this.state.phone_number}
                onChange={this.onChangePhone_number}
                error={this.state.phone_numberValid}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                error={this.state.passwordValid}
              />

              <Button
                onClick={this.onRegister}
                color="black"
                fluid
                size="large"
              >
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Back to <a href="/">Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

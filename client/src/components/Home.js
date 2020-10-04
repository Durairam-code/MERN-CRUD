import React from "react";
import {
  Form,
  Image,
  Header,
  Grid,
  Button,
  Icon,
  Message,
  Card,
} from "semantic-ui-react";
import logo from "../logo.svg";
import ReactPaginate from "react-paginate";
import "./Home.css";

import {
  createMobile,
  getAllMobiles,
  updateMobile,
  deleteMobile,
} from "../services/MobileServices";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      brand: "",
      model: "",
      price: "",
      brandValid: false,
      modelValid: false,
      priceValid: false,
      messagebox: true,
      messageboxContent: "",
      offset: 0,
      data: [],
      perPage: 3,
      currentPage: 0,
      createButton: false,
      editButton: true,
      messageboxColor: "green",
    };
  }

  onChange = (e) => {
    switch (e.target.name) {
      case "brand":
        if (e.target.value !== "") {
          this.setState({ [e.target.name]: e.target.value, brandValid: false });
        } else {
          this.setState({
            [e.target.name]: e.target.value,
            brandValid: "Brand cannot be empty",
          });
        }
        break;
      case "model":
        if (e.target.value !== "") {
          this.setState({ [e.target.name]: e.target.value, modelValid: false });
        } else {
          this.setState({
            [e.target.name]: e.target.value,
            modelValid: "Model cannot be empty",
          });
        }
        break;
      default:
    }
  };

  onChangePrice = (e) => {
    if (!isNaN(e.target.value)) {
      this.setState({
        price: e.target.value,
        priceValid: false,
      });
    } else {
      this.setState({
        price: e.target.value,
        priceValid: "Price must be a number",
      });
    }
  };

  onCreate = (e) => {
    e.preventDefault();
    if (
      this.state.brand !== "" &&
      this.state.model !== "" &&
      this.state.price !== ""
    ) {
      const newMobile = {
        brand: this.state.brand,
        model: this.state.model,
        price: this.state.price,
      };
      createMobile(newMobile).then((res) => {
        if (res) {
          this.setState({
            messageboxColor: "green",
            messagebox: false,
            messageboxContent: "Mobile data added",
            brand: "",
            model: "",
            price: "",
          });
          this.receivedData();
          setTimeout(() => {
            this.setState({
              messagebox: true,
            });
          }, 700);
        }
      });
    } else {
      this.setState({
        messageboxColor: "red",
        messagebox: false,
        messageboxContent: "Fields Cannot empty",
      });
      setTimeout(() => {
        this.setState({
          messagebox: true,
        });
      }, 700);
    }
  };

  receivedData = () => {
    getAllMobiles().then((res) => {
      const data = res;
      const slicedData = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const mobileData = slicedData.map((md) => (
        <Card key={md._id}>
          <Card.Header>
            <h3>
              <b>{md.brand}</b>
            </h3>
          </Card.Header>
          <Card.Meta>{md.model}</Card.Meta>
          <Card.Description>
            <b>{md.price}</b>
          </Card.Description>
          <Card.Content extra>
            <Button icon color="blue" onClick={this.onEdit.bind(this, md)}>
              <Icon name="edit" />
            </Button>
            <Button icon color="red" onClick={this.onDelete.bind(this, md._id)}>
              <Icon name="delete" />
            </Button>
          </Card.Content>
        </Card>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),

        mobileData,
      });
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  onEdit = (e) => {
    this.setState({
      createButton: true,
      editButton: false,
      brand: e.brand,
      model: e.model,
      price: e.price,
      id: e._id,
    });
  };

  onUpdate = (e) => {
    if (
      this.state.brand !== "" &&
      this.state.model !== "" &&
      this.state.price !== ""
    ) {
      const editMobile = {
        id: this.state.id,
        brand: this.state.brand,
        model: this.state.model,
        price: this.state.price,
      };
      updateMobile(editMobile).then((res) => {
        if (res) {
          this.setState({
            messageboxColor: "blue",
            messagebox: false,
            messageboxContent: "Mobile data Updated",
            brand: "",
            model: "",
            price: "",
            createButton: false,
            editButton: true,
          });
          this.receivedData();
          setTimeout(() => {
            this.setState({
              messagebox: true,
            });
          }, 700);
        }
      });
    } else {
      this.setState({
        messageboxColor: "red",
        messagebox: false,
        messageboxContent: "Fields Cannot empty",
      });
      setTimeout(() => {
        this.setState({
          messagebox: true,
        });
      }, 700);
    }
  };

  onDelete = (e) => {
    if (window.confirm("Delete what you selected")) {
      deleteMobile(e).then((res) => {
        if (res) {
          this.setState({
            messageboxColor: "red",
            messagebox: false,
            messageboxContent: "Mobile data deleted",
          });
          this.receivedData();
          setTimeout(() => {
            this.setState({
              messagebox: true,
            });
          }, 700);
        }
      });
    }
  };

  onLogout = (e) => {
    localStorage.removeItem("user");
    this.props.history.push(`/`);
  };

  componentDidMount() {
    this.receivedData();
  }

  render() {
    if (localStorage.getItem("user")) {
      return (
        <Grid textAlign="center">
          <Grid.Row centered>
            <Grid.Column width={8}>
              <Header as="h2" color="black">
                <Image src={logo} /> React CRUD
                <Button floated="right" color="grey" onClick={this.onLogout}>
                  <Icon name="log out" /> Logout
                </Button>
              </Header>

              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    type="text"
                    fluid
                    name="brand"
                    placeholder="Brand"
                    value={this.state.brand}
                    onChange={this.onChange}
                    error={this.state.brandValid}
                  />
                  <Form.Input
                    fluid
                    name="model"
                    placeholder="Model"
                    value={this.state.model}
                    onChange={this.onChange}
                    error={this.state.modelValid}
                  />
                  <Form.Input
                    fluid
                    name="price"
                    placeholder="Price"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    error={this.state.priceValid}
                  />
                </Form.Group>
                <Button.Group floated="right">
                  <Button
                    color="green"
                    disabled={this.state.createButton}
                    onClick={this.onCreate}
                  >
                    Create
                  </Button>
                  <Button
                    primary
                    disabled={this.state.editButton}
                    onClick={this.onUpdate}
                  >
                    Update
                  </Button>
                </Button.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>{this.state.mobileData}</Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Message
                color={this.state.messageboxColor}
                size="mini"
                content={this.state.messageboxContent}
                hidden={this.state.messagebox}
              ></Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              <Image src={logo} /> You are not logged in
            </Header>
            <Message>
              Back to login{" "}
              <Button color="green" onClick={this.onLogout}>
                Login
              </Button>
            </Message>
          </Grid.Column>
        </Grid>
      );
    }
  }
}

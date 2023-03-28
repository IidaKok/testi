
import React, { Component } from "react";

export class Error extends Component {
    constructor(props) {
      super(props);
      this.state = { message: null,  value: props.value };
  
      this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        if(this.state.value.includes("Email")){
            this.setState({ message: "The email must contain @ and ." });
        }
        else this.setState({ message: this.state.value + " is too short" });
    }
    render() {
      return (
        <p>{this.state.message}</p>
      )
    }
  }
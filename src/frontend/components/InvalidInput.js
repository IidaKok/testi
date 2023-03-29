
import React, { Component } from "react";

export class Error extends Component {
    constructor(props) {
        super(props);
        this.state = { message: null, value: props.value, text: props.text };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {


        if (this.state.value.includes("Password")) {
            this.setState({ message: "Password should contain "  + this.state.text });
        }
        else if (this.state.value.includes("Email")) {
            this.setState({ message: "The email must contain @" });
        }
        else this.setState({ message: this.state.value + " should contain " + this.state.text });
    }
    render() {
        return (
            <p>{this.state.message}</p>
        )
    }
}
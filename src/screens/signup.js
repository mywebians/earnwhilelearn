import React from "react";
import firebase from "../actions/firebase";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    code: "",
    error: ""
  };



  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.firestore().collection("users").doc(user.user.uid).set({
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          code: this.state.code
        })
        // console.log(user.user.uid);
        this.props.history.push("/");
      })
      .catch((error) => {
        // console.log(error.message);
        this.setState({ error: error.message });
      });
  };

  componentDidMount() {
    firebase.firestore().collection("users").get().then((snap) => {
      // console.log(snap.size);
      this.setState({
        code: snap.size + 3 + Math.random().toString(36).slice(9) + "ewl" + snap.size
      })
    })

  }

  render() {
    return (
      <div className="container py-5">

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="exampleInputName">Full Name</label>
            <input
              value={this.state.name}
              name="name"
              typeof="text"
              className="form-control"
              id="exampleInputName"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              value={this.state.email}
              name="email"
              typeof="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={this.handleInputChange}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label for="exampleInputPhone">Phone</label>
            <PhoneInput
              id="exampleInputPhone"
              country={'in'}
              value={this.state.phone}
              className="form-control"
              onChange={phone => this.setState({ phone })}
              required
            />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              value={this.state.password}
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <p className="text-danger">{this.state.error}</p>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}
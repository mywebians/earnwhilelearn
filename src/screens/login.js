import React from 'react';
import firebase from '../actions/firebase';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: ''
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {

    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        // console.log(error);
        // console.log("hi");
        this.setState({ error: error.message });
      });
  };
  render() {

    return (
      <div className="container py-5">
        <form onSubmit={this.handleSubmit}>
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
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
              </small>
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
            />
          </div>
          <p className="text-danger">{this.state.error}</p>
          <button type="submit" className="btn btn-primary">
            Submit
            </button>
        </form>
      </div>
    );
  }
}
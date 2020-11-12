import React from "react";
import { Link } from "react-router-dom";
import firebase from "../actions/firebase";

export default class MyNav extends React.Component {
  state = {
    isSignedIn: false,
    email: "",
    code: ""
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          isSignedIn: false,
        });
      });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.uid);
        firebase.firestore().collection("users").doc(user.uid).get().then((u) => {
          // console.log(u.data());
          this.setState({
            code: u.data().code
          })
        })
        //  console.log(user);
        this.setState({
          isSignedIn: true,
          email: user.email,
        });
      } else {
        //  console.log("user loged out")
      }
    });
  }

  render() {
    const loginItem = (isSigned) => {
      if (isSigned) {
        return (
          <>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" data-toggle="dropdown">
                My Account
            </Link>
              <div className="dropdown-menu">
                <span className="dropdown-item">uid - {this.state.code}</span>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={this.signOut}>
                LogOut
            </Link>
            </li>
          </>
        );
      } else {
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Register
              </Link>
            </li>
          </>
        );
      }
    };
    return (
      <div >
        <nav className="navbar navbar-expand-lg navbar-dark  bg-dark px-5 fixed-top">
          <Link className="navbar-brand" to="/">
            Earn While Learn
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav  ml-auto ">
              <li className="nav-item ">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  How It Works
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://mywebians.com/"
                  target="__blank"
                >
                  Services
                </a>
              </li>

              <li className="nav-item ">
                <Link className="nav-link">Contact</Link>
              </li>
              {loginItem(this.state.isSignedIn)}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

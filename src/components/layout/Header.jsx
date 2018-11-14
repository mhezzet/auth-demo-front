import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth';

class Header extends Component {
  singOutClickHandler = () => {
    this.props.signOut();
  };

  render() {
    return (
      <nav
        style={{ marginBottom: '20px' }}
        className="navbar navbar-expand-lg navbar-dark bg-dark"
      >
        <Link to="/" className="navbar-brand">
          Auth test app
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
            {!this.props.isAuthenticated && (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    Sign In
                  </Link>
                </li>
              </React.Fragment>
            )}
            {this.props.isAuthenticated && (
              <React.Fragment>
                <li
                  className="nav-item text-info"
                  style={{ alignSelf: 'center' }}
                >
                  {this.props.userEmail}
                </li>
                <li className="nav-item">
                  <Link
                    onClick={this.singOutClickHandler}
                    to="/"
                    className="nav-link"
                  >
                    Sign Out
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  isAuthenticated: auth.isAuthenticated,
  userEmail: user.email
});

export default connect(
  mapStateToProps,
  { signOut }
)(Header);

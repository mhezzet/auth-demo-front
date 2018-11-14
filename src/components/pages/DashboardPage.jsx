import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center pb-5">DASHBOARD PAGE</h1>
        {this.props.isAuth && (
          <React.Fragment>
            <div className="card m-auto" style={{ width: '18rem' }}>
              <img
                className="card-img-top"
                src={this.props.picture}
                alt="profile"
              />
              <div className="card-body">
                <p className="card-text text-center">{this.props.email}</p>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  isAuth: auth.isAuthenticated,
  email: user.email,
  picture: user.picture
});

export default connect(mapStateToProps)(DashboardPage);

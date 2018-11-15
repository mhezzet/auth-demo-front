import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { signLocal, facebookSign, googleSign } from '../../actions/auth';
import * as yup from 'yup';

class SignUpPage extends Component {
  googleResponse = async ({ accessToken, error }) => {
    if (error) return;
    try {
      await this.props.googleSign(accessToken);
      this.props.history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  facebookResponse = async ({ accessToken }) => {
    if (!accessToken) return;
    try {
      await this.props.facebookSign(accessToken);
      this.props.history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  validationSchema = () =>
    yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(3)
        .required()
    });

  onSubmitHandler = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      await this.props.signLocal(values, 'up');
      alert('success');
      this.props.history.push('/dashboard');
    } catch (err) {
      resetForm();
      setErrors({ server: err });
      setSubmitting(false);
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <h2 style={{ textAlign: 'center' }}> Already Singed in</h2>;
    }

    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.onSubmitHandler}
        validationSchema={this.validationSchema}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleReset
          } = props;
          return (
            <React.Fragment>
              <div className="jumbotron my-form">
                <h3 style={{ textAlign: 'center' }}>Sign Up</h3>
                <div className="d-flex justify-content-center">
                  <div className="m-3 ">
                    <GoogleLogin
                      clientId="539492742685-hb4d1j9u17f5curru38e06b1aa8v1h97.apps.googleusercontent.com"
                      buttonText="Google"
                      onSuccess={this.googleResponse}
                      onFailure={this.googleResponse}
                      className="btn btn-outline-danger"
                    />
                  </div>
                  <div className="m-3 ">
                    <FacebookLogin
                      appId="710987649285731"
                      textButton="Facebook"
                      fields="email,picture"
                      callback={this.facebookResponse}
                      cssClass="btn btn-outline-primary"
                    />
                  </div>
                </div>
                <hr />
                {errors.server && (
                  <div style={{ textAlign: 'center' }} className="alert-danger">
                    {errors.server}
                  </div>
                )}
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      className={`form-control ${touched.email &&
                        errors.email &&
                        'is-invalid'} ${touched.email &&
                        !errors.email &&
                        'is-valid'}`}
                      type="text"
                      placeholder="enter ur email"
                    />
                    {errors.email && touched.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group" style={{ marginBottom: '3rem' }}>
                    <label htmlFor="password">Password</label>
                    <Field
                      className={`form-control ${touched.password &&
                        errors.password &&
                        'is-invalid'} ${touched.password &&
                        !errors.password &&
                        'is-valid'}`}
                      name="password"
                      type="password"
                      placeholder="enter ur password"
                    />
                    {errors.password && touched.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group d-flex justify-content-center ">
                    <button
                      type="button"
                      className="btn  btn-secondary mr-3  pr-5 pl-5 "
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      Reset
                    </button>
                    <button
                      className="btn btn-primary ml-3 pr-5 pl-5 "
                      type="submit"
                      disabled={
                        isSubmitting ||
                        (!values.email && !values.password) ||
                        errors.password ||
                        errors.email
                      }
                    >
                      submit
                    </button>
                  </div>
                </Form>
              </div>
            </React.Fragment>
          );
        }}
      </Formik>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { signLocal, facebookSign, googleSign }
)(SignUpPage);

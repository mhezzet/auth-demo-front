import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { signLocal } from '../../actions/auth';
import * as yup from 'yup';

class SignInPage extends Component {
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

  onSubmitHandler = (values, { setSubmitting, resetForm }) => {
    this.props.signLocal(values, 'in', error => {
      if (error) {
        setSubmitting(false);
        resetForm();
      } else {
        alert('success');
        this.props.history.push('/dashboard');
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron my-form">
          <h3 style={{ textAlign: 'center' }}>Sign In</h3>
          {this.props.authErr && (
            <div style={{ textAlign: 'center' }} className="alert-danger">
              {this.props.authErr}{' '}
            </div>
          )}
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
              );
            }}
          </Formik>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  authErr: auth.errorMessage,
  isAuthenticated: auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { signLocal }
)(SignInPage);

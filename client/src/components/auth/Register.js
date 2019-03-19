import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    
    // Triggers registerUser action and sends new user data with router history
    this.props.registerUser(newUser, this.props.history);
  }
  
  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid' : errors.name
                    })}
                    placeholder="Name" 
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange} />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid' : errors.email
                    })} 
                    placeholder="Email Address" 
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange} />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}  
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid' : errors.password
                    })}
                    placeholder="Password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange} />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className={classnames('form-control form-control-lg', {
                      'is-invalid' : errors.password2
                    })}
                    placeholder="Confirm Password" 
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange} />
                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Validates incoming props
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Takes incoming state from store and maps it to props within component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

// Connects the component to the store, maps store state to components props,
// maps dispatch actions to the props, and executes on the component wrapped with
// Router functionality
export default connect(mapStateToProps, { registerUser })(withRouter(Register));

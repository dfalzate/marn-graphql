import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import GoogleLogin from "react-google-login";
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

import { clientID } from './Login';

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const responseGoogle = (response) => {

    if(response.profileObj)
    {
      let params = {
        email: response.profileObj.email,
        password:  response.profileObj.googleId,
        confirmPassword:  response.profileObj.googleId,
        username: response.profileObj.givenName,
        image: response.profileObj.imageUrl,
        googleId: response.profileObj.googleId,
      };
      // onChangeGoogle("googleId",params.googleId)
      onChangeGoogle(params)
      addUser()
    }

  };

  const { onChange,onChangeGoogle, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image:'',
    googleId:''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      if(err.graphQLErrors[0].extensions.exception.errors.username)
      {
        loginUser()
      }
      else
      {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
      
    },
    variables: values
  });

  const [loginUser, ] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      console.log("This is logoin",userData)
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      console.log("THis is  error",err.graphQLErrors[0])
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
        <div style={{width:"100%", height:20}}></div>
        <GoogleLogin

                  style={{ marginTop: 5 }}
                  // className="googleButton"
                  clientId={clientID} //CLIENTID NOT CREATED YET
                  buttonText="LOGIN WITH GOOGLE"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
      </Form>
      
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $image: String
    $googleId: String
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        image: $image
        googleId: $googleId
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      image
      token
    }
  }
`;


export default Register;
import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {GetLoginStoreData, LogActions} from '../redux';

const Login = () => {
  const [username1, setUsername1] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const logUser = LogActions();
  const loginUserData = GetLoginStoreData();
  const authUserName = loginUserData.username;

  function loginUser() {
    logUser({
      username: username1,
      firstname: 'Rahul',
      lastname: 'kadam',
      userid: '1234',
      isAuthenticated: true,
    });
  }

  function setUserName(userNameValue: string) {
    setUsername1(userNameValue);
  }

  return (
    <div>
      {!authUserName && (
        <Form>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Username"
              value={username1}
              onChange={event => {
                setUserName(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              readOnly
              value={password}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              loginUser();
            }}>
            Submit
          </Button>
        </Form>
      )}
      {authUserName && <div>Welcome {authUserName}</div>}
    </div>
  );
};

export default Login;

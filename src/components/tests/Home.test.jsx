import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer';

import Home from '../Home'
import SignUp from '../SignUp'
import Login from '../Login'
import store from '../../redux/configureStore'

describe('It displays the homepage title', () => {
  test('Homepage title', () => {
    render(<Router><Home /></Router>);
    expect(screen.getByText('The new Marriott Hotel')).toBeDefined();
  })
})

describe('Test redirection of the login and signup buttons', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
          <Login />
          <SignUp />
        </Router>
      </Provider>
    );
  })
  test('Log in Redirection', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText("Don't Have an Account?")).toBeDefined();
  })
  test('Sign Up Redirection', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(screen.getByText('Already have an account?')).toBeDefined();
  })
})

test('Home Page renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

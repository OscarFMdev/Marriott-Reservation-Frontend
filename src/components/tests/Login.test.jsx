import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import Login from '../Login';
import Rooms from '../Rooms';
import store from '../../redux/configureStore';

describe('Login page integrity and operation', () => {
  test('Login title and button', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    expect(screen.queryAllByText(/Login/, { exact: true })).toHaveLength(2);
  });

  test('Login operation with wrong credentials', () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
          <Rooms />
        </Router>
      </Provider>,
    );
    const nameInput = screen.getByTestId('email');
    userEvent.type(nameInput, 'test@mail.com');
    const passwordInput = screen.getByTestId('password');
    userEvent.type(passwordInput, '123456');

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Available Rooms')).toBeDefined();
  });
});

test('Login renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

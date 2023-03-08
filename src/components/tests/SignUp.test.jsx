import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import SignUp from '../SignUp';
import store from '../../redux/configureStore';

describe('It displays the Sign Up two times', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <SignUp />
        </Router>
      </Provider>,
    );
  });

  test('Sign Up title and button', () => {
    expect(screen.queryAllByText(/Sign Up/, { exact: true })).toHaveLength(2);
  });
});

test('Sign Up renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

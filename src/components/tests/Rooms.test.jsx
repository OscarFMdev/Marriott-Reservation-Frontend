import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Rooms from '../Rooms';
import store from '../../redux/configureStore';

describe('It displays the Roooms title', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Rooms />
        </Router>
      </Provider>,
    );
  });
  test('List of Rooms', () => {
    expect(screen.getByText('Available Rooms')).toBeDefined();
  });
});

test('Rooms renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <Rooms />
      </Router>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

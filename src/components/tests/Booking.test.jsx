import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';

import Booking from '../Booking'
import store from '../../redux/configureStore'

describe('It displays the Booking page title', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Booking />
        </Router>
      </Provider>
    );
  })
  test('Booking title', () => {
    expect(screen.getByText('Book a Marriott Hotel Room')).toBeDefined();
  })
})

test('Booking page renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <Booking />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

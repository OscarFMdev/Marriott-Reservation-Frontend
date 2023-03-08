import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';

import MyBookings from '../MyBookings'
import store from '../../redux/configureStore'

describe('It displays the Booking page title', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <MyBookings />
        </Router>
      </Provider>
    );
  })
  test('My Booking title', () => {
    expect(screen.getByText('My Bookings')).toBeDefined();
  })
})

test('My Bookings page renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <MyBookings />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

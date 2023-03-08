import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';

import AddRoom from '../AddRoom'
import store from '../../redux/configureStore'

describe('It displays the Add Rooom page title', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <AddRoom />
        </Router>
      </Provider>
    );
  })
  test('Add Room', () => {
    expect(screen.queryAllByText(/Add Room/, { exact: true })).toHaveLength(2);
  })
})

test('Rooms renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <AddRoom />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';

import DeleteRoom from '../DeleteRoom'
import store from '../../redux/configureStore'

describe('It displays the Delete Rooom page title', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <DeleteRoom />
        </Router>
      </Provider>
    );
  })
  test('Delete Room', () => {
    expect(screen.getByText('Delete Rooms')).toBeDefined();
  })
})

test('Delete Rooms renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <DeleteRoom />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

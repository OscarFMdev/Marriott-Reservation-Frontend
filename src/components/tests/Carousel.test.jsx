import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';

import Carousel from '../Carousel'
import store from '../../redux/configureStore'

test('Carousel renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <Carousel />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Navbar from '../Navbar';
import store from '../../redux/configureStore';

test('Navbar renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <Navbar />
      </Router>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

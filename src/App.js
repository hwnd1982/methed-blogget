import {useDispatch} from 'react-redux';
import {getToken} from './api/token';
import Header from './components/Header';
import Main from './components/Main';
import {updateToken} from './store/token/token';

const App = () => {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;

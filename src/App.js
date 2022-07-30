import {useDispatch} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {getToken} from './api/token';
import Header from './components/Header';
import Main from './components/Main';
import {Notifications} from './components/Notifications/Notifications';
import {updateToken} from './store/token/token';

const App = () => {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <Routes>
      <Route path='*' element={
        <>
          <Header />
          <Main />
          <Notifications />
        </>
      } />
    </Routes>
  );
};

export default App;

import style from './Main.module.css';
import Layout from '../Layout';
import {Tabs} from './Tabs/Tabs';
import {List} from './List/List';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Modal from '../Modal';
import {Home} from './Home/Home';
import {Error} from './Error/Error';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

export const Main = () => {
  const navigate = useNavigate();
  const {status} = useSelector(store => store.posts.error);

  useEffect(() => {
    if (status === 400 || status === 404) {
      navigate('error');
    }
  }, [status]);

  return (<main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='category/:page' element={<List />}>
          <Route path='post/:id' element={<Modal />}/>
        </Route>
        <Route path='auth' element={<Navigate to='/' />} />
        <Route path='*' element={<Navigate to='error' />} />
        <Route path='error' element={<Error />} />
      </Routes>
    </Layout>
  </main>);
};

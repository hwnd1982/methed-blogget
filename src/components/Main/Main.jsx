import style from './Main.module.css';
import PropTypes from 'prop-types';
import Layout from '../Layout';

export const Main = ({children}) => (
  <main className={style.main}>
    <Layout>
      {children}
    </Layout>
  </main>
);

Main.propTypes = {
  children: PropTypes.any
};

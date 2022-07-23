import style from './Main.module.css';
import Layout from '../Layout';
import {Tabs} from './Tabs/Tabs';
import {List} from './List/List';
// import {SVG} from '../../UI/SVG';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <List />
    </Layout>
  </main>
);

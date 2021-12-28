import { VFC } from 'react';
import { Main } from './components/pages/Main';
import { Header } from './components/organisms/layout/Header';

const App: VFC = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;

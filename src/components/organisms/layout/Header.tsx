import { VFC, memo } from 'react';
import '../../../styles.css';

export const Header: VFC = memo(() => {
  return (
    <header className="Header">
      <p className="Title">Population Trands by Prefecture</p>
    </header>
  );
});

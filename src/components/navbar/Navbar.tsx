import { FC } from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';

interface NavbarProps {}

const Header: FC<NavbarProps> = () => {

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <header>
      <h2>Pokeguessr</h2>
      <div className='navlinks'>
        <NavLink to="/">Random</NavLink>
        <NavLink to="/wordle">Wordle</NavLink>
      </div>
      <div>
          <i className="fa-solid fa-moon" onClick={toggleColorMode}></i>
      </div>
    </header>
  );
}

export default Header;

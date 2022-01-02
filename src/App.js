import './index.css';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';

import React, {useState,useEffect,useRef} from 'react';
import {CSSTransition} from 'react-transition-group';

function App() {
  return (
   <Navbar>
     <Navitem icon={<PlusIcon />} />
     <Navitem icon={<BellIcon />} />
     <Navitem icon={<MessengerIcon />} />

     <Navitem icon={<CaretIcon />}>
      <DropdownMenu />
     </Navitem>
   </Navbar>
  );
};
function Navbar(props){
return(
<nav className="navbar">
<ul className="navbar-nav">{props.children}</ul>
</nav>
);
}

function Navitem(props){
  
  const [open,setOpen] = useState(false);

  return(
    
    <li className="nav-item">
     <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
       {props.icon}
     </a>
     {open && props.children}
    </li>
  );
}
function DropdownMenu() {

  const [activemenu, setactivemenu] = useState('main');
  const [menuheight, setmenuheight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setmenuheight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el){
    const height =el.offsetHeight;
    setmenuheight(height);
  }

  function DropdownItem(props){
      return(
        <a href="#" className="menu-item" onClick={() => props.goToMenu && setactivemenu(props.goToMenu) }>
           
           <span className="icon-button">{props.leftIcon}</span>

           {props.children}

           <span className="icon-right">{props.rightIcon}</span>
        </a>
      )
  }
  
  return(
   <div className="dropdown" style={{height:menuheight}}>

     <CSSTransition 
      in ={activemenu === 'main'} 
      timeout={500} 
      className="menu-primary"
      unmountOnExit
      onEnter={calcHeight}>
       <div className="menu">
      <DropdownItem>My Profile</DropdownItem>
      <DropdownItem  
        leftIcon={<CogIcon />}
        rightIcon={<ChevronIcon />}
        goToMenu="settings"> 
        Settings
      </DropdownItem>
      <DropdownItem
            leftIcon={<BoltIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="chat">
            Chat
          </DropdownItem>
      </div>

      </CSSTransition>

      <CSSTransition 
      in ={activemenu === 'settings'} 
      timeout={500} 
      className="menu-secondary"
      unmountOnExit
      onEnter ={calcHeight}>
       <div className="menu">
       <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Settings</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Main settings</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Account info</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>About</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Logout!</DropdownItem>
        </div>
      </CSSTransition>
        
      <CSSTransition
        in={activemenu === 'chat'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Chat</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>New message</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Group chat</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Create new group</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Block/Unblock users</DropdownItem>
        </div>
      </CSSTransition>
    </div>  

   
  );

}
export default App;

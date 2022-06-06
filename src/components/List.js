import React from "react";
import { NavLink } from "react-router-dom";
export default function List(props){

    const [menu , setMenu] = React.useState(false)

    function handleMenu(){
        setMenu(!menu);
    }
    function handleClick(){
        setMenu(false);
    }
 
    return(
        <div className="menu--container">
            
            <nav className="nav--items">
                <div className="title--container">
                    <NavLink to='/Leaners-corner/' className="nav--title">Leaners Corner</NavLink>
                    <h3 onClick={handleMenu} className="menu--icon"><i class="fa-solid fa-bars"></i></h3>
                </div>
                <div  className="item--container2">
                    
                    <NavLink className='active item' to='/Leaners-corner/'>Home</NavLink>
                    <NavLink className='active item' to='/about'>About</NavLink>
                    <NavLink className='active item' to='/contact'>Contact</NavLink>
                    <NavLink className='active item' to='/sign'>Curriculum</NavLink>
                </div>
                
                {menu?<div  className="item--container">
                    
                    
                    <NavLink onClick={handleClick} className='active item' to='/Leaners-corner/'>Home</NavLink>
                    <NavLink onClick={handleClick}  className='active item' to='/about'>About</NavLink>
                    <NavLink onClick={handleClick}  className='active item' to='/contact'>Contact</NavLink>
                    <NavLink onClick={handleClick}  className='active item' to='/sign'>Curriculum</NavLink>
                </div>: console.log('we')}
                
            </nav>

          
        </div>
    )
}
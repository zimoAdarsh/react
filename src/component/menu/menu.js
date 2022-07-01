import React, { useState , useRef} from 'react'
import Sub from './sub-menu'





const Menu = ()=> {
    const render = useRef(0)

    const [ menuItems , setMenuItems ] = useState([
        { item : "Home"  },
        { item : "Category" , sub :  [ "Truck" , "Trailer" , "Container" ] },
        { item : "About Us"  },
        { item : "Services"  },
        { item : "Contact Us"  }
    
    ])

    const callme = ()=>{
        //  render.current = render.current+1
        console.log('render',render)
    }

    return (

        <div className='main_menu'>
            {
                menuItems.map((ele)=>
                    <Sub items={ ele } subs={ ele.sub ?? [] } callFun = { callme }></Sub>
                )
            }
        

        </div>


    )




}


export default Menu
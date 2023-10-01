
import React, { useState } from "react";
import { NeuromorphicButton, NueromorphicNavItem, NueromorphicNavLink } from "../../context/component";

import './dropdown.css'
const Dropdown=({dropdownStyle,rowStyle,icons,buttonStyle,label,items,Onchange,labelStyle,toggle,setToggle})=>{
    const [active,setActive]=useState(0)
    return(
        <div className={"dropdown "+dropdownStyle}>
                <NeuromorphicButton
                onClick={()=>setToggle(!toggle)}
                
               className={" outline-none p-0 border-none "+dropdownStyle} >
                <NueromorphicNavLink
                  eventkey="link-4"
                  className=" nav-text active"
                >
                  <label>{items[active].label}</label>
                </NueromorphicNavLink>               
                </NeuromorphicButton>
                <div className={(toggle?"show":'')+" dropdown-content "}>
                    
                    {
                        items.map((value,key)=>(
                            <button  key={key} className={"flex flex-row   justify-between items-center mx-2 p-3  "+buttonStyle} onClick={()=>{

                                Onchange(value.id)
                                setActive(key)
                                setToggle(false)
                            }} ><label className={"text-xl  mr-3 "+labelStyle}>
                                {value.label}
                                </label>
                                {icons[key]}
                                </button>
                        ))
                    }
                </div>

        </div>
    )
}
export default Dropdown;
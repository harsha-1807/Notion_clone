"use client"
import React, { useEffect, useState } from 'react'

const  useScroll = (threshold=10) => {
    const [Scrolled, setScrolled] = useState(false);
    useEffect(()=>{
        const handleScroll =()=>{
            if (window.scrollY > threshold){
                setScrolled(true);
            }else{
                setScrolled(false);
            }

        }
        window.addEventListener("scroll",handleScroll)
        return ()=>window.removeEventListener("scroll",handleScroll)
    },[threshold])

    return Scrolled;

}

export default  useScroll

"use client"
import React, { useEffect, useState } from 'react'
import SettingsModal from '../modals/SettingsModal';
import CoverImageModal from '../modals/CoverImageModal';

const ModalProviders = () => {
    const [IsMounted, setIsMounted] = useState(false)


    useEffect(() => {
      setIsMounted(true); 
    }, [])

    if (!IsMounted){
        return null
    }
    
  return (
    <>
    <SettingsModal />   
    <CoverImageModal />
    </>
  )
}

export default ModalProviders
import { create } from 'zustand'


const useSettings = create((set)=>({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false}),
   
}))

export default useSettings;
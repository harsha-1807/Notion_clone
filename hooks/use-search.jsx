import { create } from 'zustand'


const useSearch = create((set,get)=>({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false}),
    toggle: ()=>set({ isOpen:!get().isOpen}),
}))

export default useSearch;
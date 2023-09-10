import { create} from "zustand"

interface useProModel  {
    isOpen : boolean ,
    onOpen : () => void;
    onClose : () => void;
}


export const useProModel = create<useProModel>((set) => ({
    isOpen : false,
    onOpen : () => set({ isOpen : true}),
    onClose : () => set({ isOpen : false})
}) )
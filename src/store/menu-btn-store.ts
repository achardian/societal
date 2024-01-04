import { create } from "zustand";

type TMenuBtnStore = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

const useMenuBtnStore = create<TMenuBtnStore>((set) => ({
  isOpen: false,
  setIsOpen(state) {
    set(() => ({ isOpen: state }));
  },
}));

export default useMenuBtnStore;

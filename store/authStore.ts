import { create } from "zustand";
import { persist } from "zustand/middleware";

type StepOne = {
  name: string;
  phoneNumber: string;
  email: string;
};

type Location = {
  lat: number;
  lng: number;
};

type StepTwo = {
  profileImage: File | null;
  fullAddress: string;
  location: Location | null;
};

type RegisterStore = {
  stepOne: StepOne;
  stepTwo: StepTwo;

  setStepOne: (data: Partial<StepOne>) => void;
  setStepTwo: (data: Partial<StepTwo>) => void;

  reset: () => void;
};

const initialState: Pick<RegisterStore, "stepOne" | "stepTwo"> = {
  stepOne: {
    name: "",
    email: "",
    phoneNumber: "",
  },
  stepTwo: {
    fullAddress: "",
    location: null,
    profileImage: null,
  },
};

export const useRegisterStore = create<RegisterStore>()(
  persist(
    (set) => ({
      ...initialState,

      setStepOne: (data) =>
        set((state) => ({
          stepOne: { ...state.stepOne, ...data },
        })),

      setStepTwo: (data) =>
        set((state) => ({
          stepTwo: { ...state.stepTwo, ...data },
        })),

      reset: () => set(initialState),
    }),
    {
      name: "register-storage",

      partialize: (state) => ({
        stepOne: state.stepOne,
        stepTwo: {
          fullAddress: state.stepTwo.fullAddress,
          location: state.stepTwo.location,
        },
      }),
    },
  ),
);

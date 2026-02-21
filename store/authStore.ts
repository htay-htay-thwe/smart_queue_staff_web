import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const isDev = process.env.NODE_ENV === "development";

type StepOne = {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
};

type Location = {
  lat: number;
  lng: number;
};

type StepTwo = {
  shop_img: File | null;
  fullAddress: string;
  location: Location | null;
};

type StepThree = {
  shopType: string;
  tableTwo: number;
  tableFour: number;
  tableSix: number;
  description: string;
};

type RegisterStore = {
  stepOne: StepOne;
  stepTwo: StepTwo;
  stepThree: StepThree;

  setStepOne: (data: Partial<StepOne>) => void;
  setStepTwo: (data: Partial<StepTwo>) => void;
  setStepThree: (data: Partial<StepThree>) => void;

  reset: () => void;
};

const initialState: Pick<RegisterStore, "stepOne" | "stepTwo" | "stepThree"> = {
  stepOne: {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  },
  stepTwo: {
    fullAddress: "hhhh",
    location: null,
    shop_img: null,
  },
  stepThree: {
    shopType: "",
    tableTwo: 0,
    tableFour: 0,
    tableSix: 0,
    description: "",
  },
};

export const useRegisterStore = create<RegisterStore>()(
  (isDev ? devtools : (config: any) => config)(
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

        setStepThree: (data) =>
          set((state) => ({
            stepThree: { ...state.stepThree, ...data },
          })),

        reset: () => set(initialState),
      }),
      {
        name: "register-storage",

        partialize: (state: RegisterStore) => ({
          stepOne: state.stepOne,
          stepTwo: {
            fullAddress: state.stepTwo.fullAddress,
            location: state.stepTwo.location,
          },
          stepThree: state.stepThree,
        }),
      },
    ),
  ),
);

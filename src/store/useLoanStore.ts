import { create } from "zustand";

type LoanType = "personal" | "home" | "business" | "";

interface FormData {
  fullName: string;
  email: string;

  occupation: string;
  salary: string;

  propertyValue: string;
  propertyAddress: string;

  gstNumber: string;
  annualTurnover: string;

  panNumber: string;
  aadhaarNumber: string;
}

interface LoanState {
  currentStep: number;
  loanType: LoanType;

  formData: FormData;

  setLoanType: (type: LoanType) => void;

  updateField: (
    field: keyof FormData,
    value: string
  ) => void;

  nextStep: () => void;
  prevStep: () => void;

  hydrate: () => void;
}

const STORAGE_KEY = "loan-app-data";

export const useLoanStore = create<LoanState>((set) => ({
  currentStep: 1,

  loanType: "",

  formData: {
    fullName: "",
    email: "",

    occupation: "",
    salary: "",

    propertyValue: "",
    propertyAddress: "",

    gstNumber: "",
    annualTurnover: "",

    panNumber: "",
    aadhaarNumber: "",
  },

  setLoanType: (type) => {
    set({ loanType: type });
  },

  updateField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  nextStep: () =>
    set((state) => ({
      currentStep:
        state.currentStep < 3
          ? state.currentStep + 1
          : state.currentStep,
    })),

  prevStep: () =>
    set((state) => ({
      currentStep:
        state.currentStep > 1
          ? state.currentStep - 1
          : state.currentStep,
    })),

  hydrate: () => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
      set(JSON.parse(data));
    }
  },
}));

// AUTO SAVE
useLoanStore.subscribe((state) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentStep: state.currentStep,
      loanType: state.loanType,
      formData: state.formData,
    })
  );
});
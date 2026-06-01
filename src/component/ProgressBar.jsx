import { useLoanStore } from "../store/useLoanStore";

import Step1LoanType from "../steps/Step1LoanType";
import Step2PersonalInfo from "../steps/Step2PersonalInfo";
import ProgressBar from "./ProgressBar";

export default function Wizard() {
  const { currentStep } = useLoanStore();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <ProgressBar />

      {currentStep === 1 && <Step1LoanType />}
      {currentStep === 2 && <Step2PersonalInfo />}
    </div>
  );
}
import { useState } from "react";

import Step1LoanType from "../steps/Step1LoanType";
import Step2PersonalInfo from "../steps/Step2PersonalInfo";
import Step3KYC from "../steps/Step3KYC";
import Step4Address from "../steps/Step4Address";
import Step5Review from "../steps/Step5Review";
import Success from "../steps/Success";

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStep1Next = (data) => {
    setFormData((prev) => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  const handleStep2Next = (data) => {
    setFormData((prev) => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleStep3Next = (data) => {
    setFormData((prev) => ({ ...prev, step3: data }));
    setCurrentStep(4);
  };

  const handleStep4Next = (data) => {
    setFormData((prev) => ({ ...prev, step4: data }));
    setCurrentStep(5);
  };

  const handleFinalSubmit = () => {
    console.log("Final Application Data:", formData);
    setCurrentStep(6);
  };

  const handleEdit = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto mb-6">
        <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
          <div
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((currentStep / 6) * 100, 100)}%` }}
          />
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          Step {currentStep > 5 ? 5 : currentStep} of 5
        </p>
      </div>

      {currentStep === 1 && (
        <Step1LoanType onNext={handleStep1Next} />
      )}

      {currentStep === 2 && (
        <Step2PersonalInfo onNext={handleStep2Next} />
      )}

      {currentStep === 3 && (
        <Step3KYC onNext={handleStep3Next} />
      )}

      {currentStep === 4 && (
        <Step4Address onNext={handleStep4Next} />
      )}

      {currentStep === 5 && (
        <Step5Review
          data={formData}
          onSubmit={handleFinalSubmit}
          onEdit={handleEdit}
        />
      )}

      {currentStep === 6 && <Success />}
    </div>
  );
}{currentStep === 5 && (
  <Step5Review
    data={formData}
    onSubmit={handleFinalSubmit}
  />
)}

{currentStep === 6 && <Success />}
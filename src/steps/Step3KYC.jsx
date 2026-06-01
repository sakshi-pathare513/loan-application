import { useState } from "react";
import { validatePAN, validateAadhaar } from "../utils/validators";

export default function Step3KYC({ onNext }) {
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  const [panVerified, setPanVerified] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  const verifyPAN = () => {
    const isValid = validatePAN(pan);

    if (!isValid) {
      alert("Invalid PAN format");
      return;
    }

    setTimeout(() => {
      setPanVerified(true);
    }, 1000);
  };

  const verifyAadhaar = () => {
    const isValid = validateAadhaar(aadhaar);

    if (!isValid) {
      alert("Invalid Aadhaar number");
      return;
    }

    setTimeout(() => {
      setAadhaarVerified(true);
    }, 1000);
  };

  const handleNext = () => {
    if (!panVerified || !aadhaarVerified) {
      alert("Complete KYC verification");
      return;
    }

    onNext({
      pan,
      aadhaar,
      panVerified,
      aadhaarVerified,
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h2>KYC Verification</h2>

      {/* PAN */}
      <div>
        <label>PAN Number</label>
        <br />

        <input
          type="text"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase())}
          placeholder="ABCDE1234F"
        />

        <button type="button" onClick={verifyPAN}>
          Verify PAN
        </button>

        {panVerified && <p>✅ PAN Verified</p>}
      </div>

      {/* Aadhaar */}
      <div>
        <label>Aadhaar Number</label>
        <br />

        <input
          type="text"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          placeholder="123456789012"
        />

        <button type="button" onClick={verifyAadhaar}>
          Verify Aadhaar
        </button>

        {aadhaarVerified && <p>✅ Aadhaar Verified</p>}
      </div>

      {/* Next */}
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
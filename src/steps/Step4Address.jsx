import { useState } from "react";
import { pinCodeData } from "../utils/pinCodeData";

export default function Step4Address({ onNext }) {
  const [form, setForm] = useState({
    address1: "",
    address2: "",
    pincode: "",
    city: "",
    state: "",
    residenceType: "",
    yearsAtAddress: "",
    rent: "",
    sameAsCurrent: false,
    permanentAddress: "",
  });

  const handlePincode = (pin) => {
    setForm({ ...form, pincode: pin });

    if (pinCodeData[pin]) {
      setForm((prev) => ({
        ...prev,
        pincode: pin,
        city: pinCodeData[pin].city,
        state: pinCodeData[pin].state,
      }));
    }
  };

  const handleSameAddress = (checked) => {
    setForm({
      ...form,
      sameAsCurrent: checked,
      permanentAddress: checked
        ? `${form.address1} ${form.address2}`
        : "",
    });
  };

  const handleNext = () => {
    if (!form.address1 || !form.pincode || !form.city || !form.state) {
      alert("Fill required address fields");
      return;
    }

    onNext(form);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3>Current Address</h3>

        <input
          placeholder="Address Line 1"
          value={form.address1}
          onChange={(e) =>
            setForm({ ...form, address1: e.target.value })
          }
        />

        <input
          placeholder="Address Line 2"
          value={form.address2}
          onChange={(e) =>
            setForm({ ...form, address2: e.target.value })
          }
        />

        <input
          placeholder="PIN Code"
          value={form.pincode}
          onChange={(e) => handlePincode(e.target.value)}
        />

        <input value={form.city} placeholder="City" readOnly />
        <input value={form.state} placeholder="State" readOnly />
      </div>

      <div>
        <label>Residence Type</label>

        <select
          value={form.residenceType}
          onChange={(e) =>
            setForm({ ...form, residenceType: e.target.value })
          }
        >
          <option value="">Select</option>
          <option value="Owned">Owned</option>
          <option value="Rented">Rented</option>
          <option value="Family">Family</option>
        </select>

        {form.residenceType === "Rented" && (
          <input
            placeholder="Monthly Rent"
            value={form.rent}
            onChange={(e) =>
              setForm({ ...form, rent: e.target.value })
            }
          />
        )}
      </div>

      <div>
        <input
          placeholder="Years at current address"
          value={form.yearsAtAddress}
          onChange={(e) =>
            setForm({ ...form, yearsAtAddress: e.target.value })
          }
        />

        {form.yearsAtAddress < 1 && (
          <input placeholder="Previous Address" />
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={form.sameAsCurrent}
            onChange={(e) => handleSameAddress(e.target.checked)}
          />
          Same as Permanent Address
        </label>
      </div>

      {!form.sameAsCurrent && (
        <textarea
          placeholder="Permanent Address"
          value={form.permanentAddress}
          onChange={(e) =>
            setForm({
              ...form,
              permanentAddress: e.target.value,
            })
          }
        />
      )}

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
import { useForm } from "react-hook-form";
import { useMemo } from "react";

export default function Step2PersonalInfo({ onNext }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dob = watch("dob");

  // Age calculation
  const age = useMemo(() => {
    if (!dob) return null;

    const birth = new Date(dob);
    const today = new Date();

    let a = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      a--;
    }

    return a;
  }, [dob]);

  const onSubmit = (data) => {
    if (age < 21 || age > 65) {
      alert("Age must be between 21 and 65");
      return;
    }

    onNext({ ...data, age });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">

      <div>
        <label>Full Name :</label>
        <input
          {...register("fullName", {
            required: "Name required",
            minLength: 2,
            pattern: /^[A-Za-z .]+$/,
          })}
        />
        <p>{errors.fullName?.message}</p>
      </div>

      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          {...register("dob", { required: "DOB required" })}
        />

        {dob && (
          <p>
            Age: {age}{" "}
            {age < 21 || age > 65 ? "❌ Not eligible" : "✅"}
          </p>
        )}
      </div>

      <div>
        <label>Gender</label>
        <select {...register("gender", { required: true })}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
        />
        <p>{errors.email?.message}</p>
      </div>

      <div>
        <label>Mobile</label>
        <input
          {...register("mobile", {
            required: "Mobile required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Invalid mobile number",
            },
          })}
        />
      </div>

      <div>
        <label>Alternate Mobile</label>
        <input
          {...register("altMobile", {
            validate: (value) =>
              value !== watch("mobile") || "Must be different",
          })}
        />
      </div>

      <div>
        <label>Marital Status</label>
        <select {...register("maritalStatus")}>
          <option>Single</option>
          <option>Married</option>
        </select>
      </div>

      <button type="submit">
        Next
      </button>
    </form>
  );
}
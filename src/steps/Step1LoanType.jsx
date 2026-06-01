import { useForm } from "react-hook-form";

export default function Step1LoanType({ onNext }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      loanType: "",
      loanAmount: "",
      tenure: "",
      purpose: "",
    },
  });

  const loanType = watch("loanType");

  const getMaxAmount = (type) => {
    if (type === "Personal") return 1000000;
    if (type === "Home") return 10000000;
    if (type === "Business") return 5000000;
    return 0;
  };

  const onSubmit = (data) => {
    const max = getMaxAmount(data.loanType);

    if (data.loanAmount > max) {
      alert(`Max allowed for ${data.loanType} is ${max}`);
      return;
    }

    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">

      {/* LOAN TYPE */}
      <div>
        <label>Loan Type</label>
        <select
          {...register("loanType", { required: "Loan type required" })}
        >
          <option value="">Select</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
          <option value="Business">Business</option>
        </select>
        <p>{errors.loanType?.message}</p>
      </div>

      {/* LOAN AMOUNT */}
      <div>
        <label>Loan Amount</label>
        <input
          type="number"
          {...register("loanAmount", {
            required: "Amount required",
            min: 50000,
          })}
        />
        <p>{errors.loanAmount?.message}</p>
      </div>

      {/* TENURE */}
      <div>
        <label>Tenure (months)</label>
        <input
          type="number"
          {...register("tenure", {
            required: "Tenure required",
          })}
        />
        <p>{errors.tenure?.message}</p>
      </div>

      {/* PURPOSE */}
      <div>
        <label>Purpose</label>
        <select {...register("purpose", { required: true })}>
          <option value="">Select</option>

          {loanType === "Personal" && (
            <>
              <option>Travel</option>
              <option>Medical</option>
              <option>Education</option>
            </>
          )}

          {loanType === "Home" && (
            <>
              <option>Buy House</option>
              <option>Renovation</option>
            </>
          )}

          {loanType === "Business" && (
            <>
              <option>Working Capital</option>
              <option>Equipment</option>
            </>
          )}
        </select>
      </div>

      {/* NEXT BUTTON */}
      <button type="submit">
        Next
      </button>
    </form>
  );
}
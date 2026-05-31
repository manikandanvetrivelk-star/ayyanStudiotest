import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { submitBookingRequest } from "../services/bookingService";

const defaultValues = {
  fullName: "",
  phone: "",
  email: "",
  shootType: "",
  date: "",
};

export default function BookingForm({ defaultShootType, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    reset({
      ...defaultValues,
      shootType: defaultShootType || defaultValues.shootType,
    });
  }, [defaultShootType, reset]);

  const onSubmit = async (data) => {
    try {
      await submitBookingRequest(data);
      toast.success("Booking request received. Confirmation email sent.");
      onClose();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Could not submit booking. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4 pb-4 text-center border-b border-white/10 md:pb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c9a85c]">Book a Session</p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Reserve your shoot</h2>
        <p className="mx-auto max-w-2xl text-sm text-[#d9cbae] md:text-base">
          Choose your preferred date, time and shoot type. We will confirm the booking by email as soon as possible.
        </p>
      </div>

      <form
        className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#f5ede0]">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required." })}
            className="w-full rounded-3xl border border-white/10 bg-[#16120f] px-4 py-3 text-sm text-[#f5ede0] outline-none transition focus:border-[#c9a85c] focus:ring-2 focus:ring-[#c9a85c22]"
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="text-xs text-rose-300">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#f5ede0]">Mobile Number</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Mobile number is required.",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid mobile number.",
              },
            })}
            className="w-full rounded-3xl border border-white/10 bg-[#16120f] px-4 py-3 text-sm text-[#f5ede0] outline-none transition focus:border-[#c9a85c] focus:ring-2 focus:ring-[#c9a85c22]"
            placeholder="Enter mobile number"
          />
          {errors.phone && (
            <p className="text-xs text-rose-300">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-[#f5ede0]">Email Address</label>
          <input
            type="email"
            {...register("email", {
              required: "Email address is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
            className="w-full rounded-3xl border border-white/10 bg-[#16120f] px-4 py-3 text-sm text-[#f5ede0] outline-none transition focus:border-[#c9a85c] focus:ring-2 focus:ring-[#c9a85c22]"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-rose-300">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#f5ede0]">Shoot Type</label>
          <select
            {...register("shootType", { required: "Please choose a shoot type." })}
            className="w-full rounded-3xl border border-white/10 bg-[#16120f] px-4 py-3 text-sm text-[#f5ede0] outline-none transition focus:border-[#c9a85c] focus:ring-2 focus:ring-[#c9a85c22]"
          >
            <option value="">Select shoot type</option>
            {[
              "Maternity",
              "Newborn",
              "Toddler",
              "Wedding",
              "Portrait",
              "Fashion",
              "Product",
              "Event",
              "Surprise",
            ].map((type) => (
              <option key={type} value={type} className="bg-[#16120f] text-[#f5ede0]">
                {type}
              </option>
            ))}
          </select>
          {errors.shootType && (
            <p className="text-xs text-rose-300">{errors.shootType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#f5ede0]">Preferred Booking Date</label>
          <input
            type="date"
            {...register("date", {
              required: "Preferred date is required.",
              validate: (value) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selected = new Date(value);
                if (!value) return "Preferred date is required.";
                if (selected < today) return "Date cannot be in the past.";
                return true;
              },
            })}
            min={minDate}
            className="w-full rounded-3xl border border-white/10 bg-[#16120f] px-4 py-3 text-sm text-[#f5ede0] outline-none transition focus:border-[#c9a85c] focus:ring-2 focus:ring-[#c9a85c22]"
          />
          {errors.date && (
            <p className="text-xs text-rose-300">{errors.date.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-r from-[#c9a85c] to-[#e8d5a3] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#111] transition duration-200 hover:scale-[1.01] hover:shadow-[0_18px_50px_rgba(201,168,92,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending request..." : "Send booking request"}
          </button>
        </div>
      </form>
    </div>
  );
}

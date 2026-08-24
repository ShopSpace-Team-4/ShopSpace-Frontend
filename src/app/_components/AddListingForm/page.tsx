"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import {
  createListing,
  publishListing,
  uploadListingMedia,
} from "@/actions/listings";

type StepKey = "basic" | "details" | "media";

const steps: { key: StepKey; label: string }[] = [
  { key: "basic", label: "Basic Info" },
  { key: "details", label: "Details & Amenities" },
  { key: "media", label: "Media & Pricing" },
];

// Must match backend enum values exactly (see integration guide, section 7).
const categories = [
  "Retail",
  "Showroom",
  "Office",
  "Warehouse",
  "Kiosk",
  "Restaurant",
  "Other",
];

const amenities = [
  { code: "PARKING", label: "Parking" },
  { code: "SECURITY", label: "Security" },
  { code: "AC", label: "AC" },
  { code: "STORAGE", label: "Storage" },
  { code: "LOADING_DOCK", label: "Loading Dock" },
  { code: "KITCHEN_EXHAUST", label: "Kitchen Exhaust" },
  { code: "GREASE_TRAP", label: "Grease Trap" },
  { code: "HIGH_SPEED_INTERNET", label: "High-Speed Internet" },
  { code: "MEETING_ROOMS", label: "Meeting Rooms" },
  { code: "RECEPTION", label: "Reception" },
  { code: "DISPLAY_WINDOWS", label: "Display Windows" },
  { code: "CHANGING_ROOMS", label: "Changing Rooms" },
  { code: "DISABLED_ACCESS", label: "Disabled Access" },
  { code: "COLD_STORAGE", label: "Cold Storage" },
];

export default function AddListingForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepKey>("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Basic Info state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [areaSqm, setAreaSqm] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  // Details & Amenities state
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(
    new Set(),
  );
  const [numberOfFloors, setNumberOfFloors] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [minLeaseTerm, setMinLeaseTerm] = useState("");

  // Media & Pricing state
  const [annualRent, setAnnualRent] = useState("");
  const [securityDepositMonths, setSecurityDepositMonths] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stepIndex = steps.findIndex((s) => s.key === activeStep);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const goPrevious = () => {
    if (!isFirstStep) setActiveStep(steps[stepIndex - 1].key);
  };

  const goNext = () => {
    if (!isLastStep) setActiveStep(steps[stepIndex + 1].key);
  };

  const toggleAmenity = (code: string) => {
    setSelectedAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    setPhotos((prev) => [...prev, ...imageFiles]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    addPhotos(e.dataTransfer.files);
  };

  const validateBeforeSubmit = (): string | null => {
    if (!title.trim()) return "Listing title is required.";
    if (!areaSqm || Number(areaSqm) <= 0) return "Area (m²) is required.";
    if (!city.trim()) return "City is required.";
    if (!district.trim()) return "District is required.";
    if (!address.trim()) return "Address is required.";
    if (!description.trim()) return "Description is required.";
    if (!annualRent || Number(annualRent) <= 0)
      return "Annual rent is required.";
    if (!securityDepositMonths || Number(securityDepositMonths) <= 0)
      return "Security deposit (months) is required.";
    return null;
  };

  const resetForm = () => {
    setTitle("");
    setCategory(categories[0]);
    setAreaSqm("");
    setCity("");
    setDistrict("");
    setAddress("");
    setDescription("");
    setSelectedAmenities(new Set());
    setNumberOfFloors("");
    setFloorNumber("");
    setAvailableFrom("");
    setMinLeaseTerm("");
    setAnnualRent("");
    setSecurityDepositMonths("");
    setPhotos([]);
    setActiveStep("basic");
  };

  const handlePublish = async () => {
    const validationError = validateBeforeSubmit();
    if (validationError) {
      setError(validationError);
      // Jump back to whichever step is missing info.
      if (!title || !areaSqm || !city || !district || !address || !description) {
        setActiveStep("basic");
      }
      return;
    }

    setError(null);
    setShowSuccess(false);
    setIsSubmitting(true);

    try {
      // 1. Create the listing (starts as PENDING on the backend).
      const created = await createListing({
        title: title.trim(),
        category,
        areaSqm: Number(areaSqm),
        city: city.trim(),
        district: district.trim(),
        address: address.trim(),
        description: description.trim(),
        amenities: Array.from(selectedAmenities),
        numberOfFloors: numberOfFloors ? Number(numberOfFloors) : 1,
        floorNumber: floorNumber ? Number(floorNumber) : 0,
        availableFrom: availableFrom || undefined,
        minimumLeaseTerm: minLeaseTerm || undefined,
        annualRent: Number(annualRent),
        securityDepositMonths: Number(securityDepositMonths),
      });

      const listingId = created.data.id;

      // 2. Upload photos, if any were attached.
      if (photos.length > 0) {
        const formData = new FormData();
        photos.forEach((photo) => formData.append("photos", photo));
        await uploadListingMedia(listingId, formData);
      }

      // 3. Publish so it shows up as AVAILABLE in the marketplace.
      await publishListing(listingId);

      resetForm();
      setShowSuccess(true);
      router.refresh();

      // Hide the success banner after a few seconds.
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to publish listing.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrimaryAction = () => {
    if (isLastStep) {
      handlePublish();
    } else {
      goNext();
    }
  };

  return (
    <div className="flex w-full max-w-175 flex-col p-7">
      {/* Heading */}
      <h1 className="text-xl font-extrabold tracking-[-0.3px] text-(--text-primary)">
        Add New Listing
      </h1>
      <p className="mt-1.5 max-w-105.25 text-sm leading-5.25 text-(--text-secondary)">
        Fill in your commercial space details to attract the right tenants.
      </p>

      {/* Step tabs */}
      <div className="mt-6 flex max-w-95 gap-1 rounded-full bg-(--bg-sunken) p-1">
        {steps.map((step) => {
          const isActive = step.key === activeStep;
          return (
            <button
              key={step.key}
              type="button"
              onClick={() => setActiveStep(step.key)}
              className={[
                "flex-1 rounded-full py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                isActive ?
                  "bg-(--bg-elevated) text-(--brand-primary) shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]"
                : "text-(--text-tertiary) hover:text-(--text-secondary)",
              ].join(" ")}>
              {step.label}
            </button>
          );
        })}
      </div>

      {/* Success banner */}
      {showSuccess && (
        <div className="mt-6 flex items-center gap-2.5 rounded-[10px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
          Listing added successfully! It&apos;s now live in the marketplace.
        </div>
      )}

      {/* Card */}
      <div className="mt-7 rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-7">
        {error && (
          <div className="mb-4.5 rounded-[10px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
            {error}
          </div>
        )}

        {activeStep === "basic" && (
          <div className="flex flex-col">
            {/* Listing Title */}
            <Field label="Listing Title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Prime Retail Unit – Al Olaya District"
                className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
              />
            </Field>

            {/* Category + Area */}
            <div className="mt-4.5 flex gap-2.5">
              <Field label="Category" className="flex-1">
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none focus:ring-2 focus:ring-(--border-focus)">
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-(--text-primary)" />
                </div>
              </Field>

              <Field label="Area (m²)" className="flex-1">
                <input
                  type="number"
                  value={areaSqm}
                  onChange={(e) => setAreaSqm(e.target.value)}
                  placeholder="e.g. 120"
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>
            </div>

            {/* City + District */}
            <div className="mt-4.5 flex gap-2.5">
              <Field label="City" className="flex-1">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Cairo"
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>

              <Field label="District" className="flex-1">
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. New Cairo"
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>
            </div>

            {/* Address */}
            <div className="mt-4.5">
              <Field label="Address">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Building / street-level detail, e.g. Building 12, Street 90"
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>
            </div>

            {/* Description */}
            <div className="mt-4.5">
              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your space, key selling points, nearby landmarks..."
                  rows={4}
                  className="w-full resize-none rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm leading-5.25 text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>
              <p className="mt-1 text-[11px] leading-4 text-(--text-tertiary)">
                Aim for at least 150 characters for better visibility.{" "}
                {description.length > 0 && `(${description.length})`}
              </p>
            </div>
          </div>
        )}

        {activeStep === "details" && (
          <div className="flex flex-col">
            {/* Amenities */}
            <div>
              <p className="text-[13px] font-semibold text-(--text-primary)">
                Amenities Available
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {amenities.map(({ code, label }) => {
                  const isChecked = selectedAmenities.has(code);
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => toggleAmenity(code)}
                      aria-pressed={isChecked}
                      className="flex items-center gap-1.5 rounded-full bg-(--bg-sunken) px-3 py-1.5 text-xs font-medium text-(--text-secondary) transition-colors cursor-pointer">
                      <span
                        className={[
                          "flex h-3.25 w-3.25 items-center justify-center rounded-xs border",
                          isChecked ?
                            "border-(--brand-accent) bg-(--brand-accent)"
                          : "border-[#767676] bg-(--bg-elevated)",
                        ].join(" ")}>
                        {isChecked && (
                          <Check
                            className="h-2.5 w-2.5 text-(--text-inverse)"
                            strokeWidth={3}
                          />
                        )}
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Number of Floors + Floor Number */}
            <div className="mt-4.5 flex gap-2.5">
              <Field label="Number of Floors" className="flex-1">
                <input
                  type="number"
                  value={numberOfFloors}
                  onChange={(e) => setNumberOfFloors(e.target.value)}
                  placeholder="1"
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>

              <Field label="Floor Number" className="flex-1">
                <input
                  type="number"
                  value={floorNumber}
                  onChange={(e) => setFloorNumber(e.target.value)}
                  placeholder="Ground floor = 0"
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>
            </div>

            {/* Available From + Minimum Lease Term */}
            <div className="mt-4.5 flex gap-2.5">
              <Field label="Available From" className="flex-1">
                <input
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>

              <Field label="Minimum Lease Term" className="flex-1">
                <input
                  type="text"
                  value={minLeaseTerm}
                  onChange={(e) => setMinLeaseTerm(e.target.value)}
                  placeholder="e.g. 1 year"
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>
            </div>
          </div>
        )}

        {activeStep === "media" && (
          <div className="flex flex-col">
            {/* Annual Rent */}
            <Field label="Annual Rent (EGP)">
              <input
                type="number"
                value={annualRent}
                onChange={(e) => setAnnualRent(e.target.value)}
                placeholder="e.g. 600000"
                className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
              />
              <p className="mt-1 text-[11px] leading-4 text-(--text-tertiary)">
                Excluding VAT. Tenants see the total price including 15% VAT.
              </p>
            </Field>

            {/* Security Deposit */}
            <div className="mt-4.5">
              <Field label="Security Deposit (months)">
                <input
                  type="number"
                  value={securityDepositMonths}
                  onChange={(e) => setSecurityDepositMonths(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full rounded-[10px] bg-(--bg-sunken) px-3.5 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-primary)/50 outline-none focus:ring-2 focus:ring-(--border-focus)"
                />
              </Field>
            </div>

            {/* Upload Photos */}
            <div className="mt-4.5">
              <p className="text-[13px] font-semibold text-(--text-primary)">
                Upload Photos
              </p>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragActive(true);
                }}
                onDragLeave={() => setIsDragActive(false)}
                onDrop={handleDrop}
                className={[
                  "mt-2.5 flex flex-col items-center rounded-[10px] border-2 border-dashed bg-(--bg-sunken) px-10 py-10 text-center transition-colors",
                  isDragActive ?
                    "border-(--brand-primary)"
                  : "border-(--border-base)",
                ].join(" ")}>
                <Image
                  width={10}
                  height={10}
                  src="https://i.postimg.cc/KzR9rHgh/image.png"
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-8 w-8"
                />
                <p className="mt-2.5 text-sm font-semibold text-(--text-primary)">
                  Drag &amp; drop photos here
                </p>
                <p className="mt-1 text-xs text-(--text-tertiary)">
                  PNG, JPG up to 20MB. Minimum 3 photos recommended.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  className="hidden"
                  onChange={(e) => addPhotos(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3.5 rounded-full border border-(--brand-primary-subtle) px-3.5 py-1.5 text-xs font-semibold text-(--brand-primary) transition-colors hover:bg-(--brand-primary-subtle) cursor-pointer">
                  Browse Files
                </button>
              </div>

              {photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {photos.map((photo, index) => (
                    <span
                      key={`${photo.name}-${index}`}
                      className="flex items-center gap-1.5 rounded-full bg-(--bg-sunken) px-3 py-1.5 text-xs font-medium text-(--text-secondary)">
                      {photo.name}
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        aria-label={`Remove ${photo.name}`}
                        className="cursor-pointer text-(--text-tertiary) hover:text-(--text-primary)">
                        <X className="h-3 w-3" strokeWidth={2} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-between border-t border-(--border-base) pt-5">
          <button
            type="button"
            onClick={goPrevious}
            disabled={isFirstStep || isSubmitting}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-(--text-secondary) opacity-50 transition-opacity disabled:cursor-not-allowed enabled:cursor-pointer enabled:opacity-100 enabled:hover:opacity-80">
            ← Previous
          </button>

          <button
            type="button"
            onClick={handlePrimaryAction}
            disabled={isSubmitting}
            className="rounded-full bg-(--brand-primary) px-5 py-2.5 text-sm font-semibold text-(--text-inverse) shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-(--brand-primary-hover) cursor-pointer disabled:cursor-not-allowed disabled:opacity-70">
            {isLastStep ?
              isSubmitting ?
                "Publishing…"
              : "🚀 Publish Listing"
            : "Next Step →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[13px] font-semibold text-(--text-primary)">
        {label}
      </label>
      {children}
    </div>
  );
}
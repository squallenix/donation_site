"use client";

import React, { useState } from "react";

import { useDonation } from "@/hooks/useDonation";
import { donationService } from "@/services/donationService";
import { DoubleChevronRight } from "@/imports/icons";

export function DonationModal() {
  const { isModalOpen, modalData } = useDonation();

  if (!isModalOpen) return null;

  return (
    <DonationModalDialog
      key={`${modalData?.campaignTitle}-${modalData?.initialAmount}`}
    />
  );
}

function DonationModalDialog() {
  const { closeDonationModal: closeModal, modalData, currency, showToast } = useDonation();
  const [frequency, setFrequency] = useState<"one-off" | "monthly">("one-off");
  const [amount, setAmount] = useState<number>(modalData?.initialAmount || 100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await donationService.processDonation({
        amount,
        currency,
        campaignTitle: modalData?.campaignTitle || "Emergency Appeal",
        frequency,
        donorName,
        donorEmail,
      });

      if (res.success) {
        showToast(
          `Alhamdulillah! Thank you for donating ${currency}${amount} to ${
            modalData?.campaignTitle || "SADAQAH BD"
          }. Transaction: ${res.transactionId}`
        );
        closeModal();
      }
    } catch {
      showToast("Donation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg my-auto max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 animate-in zoom-in-95 duration-200">
        {/* Header with yellow accent banner */}
        <div className="bg-[#0E1012] text-white p-6 sm:p-7 relative">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close donation modal"
          >
            ✕
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F6C400]">
            Emergency Donation
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-wide text-white mt-1">
            {modalData?.campaignTitle || "Palestine Emergency Appeal"}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Your generous gift directly provides immediate food, medicine, and clean shelter.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4 sm:space-y-5 overflow-y-auto">
          {/* Frequency Switcher */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-full">
            <button
              type="button"
              onClick={() => setFrequency("one-off")}
              className={`py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                frequency === "one-off"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              One-Off Gift
            </button>
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              className={`py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                frequency === "monthly"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              Give Monthly
            </button>
          </div>

          {/* Preset Amounts */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Select Amount ({currency})
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[50, 75, 100, 250].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handlePresetSelect(val)}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                    amount === val && !customAmount
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {currency}
                  {val}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="relative mt-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                {currency}
              </span>
              <input
                type="number"
                placeholder="Other Amount"
                value={customAmount}
                onChange={handleCustomChange}
                min="5"
                className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#F6C400]"
              />
            </div>
          </div>

          {/* Donor details */}
          <div className="space-y-3 pt-2">
            <input
              type="text"
              placeholder="Your Full Name (optional)"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#F6C400]"
            />
            <input
              type="email"
              required
              placeholder="Email address for receipt"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#F6C400]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || amount <= 0}
              className="w-full py-3.5 bg-[#F6C400] hover:bg-[#E5B300] active:scale-98 text-black font-bold text-sm sm:text-base rounded-full shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>
                {loading
                  ? "Processing..."
                  : `Donate ${currency}${amount} ${
                      frequency === "monthly" ? "/ month" : "Now"
                    }`}
              </span>
              <DoubleChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <p className="text-[11px] text-center text-zinc-400 mt-2.5">
              🔒 256-Bit SSL Encrypted & 100% Tax Deductible (where applicable)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

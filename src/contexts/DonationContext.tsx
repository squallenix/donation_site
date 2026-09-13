"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Currency = "$" | "£" | "€";

interface ModalData {
  campaignTitle?: string;
  initialAmount?: number;
}

interface DonationContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  isModalOpen: boolean;
  modalData: ModalData | null;
  openDonationModal: (data?: ModalData) => void;
  closeDonationModal: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("$");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openDonationModal = (data?: ModalData) => {
    setModalData(data || { campaignTitle: "Palestine Emergency Appeal", initialAmount: 100 });
    setIsModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsModalOpen(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <DonationContext.Provider
      value={{
        currency,
        setCurrency,
        isModalOpen,
        modalData,
        openDonationModal,
        closeDonationModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-zinc-700 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
}

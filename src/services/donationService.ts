export interface DonationPayload {
  amount: number;
  currency: string;
  campaignTitle: string;
  frequency: "one-off" | "monthly";
  donorEmail?: string;
  donorName?: string;
}

export const donationService = {
  async processDonation(_payload: DonationPayload): Promise<{ success: boolean; transactionId: string }> {
    void _payload;
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      transactionId: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    };
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      message: `Thank you! ${email} has been subscribed to SADAQAH BD updates.`,
    };
  },
};

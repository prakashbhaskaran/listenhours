// "If this helped you, pay whatever you can." No amount is ever pre-filled.
export function paymentHref(config) {
  const rzp = config?.razorpayUrl?.trim();
  if (rzp) return rzp;
  const upi = config?.upiId?.trim();
  if (upi) {
    // Keep "@" literal in the UPI ID; some UPI apps don't decode %40.
    const pa = encodeURIComponent(upi).replace(/%40/g, "@");
    return `upi://pay?pa=${pa}&pn=ListenHours&cu=INR&tn=Thank%20you`;
  }
  return null;
}

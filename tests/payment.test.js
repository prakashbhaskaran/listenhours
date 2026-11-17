import { test } from "node:test";
import assert from "node:assert/strict";
import { paymentHref } from "../js/lib/payment.js";

test("razorpay url wins", () => {
  assert.equal(paymentHref({ razorpayUrl: "https://rzp.io/l/x", upiId: "a@b" }), "https://rzp.io/l/x");
});
test("upi link has no amount", () => {
  const h = paymentHref({ razorpayUrl: "", upiId: "name@okbank" });
  assert.ok(h.startsWith("upi://pay?pa=name%40okbank") || h.startsWith("upi://pay?pa=name@okbank"));
  assert.ok(h.includes("cu=INR"));
  assert.ok(!h.includes("am="));
});
test("nothing configured gives null", () => {
  assert.equal(paymentHref({ razorpayUrl: "", upiId: "" }), null);
  assert.equal(paymentHref({ razorpayUrl: "  ", upiId: " " }), null);
  assert.equal(paymentHref(undefined), null);
});

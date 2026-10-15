/**
 * Standard monthly reducing-balance EMI:
 *   EMI = P x r x (1 + r)^n / ((1 + r)^n - 1)
 * where r is the annual rate / 1200 and n is the number of monthly instalments.
 */
export function calcEmi(principal, annualRate, years) {
  const n = Math.round(years * 12);
  if (!(principal > 0) || !(n > 0) || !(annualRate >= 0)) return 0;
  const r = annualRate / 1200;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  return (principal * r * growth) / (growth - 1);
}

/** Indian digit grouping, e.g. 12345678 -> ₹1,23,45,678 */
export function formatINR(value) {
  const n = Math.round(Number.isFinite(value) ? value : 0);
  const sign = n < 0 ? '-' : '';
  const digits = String(Math.abs(n));
  if (digits.length <= 3) return `${sign}₹${digits}`;
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${sign}₹${rest},${last3}`;
}

/** Everything the transfer calculator shows, for one set of inputs. */
export function compareTransfer({ principal, years, currentRate, newRate, costs }) {
  const months = Math.round(years * 12);
  const currentEmi = calcEmi(principal, currentRate, years);
  const newEmi = calcEmi(principal, newRate, years);
  const monthlyDiff = currentEmi - newEmi;
  const grossDiff = monthlyDiff * months;
  const net = grossDiff - (costs || 0);
  const recoveryMonths = monthlyDiff > 0 ? Math.ceil((costs || 0) / monthlyDiff) : null;
  return { months, currentEmi, newEmi, monthlyDiff, grossDiff, net, recoveryMonths };
}

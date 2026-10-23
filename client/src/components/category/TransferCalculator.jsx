'use client';

import { useId, useMemo, useState } from 'react';

import { compareTransfer, formatINR } from '@/lib/emi';

function Field({ id, label, value, onChange, min, max, step, suffix, hint }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20"
        />
        {suffix ? <span className="text-sm text-slate-500">{suffix}</span> : null}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export default function TransferCalculator({ initial, title = 'Balance transfer calculator' }) {
  const uid = useId();
  const [principal, setPrincipal] = useState(initial.amount);
  const [years, setYears] = useState(initial.years);
  const [currentRate, setCurrentRate] = useState(initial.currentRate);
  const [newRate, setNewRate] = useState(initial.newRate);
  const [costs, setCosts] = useState(initial.costs);

  const result = useMemo(() => {
    const p = Number(principal);
    const y = Number(years);
    const cr = Number(currentRate);
    const nr = Number(newRate);
    if (!(p > 0) || !(y > 0) || !(cr >= 0) || !(nr >= 0)) return null;
    return compareTransfer({ principal: p, years: y, currentRate: cr, newRate: nr, costs: Number(costs) || 0 });
  }, [principal, years, currentRate, newRate, costs]);

  const saving = result && result.monthlyDiff > 0;

  return (
    <section
      aria-labelledby={`${uid}-title`}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 id={`${uid}-title`} className="text-xl font-semibold text-slate-900 sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Compare your current loan with a proposed offer on the same outstanding balance and the same remaining tenure.
        Use today’s outstanding principal, not the original loan amount.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Field
          id={`${uid}-principal`}
          label="Outstanding principal (₹)"
          value={principal}
          onChange={setPrincipal}
          min={100000}
          step={50000}
        />
        <Field
          id={`${uid}-years`}
          label="Remaining tenure (years)"
          value={years}
          onChange={setYears}
          min={1}
          max={30}
          step={1}
          suffix="yrs"
        />
        <Field
          id={`${uid}-current`}
          label="Current interest rate (%)"
          value={currentRate}
          onChange={setCurrentRate}
          min={0}
          max={25}
          step={0.05}
          suffix="% p.a."
        />
        <Field
          id={`${uid}-new`}
          label="Proposed interest rate (%)"
          value={newRate}
          onChange={setNewRate}
          min={0}
          max={25}
          step={0.05}
          suffix="% p.a."
        />
        <Field
          id={`${uid}-costs`}
          label="One-time switching costs (₹)"
          value={costs}
          onChange={setCosts}
          min={0}
          step={5000}
          hint="Processing, legal, valuation and closure costs from actual quotations."
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Current EMI</p>
          <p className="mt-2 text-xl font-bold text-slate-900">{result ? formatINR(result.currentEmi) : ' - '}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Proposed EMI</p>
          <p className="mt-2 text-xl font-bold text-slate-900">{result ? formatINR(result.newEmi) : ' - '}</p>
        </div>
        <div className="rounded-2xl bg-[var(--primary-blue-dark)] p-5 text-white">
          <p className="text-xs uppercase tracking-wider text-white/70">Monthly difference</p>
          <p className="mt-2 text-xl font-bold">{result ? formatINR(result.monthlyDiff) : ' - '}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Net benefit after costs</p>
          <p className="mt-2 text-xl font-bold text-slate-900">{result ? formatINR(result.net) : ' - '}</p>
        </div>
      </div>

      {result ? (
        <p className="mt-5 text-sm leading-6 text-slate-700">
          {saving ? (
            <>
              Over {result.months} months, the scheduled payments differ by about {formatINR(result.grossDiff)}. Simple
              cost recovery takes about {result.recoveryMonths} month{result.recoveryMonths === 1 ? '' : 's'}. If you
              expect to close or sell before then, the transfer may not pay back its costs.
            </>
          ) : (
            <>
              At these inputs the proposed EMI is not lower than your current EMI, so the simple cost-recovery measure
              does not apply. Check the rates and tenure you entered.
            </>
          )}
        </p>
      ) : (
        <p className="mt-5 text-sm text-slate-500">Enter the loan details to see the comparison.</p>
      )}

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Illustrative nominal comparison using monthly reducing-balance repayment and constant rates. It excludes taxes not
        included in costs, insurance, prepayments, top-ups and future rate changes, does not discount future savings and
        does not confirm eligibility or a lender offer.
      </p>
    </section>
  );
}

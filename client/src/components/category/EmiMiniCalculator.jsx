'use client';

import { useId, useMemo, useState } from 'react';

import { calcEmi, formatINR } from '@/lib/emi';

function NumberField({ id, label, value, onChange, min, max, step, suffix }) {
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
      <input
        aria-label={`${label} slider`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value === '' ? min : Math.min(Math.max(value, min), max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--primary-blue)]"
      />
    </div>
  );
}

export default function EmiMiniCalculator({ initial, title = 'EMI calculator' }) {
  const uid = useId();
  const [amount, setAmount] = useState(initial.amount);
  const [rate, setRate] = useState(initial.rate);
  const [years, setYears] = useState(initial.years);

  const result = useMemo(() => {
    const p = Number(amount);
    const r = Number(rate);
    const y = Number(years);
    if (!(p > 0) || !(y > 0) || !(r >= 0)) return null;
    const emi = calcEmi(p, r, y);
    const total = emi * Math.round(y * 12);
    return { emi, total, interest: total - p, principalShare: Math.min(100, Math.max(0, (p / total) * 100)) };
  }, [amount, rate, years]);

  return (
    <section
      aria-labelledby={`${uid}-title`}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 id={`${uid}-title`} className="text-xl font-semibold text-slate-900 sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Change the amount, rate and tenure to see an illustrative monthly payment. Use the rate from a written lender
        quotation when you have one.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <NumberField
          id={`${uid}-amount`}
          label="Loan amount (₹)"
          value={amount}
          onChange={setAmount}
          min={100000}
          max={100000000}
          step={50000}
        />
        <NumberField
          id={`${uid}-rate`}
          label="Annual interest rate (%)"
          value={rate}
          onChange={setRate}
          min={5}
          max={20}
          step={0.05}
          suffix="% p.a."
        />
        <NumberField
          id={`${uid}-years`}
          label="Tenure (years)"
          value={years}
          onChange={setYears}
          min={1}
          max={30}
          step={1}
          suffix="yrs"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-2xl bg-[var(--primary-blue-dark)] p-5 text-white">
          <p className="text-xs uppercase tracking-wider text-white/70">Monthly EMI</p>
          <p className="mt-2 text-2xl font-bold">{result ? formatINR(result.emi) : '—'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Total interest</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{result ? formatINR(result.interest) : '—'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Total repayment</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{result ? formatINR(result.total) : '—'}</p>
        </div>
      </div>

      {result ? (
        <div className="mt-5">
          <div className="flex h-3 overflow-hidden rounded-full bg-slate-200" role="img" aria-label="Share of principal and interest">
            <div className="bg-[var(--primary-blue)]" style={{ width: `${result.principalShare}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Principal {Math.round(result.principalShare)}%</span>
            <span>Interest {Math.round(100 - result.principalShare)}%</span>
          </div>
        </div>
      ) : (
        <p className="mt-5 text-sm text-slate-500">Enter a loan amount, rate and tenure to see the estimate.</p>
      )}

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Illustrative estimate using monthly reducing-balance repayment and a constant rate. It excludes fees, taxes,
        insurance, prepayments and future rate changes, and is not a lender offer. Your lender&apos;s schedule is the
        reference for your account.
      </p>
    </section>
  );
}

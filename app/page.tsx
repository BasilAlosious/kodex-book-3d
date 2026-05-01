'use client';

import BookCanvas from '@/components/BookCanvas';

function IconReport() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconCoin() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconTrend() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function Tick() {
  return (
    <svg className="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Page() {
  return (
    <div className="page-bg">
      <div className="layout">
        <section className="col-left">
          <div className="eyebrow">
            <IconReport />
            <span>Report</span>
            <span className="dot">//</span>
            <span>Custom ROI Analysis</span>
          </div>

          <h1>How much is your law enforcement request program really costing you?</h1>

          <p className="subtitle">
            Custom math on what you're spending, and what you can reclaim.
          </p>

          <hr className="rule" />

          <p className="section-label">What you'll see</p>

          <ul className="findings">
            <li>
              <IconSearch />
              <span>
                <span className="label">Where your team's hours are going.</span>{' '}
                A breakdown of the time cost per request, and how much of it is
                realistically automatable today.
              </span>
            </li>
            <li>
              <IconCoin />
              <span>
                <span className="label">What you're leaving on the table.</span>{' '}
                A line-by-line estimate of the federal reimbursements your
                organization can claim but probably isn't.
              </span>
            </li>
            <li>
              <IconTrend />
              <span>
                <span className="label">Where this goes in three years.</span>{' '}
                A projection of cost, headcount, and recovery as request volume
                scales, so you can plan for it instead of being caught off-guard
                by it.
              </span>
            </li>
          </ul>

          <p className="section-label">Summary</p>

          <div className="summary">
            <p>
              Most legal ops teams running lawful data requests are stuck on
              spreadsheets and email threads. It works, until volume doubles, an
              audit lands, or you realize you've been leaving federal
              reimbursements on the table for years.
            </p>
          </div>
        </section>

        <aside className="col-right">
          <div className="book-stage">
            <BookCanvas />
            <span className="corner-tag">CLOC 2026</span>
          </div>

          <form className="form-card" onSubmit={(e) => e.preventDefault()}>
            <span className="index-tag">01 / REPORT</span>
            <h2>Tell us about your program.</h2>

            <div className="field">
              <label htmlFor="company">Company Name*</label>
              <input id="company" name="company" type="text" required />
            </div>

            <div className="field">
              <label htmlFor="requests">Annual Lawful Data Requests*</label>
              <input id="requests" name="requests" type="number" min={0} required />
            </div>

            <div className="field">
              <label htmlFor="civil">Percent of Requests that are Civil*</label>
              <input id="civil" name="civil" type="number" min={0} max={100} required />
              <span className="helper">Enter an integer (e.g. 50 for 50%)</span>
            </div>

            <div className="field">
              <label htmlFor="ftes">Team Size / FTEs Handling Requests*</label>
              <input id="ftes" name="ftes" type="number" min={0} step="0.5" required />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="first">First name*</label>
                <input id="first" name="first" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="last">Last name*</label>
                <input id="last" name="last" type="text" required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Business Email*</label>
              <input id="email" name="email" type="email" required />
            </div>

            <label className="consent">
              <input type="checkbox" required />
              <span>
                I'd like to receive occasional updates from Kodex. See our{' '}
                <a href="#privacy">Privacy Policy</a>.
              </span>
            </label>

            <button type="submit" className="submit">Run my numbers</button>

            <div className="checkmarks">
              <span><Tick /> Specific to your numbers</span>
            </div>
          </form>
        </aside>
      </div>

      <footer className="site-footer">© Kodex · CLOC 2026</footer>
    </div>
  );
}

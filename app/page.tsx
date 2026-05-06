'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// R3F has internals that don't survive Next.js prerender — load client-only
// so the build doesn't try to evaluate the WebGL canvas on the server.
const BookCanvas = dynamic(() => import('@/components/BookCanvas'), {
  ssr: false,
  loading: () => null,
});

type HubSpotFormsApi = {
  forms: {
    create: (options: {
      portalId: string;
      formId: string;
      region: string;
      target: string;
    }) => void;
  };
};

declare global {
  interface Window {
    hbspt?: HubSpotFormsApi;
  }
}

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

function HubSpotForm() {
  useEffect(() => {
    const target = document.getElementById('hubspot-roi-form');
    if (!target) return undefined;

    const createForm = () => {
      if (!window.hbspt?.forms) return;

      target.innerHTML = '';
      window.hbspt.forms.create({
        portalId: '44165336',
        formId: 'ec1acf40-2eb0-4db5-abed-c65da1ed18b9',
        region: 'na1',
        target: '#hubspot-roi-form',
      });
    };

    if (window.hbspt?.forms) {
      createForm();
      return () => {
        target.innerHTML = '';
      };
    }

    const scriptSrc = 'https://js.hsforms.net/forms/embed/v2.js';
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptSrc}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener('load', createForm);
      return () => {
        existingScript.removeEventListener('load', createForm);
        target.innerHTML = '';
      };
    }

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', createForm);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', createForm);
      target.innerHTML = '';
    };
  }, []);

  return <div id="hubspot-roi-form" className="hubspot-form" />;
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

          <h1>A custom ROI report for your law enforcement request program.</h1>

          <p className="subtitle">
            See what your law enforcement request program is actually costing you.
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

          <div className="form-card">
            <span className="index-tag">01 / REPORT</span>
            <h2>Tell us about your program.</h2>
            <HubSpotForm />
          </div>
        </aside>
      </div>

      <footer className="site-footer">© Kodex · CLOC 2026</footer>
    </div>
  );
}

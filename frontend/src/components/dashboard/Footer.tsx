import React from 'react';

export const Footer: React.FC = () => {
  return (
    // footer-region token: bg canvas, text charcoal, typography body-sm, border 1px solid hairline
    <footer className="w-full bg-canvas border-t border-hairline py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 pb-12 border-b border-hairline text-[14px]">
          {/* Col 1 */}
          <div className="space-y-3">
            <h5 className="font-semibold text-charcoal">Product</h5>
            <ul className="space-y-2 text-steel">
              <li><a href="#" className="hover:text-ink">Overview</a></li>
              <li><a href="#" className="hover:text-ink">Budget Guardrails</a></li>
              <li><a href="#" className="hover:text-ink">AI Insights</a></li>
              <li><a href="#" className="hover:text-ink">Pricing</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h5 className="font-semibold text-charcoal">Solutions</h5>
            <ul className="space-y-2 text-steel">
              <li><a href="#" className="hover:text-ink">Personal Budgeting</a></li>
              <li><a href="#" className="hover:text-ink">Freelancers</a></li>
              <li><a href="#" className="hover:text-ink">Startups</a></li>
              <li><a href="#" className="hover:text-ink">Small Teams</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h5 className="font-semibold text-charcoal">Resources</h5>
            <ul className="space-y-2 text-steel">
              <li><a href="#" className="hover:text-ink">Financial Templates</a></li>
              <li><a href="#" className="hover:text-ink">Help Center</a></li>
              <li><a href="#" className="hover:text-ink">Community</a></li>
              <li><a href="#" className="hover:text-ink">Webinars</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h5 className="font-semibold text-charcoal">Notion For</h5>
            <ul className="space-y-2 text-steel">
              <li><a href="#" className="hover:text-ink">Enterprise</a></li>
              <li><a href="#" className="hover:text-ink">Small Business</a></li>
              <li><a href="#" className="hover:text-ink">Personal</a></li>
              <li><a href="#" className="hover:text-ink">Educators</a></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="space-y-3">
            <h5 className="font-semibold text-charcoal">Company</h5>
            <ul className="space-y-2 text-steel">
              <li><a href="#" className="hover:text-ink">About Us</a></li>
              <li><a href="#" className="hover:text-ink">Careers</a></li>
              <li><a href="#" className="hover:text-ink">Security</a></li>
              <li><a href="#" className="hover:text-ink">Contact Sales</a></li>
            </ul>
          </div>

          {/* Col 6 */}
          <div className="space-y-3">
            <h5 className="font-semibold text-charcoal">Legal</h5>
            <ul className="space-y-2 text-steel">
              <li><a href="#" className="hover:text-ink">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-ink">Terms of Service</a></li>
              <li><a href="#" className="hover:text-ink">Status</a></li>
              <li><a href="#" className="hover:text-ink">Cookie Settings</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-ink-deep text-white flex items-center justify-center font-bold text-xs">
              N
            </div>
            <span>© 2025 Notion Labs, Inc. Inspired Design System.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Built with React + Tailwind + TypeScript</span>
            <span className="text-stone">Notion Sans Typographic Scale</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DEMO_FAQS } from "@/constants/mockData";
import {
  HelpCircle,
  PhoneCall,
  Mail,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const SupportView = () => {
  const { t } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Quality Testing & Mandi Weighment",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "Quality Testing & Mandi Weighment",
        message: ""
      });
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>24/7 Kisan Help Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-serif">
          {t.support.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t.support.subtitle}
        </p>
      </div>

      {/* Kisan Emergency Helpline Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            {t.support.helplineTitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
            {t.support.helplineNum}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-md">
            Direct assistance for mandi arrivals, cold storage coordination, and crop disputes.
          </p>
        </div>

        <Button
          size="lg"
          data-testid="call-helpline-btn"
          onClick={() => alert("Dialing Kisan Toll-Free Demo: 1800-180-1551")}
          className="bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-6 rounded-xl shadow-md text-xs sm:text-sm shrink-0"
        >
          <PhoneCall className="w-4 h-4 mr-2" />
          Call Kisan Support (Demo)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left: Frequently Asked Questions */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            {t.support.faqTitle}
          </h3>

          <div className="space-y-3">
            {DEMO_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  data-testid={`faq-item-${idx}`}
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left font-bold text-sm text-foreground flex items-center justify-between gap-3 hover:bg-muted/40"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3 bg-muted/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Demo Support Contact Form */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600" />
            {t.support.contactTitle}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4"
          >
            {submitted ? (
              <div
                data-testid="support-submitted-alert"
                className="py-8 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-foreground text-base">Inquiry Submitted</h4>
                <p className="text-xs text-muted-foreground">
                  Your demo request has been logged. An agricultural advisor will follow up.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    {t.support.name} *
                  </label>
                  <input
                    type="text"
                    data-testid="support-name-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Subhash Mondal"
                    className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    {t.support.email} *
                  </label>
                  <input
                    type="email"
                    data-testid="support-email-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="farmer@example.com"
                    className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    {t.support.subject}
                  </label>
                  <select
                    data-testid="support-subject-select"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none"
                  >
                    <option value="Quality Testing & Mandi Weighment">Quality Testing & Mandi Weighment</option>
                    <option value="Consignment & Demo Escrow">Consignment & Demo Escrow</option>
                    <option value="Listing Produce Assistance">Listing Produce Assistance</option>
                    <option value="Interstate Transportation">Interstate Transportation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    {t.support.message} *
                  </label>
                  <textarea
                    rows="3"
                    data-testid="support-message-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Explain your mandi inquiry or dispute details..."
                    className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <Button
                  type="submit"
                  data-testid="support-submit-btn"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/20"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  {t.support.submit}
                </Button>
              </>
            )}
          </form>
        </div>

      </div>

    </div>
  );
};

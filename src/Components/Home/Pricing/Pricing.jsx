import React, { useState } from "react";
import "./Pricing.css";

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      icon: "🎬",
      description: "Perfect for getting started",
      features: [
        "AI Video Generation (20 videos/month)",
        "Basic Video Editing",
        "Stock Video Library",
        "Export in 720p",
        "Community Support"
      ],
      button: "Get Started",
      popular: false,
      color: "#64748b"
    },
    {
      name: "Pro",
      price: { monthly: 12.99, yearly: 9.99 },
      icon: "🚀",
      description: "For content creators",
      features: [
        "Unlimited AI Video Generation",
        "Advanced Video Editing",
        "4K Stock Video Library",
        "Export in 1080p/4K",
        "Priority Support",
        "No Watermark",
        "Custom Text & Effects"
      ],
      button: "Start Pro Trial",
      popular: true,
      color: "#a855f7"
    },
    {
      name: "Enterprise",
      price: { monthly: 49.99, yearly: 39.99 },
      icon: "🏢",
      description: "For teams & businesses",
      features: [
        "Everything in Pro",
        "Team Collaboration",
        "API Access",
        "Custom Branding",
        "Dedicated Support",
        "SLA Guarantee",
        "On-premise Deployment"
      ],
      button: "Contact Sales",
      popular: false,
      color: "#ec489a"
    }
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>💰 Simple Pricing</h1>
        <p>Choose the plan that works for you</p>
        
        <div className="billing-toggle">
          <button className={billing === "monthly" ? "active" : ""} onClick={() => setBilling("monthly")}>
            Monthly
          </button>
          <button className={billing === "yearly" ? "active" : ""} onClick={() => setBilling("yearly")}>
            Yearly <span className="save-badge">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.popular ? "popular" : ""}`}>
            {plan.popular && <div className="popular-badge">🔥 Most Popular</div>}
            
            <div className="plan-icon">{plan.icon}</div>
            <h2>{plan.name}</h2>
            <div className="plan-price">
              <span className="currency">$</span>
              <span className="price">{plan.price[billing]}</span>
              <span className="period">/{billing === "monthly" ? "mo" : "yr"}</span>
            </div>
            <p className="plan-description">{plan.description}</p>
            
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>✅ {feature}</li>
              ))}
            </ul>
            
            <button className="plan-btn" style={{ background: plan.popular ? `linear-gradient(135deg, #a855f7, #7c3aed)` : `rgba(255,255,255,0.1)` }}>
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      <div className="pricing-footer">
        <p>🎉 All plans include 14-day free trial • No credit card required</p>
      </div>
    </div>
  );
};

export default Pricing;
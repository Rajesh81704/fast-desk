import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link href="/" className="brand-logo">
          <img src="/assets/logo.png" alt="FastDesk Logo" />
          <span>FastDesk</span>
        </Link>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#showcase">Product</a></li>
          <li><a href="#status">API Status</a></li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><a href="/docs" target="_blank" rel="noopener noreferrer">Swagger API Docs</a></li>
        </ul>
        <div>
          <a href="/docs" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Explore API Docs &rarr;
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="badge">
          <span>⚡ Meta WhatsApp Cloud API v21.0 Engine</span>
        </div>
        <h1 className="hero-title">
          Powering Real-Time <span>WhatsApp Messaging</span> for Developers
        </h1>
        <p className="hero-subtitle">
          FastDesk provides an enterprise-grade, lightweight FastAPI &amp; Next.js backend foundation 
          for Meta WhatsApp Webhooks, challenge verification, and instant message routing.
        </p>
        <div className="hero-actions">
          <a href="/docs" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Interactive Swagger UI
          </a>
          <a href="#status" className="btn-secondary">
            Verify Live Webhook
          </a>
        </div>

        {/* Hero Showcase Banner */}
        <div className="banner-wrapper">
          <img 
            src="/assets/banner.png" 
            alt="FastDesk Platform Banner" 
            className="banner-img" 
          />
        </div>
      </section>

      {/* Feature Section */}
      <section id="features">
        <h2 className="section-title">Engineered for Performance &amp; Security</h2>
        <p className="section-subtitle">Everything you need to build production WhatsApp customer applications.</p>
        
        <div className="features-grid">
          <div className="card">
            <div className="card-icon">⚡</div>
            <h3 className="card-title">Instant Webhook Verification</h3>
            <p className="card-text">
              Fully compliant Meta Graph API challenge handling (`hub.challenge` &amp; `hub.verify_token`) returning HTTP 200 responses instantly.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🔒</div>
            <h3 className="card-title">Zero Token Leaks</h3>
            <p className="card-text">
              Built-in credential masking and sanitized logging. Access tokens (`WHATSAPP_ACCESS_TOKEN`) are never logged or exposed.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🚀</div>
            <h3 className="card-title">Vercel &amp; Serverless Ready</h3>
            <p className="card-text">
              Zero-config deployment with ASGI path middleware ensuring flawless execution locally and in serverless environments.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">📊</div>
            <h3 className="card-title">OpenAPI 3.0 &amp; Swagger</h3>
            <p className="card-text">
              Interactive OpenAPI documentation available out of the box at `/docs` and `/redoc` with full Pydantic schemas.
            </p>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="showcase">
        <div className="showcase-section">
          <div>
            <div className="badge">
              <span>Platform Interface</span>
            </div>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Complete Control Over WhatsApp Workflows
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              FastDesk handles raw incoming WhatsApp message payloads, delivery receipts, and status updates, 
              providing clean Python services for outbound Meta messaging.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--success-color)" }}>✓</span> Safe event extraction (Message ID, Sender ID, Timestamps)
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--success-color)" }}>✓</span> Outbound Graph API message sender helper
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--success-color)" }}>✓</span> Custom exceptions with HTTP 400/403/500 handlers
              </li>
            </ul>
          </div>
          <div className="showcase-img-container">
            <img 
              src="/assets/fastdesk.png" 
              alt="FastDesk Interface Showcase" 
              className="showcase-img" 
            />
          </div>
        </div>
      </section>

      {/* System Status Section */}
      <section id="status" style={{ marginBottom: "5rem" }}>
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <div className="status-badge" style={{ marginBottom: "1rem" }}>
            <span className="status-dot"></span>
            System Operational
          </div>
          <h2 style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>
            Production Webhook Endpoint
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Meta App Dashboard Callback URL:
          </p>
          <code style={{ 
            background: "rgba(0,0,0,0.5)", 
            padding: "0.75rem 1.5rem", 
            borderRadius: "8px", 
            color: "#a5b4fc",
            fontFamily: "monospace",
            fontSize: "1rem",
            display: "inline-block"
          }}>
            https://api.fastdesk.in/webhook/whatsapp
          </code>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/assets/logo.png" alt="FastDesk Logo" style={{ height: "24px" }} />
          <span>© {new Date().getFullYear()} FastDesk Inc. All rights reserved.</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Privacy Policy</Link>
          <div className="status-badge">
            <span className="status-dot"></span>
            FastAPI Engine Online
          </div>
        </div>
      </footer>
    </div>
  );
}

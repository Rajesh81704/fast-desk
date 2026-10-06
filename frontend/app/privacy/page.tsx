import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FastDesk Multi-Tenant WhatsApp Engine",
  description: "Comprehensive Privacy Policy for FastDesk explaining how our multi-tenant SaaS platform collects, resolves, processes, discloses, and protects WhatsApp end-user data, WABA integrations, CRM, and AI workflows.",
};

export default function PrivacyPolicy() {
  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link href="/" className="brand-logo">
          <img src="/assets/logo.png" alt="FastDesk Logo" />
          <span>FastDesk</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><a href="/#features">Features</a></li>
          <li><a href="/#showcase">Product</a></li>
          <li><Link href="/privacy" style={{ color: "var(--text-main)" }}>Privacy Policy</Link></li>
          <li><a href="/docs" target="_blank" rel="noopener noreferrer">API Docs</a></li>
        </ul>
        <div>
          <Link href="/" className="btn-secondary">
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="hero" style={{ padding: "3.5rem 0 2rem 0", textAlign: "center" }}>
        <div className="badge">
          <span>🔒 Legal &amp; Data Governance Statement</span>
        </div>
        <h1 className="hero-title" style={{ fontSize: "2.8rem" }}>
          Privacy <span>Policy</span>
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: "800px" }}>
          This Privacy Policy details how FastDesk, as a multi-tenant enterprise engine for Meta WhatsApp Cloud API, 
          uses, discloses, processes, and manages user data across business tenants, webhooks, CRM systems, and AI engines.
        </p>

        {/* Meta App Review Special Compliance Banner */}
        <div className="meta-review-box">
          <div className="meta-review-icon">🛡️</div>
          <div style={{ textAlign: "left" }}>
            <div className="meta-review-title">Meta App Review Compliance Notice</div>
            <div className="meta-review-quote">
              &ldquo;We&apos;ll use this to understand how your app uses, discloses and manages user data.&rdquo;
            </div>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#cbd5e1" }}>
              This policy explicitly documents data ingestion via Meta WhatsApp Webhooks, tenant resolution mechanisms, 
              downstream processing in CRMs and AI tools, and full compliance with Meta Developer Policies and Meta Business Terms.
            </p>
          </div>
        </div>
      </header>

      {/* Interactive Visual Data Architecture Diagram */}
      <section className="arch-visualizer">
        <div className="arch-header">
          <div className="arch-title">
            <span>🌐 FastDesk Multi-Tenant Data Flow Architecture</span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
            Visual mapping of end-to-end data lineage from WhatsApp End-Users to Business CRM and AI tools.
          </p>
        </div>

        <div className="arch-diagram">
          {/* Root Level */}
          <div className="arch-node arch-node-root">
            <strong style={{ color: "#ffffff", fontSize: "1.1rem" }}>FASTDESK</strong>
            <div style={{ fontSize: "0.85rem", color: "#a5b4fc" }}>Multi-Tenant SaaS Infrastructure Platform</div>
          </div>

          <div className="arch-arrow">↓</div>

          {/* Tenants Tier */}
          <div className="arch-tenants-grid">
            <div className="tenant-box">
              <div className="tenant-title">Business A</div>
              <div className="tenant-flow-steps">
                <div className="tenant-step">📱 WhatsApp A</div>
                <div className="tenant-step">🔑 WABA A (Phone ID #1)</div>
              </div>
            </div>

            <div className="tenant-box">
              <div className="tenant-title">Business B</div>
              <div className="tenant-flow-steps">
                <div className="tenant-step">📱 WhatsApp B</div>
                <div className="tenant-step">🔑 WABA B (Phone ID #2)</div>
              </div>
            </div>

            <div className="tenant-box">
              <div className="tenant-title">Business C</div>
              <div className="tenant-flow-steps">
                <div className="tenant-step">📱 WhatsApp C</div>
                <div className="tenant-step">🔑 WABA C (Phone ID #3)</div>
              </div>
            </div>
          </div>

          <div className="arch-arrow">↓</div>

          {/* Webhook Layer */}
          <div className="arch-node arch-node-webhook">
            <strong style={{ color: "#38bdf8" }}>FastDesk Webhook Ingestion Engine</strong>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Meta Graph API Callback Handler (`/webhook/whatsapp`)</div>
          </div>

          <div className="arch-arrow">↓</div>

          {/* Tenant Resolver */}
          <div className="arch-node arch-node-resolver">
            <strong style={{ color: "#f472b6" }}>Deterministic Tenant Resolver</strong>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Isolates &amp; Maps Payload to Tenant ID via Phone Number ID &amp; WABA Meta Context</div>
          </div>

          <div className="arch-arrow">↓</div>

          {/* Split Tier */}
          <div className="arch-split-grid">
            <div className="split-card">
              <div className="split-card-title split-card-crm">
                <span>📊 CRM Systems</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                Customer records, conversation logs, message status receipts (`sent`, `delivered`, `read`), ticket management.
              </p>
            </div>

            <div className="split-card">
              <div className="split-card-title split-card-ai">
                <span>🤖 AI &amp; NLP Engines</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                Automated customer assistance, intent recognition, real-time response generation, and agent workflow suggestions.
              </p>
            </div>
          </div>

          <div className="arch-arrow">↓</div>

          {/* Outbound Business Tools */}
          <div className="arch-node" style={{ borderColor: "#10b981", background: "rgba(16, 185, 129, 0.1)" }}>
            <strong style={{ color: "#34d399" }}>Connected Business Tools &amp; Meta API Dispatch</strong>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>ERP, Outbound WhatsApp Messages, Webhooks, Helpdesks</div>
          </div>
        </div>
      </section>

      {/* Legal Document Layout */}
      <div className="legal-container">
        {/* Table of Contents Sidebar */}
        <aside className="legal-sidebar">
          <div className="sidebar-title">Table of Contents</div>
          <nav>
            <ul className="toc-list">
              <li><a href="#overview" className="toc-link">1. Platform Overview &amp; Roles</a></li>
              <li><a href="#data-collected" className="toc-link">2. Data We Process</a></li>
              <li><a href="#processing-flow" className="toc-link">3. Architecture &amp; Data Flow</a></li>
              <li><a href="#data-use" className="toc-link">4. How Data Is Used</a></li>
              <li><a href="#data-disclosure" className="toc-link">5. Data Disclosure &amp; Third Parties</a></li>
              <li><a href="#meta-compliance" className="toc-link">6. Meta Cloud API Compliance</a></li>
              <li><a href="#tenant-isolation" className="toc-link">7. Multi-Tenant Isolation &amp; Security</a></li>
              <li><a href="#retention" className="toc-link">8. Data Retention &amp; Erasure</a></li>
              <li><a href="#end-user-rights" className="toc-link">9. User Rights &amp; Responsibilities</a></li>
              <li><a href="#contact" className="toc-link">10. Contact Information</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Body */}
        <main className="legal-body">
          {/* Section 1 */}
          <section id="overview" className="legal-section">
            <h2>1. Platform Overview &amp; Data Roles</h2>
            <p>
              <strong>FastDesk Inc.</strong> (&ldquo;FastDesk&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates a high-performance multi-tenant Software-as-a-Service (SaaS) infrastructure designed for integrating, processing, and routing data between <strong>Meta WhatsApp Cloud API (WhatsApp Business Accounts / WABA)</strong>, customer enterprise software, and artificial intelligence models.
            </p>
            <p>
              To ensure legal transparency under global privacy frameworks including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA/CPRA), and Meta Platform Terms:
            </p>
            <ul>
              <li>
                <strong>Business Tenants (Data Controllers):</strong> Independent businesses (e.g., Business A, Business B, Business C) that deploy FastDesk to connect their Meta WhatsApp Business Accounts (WABA) act as the primary <em>Data Controllers</em> for end-user communications.
              </li>
              <li>
                <strong>FastDesk Platform (Data Processor / Service Provider):</strong> FastDesk acts as a <em>Data Processor</em>, ingesting webhooks via our central endpoint, resolving business tenant boundaries, and executing automated workflows strictly in accordance with tenant instructions.
              </li>
              <li>
                <strong>Meta Platforms, Inc. (Channel Provider):</strong> End-user messages originalize on Meta&apos;s WhatsApp network and transit through Meta Cloud API servers (`graph.facebook.com`).
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section id="data-collected" className="legal-section">
            <h2>2. Data We Collect and Process</h2>
            <p>
              FastDesk processes categories of data strictly required to execute real-time WhatsApp message routing, tenant authorization, AI analysis, and CRM sync.
            </p>

            <div className="data-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Data Category</th>
                    <th>Specific Data Elements</th>
                    <th>Primary Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>WhatsApp End-User Data</strong></td>
                    <td>Phone number, WhatsApp Display Name (`profile.name`), WhatsApp Message ID (`wamid`), message content (text, audio, media, documents), timestamps, delivery statuses (`sent`, `delivered`, `read`), reaction events.</td>
                    <td>Routing messages, rendering conversation logs, feeding AI responses, and updating CRM ticket records.</td>
                  </tr>
                  <tr>
                    <td><strong>Business Tenant Credentials</strong></td>
                    <td>Meta Business Manager ID, WABA ID, Phone Number ID, encrypted System User Access Tokens (`WHATSAPP_ACCESS_TOKEN`), Webhook Verification Tokens (`hub.verify_token`).</td>
                    <td>Authenticating outbound Graph API requests and verifying inbound Meta webhook challenges.</td>
                  </tr>
                  <tr>
                    <td><strong>Technical &amp; Telemetry Data</strong></td>
                    <td>IP addresses, HTTP headers (`X-Hub-Signature-256`), request payload size, API execution latency, webhook event type, error diagnostic logs.</td>
                    <td>Webhook security verification, rate limiting, system debugging, and fraud prevention.</td>
                  </tr>
                  <tr>
                    <td><strong>Tenant Admin Data</strong></td>
                    <td>Business contact email, tenant account settings, API keys, webhook subscription preferences.</td>
                    <td>Managing SaaS subscription accounts, access control, and sending operational notifications.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="callout callout-info">
              💡 <strong>Zero Sensitive Credentials Logging:</strong> FastDesk enforces automated credential sanitization. Access tokens, secret keys, and raw authentication headers are never written to application logs or exposed to frontend components.
            </div>
          </section>

          {/* Section 3 */}
          <section id="processing-flow" className="legal-section">
            <h2>3. Multi-Tenant Architecture &amp; Data Flow</h2>
            <p>
              Our processing pipeline maps explicitly to our operational business model. Below is the step-by-step breakdown of how user data transits through FastDesk:
            </p>
            <ol>
              <li>
                <strong>Ingestion via FastDesk Webhook:</strong> When a WhatsApp user messages Business A, Business B, or Business C, Meta Cloud API dispatches an encrypted HTTP POST webhook to FastDesk&apos;s centralized endpoint (`https://api.fastdesk.in/webhook/whatsapp`).
              </li>
              <li>
                <strong>Tenant Resolver Isolation:</strong> Upon receipt, the FastDesk <em>Tenant Resolver</em> inspects the incoming payload&apos;s Meta `phone_number_id` and WABA metadata. It deterministically resolves the exact business tenant context to ensure complete data separation between Business A, Business B, and Business C.
              </li>
              <li>
                <strong>CRM Synchronization:</strong> Resolved customer interactions (contact numbers, conversation history, delivery receipts) are dispatched to the tenant&apos;s designated Customer Relationship Management (CRM) system (e.g., Salesforce, HubSpot, or custom enterprise DBs).
              </li>
              <li>
                <strong>AI &amp; Automation Engine Processing:</strong> Where enabled by the business tenant, message content is routed to AI engines (natural language processing, intent models, automated customer support agents) to generate real-time automated responses or assist human agents.
              </li>
              <li>
                <strong>Business Tools &amp; Meta API Dispatch:</strong> Formulated replies or triggered workflow actions are sent back through Meta&apos;s WhatsApp Cloud API endpoint to reach the end-user&apos;s WhatsApp client.
              </li>
            </ol>
          </section>

          {/* Section 4 */}
          <section id="data-use" className="legal-section">
            <h2>4. How We Use User Data</h2>
            <p>
              FastDesk uses collected data exclusively to operate, maintain, and provide the multi-tenant SaaS messaging services described in this policy. Specific use cases include:
            </p>
            <ul>
              <li><strong>Executing Real-Time Messaging:</strong> Transporting incoming WhatsApp messages to business dashboards, CRMs, and connected business tools.</li>
              <li><strong>Automated AI Processing:</strong> Providing context to tenant-configured AI assistants to generate relevant customer support answers.</li>
              <li><strong>Meta Webhook Verification:</strong> Handling Meta Graph API verification challenges (`hub.challenge` and `hub.verify_token`) to establish valid webhook subscriptions.</li>
              <li><strong>Security &amp; Integrity:</strong> Validating `X-Hub-Signature-256` HMAC signatures on every incoming POST payload to prevent unauthorized spoofing.</li>
              <li><strong>Analytics &amp; Performance Monitoring:</strong> Aggregating non-identifying telemetry metrics (message delivery rates, server response times) to maintain system availability.</li>
            </ul>

            <div className="callout callout-success">
              ✅ <strong>No Commercial Exploitation:</strong> FastDesk DOES NOT sell, rent, monetize, or trade end-user WhatsApp data, customer phone numbers, or conversation transcripts to advertisers, data brokers, or third parties.
            </div>
          </section>

          {/* Section 5 */}
          <section id="data-disclosure" className="legal-section">
            <h2>5. Data Disclosure &amp; Third-Party Services</h2>
            <p>
              FastDesk dispatches data to trusted third-party service providers only when strictly necessary to fulfill our service commitments to business tenants:
            </p>
            <ul>
              <li>
                <strong>Meta Platforms, Inc. (WhatsApp Cloud API):</strong> All outbound messages and WABA status queries pass through Meta infrastructure. Use of WhatsApp is governed by Meta&apos;s <em>WhatsApp Business Terms</em> and <em>WhatsApp Developer Policies</em>.
              </li>
              <li>
                <strong>AI Model Providers:</strong> If a tenant configures AI automation (e.g., OpenAI, Anthropic, Google Cloud Vertex AI), relevant conversation prompts are transmitted to the provider via secure APIs solely for generation. FastDesk configures zero-retention / non-training parameters wherever supported.
              </li>
              <li>
                <strong>Tenant-Selected CRM &amp; Helpdesk Integrations:</strong> Data is shared with external CRM and ERP tools selected and authorized explicitly by each business tenant.
              </li>
              <li>
                <strong>Cloud Hosting Infrastructure:</strong> Cloud infrastructure providers hosting FastDesk servers (e.g., AWS, Vercel, GCP) process encrypted data solely under strict data processing addendums (DPAs).
              </li>
              <li>
                <strong>Legal Compliance &amp; Protection:</strong> We may disclose data if required by law, subpoena, or court order, or to defend against legal claims or security breaches.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="meta-compliance" className="legal-section">
            <h2>6. Meta Cloud API Compliance &amp; Webhook Security</h2>
            <p>
              FastDesk is specifically architected to comply with Meta Developer Standards for WhatsApp Business Cloud API App Review:
            </p>
            <ul>
              <li>
                <strong>Meta Webhook Challenge Handling:</strong> Our backend implements full compliant logic for `GET` verification requests, validating `hub.verify_token` against secure tenant configuration and returning `hub.challenge` with `HTTP 200 OK`.
              </li>
              <li>
                <strong>HMAC SHA-256 Signature Verification:</strong> Every incoming `POST` payload is verified against Meta&apos;s payload signature (`X-Hub-Signature-256`) using the tenant&apos;s Meta App Secret before processing.
              </li>
              <li>
                <strong>Token Protection Guarantee:</strong> Meta WhatsApp Access Tokens (`WHATSAPP_ACCESS_TOKEN`) are stored using AES-256 encryption at rest and environment secret isolation.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="tenant-isolation" className="legal-section">
            <h2>7. Multi-Tenant Data Isolation &amp; Security Safeguards</h2>
            <p>
              Because FastDesk serves multiple independent business tenants (Business A, Business B, Business C), security and isolation are paramount:
            </p>
            <ul>
              <li><strong>Schema &amp; Logical Tenant Isolation:</strong> Data associated with Business A is strictly isolated from Business B and Business C at database, memory, and cache levels via tenant-keyed schemas and lookup keys.</li>
              <li><strong>Encryption in Transit:</strong> All HTTP traffic into FastDesk (webhooks) and out of FastDesk (CRM/AI APIs) is encrypted using TLS 1.3/1.2 protocols.</li>
              <li><strong>Encryption at Rest:</strong> Database records, WABA access tokens, and persistent message logs are encrypted using industry-standard AES-256 algorithms.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="retention" className="legal-section">
            <h2>8. Data Retention &amp; Deletion Mechanisms</h2>
            <p>
              We retain personal data only for as long as necessary to fulfill the operational purposes set forth by business tenants:
            </p>
            <ul>
              <li><strong>Webhook Event Logs:</strong> Raw webhook diagnostic logs are automatically purged after 30 days.</li>
              <li><strong>Tenant Account Termination:</strong> Upon termination of a business tenant&apos;s subscription, all associated WhatsApp tokens, CRM maps, and conversation logs are permanently deleted within 30 days.</li>
              <li><strong>Right to be Forgotten (Deletion Requests):</strong> End-users wishing to delete their data stored in FastDesk can submit erasure requests directly to the relevant Business Tenant (Data Controller) or by contacting our Data Protection Officer.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section id="end-user-rights" className="legal-section">
            <h2>9. End-User Data Rights &amp; Tenant Responsibilities</h2>
            <p>
              Depending on geographical jurisdiction, end-users communicating with Business Tenants via WhatsApp possess rights regarding their personal data, including the right to access, rectify, port, or request erasure of their personal information.
            </p>
            <div className="callout callout-warning">
              ⚠️ <strong>Business Tenant Obligation:</strong> Business Tenants (Business A, B, C) are responsible for maintaining explicit user opt-ins, providing their own consumer privacy notices on their WhatsApp entry points, and honoring user opt-out requests (`STOP` commands).
            </div>
          </section>

          {/* Section 10 */}
          <section id="contact" className="legal-section">
            <h2>10. Contact Information &amp; Data Protection Officer</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or FastDesk&apos;s data governance practices, please reach out to our privacy team:
            </p>
            <div style={{ background: "rgba(0,0,0,0.3)", padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border-light)", marginTop: "1rem" }}>
              <p style={{ margin: "0 0 0.5rem 0" }}><strong>FastDesk Privacy &amp; Data Governance Office</strong></p>
              <p style={{ margin: "0 0 0.25rem 0", color: "#a5b4fc" }}>📧 Data Protection Officer: <a href="mailto:dpo@fastdesk.in" style={{ color: "#a5b4fc" }}>dpo@fastdesk.in</a></p>
              <p style={{ margin: "0 0 0.25rem 0", color: "#a5b4fc" }}>✉️ General Privacy Inquiries: <a href="mailto:privacy@fastdesk.in" style={{ color: "#a5b4fc" }}>privacy@fastdesk.in</a></p>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>🌐 Webhook Verification &amp; API Endpoint: <code>https://api.fastdesk.in/webhook/whatsapp</code></p>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/assets/logo.png" alt="FastDesk Logo" style={{ height: "24px" }} />
          <span>© {new Date().getFullYear()} FastDesk Inc. All rights reserved.</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <Link href="/privacy" style={{ color: "var(--text-main)", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
          <div className="status-badge">
            <span className="status-dot"></span>
            Meta v21.0 Compliant
          </div>
        </div>
      </footer>
    </div>
  );
}

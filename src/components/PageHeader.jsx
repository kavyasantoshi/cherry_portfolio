import "./PageHeader.css";

export default function PageHeader({ title, breadcrumb, variant = "default" }) {
  return (
    <section className={`page-header page-header--${variant}`}>
      <div className="page-header-bg">
        <div className="page-header-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      <div className="overlay"></div>

      <div className="page-header-content">
        <div className="page-header-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h1>{title}</h1>
        {breadcrumb && <p>{breadcrumb}</p>}
        <div className="page-header-decoration"></div>
      </div>
    </section>
  );
}

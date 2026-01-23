import "./PageHeader.css";

export default function PageHeader({ title, breadcrumb }) {
  return (
    <section className="page-header">
      <div className="overlay"></div>

      <div className="page-header-content">
        <h1>{title}</h1>
        <p>{breadcrumb}</p>
      </div>
    </section>
  );
}

import PageHeader from "../components/PageHeader";
import Contact from "../pages/Contact.jsx";

export default function ContactSection() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        breadcrumb="HOME / CONTACT"
      />
      <Contact />
    </>
  );
}

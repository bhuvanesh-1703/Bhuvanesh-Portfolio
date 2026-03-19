import { portfolioData } from '../data/portfolio.js';
import Swal from 'sweetalert2';
import '../css/Contact.css'

function Contact() {
  const { contact } = portfolioData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Add FormSubmit config
    formData.append('_subject', 'New Portfolio Message!');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for reaching out. I have received your message and will respond shortly.',
          icon: 'success',
          confirmButtonColor: '#FF4D1C',
          background: '#151515',
          color: '#F5F5F5'
        });
        e.target.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error("FormSubmit Error:", error);
      Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong. Please try again later or contact me directly via LinkedIn.',
        icon: 'error',
        confirmButtonColor: '#FF4D1C',
        background: '#151515',
        color: '#F5F5F5'
      });
    }
  };

  return (
    <section id="contact" className="contact section section--alt">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <div className="title-underline"></div>
        <div className="contact__row mt-5">
          {/* Contact Form */}
          <div className="contact__form-col">
            <div className="contact__form-card glass-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-input" placeholder="Your Name" required />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-input" placeholder="you@example.com" required />
                </div>
                <div className="form-group mb-4">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-input" rows="5" placeholder="Your message..." required></textarea>
                </div>
                <button type="submit" className="btn-accent w-100">
                  <i className="bi bi-send-fill"></i> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact__info-col">
            <div className="contact__info-card glass-card">
              <h4 className="info-title">Let's Connect</h4>
              <p className="info-text">Feel free to reach out for collaborations, freelance work, or just a friendly hello!</p>
              <ul className="info-links">
                <li>
                  <a href={`mailto:${contact.email}`}>
                    <i className="bi bi-envelope-fill"></i><span>{contact.email}</span>
                  </a>
                </li>
                <li>
                  <a href={contact.github} target="_blank" rel="noreferrer">
                    <i className="bi bi-github"></i><span>GitHub Profile</span>
                  </a>
                </li>
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin"></i><span>LinkedIn Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

import './Contact.css';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    e.target.reset();
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
                  <input type="text" className="form-input" placeholder="Your Name" required />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="you@example.com" required />
                </div>
                <div className="form-group mb-4">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows="5" placeholder="Your message..." required></textarea>
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
                  <a href="mailto:bhuvanesh@example.com">
                    <i className="bi bi-envelope-fill"></i><span>bhuvanesh@example.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/bhuvanesh" target="_blank" rel="noreferrer">
                    <i className="bi bi-github"></i><span>github.com/bhuvanesh</span>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/bhuvanesh" target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin"></i><span>linkedin.com/in/bhuvanesh</span>
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

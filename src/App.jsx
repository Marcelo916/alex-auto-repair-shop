import { useState } from 'react'
import './App.css'

const initialForm = {
  name: '',
  phone: '',
  message: '',
}

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedFormData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    }

    if (!trimmedFormData.name) {
      setSubmitSuccess('')
      setSubmitError('Please enter your name.')
      return
    }

    if (!trimmedFormData.phone) {
      setSubmitSuccess('')
      setSubmitError('Please enter your phone number.')
      return
    }

    if (!trimmedFormData.message) {
      setSubmitSuccess('')
      setSubmitError('Please enter a short message about your vehicle or repair needs.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedFormData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        setSubmitError(responseData.error || 'Unable to send your request right now. Please try again.')
        return
      }

      setSubmitSuccess(responseData.message || 'Your estimate request was sent successfully.')
      setFormData(initialForm)
    } catch {
      setSubmitError('Unable to connect to the estimate server. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="site">
      <header className="navbar">
        <div className="logo">
          <h1>Alex Auto Repair Shop</h1>
          <p>Local Auto Repair Shop in Salinas, CA</p>
        </div>

        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="call-button" href="tel:+18317710988">
          Call Now
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">Trusted Local Auto Repair Shop</p>
            <h2>Trusted auto repair in Salinas to keep your vehicle safe, dependable, and ready for the road.</h2>
            <p>
              Our local auto repair shop provides dependable diagnostics, brake service,
              electrical repairs, and maintenance with clear communication and quality workmanship.
            </p>

            <div className="hero-buttons">
              <a className="primary-button" href="tel:+18317710988">
                Call for an Estimate
              </a>
              <a className="secondary-button" href="#contact">
                Visit Our Shop
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80"
              alt="Alex Auto Repair Shop serving drivers in Salinas, California"
            />
          </div>
        </section>

        <section id="services" className="section">
          <h3>Auto Repair Services in Salinas</h3>
          <div className="card-grid">
            <div className="card">
              <h4>Diagnostics</h4>
              <p>Identify and troubleshoot vehicle issues using professional diagnostic tools.</p>
            </div>
            <div className="card">
              <h4>Electrical Repairs</h4>
              <p>Repair batteries, alternators, wiring, and electronic system components.</p>
            </div>
            <div className="card">
              <h4>AC and Heater Repair</h4>
              <p>Fix heating and cooling systems to keep your vehicle comfortable year-round.</p>
            </div>
            <div className="card">
              <h4>Shocks</h4>
              <p>Improve ride quality and stability by repairing worn suspension components.</p>
            </div>
            <div className="card">
              <h4>Tune-Ups</h4>
              <p>Replace spark plugs and filters, and inspect engine performance for reliable driving.</p>
            </div>
            <div className="card">
              <h4>Brakes and Rotors</h4>
              <p>Get dependable diagnostics and brake repair in Salinas for safe, smooth stopping power.</p>
            </div>
          </div>
        </section>

        <section id="about" className="section light-section">
          <div className="split-section">
            <div>
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                alt="Technician performing vehicle diagnostics at Alex Auto Repair Shop in Salinas"
                className="section-image"
              />
            </div>
            <div>
              <h3>About Our Salinas Auto Repair Shop</h3>
              <p>
                Alex Auto Repair Shop is a local auto repair shop committed to honest service and
                dependable repairs for drivers in Salinas and nearby communities.
              </p>
              <p>
                From routine maintenance to diagnostics and brake repair in Salinas, our team
                focuses on careful work, straightforward recommendations, and service you can trust.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <h3>Shop Gallery</h3>
          <p className="section-subtext">
            Take a look at our local auto repair shop in Salinas and the vehicles we service.
          </p>

          <div className="gallery-grid">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
              alt="Vehicle in a service bay at Alex Auto Repair Shop in Salinas"
            />
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="Car being inspected for local auto repair service in Salinas"
            />
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
              alt="Vehicle ready after service at Alex Auto Repair Shop in Salinas"
            />
          </div>
        </section>

        <section id="contact" className="section dark-section">
          <div className="contact-grid">
            <div>
              <h3>Contact Our Salinas Auto Repair Shop</h3>
              <p>Need auto repair in Salinas, from diagnostics to brake service and tune-ups? We&apos;re here to help.</p>
              <p><strong>Phone:</strong>{' '}<a href="tel:+18317710988" style={{ textDecoration: 'underline', color: '#4fd1c5' }}>(831) 771-0988</a></p>
              <p><strong>Alternate Phone:</strong>{' '}<a href="tel:+18312626986" style={{ textDecoration: 'underline', color: '#4fd1c5' }}>(831) 262-6986</a></p>
              <p><strong>Address:</strong> 341 West Market Street, Salinas, California 93901, United States</p>
              <p><strong>Hours:</strong> Monday–Friday: 8:00 AM – 5:30 PM</p>
              <p><strong>Saturday:</strong> 8:00 AM – 2:30 PM</p>
              <p><strong>Sunday:</strong> By appointment</p>

              <div style={{ marginTop: '24px' }}>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.747371796063!2d-121.6650572!3d36.68057470000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808df8da8402f3ef%3A0x87b4d7f638a71bb!2s341%20W%20Market%20St%2C%20Salinas%2C%20CA%2093901!5e0!3m2!1sen!2sus!4v1773857626563!5m2!1sen!2sus"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-label="Your name"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-label="Phone number"
              />
              <textarea
                name="message"
                placeholder="Tell us how we can help with your vehicle"
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-label="How we can help with your vehicle"
              ></textarea>

              {submitError ? <p className="form-status form-status-error">{submitError}</p> : null}
              {submitSuccess ? <p className="form-status form-status-success">{submitSuccess}</p> : null}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Request...' : 'Send Request'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Alex Auto Repair Shop. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

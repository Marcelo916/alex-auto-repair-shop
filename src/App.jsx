import './App.css'

function App() {
  return (
    <div className="site">
      <header className="navbar">
        <div className="logo">
          <h1>Alex Auto Repair Shop</h1>
          <p>Auto Body Repair & Paint</p>
        </div>

        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="call-button" href="tel:+18315551234">
          Call Now
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">Trusted Local Auto Body Shop</p>
            <h2>Professional collision repair, paint, and body work you can trust.</h2>
            <p>
              We help drivers get their vehicles looking great again with reliable
              repair service, honest communication, and quality workmanship.
            </p>

            <div className="hero-buttons">
              <a className="primary-button" href="tel:+18315551234">
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
              alt="Auto body shop"
            />
          </div>
        </section>

        <section id="services" className="section">
          <h3>Our Services</h3>
          <div className="card-grid">
            <div className="card">
              <h4>Collision Repair</h4>
              <p>Repair for accident damage, dents, and body issues.</p>
            </div>
            <div className="card">
              <h4>Auto Paint</h4>
              <p>Professional repainting and finish restoration.</p>
            </div>
            <div className="card">
              <h4>Dent Removal</h4>
              <p>Restore your vehicle’s appearance with quality dent repair.</p>
            </div>
            <div className="card">
              <h4>Insurance Assistance</h4>
              <p>We help guide customers through the estimate and repair process.</p>
            </div>
          </div>
        </section>

        <section id="about" className="section light-section">
          <div className="split-section">
            <div>
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                alt="Mechanic working"
                className="section-image"
              />
            </div>
            <div>
              <h3>About Us</h3>
              <p>
                Alex Auto Repair Shop is committed to helping customers get back on
                the road with repairs they can trust.
              </p>
              <p>
                We focus on dependable service, strong attention to detail, and clear
                communication throughout the process.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <h3>Gallery</h3>
          <p className="section-subtext">
            Later, replace these sample images with real photos from the shop.
          </p>

          <div className="gallery-grid">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
              alt="Car 1"
            />
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="Car 2"
            />
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
              alt="Car 3"
            />
          </div>
        </section>

        <section id="contact" className="section dark-section">
          <div className="contact-grid">
            <div>
              <h3>Contact Us</h3>
              <p>Need body work, paint repair, or an estimate? Contact us today.</p>
              <p><strong>Phone:</strong> (831) 555-1234</p>
              <p><strong>Address:</strong> 123 Main Street, Salinas, CA</p>
              <p><strong>Hours:</strong> Mon - Fri, 8:00 AM - 5:00 PM</p>
            </div>

            <form className="contact-form">
              <input type="text" placeholder="Your name" />
              <input type="tel" placeholder="Phone number" />
              <textarea placeholder="Tell us about your repair needs"></textarea>
              <button type="submit">Send Request</button>
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
import './App.css'

function App() {
  return (
    <div className="site">
      <header className="navbar">
        <div className="logo">
          <h1>Alex Auto Repair Shop</h1>
          <p>Reliable Auto Repair in Salinas</p>
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
            <h2>Professional auto repair services to keep your vehicle safe and running smoothly.</h2>
            <p>
              We provide dependable repairs, clear communication, and quality workmanship
              for drivers throughout Salinas and the surrounding area.
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
              alt="Auto repair shop"
            />
          </div>
        </section>

        <section id="services" className="section">
          <h3>Our Services</h3>
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
              <p>Repair braking systems for safe, smooth, and dependable stopping power.</p>
            </div>
          </div>
        </section>

        <section id="about" className="section light-section">
          <div className="split-section">
            <div>
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                alt="Mechanic working on a vehicle"
                className="section-image"
              />
            </div>
            <div>
              <h3>About Us</h3>
              <p>
                Alex Auto Repair Shop is committed to providing honest service and dependable
                repairs for every customer who walks through our doors.
              </p>
              <p>
                From routine maintenance to more complex repairs, our team focuses on careful
                work, straightforward recommendations, and customer service you can count on.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <h3>Gallery</h3>
          <p className="section-subtext">
            Take a look at our shop and the kind of vehicles we service.
          </p>

          <div className="gallery-grid">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
              alt="Vehicle in service bay"
            />
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="Car being inspected"
            />
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
              alt="Vehicle ready after service"
            />
          </div>
        </section>

        <section id="contact" className="section dark-section">
          <div className="contact-grid">
            <div>
              <h3>Contact Us</h3>
              <p>Need diagnostics, repairs, or routine service? We&apos;re here to help.</p>
              <p><strong>Phone:</strong>{" "}<a href="tel:+18317710988" style={{ textDecoration: 'underline', color: '#4fd1c5' }}>(831) 771-0988</a></p>
              <p><strong>Alternate Phone:</strong>{" "}<a href="tel:+18312626986" style={{ textDecoration: 'underline', color: '#4fd1c5' }}>(831) 262-6986</a></p>
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

            <form className="contact-form">
              <input type="text" placeholder="Your name" />
              <input type="tel" placeholder="Phone number" />
              <textarea placeholder="Tell us how we can help with your vehicle"></textarea>
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

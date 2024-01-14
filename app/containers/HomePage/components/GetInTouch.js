import React, { Component } from 'react';

import whatsapp from 'assets/images/social_icons/whatsapp.svg';
import telegram from 'assets/images/social_icons/telegram.svg';

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      phone_number: '17148297303', // Replace with the specific phone number you want to message
      text_message: "Hello, I'm interested in your services", // Replace with your default message
    };
  }

  render() {
    return (
      <section className="follow-us-section">
        {/* social icons */}
        <div className="ui container">
          <div>
            <h2>Get In Touch</h2>

            <div>
              <div>
                <a
                  href={`https://api.whatsapp.com/send?phone=${
                    this.state.phone_number
                  }&text=${encodeURIComponent(this.state.text_message)}`}
                  target="_blank"
                >
                  <img src={whatsapp} alt="WhatsApp" width={48} height={48} />
                </a>
              </div>

              <div className="px-2">
                <a href="https://t.me/btctransferwallet" target="_blank">
                  <img src={telegram} alt="Telegram" width={48} height={48} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

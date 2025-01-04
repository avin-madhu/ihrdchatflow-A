import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 to-purple-800">
      <div className="max-w-4xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6 font-serif">Contact Us</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            We're here to help! Reach out to us through any of these channels.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 font-serif">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-purple-400" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-white/70">support@chatflow.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-purple-400" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-white/70">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-purple-400" />
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-white/70">123 AI Street, Tech Valley, CA 94025</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MessageCircle className="h-6 w-6 text-purple-400" />
                <div>
                  <p className="text-white font-medium">Live Chat</p>
                  <p className="text-white/70">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 font-serif">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-white mb-2">Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-purple-400 focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-purple-400 focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-purple-400 focus:ring-0"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
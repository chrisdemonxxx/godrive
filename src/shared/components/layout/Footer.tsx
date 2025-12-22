import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-8">
      <Container>
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">GoDrive</span>
            </div>
            <p className="text-gray-400 mb-6">
              India's most trusted peer-to-peer car rental platform. Rent verified cars or list yours to earn.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          {[
            {
              title: "For Guests",
              links: ["Search Cars", "How it Works", "Pricing", "FAQs"]
            },
            {
              title: "For Hosts",
              links: ["List Your Car", "Host Calculator", "Host FAQs", "Insurance"]
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Contact"]
            }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-6">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-gray-400 hover:text-white transition">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GoDrive. All rights reserved. Made with ❤️ in Bangalore
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/terms" className="hover:text-white">Privacy Policy</Link>
            <Link to="/privacy" className="hover:text-white">Terms of Service</Link>
            <Link to="/refund" className="hover:text-white">Refund Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

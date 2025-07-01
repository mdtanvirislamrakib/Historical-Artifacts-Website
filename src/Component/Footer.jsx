import React from "react";
import { Mail, MapPin, Facebook, Instagram, Linkedin, Github, } from "lucide-react";
import { RiTwitterXLine } from "react-icons/ri";
import logo from "../assets/logo.png"
import { Link, NavLink } from "react-router";

const socialLinks = [
  {
    icon: <RiTwitterXLine className="h-5 w-5" />,
    name: "Twitter",
    url: "https://x.com/",
  },
  {
    icon: <Facebook className="h-5 w-5" />,
    name: "Facebook",
    url: "https://facebook.com/",
  },
  {
    icon: <Instagram className="h-5 w-5" />,
    name: "Instagram",
    url: "https://instagram.com/",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    name: "LinkedIn",
    url: "https://linkedin.com/",
  },
  {
    icon: <Github className="h-5 w-5" />,
    name: "GitHub",
    url: "https://github.com/",
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Artifacts", href: "/all-artifacts" },
  { name: "Contact", href: "/contact-support" },
  { name: "Browse Documentation", href: "/browse-documentation" },
];

const Footer = () => {
  return (
    <footer className="relative bg-black/80 backdrop-blur-xl border-t border-white/10 text-gray-300">
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Logo and Description */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="HistoriVault Logo"
                className="h-12 w-12 rounded-full object-cover shadow-lg border border-amber-400/30 bg-amber-400/10"
              />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-white to-amber-700 bg-clip-text text-transparent tracking-wider drop-shadow">
                HistoriVault
              </span>
            </div>
            <p className="text-sm mt-2 max-w-md text-gray-400">
              Uncover the world's rich history—explore, discover, and preserve historical artifacts with HistoriVault.
            </p>
            <div className="flex items-center gap-2 mt-2 text-amber-400">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@historivault.com" className="hover:underline text-sm text-amber-400">
                support@historivault.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Global Heritage, Online</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 md:items-center">
            <h3 className="text-lg font-bold mb-4 text-amber-400">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `hover:text-amber-400 transition-colors duration-200 text-sm ${isActive ? 'text-amber-400' : ''
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Social & Newsletter */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4 text-amber-400">Stay Connected</h3>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  to={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2 rounded-full hover:bg-amber-400/20 hover:text-amber-400 transition-colors duration-200 border border-transparent hover:border-amber-400/40"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <form className="flex items-center gap-2 mb-2">
              <input
                type="email"
                required
                placeholder="Subscribe for updates"
                className="w-full px-4 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400/40 backdrop-blur-sm"
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 text-black font-semibold text-sm shadow hover:from-amber-400 hover:to-amber-500 transition-all duration-200 border border-amber-300/20 hover:scale-105"
              >
                Subscribe
              </button>
            </form>
            <span className="text-xs text-gray-500">Join our newsletter for new discoveries!</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} HistoriVault. All rights reserved.
          </span>
          <div className="flex gap-2 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Globe, Shield, BookOpen, Headphones, Calendar, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeContact, setActiveContact] = useState(0);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      contact: "support@historivault.com",
      availability: "24/7",
      responseTime: "Within 24 hours",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST",
      responseTime: "Immediate",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time assistance for urgent matters",
      contact: "Available on website",
      availability: "Mon-Fri, 8AM-8PM EST",
      responseTime: "Within 5 minutes",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Schedule Consultation",
      description: "Book a one-on-one session with our historians",
      contact: "Book online",
      availability: "By appointment",
      responseTime: "Same day booking",
      color: "from-amber-500 to-amber-600"
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'technical', label: 'Technical Support', icon: Shield },
    { value: 'research', label: 'Research Assistance', icon: BookOpen },
    { value: 'partnership', label: 'Partnership', icon: Users },
    { value: 'authentication', label: 'Artifact Authentication', icon: CheckCircle }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: 'general',
          message: '',
          priority: 'medium'
        });
      }, 3000);
    }, 1000);
  };

  return (
    <section className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)',
      }}>

      {/* // dynamic title add */}
      <Helmet>
        <title>HistoriVault | Contact-Support</title>
      </Helmet>


      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(251,191,36,0.08),transparent_50%)]"></div>

      {/* Floating Communication Icons */}
      {[Mail, Phone, MessageSquare, Globe].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-400/20"
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Headphones className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400 font-medium">Expert Support</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide">
            Get in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our team of historians, archaeologists, and technical experts is here to assist you
            with any questions about our historical artifacts collection.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveContact(index)}
            >
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-gray-300 text-sm">{method.availability}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{method.responseTime}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-amber-400 font-medium">{method.contact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 pointer-events-none"></div>

              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-6">Send us a Message</h3>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                            style={{
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)'
                            }}
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                            style={{
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)'
                            }}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                          style={{
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                        >
                          {supportCategories.map((category) => (
                            <option key={category.value} value={category.value} className="bg-gray-800">
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                          style={{
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                          placeholder="How can we help you?"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
                          Priority Level
                        </label>
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                          style={{
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                        >
                          <option value="low" className="bg-gray-800">Low - General inquiry</option>
                          <option value="medium" className="bg-gray-800">Medium - Standard support</option>
                          <option value="high" className="bg-gray-800">High - Urgent assistance</option>
                          <option value="critical" className="bg-gray-800">Critical - Emergency</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 resize-none"
                          style={{
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                          placeholder="Please describe your inquiry in detail..."
                          required
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-10 w-10 text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                      <p className="text-gray-300 mb-6">
                        Thank you for contacting us. Our team will review your message and respond within 24 hours.
                      </p>
                      <p className="text-amber-400 text-sm">
                        Reference ID: #HV{Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {/* Office Information */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Our Location</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>HistoriVault Research Center</p>
                <p>1234 Heritage Boulevard</p>
                <p>Archaeological District</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Business Hours</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-amber-400 text-sm">Emergency support available 24/7</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Quick Resources</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Documentation & Guides",
                  "API Reference",
                  "Research Portal",
                  "Community Forum",
                  "Status Page"
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="block text-gray-300 hover:text-amber-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    → {link}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30">
            <Shield className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Emergency Support</h3>
            <p className="text-gray-300 mb-4">
              For critical issues affecting artifact authentication or security concerns
            </p>
            <a
              href="tel:+1-555-911-HIST"
              className="text-red-400 font-bold text-lg hover:text-red-300 transition-colors"
            >
              +1 (555) 911-HIST
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSupport;
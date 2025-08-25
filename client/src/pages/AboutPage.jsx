import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';

const AboutPage = () => {
  const { isSignedIn, user } = useUser();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="py-8 text-white">
      <div className="container-custom">
        {/* Hero Section */}
        <section className="mb-16 text-center section-padding">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-gradient">NutriOrder</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We're on a mission to transform the way you experience food by personalizing your dining choices based on your unique preferences and dietary needs.
            {isSignedIn && (
              <span className="block mt-4 text-lg">
                Welcome back, {user.firstName}! We're glad to have you here.
              </span>
            )}
          </motion.p>
        </section>
        
        {/* Our Story */}
        <section className="mb-16 section-padding">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Team working together" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-400 mb-4">
                NutriOrder was born from a simple observation: everyone has unique dietary needs and preferences, yet most food ordering platforms treat all customers the same. We saw an opportunity to create a more personalized dining experience that considers your health goals, dietary restrictions, and taste preferences.
              </p>
              <p className="text-gray-400 mb-4">
                Founded in 2023 by a team of food enthusiasts and health-conscious technologists in Bangalore, we set out to build a platform that not only connects you with great restaurants but also helps you make food choices aligned with your lifestyle and health objectives.
              </p>
              <p className="text-gray-400">
                Today, NutriOrder partners with hundreds of restaurants across India to offer personalized food recommendations and convenient ordering options for every type of diner.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="mb-16 bg-[#1A1D25] rounded-xl section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              To empower people to make informed food choices that align with their health goals and dietary needs, while making the process of discovering and ordering food a delightful experience.
            </motion.p>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="card p-6" variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Personalization</h3>
                <p className="text-gray-400">
                  Tailoring food recommendations based on your unique preferences and dietary requirements.
                </p>
              </motion.div>
              <motion.div className="card p-6" variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Health-Conscious</h3>
                <p className="text-gray-400">
                  Promoting healthier food choices without compromising on taste or enjoyment.
                </p>
              </motion.div>
              <motion.div className="card p-6" variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Accessibility</h3>
                <p className="text-gray-400">
                  Making it easy for everyone to find suitable food options regardless of their dietary restrictions.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* What Sets Us Apart */}
        <section className="mb-16 section-padding">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Sets Us Apart
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />, title: "Smart Recommendations", description: "Our intelligent algorithm learns your preferences over time to provide increasingly accurate food suggestions that match your taste and dietary needs." },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />, title: "Comprehensive Filtering", description: "Filter restaurants and dishes based on specific dietary requirements, health goals, cuisine preferences, and more to find exactly what you're looking for." },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />, title: "Recipe Access", description: "Not just for ordering—we provide detailed recipes for those who prefer to cook at home, complete with nutritional information and preparation tips." },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />, title: "Community Focus", description: "We partner with local restaurants that share our commitment to quality, health, and customer satisfaction, supporting the local food ecosystem." },
            ].map((item, index) => (
              <motion.div key={index} className="card p-6 flex" variants={itemVariants}>
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Our Team */}
        <section className="mb-16 section-padding">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Team Members Data */}
            {[
              { img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80", name: "Abhijit Das", role: "Founder & CEO", desc: "A food enthusiast with a background in technology, Abhijit founded NutriOrder to combine his passions for food and innovation." },
              { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80", name: "Tuhin Roy", role: "Co-Founder", desc: "With a PhD in Nutrition Science, Tuhin ensures that our food recommendations are backed by sound nutritional principles." },
              { img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80", name: "Pallab Mitra", role: "CTO", desc: "A tech wizard with expertise in AI and machine learning, Vikram leads the development of our recommendation algorithms." },
              { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80", name: "Dr. Debdutta Pal", role: "Head of Partnerships", desc: "Mrs. Debdutta builds relationships with restaurants and food providers, ensuring a diverse and high-quality selection for our users." },
            ].map((member, index) => (
              <motion.div key={index} className="card overflow-hidden text-center" variants={itemVariants}>
                <img 
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Join Us CTA */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary rounded-xl">
          <div className="container-custom text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 text-white"
            >
              Join Our Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8 max-w-3xl mx-auto text-white/90"
            >
              Experience personalized food ordering that caters to your unique preferences and dietary needs. {isSignedIn ? 'Explore our features' : 'Sign up today'} and discover a better way to enjoy your favorite foods.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {!isSignedIn ? (
                <>
                  <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                    Sign Up Now
                  </Link>
                  <Link to="/contact" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold">
                    Contact Us
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/restaurants" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                    Browse Restaurants
                  </Link>
                  <Link to="/profile" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold">
                    Update Preferences
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
import React, { useState } from 'react'
import { Coffee, Utensils, Wifi, Moon, Sun, Music, ChevronDown } from 'lucide-react'
import Button from './Button'
import { motion } from 'framer-motion'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const experiences = [
    { 
      title: "Gourmet Breakfast", 
      description: "Start your day with our chef's special farm-to-table breakfast, featuring local organic ingredients.",
      icon: <Utensils className="w-6 h-6" />,
      time: "7:30 AM - 10:00 AM"
    },
    { 
      title: "Garden Tea Time", 
      description: "Enjoy a relaxing afternoon tea in our beautiful garden, surrounded by fragrant flowers and herbs.",
      icon: <Coffee className="w-6 h-6" />,
      time: "3:00 PM - 5:00 PM"
    },
    { 
      title: "Nature Walk", 
      description: "Take a guided walk through our private nature trail, discovering local flora and fauna.",
      icon: <Sun className="w-6 h-6" />,
      time: "10:30 AM or 4:30 PM"
    },
    { 
      title: "Evening Wine Tasting", 
      description: "Sample a curated selection of local wines paired with artisanal cheeses in our cozy lounge.",
      icon: <Music className="w-6 h-6" />,
      time: "7:00 PM - 9:00 PM"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-16 bg-background text-text"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="text-3xl font-bold mb-8 text-center text-text" variants={itemVariants}>
        Experience Tranquil Haven
      </motion.h2>
      
      <motion.div className="mb-12" variants={itemVariants}>
        <p className="text-lg text-center max-w-3xl mx-auto text-text-light">
          Immerse yourself in the charm of our boutique bed and breakfast. From gourmet breakfasts to serene nature walks, 
          every moment at Tranquil Haven is designed to provide you with a unique and memorable stay.
        </p>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="bg-background-light rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            variants={itemVariants}
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  className="bg-primary-light rounded-full p-3 mr-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {exp.icon}
                </motion.div>
                <h3 className="text-xl font-semibold flex-grow text-text">{exp.title}</h3>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-text" />
                </motion.div>
              </div>
              <motion.div
                initial={false}
                animate={{ height: expandedIndex === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-text-light mb-4">{exp.description}</p>
                <div className="flex items-center text-sm text-text-dark">
                  {index % 2 === 0 ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  <span>{exp.time}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-16 bg-background-light rounded-lg p-8 text-center"
        variants={itemVariants}
      >
        <h3 className="text-2xl font-semibold mb-4 text-text">Always Included in Your Stay</h3>
        <motion.div 
          className="flex justify-center space-x-8"
          variants={containerVariants}
        >
          {[
            { icon: <Wifi />, text: "Free High-Speed WiFi" },
            { icon: <Coffee />, text: "24/7 Coffee & Tea Station" },
            { icon: <Moon />, text: "Nightly Turndown Service" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {React.cloneElement(item.icon, { className: "w-8 h-8 mb-2 text-primary" })}
              <span className="text-sm text-text-light">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="mt-16 text-center" variants={itemVariants}>
        <h3 className="text-2xl font-semibold mb-4 text-text">Ready to Experience Tranquil Haven?</h3>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="primary">Book Now</Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
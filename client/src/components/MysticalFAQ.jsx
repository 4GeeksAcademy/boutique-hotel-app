import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What mysteries can I uncover with Mystery App?",
    answer: (
      <>
        <p>Mystery App offers a vast array of enigmas to explore, including:</p>
        <ul className="list-disc list-inside mt-2 mb-4">
          <li>Ancient civilizations and their unexplained technologies</li>
          <li>Cryptozoological creatures and their potential habitats</li>
          <li>Unsolved historical events and conspiracies</li>
          <li>Paranormal phenomena and ghostly encounters</li>
          <li>Astronomical anomalies and potential extraterrestrial activity</li>
        </ul>
        <p>Our curated content is designed to challenge your perception and expand your understanding of the unknown. Whether you're a seasoned mystery enthusiast or a curious newcomer, there's always something intriguing to discover.</p>
      </>
    )
  },
  {
    question: "How often is new content added?",
    answer: (
      <>
        <p>We are committed to keeping our mystery collection fresh and exciting. Our content update schedule includes:</p>
        <ul className="list-disc list-inside mt-2 mb-4">
          <li>Weekly additions of new mysteries</li>
          <li>Bi-weekly updates to existing cases with new evidence or theories</li>
          <li>Monthly featured mysteries with in-depth analysis</li>
          <li>Quarterly themed collections (e.g., "Summer of Sea Monsters", "Autumn Apparitions")</li>
        </ul>
        <p>Our team of researchers and mystery enthusiasts work tirelessly to bring you the most intriguing and up-to-date content. We also encourage user submissions, which, after verification, may be featured in our app.</p>
      </>
    )
  },
  {
    question: "Can I contribute my own mysteries or theories?",
    answer: (
      <>
        <p>Absolutely! We strongly encourage user contributions to enrich our mystery database. Here's how you can participate:</p>
        <ol className="list-decimal list-inside mt-2 mb-4">
          <li>Navigate to the 'Contribute' section in the app</li>
          <li>Choose between submitting a new mystery or adding to an existing one</li>
          <li>Provide detailed information, including any evidence or sources</li>
          <li>Submit for review by our moderation team</li>
        </ol>
        <p>Our moderators will carefully review your submission. If approved, your content will be featured in the app, and you'll be credited as a contributor. This is a great way to engage with our community of mystery enthusiasts and potentially see your research highlighted!</p>
        <p>For more information on contribution guidelines, please visit our <a href="#" className="text-purple-400 hover:text-purple-300">Contributor's Guide</a>.</p>
      </>
    )
  },
  {
    question: "Is Mystery App suitable for children?",
    answer: "While many of our mysteries are family-friendly, some content may be too intense for younger audiences. We recommend parental guidance for users under 13."
  },
  {
    question: "How can I track the mysteries I've explored?",
    answer: "Create a free account to track your mystery-solving progress, bookmark favorite enigmas, and receive personalized recommendations based on your interests."
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={`border-b ${isDarkMode ? 'border-primary-dark' : 'border-primary-light'} last:border-b-0`}>
      <button
        className={`flex justify-between items-center w-full py-5 px-4 text-left transition-colors ${
          isDarkMode ? 'hover:bg-background' : 'hover:bg-background-light'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-text">{question}</span>
        {isOpen ? <ChevronUp className="text-primary flex-shrink-0" /> : <ChevronDown className="text-primary flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className={`pb-6 px-4 text-text-light ${isDarkMode ? 'bg-background-dark' : 'bg-background-light'} rounded-b-lg`}>
          <div className="mt-2 space-y-4">{answer}</div>
        </div>
      )}
    </div>
  );
};

const MysticalFAQ = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-text mb-12">Unravel the Mysteries: FAQ</h2>
        <div className={`${isDarkMode ? 'bg-background' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MysticalFAQ;
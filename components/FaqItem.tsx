'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface FaqItemProps {
  question: string
  answer: string
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-slate-50 rounded-xl mb-4 overflow-hidden border border-slate-200">
      <div
        className="p-5 flex justify-between items-center cursor-pointer transition-all hover:bg-slate-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-dark">{question}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p className="px-6 pb-5 text-slate-450 leading-7">{answer}</p>
      </div>
    </div>
  )
}

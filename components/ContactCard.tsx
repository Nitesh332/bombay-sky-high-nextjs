import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface ContactCardProps {
  icon: IconDefinition
  title: string
  lines: string[]
}

export default function ContactCard({ icon, title, lines }: ContactCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl text-center shadow-sm card-hover border border-slate-200 hover:border-primary">
      <div className="w-[60px] h-[60px] icon-gradient rounded-full flex items-center justify-center mx-auto mb-4">
        <FontAwesomeIcon icon={icon} className="text-2xl text-white" />
      </div>
      <h3 className="text-dark text-lg mb-3">{title}</h3>
      <p className="text-slate-450 text-sm leading-6">
        {lines.map((line, index) => (
          <span key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  )
}

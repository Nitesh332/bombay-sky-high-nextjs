import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface FeatureCardProps {
  icon: IconDefinition
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-slate-50 p-8 rounded-2xl text-center card-hover border border-slate-200 hover:border-primary">
      <div className="w-[70px] h-[70px] icon-gradient rounded-2xl flex items-center justify-center mx-auto mb-5">
        <FontAwesomeIcon icon={icon} className="text-3xl text-white" />
      </div>
      <h3 className="text-xl text-dark mb-3">{title}</h3>
      <p className="text-slate-450 leading-7">{description}</p>
    </div>
  )
}

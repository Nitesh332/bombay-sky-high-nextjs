import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

interface TestimonialCardProps {
  text: string
  authorName: string
  authorRole: string
  initials: string
}

export default function TestimonialCard({
  text,
  authorName,
  authorRole,
  initials,
}: TestimonialCardProps) {
  return (
    <div className="bg-slate-50 p-9 rounded-2xl border border-slate-200 card-hover hover:border-primary">
      <div className="text-yellow-400 mb-5">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="mr-1" />
        ))}
      </div>
      <p className="text-slate-550 text-base leading-7 mb-6 italic">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-4">
        <div className="w-[50px] h-[50px] avatar-gradient rounded-full flex items-center justify-center text-white font-bold">
          {initials}
        </div>
        <div>
          <strong className="block text-dark">{authorName}</strong>
          <span className="text-sm text-slate-450">{authorRole}</span>
        </div>
      </div>
    </div>
  )
}

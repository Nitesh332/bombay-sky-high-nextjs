import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  title: string
  description: string
  image: string
  badge?: string
  showLink?: boolean
}

export default function ProductCard({
  title,
  description,
  image,
  badge,
  showLink = false,
}: ProductCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl text-center shadow-md card-hover relative overflow-hidden">
      {badge && (
        <div className="absolute top-4 left-4 badge-gradient text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
          {badge}
        </div>
      )}
      <div className="relative w-full h-[200px] mb-4 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="my-3 text-dark text-lg font-semibold">{title}</h3>
      <p className="text-slate-450 text-sm mb-4">{description}</p>
      {showLink && (
        <Link
          href="/products"
          className="text-primary-dark no-underline font-semibold text-sm transition-colors hover:text-primary-darker"
        >
          View Details →
        </Link>
      )}
    </div>
  )
}

// Location data for SEO-optimized dynamic pages
export interface LocationData {
  slug: string
  name: string
  region: 'South Mumbai' | 'Western Suburbs' | 'Central Mumbai' | 'Eastern Suburbs' | 'Thane & MMR'
  pincode: string
  nearbyAreas: string[]
  description: string
  highlights: string[]
  constructionTypes: string[]
  landmarks: string[]
}

export const locations: LocationData[] = [
  // South Mumbai
  {
    slug: 'colaba',
    name: 'Colaba',
    region: 'South Mumbai',
    pincode: '400005',
    nearbyAreas: ['Cuffe Parade', 'Navy Nagar', 'Fort', 'Churchgate'],
    description:
      'Colaba, located at the southern tip of Mumbai, is known for its heritage buildings, commercial establishments, and residential complexes. Our scaffolding services in Colaba cater to restoration projects, commercial renovations, and high-rise maintenance work.',
    highlights: [
      'Heritage building restoration scaffolding',
      'Commercial complex maintenance',
      'Residential tower exterior work',
      'Quick mobilization in South Mumbai',
    ],
    constructionTypes: ['Heritage Restoration', 'Commercial Buildings', 'Residential Towers', 'Hotel Renovations'],
    landmarks: ['Gateway of India', 'Taj Mahal Palace', 'Colaba Causeway'],
  },
  {
    slug: 'fort',
    name: 'Fort',
    region: 'South Mumbai',
    pincode: '400001',
    nearbyAreas: ['Churchgate', 'Marine Lines', 'CST', 'Ballard Estate'],
    description:
      'Fort is the financial and commercial heart of Mumbai, housing numerous heritage structures and modern office buildings. Bombay Sky High provides specialized scaffolding solutions for building maintenance, facade repairs, and renovation projects in the Fort area.',
    highlights: [
      'Heritage structure scaffolding expertise',
      'Office building facade maintenance',
      'Banking district construction support',
      'Minimal disruption scaffolding solutions',
    ],
    constructionTypes: ['Heritage Buildings', 'Commercial Offices', 'Banks & Financial Institutions', 'Government Buildings'],
    landmarks: ['CST Station', 'Horniman Circle', 'Flora Fountain', 'BSE Building'],
  },
  {
    slug: 'dadar',
    name: 'Dadar',
    region: 'Central Mumbai',
    pincode: '400014',
    nearbyAreas: ['Prabhadevi', 'Matunga', 'Mahim', 'Wadala'],
    description:
      'Dadar is a major commercial and residential hub in Central Mumbai with ongoing redevelopment projects. Our scaffolding services support both new construction and building renovation projects across Dadar East and Dadar West.',
    highlights: [
      'Redevelopment project scaffolding',
      'Commercial complex construction',
      'Residential building maintenance',
      'Central location quick delivery',
    ],
    constructionTypes: ['Residential Redevelopment', 'Commercial Complexes', 'Shopping Centers', 'Railway Infrastructure'],
    landmarks: ['Shivaji Park', 'Dadar Station', 'Siddhivinayak Temple'],
  },
  {
    slug: 'lower-parel',
    name: 'Lower Parel',
    region: 'South Mumbai',
    pincode: '400013',
    nearbyAreas: ['Worli', 'Prabhadevi', 'Elphinstone', 'Mahalaxmi'],
    description:
      'Lower Parel has transformed from a mill district to a premium commercial and residential destination. Bombay Sky High supplies scaffolding for high-rise construction, corporate office fit-outs, and luxury residential projects in this rapidly developing area.',
    highlights: [
      'High-rise construction scaffolding',
      'Corporate tower maintenance',
      'Luxury residential projects',
      'Mill compound redevelopment support',
    ],
    constructionTypes: ['High-Rise Towers', 'Corporate Offices', 'Luxury Residences', 'Commercial Malls'],
    landmarks: ['High Street Phoenix', 'Peninsula Corporate Park', 'Kamala Mills'],
  },
  {
    slug: 'worli',
    name: 'Worli',
    region: 'South Mumbai',
    pincode: '400018',
    nearbyAreas: ['Lower Parel', 'Prabhadevi', 'Dadar', 'Haji Ali'],
    description:
      'Worli is one of Mumbai\'s most prestigious residential localities featuring ultra-luxury high-rises and sea-facing towers. Our premium scaffolding services in Worli support construction of iconic skyscrapers and exclusive residential projects.',
    highlights: [
      'Ultra high-rise scaffolding systems',
      'Sea-facing tower construction',
      'Premium residential projects',
      'Safety-certified scaffolding for height work',
    ],
    constructionTypes: ['Ultra-Luxury High-Rises', 'Sea-Link Infrastructure', 'Premium Residences', 'Commercial Towers'],
    landmarks: ['Bandra-Worli Sea Link', 'Worli Sea Face', 'Four Seasons Hotel'],
  },
  // Western Suburbs
  {
    slug: 'bandra',
    name: 'Bandra',
    region: 'Western Suburbs',
    pincode: '400050',
    nearbyAreas: ['Khar', 'Santacruz', 'Kurla', 'Mahim'],
    description:
      'Bandra, the Queen of Suburbs, is a prime residential and commercial locality in Mumbai. Bombay Sky High provides scaffolding for bungalow renovations, high-rise apartments, commercial spaces, and entertainment industry projects across Bandra East and West.',
    highlights: [
      'Bungalow and villa scaffolding',
      'High-rise apartment construction',
      'Commercial and retail projects',
      'Film and entertainment industry support',
    ],
    constructionTypes: ['Residential Bungalows', 'High-Rise Apartments', 'Retail Spaces', 'Entertainment Venues'],
    landmarks: ['Bandstand', 'Linking Road', 'Bandra-Kurla Complex'],
  },
  {
    slug: 'andheri',
    name: 'Andheri',
    region: 'Western Suburbs',
    pincode: '400053',
    nearbyAreas: ['Jogeshwari', 'Vile Parle', 'Lokhandwala', 'MIDC'],
    description:
      'Andheri is Mumbai\'s largest suburb with extensive commercial, industrial, and residential zones. Our scaffolding services cover IT parks in MIDC, film studios, residential complexes, and commercial developments across Andheri East and West.',
    highlights: [
      'IT park and corporate scaffolding',
      'Film industry infrastructure support',
      'Large-scale residential projects',
      'Industrial zone scaffolding services',
    ],
    constructionTypes: ['IT Parks', 'Film Studios', 'Residential Complexes', 'Industrial Buildings'],
    landmarks: ['MIDC Andheri', 'Lokhandwala Complex', 'Andheri Station'],
  },
  {
    slug: 'goregaon',
    name: 'Goregaon',
    region: 'Western Suburbs',
    pincode: '400062',
    nearbyAreas: ['Malad', 'Jogeshwari', 'Aarey', 'Oberoi Garden City'],
    description:
      'Goregaon has emerged as a major hub for film production, IT, and residential development. Bombay Sky High supplies scaffolding for studio construction, corporate campuses, and large township projects in Goregaon East and West.',
    highlights: [
      'Film city and studio scaffolding',
      'Township project support',
      'Corporate campus construction',
      'Large-scale residential developments',
    ],
    constructionTypes: ['Film Studios', 'IT Campuses', 'Township Projects', 'Commercial Hubs'],
    landmarks: ['Film City', 'Oberoi Mall', 'NESCO Exhibition Center'],
  },
  {
    slug: 'malad',
    name: 'Malad',
    region: 'Western Suburbs',
    pincode: '400064',
    nearbyAreas: ['Goregaon', 'Kandivali', 'Marve', 'Mindspace'],
    description:
      'Malad is a rapidly developing suburb with significant commercial and residential growth. Our scaffolding services support IT park construction in Mindspace, residential tower projects, and commercial developments throughout Malad.',
    highlights: [
      'Mindspace IT park scaffolding',
      'Residential high-rise support',
      'Commercial plaza construction',
      'Coastal area project expertise',
    ],
    constructionTypes: ['IT Parks', 'Residential Towers', 'Commercial Plazas', 'Retail Malls'],
    landmarks: ['Mindspace Malad', 'Inorbit Mall', 'Malad Creek'],
  },
  {
    slug: 'kandivali',
    name: 'Kandivali',
    region: 'Western Suburbs',
    pincode: '400067',
    nearbyAreas: ['Malad', 'Borivali', 'Charkop', 'Dahisar'],
    description:
      'Kandivali is a well-established residential suburb with ongoing construction and redevelopment projects. Bombay Sky High provides scaffolding solutions for housing societies, commercial buildings, and infrastructure projects in Kandivali.',
    highlights: [
      'Housing society redevelopment',
      'Commercial building construction',
      'Educational institution projects',
      'Quick delivery from nearby depot',
    ],
    constructionTypes: ['Residential Societies', 'Commercial Buildings', 'Schools & Colleges', 'Healthcare Facilities'],
    landmarks: ['Thakur Village', 'Lokhandwala Township', 'Poisar Depot'],
  },
  {
    slug: 'borivali',
    name: 'Borivali',
    region: 'Western Suburbs',
    pincode: '400066',
    nearbyAreas: ['Kandivali', 'Dahisar', 'Gorai', 'National Park'],
    description:
      'Borivali is a major residential and commercial hub at the northern edge of Mumbai city. Our scaffolding services cater to large residential complexes, commercial centers, and infrastructure projects near Sanjay Gandhi National Park area.',
    highlights: [
      'Large residential complex scaffolding',
      'Commercial center construction',
      'Eco-sensitive area expertise',
      'Northern Mumbai coverage',
    ],
    constructionTypes: ['Residential Complexes', 'Commercial Centers', 'Hospitality Projects', 'Infrastructure'],
    landmarks: ['Sanjay Gandhi National Park', 'Borivali Station', 'IC Colony'],
  },
  {
    slug: 'dahisar',
    name: 'Dahisar',
    region: 'Western Suburbs',
    pincode: '400068',
    nearbyAreas: ['Borivali', 'Mira Road', 'Kandivali', 'Check Naka'],
    description:
      'Dahisar marks the northern boundary of Mumbai and is witnessing significant residential development. Bombay Sky High provides scaffolding for new construction projects, society redevelopment, and commercial buildings in Dahisar East and West.',
    highlights: [
      'New township development support',
      'Society redevelopment scaffolding',
      'Border area logistics advantage',
      'Competitive pricing for bulk orders',
    ],
    constructionTypes: ['New Townships', 'Residential Redevelopment', 'Commercial Projects', 'Industrial Units'],
    landmarks: ['Dahisar Check Naka', 'Link Road', 'Western Express Highway'],
  },
  // Central Mumbai & Eastern Suburbs
  {
    slug: 'kurla',
    name: 'Kurla',
    region: 'Eastern Suburbs',
    pincode: '400070',
    nearbyAreas: ['Ghatkopar', 'Chembur', 'BKC', 'Vidyavihar'],
    description:
      'Kurla is strategically located near BKC and is a major transit hub with commercial and residential development. Our scaffolding services support corporate projects in BKC vicinity, residential towers, and infrastructure projects in Kurla.',
    highlights: [
      'BKC proximity advantage',
      'Commercial tower scaffolding',
      'Transit hub infrastructure',
      'Eastern suburbs coverage',
    ],
    constructionTypes: ['Corporate Towers', 'Residential Buildings', 'Transit Infrastructure', 'Commercial Complexes'],
    landmarks: ['Bandra-Kurla Complex', 'Kurla Station', 'Phoenix Market City'],
  },
  {
    slug: 'ghatkopar',
    name: 'Ghatkopar',
    region: 'Eastern Suburbs',
    pincode: '400077',
    nearbyAreas: ['Vikhroli', 'Kurla', 'Chembur', 'Powai'],
    description:
      'Ghatkopar is a thriving commercial and residential locality in Eastern Mumbai with metro connectivity. Bombay Sky High supplies scaffolding for high-rise residential projects, commercial complexes, and metro-related infrastructure in Ghatkopar.',
    highlights: [
      'Metro corridor infrastructure support',
      'High-rise residential scaffolding',
      'Commercial complex construction',
      'Eastern Express Highway access',
    ],
    constructionTypes: ['High-Rise Residences', 'Commercial Complexes', 'Metro Infrastructure', 'Retail Malls'],
    landmarks: ['R City Mall', 'Ghatkopar Metro Station', 'Pant Nagar'],
  },
  {
    slug: 'powai',
    name: 'Powai',
    region: 'Eastern Suburbs',
    pincode: '400076',
    nearbyAreas: ['Chandivali', 'Vikhroli', 'Hiranandani', 'IITB'],
    description:
      'Powai is Mumbai\'s IT and education hub featuring Hiranandani Gardens and IIT Bombay campus. Our scaffolding services cater to corporate offices, IT parks, premium residential towers, and institutional projects in the Powai lake area.',
    highlights: [
      'IT park specialized scaffolding',
      'Premium township construction',
      'Educational institution projects',
      'Corporate campus support',
    ],
    constructionTypes: ['IT Parks', 'Premium Residences', 'Educational Campuses', 'Corporate Offices'],
    landmarks: ['Hiranandani Gardens', 'IIT Bombay', 'Powai Lake'],
  },
  {
    slug: 'mulund',
    name: 'Mulund',
    region: 'Eastern Suburbs',
    pincode: '400080',
    nearbyAreas: ['Thane', 'Bhandup', 'Nahur', 'Airoli'],
    description:
      'Mulund is a well-planned residential suburb at the Mumbai-Thane border with excellent infrastructure. Bombay Sky High provides scaffolding for residential redevelopment, commercial projects, and construction near Sanjay Gandhi National Park.',
    highlights: [
      'Mumbai-Thane border coverage',
      'Residential redevelopment expertise',
      'Large society scaffolding',
      'Quick deployment from Thane depot',
    ],
    constructionTypes: ['Residential Redevelopment', 'Commercial Buildings', 'Healthcare Facilities', 'Educational Institutions'],
    landmarks: ['Mulund Check Naka', 'R Mall Mulund', 'Johnson & Johnson'],
  },
  {
    slug: 'bhandup',
    name: 'Bhandup',
    region: 'Eastern Suburbs',
    pincode: '400078',
    nearbyAreas: ['Mulund', 'Kanjurmarg', 'Nahur', 'Vikhroli'],
    description:
      'Bhandup is a residential locality with ongoing construction and redevelopment activity. Our scaffolding services support housing society projects, commercial developments, and infrastructure work in Bhandup East and West.',
    highlights: [
      'Affordable scaffolding solutions',
      'Society cluster projects',
      'Industrial area coverage',
      'Eastern suburbs network',
    ],
    constructionTypes: ['Residential Societies', 'Industrial Buildings', 'Commercial Spaces', 'Infrastructure Projects'],
    landmarks: ['Neptune Mall', 'LBS Road', 'Bhandup Industrial Area'],
  },
  // Thane & MMR
  {
    slug: 'thane',
    name: 'Thane',
    region: 'Thane & MMR',
    pincode: '400601',
    nearbyAreas: ['Mulund', 'Kalwa', 'Diva', 'Ghodbunder Road'],
    description:
      'Thane is a major city in the Mumbai Metropolitan Region with massive residential and commercial development. As our primary base, Bombay Sky High offers comprehensive scaffolding solutions for high-rises, townships, and infrastructure projects across Thane city.',
    highlights: [
      'Headquarters location advantage',
      'Largest inventory in MMR',
      'Same-day delivery available',
      'Complete scaffolding solutions',
    ],
    constructionTypes: ['High-Rise Towers', 'Township Projects', 'Commercial Hubs', 'Infrastructure Development'],
    landmarks: ['Viviana Mall', 'Hiranandani Estate', 'Ghodbunder Road'],
  },
  {
    slug: 'navi-mumbai',
    name: 'Navi Mumbai',
    region: 'Thane & MMR',
    pincode: '400703',
    nearbyAreas: ['Vashi', 'Nerul', 'Kharghar', 'Belapur'],
    description:
      'Navi Mumbai is a planned city with modern infrastructure and extensive ongoing construction. Bombay Sky High is a leading scaffolding supplier across Navi Mumbai nodes including Vashi, Nerul, Kharghar, Belapur, and upcoming areas near the new airport.',
    highlights: [
      'All Navi Mumbai nodes coverage',
      'Airport area project support',
      'Large township scaffolding',
      'CIDCO project expertise',
    ],
    constructionTypes: ['Planned Townships', 'SEZ Projects', 'Airport Infrastructure', 'Commercial Districts'],
    landmarks: ['Palm Beach Road', 'Kharghar Hills', 'Navi Mumbai Airport'],
  },
  {
    slug: 'kalyan-dombivli',
    name: 'Kalyan-Dombivli',
    region: 'Thane & MMR',
    pincode: '421201',
    nearbyAreas: ['Dombivli', 'Kalyan', 'Ambernath', 'Badlapur'],
    description:
      'Kalyan-Dombivli is one of the largest municipal corporations in MMR with rapid urbanization. Our scaffolding services support the growing construction demand for residential complexes, commercial buildings, and infrastructure in KDMC area.',
    highlights: [
      'Affordable pricing for KDMC area',
      'Bulk order discounts',
      'Fast delivery network',
      'Long-term rental options',
    ],
    constructionTypes: ['Residential Complexes', 'Commercial Buildings', 'Industrial Projects', 'Railway Infrastructure'],
    landmarks: ['Kalyan Station', 'Metro Mall', 'Dombivli MIDC'],
  },
  {
    slug: 'panvel',
    name: 'Panvel',
    region: 'Thane & MMR',
    pincode: '410206',
    nearbyAreas: ['Kharghar', 'Kamothe', 'New Panvel', 'Taloja'],
    description:
      'Panvel is emerging as a major growth center in MMR with the upcoming Navi Mumbai International Airport. Bombay Sky High provides scaffolding for airport-related construction, residential projects, and commercial developments in Panvel taluka.',
    highlights: [
      'Airport corridor projects',
      'Emerging area growth partner',
      'Industrial zone coverage',
      'Competitive MMR pricing',
    ],
    constructionTypes: ['Airport Infrastructure', 'Residential Townships', 'Industrial Parks', 'Commercial Projects'],
    landmarks: ['Navi Mumbai Airport', 'Panvel Railway Station', 'Taloja MIDC'],
  },
  {
    slug: 'vasai-virar',
    name: 'Vasai-Virar',
    region: 'Thane & MMR',
    pincode: '401201',
    nearbyAreas: ['Nalasopara', 'Virar', 'Vasai', 'Palghar'],
    description:
      'Vasai-Virar is one of the fastest-growing urban areas in MMR with extensive residential construction. Bombay Sky High supplies scaffolding for housing projects, commercial buildings, and infrastructure development across Vasai-Virar City Municipal Corporation area.',
    highlights: [
      'Fastest growing region coverage',
      'Budget-friendly scaffolding options',
      'Large project capacity',
      'Extended MMR delivery network',
    ],
    constructionTypes: ['Mass Housing Projects', 'Commercial Complexes', 'Industrial Units', 'Infrastructure'],
    landmarks: ['Vasai Fort', 'Virar Station', 'Arnala Beach'],
  },
  {
    slug: 'mira-bhayandar',
    name: 'Mira-Bhayandar',
    region: 'Thane & MMR',
    pincode: '401105',
    nearbyAreas: ['Dahisar', 'Kashimira', 'Mira Road', 'Bhayandar'],
    description:
      'Mira-Bhayandar is a thriving city on Mumbai\'s northern border with continuous residential development. Our scaffolding services support high-rise construction, society redevelopment, and commercial projects across Mira Road and Bhayandar.',
    highlights: [
      'Mumbai border proximity advantage',
      'High-rise specialist scaffolding',
      'Society cluster project support',
      'Flexible rental terms',
    ],
    constructionTypes: ['High-Rise Residences', 'Commercial Spaces', 'Society Redevelopment', 'Retail Projects'],
    landmarks: ['Beverly Park', 'Mira Road Station', 'Kashimira Junction'],
  },
  {
    slug: 'bhiwandi',
    name: 'Bhiwandi',
    region: 'Thane & MMR',
    pincode: '421302',
    nearbyAreas: ['Kalyan', 'Thane', 'Mumbra', 'Diva'],
    description:
      'Bhiwandi is a major industrial and logistics hub with warehousing and manufacturing facilities. Bombay Sky High provides industrial scaffolding for warehouse construction, factory maintenance, and infrastructure projects in Bhiwandi-Nizampur area.',
    highlights: [
      'Industrial scaffolding expertise',
      'Warehouse construction support',
      'Heavy-duty scaffolding systems',
      'Logistics hub advantage',
    ],
    constructionTypes: ['Warehouses', 'Industrial Facilities', 'Logistics Parks', 'Manufacturing Units'],
    landmarks: ['Bhiwandi Bypass', 'Dapoda Industrial Area', 'Anjur Phata'],
  },
  {
    slug: 'ulhasnagar',
    name: 'Ulhasnagar',
    region: 'Thane & MMR',
    pincode: '421003',
    nearbyAreas: ['Kalyan', 'Ambernath', 'Badlapur', 'Vitthalwadi'],
    description:
      'Ulhasnagar is a densely populated commercial and residential city in Thane district. Our scaffolding services cater to building redevelopment, commercial construction, and renovation projects throughout Ulhasnagar Municipal Corporation area.',
    highlights: [
      'Dense urban area expertise',
      'Compact scaffolding solutions',
      'Redevelopment project support',
      'Cost-effective options',
    ],
    constructionTypes: ['Building Redevelopment', 'Commercial Renovation', 'Residential Projects', 'Market Complexes'],
    landmarks: ['Ulhasnagar Station', 'Central Market', 'Camp Areas'],
  },
]

// Helper function to get location by slug
export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((location) => location.slug === slug)
}

// Helper function to get all slugs for generateStaticParams
export function getAllLocationSlugs(): string[] {
  return locations.map((location) => location.slug)
}

// Helper function to get locations by region
export function getLocationsByRegion(region: LocationData['region']): LocationData[] {
  return locations.filter((location) => location.region === region)
}

// Get related locations (same region, excluding current)
export function getRelatedLocations(currentSlug: string, limit: number = 4): LocationData[] {
  const current = getLocationBySlug(currentSlug)
  if (!current) return locations.slice(0, limit)
  
  const sameRegion = locations.filter(
    (loc) => loc.region === current.region && loc.slug !== currentSlug
  )
  
  if (sameRegion.length >= limit) {
    return sameRegion.slice(0, limit)
  }
  
  const others = locations.filter(
    (loc) => loc.region !== current.region && loc.slug !== currentSlug
  )
  
  return [...sameRegion, ...others].slice(0, limit)
}

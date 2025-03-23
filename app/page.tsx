"use client"

import { useState } from "react"
import { Search, User, Wifi, Coffee, Clock, Leaf, X, Menu, ChevronLeft } from "lucide-react"
import Image from "next/image"

export default function FindMe() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleMobileFilters = () => setMobileFiltersOpen(!mobileFiltersOpen)

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place)
  }

  const closeDetails = () => {
    setSelectedPlace(null)
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Navigation Bar */}
      <header className="flex h-16 items-center justify-between border-b border-gray-100 px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button className="md:hidden rounded-full p-2 hover:bg-gray-100" onClick={toggleMobileFilters}>
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-xl font-semibold text-teal-600">
            <Leaf className="h-6 w-6" />
            <span>FindMe</span>
          </div>
        </div>

        <div className="relative mx-4 flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for quiet places..."
              className="w-full rounded-full border border-gray-200 py-2 pl-10 pr-4 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
          <User size={20} />
        </button>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        {/* Mobile Filters Overlay */}
        <div
          className={`absolute inset-0 z-20 transform transition-transform duration-300 md:hidden ${mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button onClick={toggleMobileFilters} className="rounded-full p-1 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:block border-r border-gray-100 bg-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0"}`}
        >
          {sidebarOpen && <FilterPanel />}
        </aside>

        {/* Toggle Sidebar Button (Desktop) */}
        <button
          onClick={toggleSidebar}
          className="absolute left-64 top-4 z-10 hidden rounded-r-full bg-white p-1 shadow-md md:block"
          style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-64px)" }}
        >
          <ChevronLeft size={20} className={`transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`} />
        </button>

        {/* Main Content - Map */}
        <main className="relative flex-1 bg-blue-50">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-50">
            {/* Map Placeholder */}
          </div>

          {/* Sample Map Pins */}
          <div className="absolute left-1/4 top-1/3">
            <MapPin place={places[0]} onClick={() => handlePlaceClick(places[0])} />
          </div>
          <div className="absolute left-1/2 top-1/2">
            <MapPin place={places[1]} onClick={() => handlePlaceClick(places[1])} />
          </div>
          <div className="absolute left-2/3 top-1/4">
            <MapPin place={places[2]} onClick={() => handlePlaceClick(places[2])} />
          </div>
        </main>

        {/* Place Details Sidebar */}
        <div
          className={`absolute right-0 top-0 z-10 h-full w-full max-w-md transform border-l border-gray-100 bg-white shadow-lg transition-transform duration-300 md:w-96 ${selectedPlace ? "translate-x-0" : "translate-x-full"}`}
        >
          {selectedPlace && <PlaceDetails place={selectedPlace} onClose={closeDetails} />}
        </div>
      </div>
    </div>
  )
}

// Filter Panel Component
function FilterPanel() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-medium text-gray-800">Filters</h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-2 font-medium text-gray-700">Quiet Level</h3>
          <input type="range" min="1" max="5" defaultValue="3" className="w-full accent-teal-500" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Whisper</span>
            <span>Silent</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="h-4 w-4 rounded accent-teal-500" />
            <Wifi size={16} className="text-teal-600" />
            <span>Wi-Fi Available</span>
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="h-4 w-4 rounded accent-teal-500" />
            <Coffee size={16} className="text-teal-600" />
            <span>Coffee Available</span>
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="h-4 w-4 rounded accent-teal-500" />
            <Clock size={16} className="text-teal-600" />
            <span>Open Now</span>
          </label>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-gray-700">Distance</h3>
          <select className="w-full rounded-md border border-gray-200 p-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
            <option>Less than 1 km</option>
            <option>1-5 km</option>
            <option>5-10 km</option>
            <option>Any distance</option>
          </select>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-gray-700">Environment</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-md bg-teal-50 p-2 text-sm text-teal-700 hover:bg-teal-100">Indoor</button>
            <button className="rounded-md bg-teal-50 p-2 text-sm text-teal-700 hover:bg-teal-100">Outdoor</button>
            <button className="rounded-md bg-teal-50 p-2 text-sm text-teal-700 hover:bg-teal-100">Nature</button>
            <button className="rounded-md bg-teal-50 p-2 text-sm text-teal-700 hover:bg-teal-100">Urban</button>
          </div>
        </div>

        <button className="w-full rounded-md bg-teal-600 py-2 text-white hover:bg-teal-700">Apply Filters</button>
      </div>
    </div>
  )
}

// Map Pin Component
function MapPin({ place, onClick }: { place: Place; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center transform transition-transform hover:scale-110">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white shadow-md">
        <Leaf size={20} />
      </div>
      <div className="mt-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">{place.name}</div>
    </button>
  )
}

// Place Details Component
function PlaceDetails({ place, onClose }: { place: Place; onClose: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative h-48">
        <Image
          src={place.image || "/placeholder.svg?height=400&width=600"}
          alt={place.name}
          fill
          className="object-cover"
        />
        <button
          onClick={onClose}
          className="absolute left-2 top-2 rounded-full bg-white/80 p-1 shadow-sm hover:bg-white"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800">{place.name}</h1>

        <div className="mt-2 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Leaf key={i} size={20} className={i < place.rating ? "text-teal-500" : "text-gray-200"} />
          ))}
          <span className="ml-2 text-sm text-gray-600">{place.reviewCount} reviews</span>
        </div>

        <div className="mt-4 flex gap-3">
          {place.hasWifi && (
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-2">
                <Wifi size={16} className="text-blue-500" />
              </div>
              <span className="mt-1 text-xs">Wi-Fi</span>
            </div>
          )}

          {place.hasCoffee && (
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-amber-50 p-2">
                <Coffee size={16} className="text-amber-600" />
              </div>
              <span className="mt-1 text-xs">Coffee</span>
            </div>
          )}

          {place.isOpenNow && (
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-green-50 p-2">
                <Clock size={16} className="text-green-600" />
              </div>
              <span className="mt-1 text-xs">Open</span>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-800">About</h2>
          <p className="mt-2 text-gray-600">{place.description}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-800">Reviews</h2>

          <div className="mt-3 space-y-4">
            {place.reviews.map((review, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    <span className="font-medium">{review.user}</span>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Leaf key={i} size={16} className={i < review.rating ? "text-teal-500" : "text-gray-200"} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Types and Sample Data
interface Review {
  user: string
  rating: number
  comment: string
}

interface Place {
  id: number
  name: string
  rating: number
  reviewCount: number
  hasWifi: boolean
  hasCoffee: boolean
  isOpenNow: boolean
  description: string
  image?: string
  reviews: Review[]
}

const places: Place[] = [
  {
    id: 1,
    name: "Serenity Garden",
    rating: 5,
    reviewCount: 42,
    hasWifi: true,
    hasCoffee: true,
    isOpenNow: true,
    description:
      "A peaceful garden with comfortable seating areas, surrounded by lush greenery and a small pond. Perfect for reading or quiet contemplation.",
    reviews: [
      {
        user: "Emma S.",
        rating: 5,
        comment: "My favorite spot to read and relax. The ambient sounds of nature are so calming.",
      },
      {
        user: "James T.",
        rating: 5,
        comment: "Great Wi-Fi speed and the coffee is excellent. I come here to work at least twice a week.",
      },
    ],
  },
  {
    id: 2,
    name: "Quiet Corner Café",
    rating: 4,
    reviewCount: 28,
    hasWifi: true,
    hasCoffee: true,
    isOpenNow: true,
    description:
      "A cozy café with a dedicated quiet zone. They serve excellent coffee and have a strict no-phone-calls policy in certain areas.",
    reviews: [
      {
        user: "Michael R.",
        rating: 4,
        comment: "The quiet zone is well-maintained. Staff are respectful of the atmosphere.",
      },
      { user: "Sarah L.", rating: 3, comment: "Good place, but can get busy during lunch hours." },
    ],
  },
  {
    id: 3,
    name: "Lakeside Retreat",
    rating: 5,
    reviewCount: 36,
    hasWifi: false,
    hasCoffee: false,
    isOpenNow: true,
    description:
      "A natural setting by the lake with benches and small pavilions. No amenities, but the sounds of water and birds create a perfect natural soundscape.",
    reviews: [
      {
        user: "David K.",
        rating: 5,
        comment: "No distractions, just nature. Perfect for meditation and clearing your mind.",
      },
      { user: "Lisa M.", rating: 5, comment: "The sunset views are incredible. My favorite place to journal." },
    ],
  },
]


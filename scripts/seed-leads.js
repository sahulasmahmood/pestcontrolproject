import dotenv from "dotenv"
import connectDB from "../config/models/connectDB.js"
import Lead from "../config/utils/admin/lead/leadSchema.js"

// Load environment variables
dotenv.config()

const sampleLeads = [
  {
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    serviceType: "Anti-Termite Treatment",
    serviceDate: "2024-02-15",
    serviceTime: "10:00 AM",
    address: "123 Anna Nagar, Chennai",
    propertyType: "residential",
    propertySize: 1200,
    message: "Need urgent anti-termite treatment for my house. Found termite damage in wooden furniture. Please inspect and provide quote.",
    status: "new",
    priority: "high",
    source: "website",
    estimatedCost: "₹8,000",
    notes: "",
    submittedAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    fullName: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    serviceType: "Rodent Control",
    serviceDate: "2024-02-20",
    serviceTime: "2:00 PM",
    address: "456 Brigade Road, Bangalore",
    propertyType: "commercial",
    propertySize: 2500,
    message: "Restaurant facing rat problem in kitchen area. Need immediate professional rodent control service with safe methods.",
    status: "contacted",
    priority: "medium",
    source: "whatsapp",
    estimatedCost: "₹12,000",
    notes: "Restaurant owner. Prefers eco-friendly treatment. Follow up scheduled for inspection.",
    submittedAt: new Date("2024-01-14T15:45:00Z"),
  },
  {
    fullName: "Arun Vijay",
    email: "arun.vijay@email.com",
    phone: "+91 76543 21098",
    serviceType: "Bed Bug Treatment",
    serviceDate: "2024-02-18",
    serviceTime: "9:00 AM",
    address: "789 IT Park, Chennai",
    propertyType: "office",
    propertySize: 800,
    message: "Office facing bed bug infestation in employee rest area. Need professional treatment during weekend.",
    status: "confirmed",
    priority: "medium",
    source: "phone",
    estimatedCost: "₹6,500",
    notes: "Confirmed for weekend treatment. Payment approved by management.",
    submittedAt: new Date("2024-01-13T09:20:00Z"),
  },
  {
    fullName: "Meera Nair",
    email: "meera.nair@email.com",
    phone: "+91 65432 10987",
    serviceType: "Cockroach Control",
    serviceDate: "2024-02-16",
    serviceTime: "11:00 AM",
    address: "321 RS Puram, Coimbatore",
    propertyType: "residential",
    propertySize: 1000,
    message: "Severe cockroach problem in kitchen and bathroom. Need safe treatment as we have small children at home.",
    status: "completed",
    priority: "low",
    source: "referral",
    estimatedCost: "₹4,500",
    notes: "Treatment completed successfully. Customer very satisfied. Child-safe methods used.",
    submittedAt: new Date("2024-01-12T11:00:00Z"),
  },
  {
    fullName: "Suresh Babu",
    email: "suresh.babu@email.com",
    phone: "+91 98765 12345",
    serviceType: "Mosquito Control",
    serviceDate: "2024-02-22",
    serviceTime: "6:00 PM",
    address: "654 Temple Street, Madurai",
    propertyType: "residential",
    propertySize: 1500,
    message: "Large property with garden area. Mosquito breeding in water storage areas. Need comprehensive treatment.",
    status: "new",
    priority: "medium",
    source: "website",
    estimatedCost: "₹7,500",
    notes: "",
    submittedAt: new Date("2024-01-16T14:20:00Z"),
  },
  {
    fullName: "Lakshmi Devi",
    email: "lakshmi.devi@email.com",
    phone: "+91 87654 98765",
    serviceType: "Disinfection Service",
    serviceDate: "2024-02-19",
    serviceTime: "8:00 AM",
    address: "987 Main Road, Trichy",
    propertyType: "commercial",
    propertySize: 500,
    message: "Small clinic needs regular disinfection service. Prefer eco-friendly sanitizers safe for patients.",
    status: "contacted",
    priority: "high",
    source: "phone",
    estimatedCost: "₹3,500",
    notes: "Medical facility. Requires certified disinfectants. Monthly service preferred.",
    submittedAt: new Date("2024-01-17T09:15:00Z"),
  },
  {
    fullName: "Karthik Raman",
    email: "karthik.raman@email.com",
    phone: "+91 76543 87654",
    serviceType: "Ant Control",
    serviceDate: "2024-02-25",
    serviceTime: "3:00 PM",
    address: "147 Lake View, Chennai",
    propertyType: "apartment",
    propertySize: 900,
    message: "New apartment facing ant infestation in kitchen. Need effective treatment that prevents re-entry.",
    status: "new",
    priority: "medium",
    source: "whatsapp",
    estimatedCost: "₹3,000",
    notes: "",
    submittedAt: new Date("2024-01-18T16:30:00Z"),
  },
  {
    fullName: "Anitha Krishnan",
    email: "anitha.krishnan@email.com",
    phone: "+91 65432 54321",
    serviceType: "Commercial Pest Control",
    serviceDate: "2024-02-21",
    serviceTime: "7:00 AM",
    address: "258 Industrial Area, Chennai",
    propertyType: "warehouse",
    propertySize: 5000,
    message: "Large warehouse needs comprehensive pest control. Multiple pest issues including rodents and insects.",
    status: "confirmed",
    priority: "high",
    source: "referral",
    estimatedCost: "₹25,000",
    notes: "Industrial client. Quarterly contract confirmed. Payment via company account.",
    submittedAt: new Date("2024-01-19T11:45:00Z"),
  }
];

async function seedLeads() {
  try {
    console.log("Connecting to database...")
    await connectDB()

    // Check if leads already exist
    const existingLeads = await Lead.countDocuments()
    if (existingLeads > 0) {
      console.log(`Database already has ${existingLeads} leads. Skipping seed.`)
      process.exit(0)
    }

    console.log("Seeding sample leads...")
    const createdLeads = await Lead.insertMany(sampleLeads)

    console.log("Lead seeding completed successfully!")
    console.log(`Created ${createdLeads.length} sample leads:`)
    
    createdLeads.forEach((lead, index) => {
      console.log(`${index + 1}. ${lead.fullName} - ${lead.serviceType} (${lead.status})`)
    })

    process.exit(0)
  } catch (error) {
    console.error("Error seeding leads:", error)
    process.exit(1)
  }
}

// Run the seeding function
seedLeads()
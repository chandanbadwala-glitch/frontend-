export const jobCategories = ["Kitchen", "Service", "Beverage", "Bakery", "Housekeeping", "Management"];

export const cities = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Goa", "Jaipur", "Kolkata", "Ahmedabad", "Lucknow"];

export const testimonials = [
  { name: "Rahul Kapoor", role: "Owner, Spice Terrace — Mumbai", quote: "I posted a tandoor requirement at 11 PM. The admin team called me next morning with three verified chefs. Zero spam, zero brokers." },
  { name: "Anjali Nair", role: "Continental Chef — Bengaluru", quote: "No random calls, no fake offers. The admin verified the property before I even spoke to them. That respect is new for our industry." },
  { name: "Farah Sheikh", role: "GM, The Amber Palace — Jaipur", quote: "We staffed an entire banquet season through ChefConnect Pro. The commission model is cheaper than any consultant we used." },
];

export const faqs = [
  { q: "Why can't owners and employees contact each other directly?", a: "Every connection is mediated by our admin desk. It protects candidates from spam and fake offers, and protects owners from unverified staff and no-shows. Admin verifies both sides, then introduces them." },
  { q: "How fast is a staff request handled?", a: "Requests are picked up by an admin within 4 working hours. Urgent hiring requests are escalated immediately and typically shortlisted the same day." },
  { q: "Do employees pay anything?", a: "Never. Employee profiles, verification and placement are completely free. Revenue comes from owner subscriptions and placement commission." },
  { q: "What documents are verified?", a: "Aadhaar, PAN, qualification certificates, experience letters and, for properties, GST and FSSAI where applicable." },
  { q: "Can I hire for multiple properties?", a: "Yes. Professional and Enterprise plans support unlimited properties, team seats and consolidated GST invoicing." },
];

export const plans = [
  { name: "Free", price: "₹0", period: "forever", highlight: false, features: ["1 property", "1 live requirement", "10 profile views / month", "Standard admin queue", "Email support"] },
  { name: "Basic", price: "₹1,999", period: "per month", highlight: false, features: ["2 properties", "5 live requirements", "100 profile views", "Verified badge", "48h admin response"] },
  { name: "Professional", price: "₹4,999", period: "per month", highlight: true, features: ["Unlimited properties", "25 live requirements", "Unlimited profile views", "Urgent hiring badge", "Priority listing + 4h admin response", "AI match scoring & analytics"] },
  { name: "Enterprise", price: "Custom", period: "annual", highlight: false, features: ["Chain & group accounts", "Dedicated admin manager", "Custom commission slabs", "API & HRMS export", "GST invoicing + wallet", "Quarterly hiring review"] },
];

export const hiringSteps = [
  { title: "Owner requests staff", body: "Post a requirement with salary, shift, accommodation and skills. No candidate contact details are exposed." },
  { title: "Admin reviews", body: "Our hospitality desk validates the property, plan limits and requirement quality within hours." },
  { title: "Admin shortlists & calls", body: "Admin reaches out to matched verified candidates, checks availability and shares the offer." },
  { title: "Employee accepts", body: "Candidate confirms interest. Only then does admin introduce both parties." },
  { title: "Connection made", body: "Admin opens a moderated introduction, tracks joining and closes the placement with an invoice." },
];

// Placeholder for admin dashboard charts
export const hiringTrend = [
  { month: "Feb", requests: 180, placements: 96 },
  { month: "Mar", requests: 226, placements: 128 },
  { month: "Apr", requests: 274, placements: 164 },
  { month: "May", requests: 318, placements: 201 },
  { month: "Jun", requests: 402, placements: 268 },
  { month: "Jul", requests: 465, placements: 314 },
];

export const topCities = [
  { city: "Mumbai", hires: 412 },
  { city: "Delhi", hires: 356 },
  { city: "Bengaluru", hires: 298 },
  { city: "Hyderabad", hires: 214 },
  { city: "Jaipur", hires: 176 },
];

export const popularSkills = [
  { skill: "Tandoor", demand: 92 },
  { skill: "Continental", demand: 78 },
  { skill: "Barista", demand: 71 },
  { skill: "Housekeeping", demand: 64 },
  { skill: "Bakery", demand: 58 },
];
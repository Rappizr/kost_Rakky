import { Room, Tenant, ActivityLog } from "./types";

export const ROOMS: Room[] = [
  { id: 1, number: "101", type: "Standard Single", price: 900000, status: "Available", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format", rating: 4.5, size: "12 m²", floor: 1, desc: "Cozy standard room perfect for solo travelers. Comes with essential amenities and natural lighting." },
  { id: 2, number: "102", type: "Deluxe Single", price: 1200000, status: "Occupied", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format", rating: 4.7, size: "15 m²", floor: 1, desc: "Spacious deluxe single with premium furnishings, ideal for professionals and students." },
  { id: 3, number: "201", type: "Deluxe Double", price: 1500000, status: "Available", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format", rating: 4.8, size: "20 m²", floor: 2, desc: "Premium double room with city view, perfect for couples or those who need extra space." },
  { id: 4, number: "202", type: "Executive Suite", price: 2200000, status: "Available", image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=600&auto=format", rating: 5.0, size: "28 m²", floor: 2, desc: "Our flagship executive suite with panoramic views, separate living area, and luxury amenities." },
  { id: 5, number: "301", type: "Standard Single", price: 900000, status: "Occupied", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format", rating: 4.3, size: "12 m²", floor: 3, desc: "Top-floor standard room with great natural light and peaceful ambiance." },
  { id: 6, number: "302", type: "Deluxe Double", price: 1500000, status: "Available", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format", rating: 4.6, size: "20 m²", floor: 3, desc: "Well-appointed double room on the top floor with mountain views of Malang." },
];

export const TENANTS: Tenant[] = [
  { id: 1, name: "Budi Santoso", room: "102", checkin: "2024-01-15", status: "Paid", phone: "0812-3456-7890" },
  { id: 2, name: "Siti Rahayu", room: "301", checkin: "2024-02-01", status: "Paid", phone: "0813-2345-6789" },
  { id: 3, name: "Ahmad Fauzi", room: "103", checkin: "2024-03-10", status: "Pending", phone: "0814-3456-7891" },
  { id: 4, name: "Dewi Kartika", room: "204", checkin: "2024-01-20", status: "Paid", phone: "0815-4567-8901" },
  { id: 5, name: "Rizky Pratama", room: "305", checkin: "2024-04-05", status: "Pending", phone: "0816-5678-9012" },
];

export const ACTIVITY_LOG: ActivityLog[] = [
  { id: 1, text: "New inquiry for Room 201", time: "2 min ago", type: "inquiry" },
  { id: 2, text: "Tenant checkout Room 105", time: "1 hr ago", type: "checkout" },
  { id: 3, text: "Payment received from Budi Santoso", time: "3 hrs ago", type: "payment" },
  { id: 4, text: "Room 302 marked as available", time: "5 hrs ago", type: "update" },
  { id: 5, text: "New booking request for Room 201", time: "1 day ago", type: "booking" },
  { id: 6, text: "Maintenance request for Room 103", time: "2 days ago", type: "maintenance" },
];

export const formatRupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
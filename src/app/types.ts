export interface Room {
  id: number;
  number: string;
  type: string;
  price: number;
  status: string;
  image: string;
  rating: number;
  size: string;
  floor: number;
  desc: string;
}

export interface Tenant {
  id: number;
  name: string;
  room: string;
  checkin: string;
  status: string;
  phone: string;
}

export interface ActivityLog {
  id: number;
  text: string;
  time: string;
  type: "inquiry" | "checkout" | "payment" | "update" | "booking" | "maintenance";
}

export interface RoomFormState {
  number: string;
  type: string;
  price: string;
  facilities: string[];
  image: File | null;
}

export interface DecorationBubble {
  width: number;
  height: number;
  left: string;
  top: string;
  opacity: number;
}
import React from "react";
import { 
  ArrowLeft, Hash, Building2, BedDouble, Star, Wind, Bath, Shirt, 
  Briefcase, Wifi, Zap, Coffee, Shield, Check, MessageCircle 
} from "lucide-react";
import { Room } from "../types";
import { formatRupiah } from "../mockData";

const ROOM_FACILITIES = [
  { icon: Bath, label: "Kamar Mandi Dalam" },
  { icon: Shirt, label: "Lemari Pakaian" },
  { icon: Zap, label: "Listrik Token" },
  { icon: Coffee, label: "Air PDAM" },
];

const ROOM_RULES = [
  "Dilarang membuat keributan setelah jam 22:00 WIB",
  "Wajib menjaga kebersihan area bersama",
  "Dilarang membawa pasangan ke dalam kamar",
  "Dilarang merusak fasilitas kamar",
];

interface RoomDetailProps {
  room: Room;
  onBack: () => void;
}

export default function RoomDetail({ room, onBack }: RoomDetailProps) {
  const waText = encodeURIComponent(
    `Halo, saya tertarik dengan Kamar ${room.number} (${room.type}) dengan harga Rp ${room.price.toLocaleString("id-ID")}/bulan.`
  );
  const waUrl = `https://wa.me/628883199088?text=${waText}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0D6E6E]/20 selection:text-[#0D6E6E] pb-24 lg:pb-0">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 lg:h-16 flex items-center gap-3 lg:gap-4">
          <button 
            onClick={onBack} 
            className="flex items-center gap-1.5 lg:gap-2 text-slate-500 hover:text-[#0D6E6E] font-medium text-xs lg:text-sm transition-colors group px-2 py-1 -ml-2"
          >
            <ArrowLeft size={16} className="lg:w-[18px] lg:h-[18px] group-hover:-translate-x-1.5 transition-transform" />
            Kembali 
          </button>
          <div className="w-px h-4 lg:h-5 bg-slate-200" />
          <span className="text-slate-400 text-xs lg:text-sm font-medium truncate">Kamar {room.number} — {room.type}</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* KONTEN UTAMA (Kiri di Desktop, Full Width di Mobile) */}
          <div className="w-full lg:w-[65%] space-y-6 lg:space-y-8">
            
            {/* GRID GAMBAR */}
            <section className="grid grid-cols-2 gap-2 lg:gap-3">
              <div className="col-span-2 rounded-2xl lg:rounded-3xl overflow-hidden h-48 sm:h-64 lg:h-80 shadow-sm">
                <img src={room.image} alt="Kamar Utama" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              {[1, 2].map(i => (
                <div key={i} className="bg-slate-200 rounded-xl lg:rounded-2xl h-24 sm:h-32 lg:h-40 overflow-hidden shadow-sm">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? "1616594039964-ae9021a400a0" : "1555041469-a586c61ea9bc"}?w=400&auto=format`} 
                    alt="Sudut Lain" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
              ))}
            </section>

            {/* DESKRIPSI KAMAR */}
            <section className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-7 border border-slate-100 shadow-sm">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 mb-3 lg:mb-4 truncate">{room.type}</h1>
              
              <div className="flex flex-wrap gap-2 lg:gap-4 mb-4 lg:mb-5">
                <span className="bg-slate-100 text-slate-600 px-2.5 py-1.5 lg:px-3 lg:py-1.5 rounded-lg text-xs lg:text-sm flex items-center gap-1.5 font-medium whitespace-nowrap">
                  <Hash size={14} className="text-slate-400" />Km {room.number}
                </span>
                <span className="bg-slate-100 text-slate-600 px-2.5 py-1.5 lg:px-3 lg:py-1.5 rounded-lg text-xs lg:text-sm flex items-center gap-1.5 font-medium whitespace-nowrap">
                  <Building2 size={14} className="text-slate-400" />Lt {room.floor}
                </span>
                <span className="bg-amber-50 text-amber-700 px-2.5 py-1.5 lg:px-3 lg:py-1.5 rounded-lg text-xs lg:text-sm flex items-center gap-1.5 font-medium border border-amber-100 whitespace-nowrap">
                  <Star size={14} className="fill-amber-400" />{room.rating}
                </span>
              </div>
              
              <p className="text-slate-600 leading-relaxed text-sm lg:text-[15px]">
                {room.desc} Terletak di kabupaten Mojokerto, menawarkan perpaduan sempurna antara kenyamanan dan aksesibilitas.
              </p>
            </section>

            {/* SPESIFIKASI KHUSUS MOBILE (Muncul di HP saja, di Desktop ikut Sidebar) */}
            <section className="lg:hidden bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h2 className="font-bold text-slate-800 text-lg mb-4">Spesifikasi Kamar</h2>
              
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5 mb-4 w-fit">
                <div className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <span className="text-emerald-700 text-xs font-bold uppercase tracking-wide">{room.status}</span>
              </div>

              <div className="space-y-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500">Tipe Kamar</span>
                  <span className="font-bold text-slate-800 text-right">{room.type}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500">Ukuran</span>
                  <span className="font-bold text-slate-800">{room.size}</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-slate-500">Lantai</span>
                  <span className="font-bold text-slate-800">{room.floor}</span>
                </div>
              </div>
            </section>

            {/* FASILITAS */}
            <section className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-7 border border-slate-100 shadow-sm">
              <h2 className="font-bold text-slate-800 text-lg lg:text-xl mb-4 lg:mb-6 flex items-center gap-2">Fasilitas Premium</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
                {ROOM_FACILITIES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center justify-center gap-2 lg:gap-3 p-3 lg:p-4 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100 text-center">
                    <Icon size={18} className="lg:w-5 lg:h-5 text-[#0D6E6E]" />
                    <span className="text-xs lg:text-[13px] font-semibold text-slate-600 leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ATURAN */}
            <section className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-7 border border-slate-100 shadow-sm">
              <h2 className="font-bold text-slate-800 text-lg lg:text-xl mb-4 lg:mb-6">Tata Tertib & Aturan</h2>
              <div className="flex flex-col gap-3 lg:gap-4">
                {ROOM_RULES.map((rule, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm lg:text-[15px] text-slate-600">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="lg:w-3.5 lg:h-3.5 text-emerald-600" />
                    </div>
                    <span className="leading-relaxed">{rule}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* SIDEBAR DESKTOP (Sembunyi di Mobile, Muncul di Layar Besar) */}
          <aside className="hidden lg:block w-[35%] relative">
            <div className="sticky top-24 bg-white rounded-3xl p-7 border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
              <div>
                <p className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-1">Harga Sewa</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[#0D6E6E] font-extrabold text-4xl tracking-tight leading-none">{formatRupiah(room.price).replace(",00", "")}</h3>
                  <span className="text-slate-400 font-medium text-sm">/bln</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 justify-start">
                <div className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span className="text-emerald-700 text-sm font-semibold uppercase">{room.status}</span>
              </div>

              <div className="space-y-4 text-sm text-slate-600 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
                  <span className="text-slate-500">Tipe</span>
                  <span className="font-bold text-slate-800 text-right">{room.type}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
                  <span className="text-slate-500">Ukuran</span>
                  <span className="font-bold text-slate-800">{room.size}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
                  <span className="text-slate-500">Lantai</span>
                  <span className="font-bold text-slate-800">{room.floor}</span>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={waUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-2.5 w-full bg-slate-900 hover:bg-[#0D6E6E] text-white font-bold py-4 rounded-2xl transition-all shadow-md text-base text-center"
                >
                  <MessageCircle size={20} />
                  Hubungi Pemilik
                </a>
                <p className="text-center text-slate-400 text-xs mt-4 font-medium flex items-center justify-center gap-1.5">
                  <Shield size={12} className="flex-shrink-0" />
                  Transaksi aman
                </p>
              </div>
            </div>
          </aside>
          
        </div>
      </main>

      {/* BOTTOM BAR KHUSUS MOBILE (Melayang di bawah layar) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 px-5 py-3.5 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-0.5">Harga Sewa</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-[#0D6E6E] font-extrabold text-xl leading-none">{formatRupiah(room.price).replace(",00", "")}</h3>
            <span className="text-slate-400 font-medium text-[10px]">/bln</span>
          </div>
        </div>
        <a 
          href={waUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center justify-center gap-2 bg-slate-900 active:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm shadow-md"
        >
          <MessageCircle size={18} />
          Hubungi
        </a>
      </div>

    </div>
  );
}
import React, { useState, useEffect } from "react";
import {
  Home,
  MapPin,
  Search,
  Star,
  ChevronRight,
  Wifi,
  Shield,
  Sparkles,
  Car,
  TreePine,
  Phone,
  Mail,
  Wallet,
  DoorOpen,
  UserCircle,
  Menu, // Ditambahkan untuk menu HP
  X     // Ditambahkan untuk tombol tutup menu HP
} from "lucide-react";
import { Room } from "../types";
import { ROOMS, formatRupiah } from "../mockData";
import { StatusBadge } from "./StatusBadge";
import RoomDetail from "./RoomDetail";

interface UserPortalProps {
  onSwitchRole: () => void;
}

export default function UserPortal({ onSwitchRole }: UserPortalProps) {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [search, setSearch] = useState({ price: "", type: "" });
  const [filtered, setFiltered] = useState<Room[]>(ROOMS);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State Menu HP

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter Logic
  useEffect(() => {
    setFiltered(
      ROOMS.filter((r: Room) => {
        const matchPrice = !search.price || r.price <= parseInt(search.price);
        const matchType =
          !search.type ||
          r.type.toLowerCase().includes(search.type.toLowerCase());
        return matchPrice && matchType;
      })
    );
  }, [search]);

  if (activeRoom)
    return <RoomDetail room={activeRoom} onBack={() => setActiveRoom(null)} />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0D6E6E] selection:text-white pb-0 overflow-x-hidden">
      
      {/* 1. NAVBAR MODERN (DESKTOP & MOBILE RESPONSIVE) */}
      <nav 
        className={`fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-6xl transition-all duration-500 rounded-full ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/80 backdrop-blur-md border border-white/40 shadow-lg shadow-slate-200/50 py-2" 
            : "bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg py-3"
        }`}
      >
        <div className="px-5 md:px-6 flex items-center justify-between relative">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#0D6E6E] to-[#073f3f] flex items-center justify-center shadow-md shadow-[#0D6E6E]/30">
              <Home size={18} className="text-white" />
            </div>
            <span className={`font-extrabold text-base md:text-lg tracking-tight transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-slate-800" : "text-white"}`}>
              Rakky <span className={isScrolled || isMobileMenuOpen ? "text-[#0D6E6E]" : "text-emerald-300"}>Griyo Asri</span>
            </span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {["Beranda", "Kamar", "Fasilitas", "Kontak", "IN/EN"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={`text-sm font-semibold transition-colors duration-300 ${
                  isScrolled 
                    ? "text-slate-600 hover:text-[#0D6E6E]" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {l}
              </a>
            ))}
            <div className={`w-px h-5 transition-colors duration-300 ${isScrolled ? "bg-slate-300" : "bg-white/30"}`}></div>
            <button 
              onClick={onSwitchRole}
              className={`flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "text-white bg-[#0D6E6E] hover:bg-[#073f3f] shadow-md shadow-[#0D6E6E]/20"
                  : "text-slate-900 bg-white hover:bg-slate-100 shadow-lg"
              }`}
            >
              <UserCircle size={18} />
              Portal Admin
            </button>
          </div>

          {/* Tombol Hamburger Mobile */}
          <button 
            className={`md:hidden p-2 rounded-full transition-colors ${isScrolled || isMobileMenuOpen ? "text-slate-800 bg-slate-100" : "text-white bg-white/20"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Dropdown Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="absolute top-[110%] left-0 right-0 p-5 bg-white/95 backdrop-blur-xl border border-slate-200/50 shadow-2xl rounded-3xl md:hidden flex flex-col gap-3 mx-2 animate-in fade-in slide-in-from-top-4 duration-300">
            {["Beranda", "Kamar", "Fasilitas", "Kontak"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 font-bold text-center py-3 hover:text-[#0D6E6E] hover:bg-[#0D6E6E]/5 rounded-xl transition-colors"
              >
                {l}
              </a>
            ))}
            <hr className="border-slate-100 my-1" />
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onSwitchRole();
              }}
              className="flex items-center justify-center gap-2 w-full py-4 mt-1 text-white bg-[#0D6E6E] active:bg-[#073f3f] rounded-xl font-bold shadow-md shadow-[#0D6E6E]/20"
            >
              <UserCircle size={20} />
              Portal Admin
            </button>
          </div>
        )}
      </nav>

{/* 2. HERO SECTION (CENTERED MOBILE) */}
      <section
        id="beranda"
        className="relative w-full h-[100dvh] overflow-hidden bg-slate-900 bg-cover bg-center bg-no-repeat flex flex-col justify-center pt-16 md:pt-20"
        style={{ backgroundImage: "url('/Gkost.jpeg')" }}
      >
        
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/50 to-transparent pointer-events-none" />
        
        <div className="relative w-full max-w-[1400px] mx-auto px-5 md:px-6 z-10 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-8 md:gap-10">
        
          <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          
            <h1 className="text-[22vw] sm:text-[18vw] lg:text-[180px] xl:text-[220px] font-serif text-white leading-[0.85] md:leading-[0.75] tracking-tight drop-shadow-2xl">
              RAKKY
            </h1>
        
            <h2 className="text-lg sm:text-xl md:text-3xl font-serif italic text-white mt-1 md:mt-0 mb-2 drop-shadow-lg leading-snug">
              Kenyamanan dalam <span className="font-semibold not-italic">Harmoni</span> <br className="hidden md:block" />
              <span className="font-semibold not-italic">Sempurna</span>
            </h2>
            
            <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 text-emerald-400 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 md:mt-4 mb-2 lg:mb-0">
              <MapPin size={12} className="md:w-[14px] md:h-[14px]" /> 
              Kutorejo, Mojokerto
            </div>
            
           <p className="text-white/80 text-[10px] sm:text-xs md:text-sm leading-relaxed font-light drop-shadow-md max-w-lg mt-2 md:mt-4">
  Selamat datang di Rakky Griyo Asri. Kost eksklusif di mana desain timeless, fasilitas modern, dan atmosfer hangat menyatu.
</p>
          </div>
         
          <div className="w-full max-w-[320px] lg:max-w-sm lg:w-[420px] flex flex-col gap-4 md:gap-6">
          
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex flex-col gap-2.5 md:gap-4 text-left">
          
              <div className="bg-black/20 border border-white/10 px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-between transition-colors hover:bg-black/30">
                <div className="flex items-center gap-2.5 md:gap-3 w-full">
                  <Wallet className="text-white/70 flex-shrink-0" size={16} />
                  <div className="flex flex-col w-full">
                    <label className="text-[8px] md:text-[10px] font-bold text-white/60 tracking-wider uppercase mb-[1px]">Harga Maks</label>
                    <input
                      type="number"
                      placeholder="Rp 1.500.000"
                      className="w-full bg-transparent outline-none text-white placeholder-white/30 text-[11px] md:text-sm font-semibold"
                      value={search.price}
                      onChange={(e) => setSearch((s) => ({ ...s, price: e.target.value }))}
                    />
                  </div>
                </div>
     
                <div className="flex flex-col items-center justify-center gap-[1px] opacity-50">
                  <ChevronRight size={8} className="rotate-[-90deg] text-white" />
                  <ChevronRight size={8} className="rotate-90 text-white" />
                </div>
              </div>
          
              <div className="bg-black/20 border border-white/10 px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-2.5 md:gap-3 transition-colors hover:bg-black/30">
                <DoorOpen className="text-white/70 flex-shrink-0" size={16} />
                <div className="flex flex-col w-full">
                  <label className="text-[8px] md:text-[10px] font-bold text-white/60 tracking-wider uppercase mb-[1px]">Tipe Kamar</label>
                  <input
                    type="text"
                    placeholder="Contoh: Deluxe, VIP"
                    className="w-full bg-transparent outline-none text-white placeholder-white/30 text-[11px] md:text-sm font-semibold"
                    value={search.type}
                    onChange={(e) => setSearch((s) => ({ ...s, type: e.target.value }))}
                  />
                </div>
              </div>
              
              {/* Tombol Cari */}
              <button className="w-full py-3 md:py-4 mt-1 bg-white text-slate-900 font-bold uppercase tracking-widest text-[11px] md:text-sm rounded-xl md:rounded-2xl flex items-center justify-center gap-1.5 active:scale-95 md:hover:scale-[1.02] transition-all duration-300 shadow-xl">
                <Search size={14} className="md:w-[18px] md:h-[18px]" />
                Cari Kamar
              </button>
              
            </div>
          </div>
          
        </div>
      </section>

{/* 3. ROOM CATALOG (3 COLUMNS GRID FOR ALL ROOMS) */}
<section 
  id="kamar" 
  className="py-16 md:py-24 px-4 md:px-6 relative -mt-8 md:-mt-16 z-20 bg-[#F8FAFC] rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.2)] overflow-hidden"
>
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-20 md:-right-40 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-60"></div>
    <div className="absolute top-40 md:top-60 -left-20 md:-left-40 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] bg-teal-200/30 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-60"></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-16 gap-4 md:gap-6">
      <div className="max-w-2xl text-center md:text-left">
        <div className="inline-flex items-center gap-2 mb-3 md:mb-5 bg-white border border-slate-200 shadow-sm px-3.5 py-1.5 md:px-4 md:py-2 rounded-full text-slate-700 font-bold text-[9px] md:text-[11px] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Katalog Kamar
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-slate-900 tracking-tight leading-tight mb-2 md:mb-4">
          Pilihan Kamar <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D6E6E] to-emerald-500 italic">Eksklusif</span>
        </h2>
        <p className="text-slate-500 font-light text-xs md:text-lg px-2 md:px-0">
          Temukan ruang privat yang dirancang khusus untuk memadukan kenyamanan istirahat dan estetika modern.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 bg-white px-4 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 flex-shrink-0">
        <p className="text-slate-500 font-medium text-[10px] md:text-sm">
          Menampilkan <span className="text-[#0D6E6E] font-black text-sm md:text-xl ml-1">{filtered.length}</span> kamar
        </p>
      </div>
    </div>

    {/* GRID KAMAR - 3 Kolom Konsisten */}
    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-10">
      {filtered.map((room) => (
        <div
          key={room.id}
          className="group bg-white rounded-xl md:rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] md:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col relative"
        >
          {/* GAMBAR KAMAR */}
          <div className="relative overflow-hidden aspect-[4/3] m-1 md:m-2 rounded-lg md:rounded-[1.5rem]">
            <img
              src={room.image}
              alt={room.type}
              className="w-full h-full object-cover"
            />
            {/* Rating Badge */}
            <div className="absolute bottom-1 right-1 md:bottom-3 md:right-3 bg-black/40 backdrop-blur-md text-white text-[8px] md:text-xs font-black px-1.5 py-0.5 md:px-3 md:py-1 rounded-full flex items-center gap-0.5 shadow-lg">
              <Star size={8} className="text-amber-400 fill-amber-400" />
              <span>{room.rating}</span>
            </div>
          </div>

          {/* KONTEN KARTU */}
          <div className="p-2 md:p-6 pt-1 flex flex-col flex-1">
            <h3 className="font-extrabold text-slate-900 text-[10px] sm:text-xs md:text-2xl truncate mb-1 md:mb-2 leading-tight">
              {room.type}
            </h3>
            
            <div className="flex items-center gap-1.5 md:gap-2 mb-2">
              <span className="text-[8px] md:text-[10px] text-white bg-[#0D6E6E] px-1.5 py-0.5 md:px-2.5 md:py-1 rounded font-bold uppercase tracking-widest">Lt. {room.floor}</span>
              <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Kamar {room.number}</span>
            </div>
            
            <p className="text-slate-500 text-[8px] sm:text-[10px] md:text-sm mb-3 md:mb-6 leading-tight md:leading-relaxed line-clamp-2 font-light flex-1">
              {room.desc}
            </p>
    
            <div className="pt-2 md:pt-5 border-t border-slate-100 flex flex-col items-center md:items-end justify-between mt-auto gap-2">
              <p className="text-[#0D6E6E] font-black text-[10px] sm:text-xs md:text-2xl leading-none">
                {formatRupiah(room.price)}
              </p>
          
              <button
                onClick={() => setActiveRoom(room)}
                className="w-full py-1.5 md:py-3 rounded md:rounded-xl bg-slate-900 hover:bg-[#0D6E6E] text-white flex items-center justify-center transition-all duration-300 font-bold uppercase text-[8px] sm:text-[10px] md:text-xs tracking-widest"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* 4. AMENITIES GRID - 3 COLUMNS CONSTANT */}
<section id="fasilitas" className="py-12 md:py-24 px-4 bg-white relative z-10">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10 md:mb-20">
      <span className="text-[#0D6E6E] text-[9px] font-bold uppercase tracking-[0.2em] mb-2 block">
        Kenyamanan Ekstra
      </span>
      <h2 className="text-2xl md:text-5xl font-serif text-slate-900 mb-3 tracking-tight">
        Fasilitas <span className="italic text-slate-400 font-light">Umum</span>
      </h2>
      <div className="w-12 h-px bg-slate-200 mx-auto mb-4"></div>
      <p className="text-slate-500 text-xs md:text-base max-w-lg mx-auto font-light leading-relaxed px-2">
        Kami merancang setiap sudut dengan detail untuk memastikan Anda tinggal dengan tenang.
      </p>
    </div>
    
    {/* GRID: 3 kolom konsisten (grid-cols-3) */}
    <div className="grid grid-cols-3 gap-2 md:gap-6">
      {[
        { icon: Sparkles, label: "Room Service", desc: "Pembersihan harian" },
        { icon: Car, label: "Parkir Luas", desc: "Aman untuk mobil" },
        { icon: TreePine, label: "Area Taman", desc: "Ruang hijau" },
        { icon: Shield, label: "Keamanan 24/7", desc: "Pagar" },
        { icon: Wifi, label: "High Speed WiFi", desc: "Internet lancar" },
      ].map(({ icon: Icon, label, desc }) => (
        <div
          key={label}
          className="bg-white rounded-2xl p-3 md:p-8 text-center border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center transition-all hover:border-[#0D6E6E]/20"
        >
          {/* Ikon */}
          <div className="w-8 h-8 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-6">
            <Icon size={16} className="text-[#0D6E6E] md:w-7 md:h-7" strokeWidth={1.5} />
          </div>
          
          <h3 className="font-bold text-slate-800 text-[9px] md:text-lg mb-0.5 md:mb-2 truncate w-full">
            {label}
          </h3>
          <p className="text-slate-400 text-[8px] md:text-sm font-light leading-tight">
            {desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* 5. MAP & CONTACT SECTION - Compact Mobile */}
<section id="kontak" className="py-10 md:py-24 px-4 md:px-6 bg-slate-50 rounded-t-[2rem] md:rounded-t-[4rem] border-t border-slate-200">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
      
      {/* KONTEN TEKS */}
      <div className="lg:col-span-5 px-1 md:px-8 text-center lg:text-left order-1">
        {/* Ikon diperkecil di mobile */}
        <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-white shadow-sm border border-slate-100 text-[#0D6E6E] rounded-lg md:rounded-2xl mb-3 md:mb-8">
          <MapPin size={20} className="md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
        </div>
        
        {/* Font judul diperkecil */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-2 md:mb-6 tracking-tight">
          Lokasi <br className="hidden lg:block"/>
          <span className="italic text-[#0D6E6E]">Strategis</span>
        </h2>
        
        {/* Deskripsi lebih rapat */}
        <p className="text-slate-600 mb-4 md:mb-8 leading-relaxed md:leading-loose font-light text-[11px] sm:text-xs md:text-base lg:text-lg">
          Berada di Kabupaten Mojokerto, tepatnya di <strong className="font-semibold text-slate-800">Desa Jiyu, Dusun Jiyu, RT 01 RW 01, Kutorejo</strong>. Mudah diakses dari berbagai arah.
        </p>
        
        {/* List item diatur gap-nya agar tidak renggang */}
        <ul className="text-[10px] sm:text-[11px] md:text-sm text-slate-500 font-light space-y-2 md:space-y-3 mb-6 md:mb-10 text-left w-max mx-auto lg:mx-0">
          <li className="flex items-center gap-2 md:gap-3"><div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#0D6E6E]"></div> Dekat sekolah & rumah sakit</li>
          <li className="flex items-center gap-2 md:gap-3"><div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#0D6E6E]"></div> Dekat pusat perbelanjaan</li>
          <li className="flex items-center gap-2 md:gap-3"><div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#0D6E6E]"></div> Akses cepat ke Wisata Trawas</li>
        </ul>

        {/* Tombol dirampingkan ukurannya */}
        <a 
          href="https://maps.google.com" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 md:gap-3 font-bold text-white bg-slate-900 active:bg-slate-800 hover:bg-[#0D6E6E] px-4 py-2.5 md:px-8 md:py-4 rounded-lg md:rounded-2xl transition-all duration-300 shadow-md md:hover:shadow-xl md:hover:-translate-y-1 w-full lg:w-auto text-[11px] sm:text-xs md:text-base"
        >
          Buka di Google Maps <ChevronRight size={14} className="md:w-5 md:h-5" />
        </a>
      </div>
      
      {/* BAGIAN MAP - Tinggi dikurangi di mobile */}
      <div className="lg:col-span-7 h-[280px] sm:h-[350px] md:h-[450px] lg:h-[600px] relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-md md:shadow-2xl border-2 md:border-4 border-white order-2 group mt-2 lg:mt-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.2187637845347!2d112.5378694!3d-7.5696944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzQnMTAuOSJTIDExMsKwMzInMjUuNiJF!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
          className="w-full h-full border-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-1000"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Rakky Griyo Asri"
        />
        
        {/* Kartu putih di dalam peta dirampingkan ukurannya */}
        <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-auto bg-white/95 backdrop-blur-md rounded-lg md:rounded-2xl shadow-lg px-3 py-2 md:px-5 md:py-4 flex items-center gap-2 md:gap-4 border border-white/50">
          <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <div className="w-1.5 h-1.5 md:w-3.5 md:h-3.5 rounded-full bg-emerald-500 animate-ping absolute" />
            <div className="w-1.5 h-1.5 md:w-3.5 md:h-3.5 rounded-full bg-[#0D6E6E] relative" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[11px] md:text-base leading-tight md:leading-normal text-slate-800">Rakky Griyo Asri</span>
            <span className="text-[8px] md:text-xs text-slate-500 font-medium">Kutorejo, Mojokerto</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

  {/* 6. FOOTER - Compact Mobile */}
<footer className="bg-slate-950 text-white pt-10 md:pt-24 pb-6 md:pb-8 px-5 md:px-6 relative overflow-hidden rounded-t-[2rem] md:rounded-t-[4rem] -mt-6 md:-mt-10 z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
  <div className="absolute top-0 right-0 w-[15rem] md:w-[40rem] h-[15rem] md:h-[40rem] bg-[#0D6E6E] rounded-full mix-blend-screen filter blur-[80px] md:blur-[150px] opacity-20 pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-[10rem] md:w-[30rem] h-[10rem] md:h-[30rem] bg-teal-900 rounded-full mix-blend-screen filter blur-[80px] md:blur-[150px] opacity-20 pointer-events-none" />

  <div className="max-w-7xl mx-auto relative z-10">
    
    {/* BAGIAN ATAS: RAKKY & TOMBOL */}
    <div className="flex flex-col md:flex-row justify-between items-center md:items-end border-b border-white/10 pb-6 md:pb-16 mb-6 md:mb-16 gap-5 md:gap-8 text-center md:text-left">
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white tracking-tighter leading-none mb-2 md:mb-6 drop-shadow-2xl">
          RAKKY
        </h2>
        <p className="text-slate-400 text-[11px] sm:text-xs md:text-lg lg:text-xl font-light max-w-xs md:max-w-md mx-auto md:mx-0 leading-relaxed">
          Mendefinisikan ulang pengalaman tempat tinggal eksklusif di Kabupaten Mojokerto.
        </p>
      </div>
      
      <div className="w-full md:w-auto">
        <a 
          href="https://wa.me/6285748393726" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center justify-center gap-2 md:gap-3 bg-white text-slate-950 px-5 py-2.5 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-sm active:scale-95 md:hover:bg-emerald-50 md:hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] w-full md:w-auto"
        >
          <Phone size={14} className="md:w-[18px] md:h-[18px]" />
          Hubungi Pengelola
        </a>
      </div>
    </div>

    {/* BAGIAN TENGAH: TENTANG & KONTAK */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-8 md:mb-16">
      
      {/* TENTANG KAMI */}
      <div className="md:col-span-4 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2.5 md:gap-4 mb-3 md:mb-6">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg md:rounded-2xl flex items-center justify-center">
            <Home size={16} className="text-emerald-400 md:w-6 md:h-6" />
          </div>
          <span className="font-bold text-lg md:text-2xl tracking-tight text-white">Griyo Asri</span>
        </div>
        <p className="text-slate-400 text-[10px] md:text-sm leading-relaxed mb-2 md:mb-8 md:pr-8 font-light px-4 md:px-0">
          Sebuah harmoni antara desain modern, kenyamanan privat, dan akses strategis untuk mendukung gaya hidup dinamis Anda. Nyaman, aman, dan memanjakan.
        </p>
      </div>
    
      {/* INFO KONTAK */}
      <div className="md:col-span-5 lg:col-span-4">
        <p className="text-white text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 text-center md:text-left">Informasi Kontak</p>
        <div className="space-y-3 md:space-y-6 text-slate-400 font-light max-w-[240px] md:max-w-none mx-auto md:mx-0 text-left">
          
          <a href="https://wa.me/6285748393726" className="flex items-center gap-3 md:gap-4 hover:text-white transition-colors group">
            <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center md:group-hover:bg-[#0D6E6E] md:group-hover:border-[#0D6E6E] transition-all flex-shrink-0">
              <Phone size={12} className="md:w-4 md:h-4" />
            </div>
            <div>
              <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-slate-500 mb-0.5 md:mb-1">Telepon / WhatsApp</span>
              <span className="font-medium text-slate-200 text-[10px] md:text-sm leading-none">+62 857-4839-3726 (Yulis)</span>
            </div>
          </a>
          
          <a href="mailto:mukhammadraffi5@gmail.com" className="flex items-center gap-3 md:gap-4 hover:text-white transition-colors group">
            <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center md:group-hover:bg-[#0D6E6E] md:group-hover:border-[#0D6E6E] transition-all flex-shrink-0">
              <Mail size={12} className="md:w-4 md:h-4" />
            </div>
            <div>
              <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-slate-500 mb-0.5 md:mb-1">Email</span>
              <span className="font-medium text-slate-200 text-[10px] md:text-sm leading-none">mukhammadraffi5@gmail.com</span>
            </div>
          </a>
          
          <div className="flex items-center md:items-start gap-3 md:gap-4 group cursor-default">
            <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0">
              <MapPin size={12} className="text-slate-400 md:group-hover:text-white transition-colors md:w-4 md:h-4" />
            </div>
            <div className="pt-0.5 md:pt-1">
              <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-slate-500 mb-0.5 md:mb-1.5">Lokasi</span>
              <span className="font-medium text-slate-200 text-[10px] md:text-sm leading-tight md:leading-relaxed">Jiyu, Kec. Kutorejo,<br className="hidden md:block"/> Kab. Mojokerto, Jawa Timur</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* TAUTAN CEPAT (Desktop Only) */}
      <div className="md:col-span-3 lg:col-span-4 lg:pl-12 hidden md:block">
        <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Tautan Cepat</p>
        <div className="flex flex-col space-y-5">
          {["Beranda", "Kamar", "Fasilitas", "Kontak"].map(link => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="text-slate-400 hover:text-white text-sm font-light w-max flex items-center gap-3 group transition-colors"
            >
              <span className="w-4 h-[1px] bg-slate-600 group-hover:bg-emerald-400 group-hover:w-8 transition-all duration-500"></span>
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
    
    {/* BAGIAN BAWAH: COPYRIGHT & SOSMED */}
    <div className="border-t border-white/10 pt-5 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
      <p className="text-slate-500 text-[8px] md:text-[11px] font-bold tracking-[0.2em] uppercase order-2 md:order-1">
        © {new Date().getFullYear()} Rakky Griyo Asri. 
      </p>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 order-1 md:order-2">
        {[
          { name: 'Instagram', url: 'https://www.instagram.com/rappizr/' },
          { name: 'Facebook', url: 'https://facebook.com/LINK_FB_KAMU_DISINI' }
        ].map((social) => (
          <a 
            key={social.name} 
            href={social.url} 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-300 md:hover:text-slate-900 text-[8px] md:text-[10px] font-bold uppercase tracking-widest border border-white/20 bg-transparent active:bg-white active:text-slate-900 md:hover:bg-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-full transition-all duration-300"
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>
  </div>
</footer>
      
    </div>
  );
}
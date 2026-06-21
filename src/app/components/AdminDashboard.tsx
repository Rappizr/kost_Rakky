"use client";

import React, { useState, useEffect, useRef } from "react";
import { LayoutDashboard, DoorOpen, Users, LogOut, Menu, Bell, Eye, TrendingUp, Clock, MessageCircle, CreditCard, Activity, Calendar, AlertCircle, Plus, Pencil, Trash2, X, Cloud, Check } from "lucide-react";
import { Room, Tenant, RoomFormState } from "../types";
import { ACTIVITY_LOG, formatRupiah } from "../mockData"; // ROOMS dan TENANTS dihapus
import { StatusBadge } from "./StatusBadge";

// IMPORT SUPABASE CLIENT
import { supabase } from "../../supabaseClient";

interface AdminDashboardProps {
  onSwitchRole: () => void;
}

export default function AdminDashboard({ onSwitchRole }: AdminDashboardProps) {
  const [page, setPage] = useState("Ringkasan");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: "Ringkasan", icon: LayoutDashboard },
    { label: "Kamar", icon: DoorOpen },
    { label: "Penghuni", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex relative overflow-hidden">
      
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed md:relative z-50 inset-y-0 left-0 bg-[#0D6E6E] text-white flex flex-col transition-all duration-300 h-screen overflow-hidden shadow-2xl md:shadow-none
        ${sidebarOpen ? "translate-x-0 w-64 md:w-60" : "-translate-x-full md:translate-x-0 md:w-16"}
      `}>
        <div className="p-4 border-b border-white/10 flex items-center gap-3 h-16">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <DoorOpen size={16} className="text-white" />
          </div>
          <span className={`font-bold text-sm leading-tight transition-opacity duration-300 whitespace-nowrap ${sidebarOpen ? "opacity-100" : "opacity-0 md:hidden"}`}>
            Rakky Griyo<br />
            <span className="text-emerald-300">Admin</span>
          </span>
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                setPage(label);
                if (window.innerWidth < 768) setSidebarOpen(false); 
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                page === label ? "bg-white/20 text-white shadow-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} className="flex-shrink-0 md:w-[18px] md:h-[18px]" />
              <span className={`transition-opacity duration-300 whitespace-nowrap ${sidebarOpen ? "opacity-100" : "opacity-0 md:hidden"}`}>
                {label}
              </span>
            </button>
          ))}
        </nav>
        
        <div className="p-3 border-t border-white/10">
          <button
            onClick={onSwitchRole}
            className="w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-rose-500/20 hover:text-rose-100 transition-all duration-200 group"
          >
            <LogOut size={20} className="flex-shrink-0 md:w-[18px] md:h-[18px] group-hover:text-rose-300" />
            <span className={`transition-opacity duration-300 whitespace-nowrap ${sidebarOpen ? "opacity-100" : "opacity-0 md:hidden"}`}>
              Portal Pengguna
            </span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => setSidebarOpen(o => !o)} 
              className="text-slate-500 hover:text-[#0D6E6E] transition-colors p-1.5 -ml-1.5 rounded-lg active:bg-slate-100"
            >
              <Menu size={22} className="md:w-5 md:h-5" />
            </button>
            <h1 className="font-bold text-slate-800 text-base md:text-lg">{page}</h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all hidden sm:block">
              <Bell size={18} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>
            <div className="flex items-center gap-2 bg-[#0D6E6E]/10 px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg cursor-pointer hover:bg-[#0D6E6E]/20 transition-colors">
              <div className="w-6 h-6 bg-[#0D6E6E] rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">A</span>
              </div>
              <span className="text-[#0D6E6E] text-xs md:text-sm font-bold hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-x-hidden overflow-y-auto">
          {page === "Ringkasan" && <DashboardOverview />}
          {page === "Kamar" && <RoomManagement />}
          {page === "Penghuni" && <TenantManagement />}
        </main>
      </div>
    </div>
  );
}

// ─── SUB-VIEW: OVERVIEW ───────────────────────────────────────────────────────
function DashboardOverview() {
  const [stats, setStats] = useState({ available: 0, totalRooms: 0, totalTenants: 0 });

  // Tarik jumlah kamar dan penghuni dari Supabase untuk Ringkasan
  useEffect(() => {
    const fetchStats = async () => {
      const { data: roomsData } = await supabase.from('rooms').select('status');
      const { data: tenantsData } = await supabase.from('tenants').select('id');
      
      if (roomsData) {
        const availableCount = roomsData.filter(r => r.status.toLowerCase() === 'available').length;
        setStats(prev => ({ ...prev, available: availableCount, totalRooms: roomsData.length }));
      }
      if (tenantsData) {
        setStats(prev => ({ ...prev, totalTenants: tenantsData.length }));
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-3 gap-2 md:gap-5">
        
        <div className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex flex-row items-start justify-between mb-2 md:mb-4 gap-1">
            <div className="w-6 h-6 md:w-10 md:h-10 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye size={12} className="text-blue-500 md:w-5 md:h-5" />
            </div>
            <div className="flex items-center gap-0.5 md:gap-1 bg-emerald-50 text-emerald-600 text-[6px] sm:text-[8px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-md whitespace-nowrap">
              <TrendingUp size={8} className="md:w-[11px] md:h-[11px]" /> +12%
            </div>
          </div>
          <div>
            <p className="text-sm sm:text-base md:text-3xl font-extrabold text-slate-800 mb-0.5">24.819</p>
            <p className="text-slate-500 text-[7px] sm:text-[9px] md:text-sm font-medium leading-tight truncate">Total Kunjungan</p>
            <p className="text-slate-400 text-[6px] md:text-xs mt-0.5 md:mt-1 hidden sm:block">30 hari terakhir</p>
          </div>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex flex-row items-start justify-between mb-2 md:mb-4 gap-1">
            <div className="w-6 h-6 md:w-10 md:h-10 bg-purple-50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <Users size={12} className="text-purple-500 md:w-5 md:h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm sm:text-base md:text-3xl font-extrabold text-slate-800 mb-0.5">{stats.totalTenants}</p>
            <p className="text-slate-500 text-[7px] sm:text-[9px] md:text-sm font-medium leading-tight truncate">Penghuni Aktif</p>
            <p className="text-slate-400 text-[6px] md:text-xs mt-0.5 md:mt-1 hidden sm:block">Sedang menetap</p>
          </div>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex flex-row items-start justify-between mb-2 md:mb-4 gap-1">
            <div className="w-6 h-6 md:w-10 md:h-10 bg-teal-50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <DoorOpen size={12} className="text-[#0D6E6E] md:w-5 md:h-5" />
            </div>
            <span className="text-slate-500 text-[6px] sm:text-[8px] md:text-xs font-medium whitespace-nowrap text-right">
              {stats.available}/{stats.totalRooms} kmr
            </span>
          </div>
          <div>
            <p className="text-sm sm:text-base md:text-3xl font-extrabold text-slate-800 mb-0.5 flex items-baseline gap-1">
              {stats.available} <span className="text-[7px] md:text-lg text-slate-400 font-semibold">Sisa</span>
            </p>
            <p className="text-slate-500 text-[7px] sm:text-[9px] md:text-sm font-medium mb-1.5 md:mb-3 leading-tight truncate">Ketersediaan</p>
            <div className="bg-slate-100 rounded-full h-1 md:h-2">
              <div className="bg-[#0D6E6E] h-1 md:h-2 rounded-full transition-all" style={{ width: `${stats.totalRooms > 0 ? (stats.available / stats.totalRooms) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-xs sm:text-sm md:text-base">Aktivitas Terbaru</h2>
          <button className="text-[#0D6E6E] text-[9px] md:text-xs font-semibold hover:underline">Lihat semua</button>
        </div>
        <div className="divide-y divide-slate-50">
          {ACTIVITY_LOG.map(log => {
            const colors = { inquiry: "bg-blue-100 text-blue-600", checkout: "bg-slate-100 text-slate-500", payment: "bg-emerald-100 text-emerald-600", update: "bg-amber-100 text-amber-600", booking: "bg-purple-100 text-purple-600", maintenance: "bg-rose-100 text-rose-600" };
            const icons = { inquiry: MessageCircle, checkout: LogOut, payment: CreditCard, update: Activity, booking: Calendar, maintenance: AlertCircle };
            const Icon = icons[log.type] || Activity;
            return (
              <div key={log.id} className="flex items-center gap-2.5 md:gap-4 px-4 py-2.5 md:px-6 md:py-4 hover:bg-slate-50 transition-colors">
                <div className={`w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${colors[log.type]}`}>
                  <Icon size={12} className="md:w-4 md:h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-[10px] md:text-sm font-medium truncate">{log.text}</p>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[8px] md:text-xs flex-shrink-0">
                  <Clock size={10} className="md:w-[11px] md:h-[11px]" />{log.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SUB-VIEW: ROOM MANAGEMENT ───────────────────────────────────────────────
function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<RoomFormState>({ number: "", type: "", price: "", facilities: [], image: null });
  const [dragging, setDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const facilitiesList = ["AC", "Kamar Mandi Dalam", "Lemari Pakaian", "Meja Kerja", "Wi-Fi", "Pemanas Air", "Balkon", "Akses Dapur"];

  const fetchRooms = async () => {
    const { data, error } = await supabase.from('rooms').select('*').order('number', { ascending: true });
    if (data) {
      setRooms(data.map((r: any) => ({
        id: r.id, number: r.number, type: r.type, price: r.price, status: r.status,
        image: r.image_url, rating: r.rating, size: r.size, floor: r.floor, desc: r.description
      })));
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const toggleFacility = (f: string) => setForm(p => ({
    ...p,
    facilities: p.facilities.includes(f) ? p.facilities.filter(x => x !== f) : [...p.facilities, f]
  }));

  // FUNGSI BARU: Format angka jadi ada titiknya tiap ngetik
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Buang semua karakter selain angka
    const rawValue = e.target.value.replace(/\D/g, "");
    // Kasih titik setiap 3 digit
    const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setForm(p => ({ ...p, price: formatted }));
  };

  const handleSave = async () => {
    if (!form.number || !form.type || !form.price) {
      alert("Mohon lengkapi Nomor, Harga, dan Tipe Kamar.");
      return;
    }

    setIsUploading(true);
    let imageUrl = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format"; 

    if (form.image) {
      const fileExt = form.image.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `room-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('rooms') 
        .upload(filePath, form.image);

      if (uploadError) {
        alert("Gagal mengunggah foto: " + uploadError.message);
        setIsUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('rooms')
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }
    
    // HILANGKAN TITIK SAAT SIMPAN KE DATABASE
    const cleanPrice = parseInt(form.price.replace(/\./g, ''));

    const { error } = await supabase.from('rooms').insert([{
      number: form.number,
      type: form.type,
      price: cleanPrice, // Simpan sebagai angka murni
      status: "Available",
      image_url: imageUrl, 
      rating: 5.0, 
      size: "15 m²",
      floor: 1,
      description: "Fasilitas: " + form.facilities.join(", ")
    }]);

    setIsUploading(false);

    if (!error) {
      fetchRooms(); 
      setForm({ number: "", type: "", price: "", facilities: [], image: null });
      setShowModal(false);
    } else {
      alert("Gagal menyimpan data kamar: " + error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Yakin ingin menghapus kamar ini?")) return;
    const { error } = await supabase.from('rooms').delete().eq('id', id);
    if (!error) fetchRooms();
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-0">
        <p className="text-slate-500 text-xs md:text-sm">Total <span className="font-bold text-slate-700">{rooms.length}</span> kamar terdaftar</p>
        <button 
          onClick={() => setShowModal(true)} 
          className="flex items-center justify-center gap-2 bg-[#0D6E6E] hover:bg-[#0a5858] text-white text-xs md:text-sm font-semibold px-4 py-2.5 md:py-2.5 rounded-xl transition-all duration-200 shadow-sm w-full sm:w-auto"
        >
          <Plus size={16} /> Tambah Kamar Baru
        </button>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["No. Kamar", "Tipe", "Harga/Bulan", "Status", "Aksi"].map(h => (
                  <th key={h} className="px-4 md:px-5 py-3 md:py-3.5 text-left text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rooms.map(room => (
                <tr key={room.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 md:px-5 py-3 md:py-4 font-bold text-slate-800 text-xs md:text-sm whitespace-nowrap">{room.number}</td>
                  <td className="px-4 md:px-5 py-3 md:py-4 text-slate-600 text-xs md:text-sm whitespace-nowrap">{room.type}</td>
                  <td className="px-4 md:px-5 py-3 md:py-4 font-semibold text-[#0D6E6E] text-xs md:text-sm whitespace-nowrap">{formatRupiah(room.price)}</td>
                  <td className="px-4 md:px-5 py-3 md:py-4 whitespace-nowrap"><StatusBadge status={room.status} /></td>
                  <td className="px-4 md:px-5 py-3 md:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 md:gap-2">
                      <button className="p-1.5 md:p-2 text-slate-400 hover:text-[#0D6E6E] hover:bg-[#0D6E6E]/10 rounded-lg transition-all"><Pencil size={14} className="md:w-4 md:h-4" /></button>
                      <button onClick={() => handleDelete(room.id)} className="p-1.5 md:p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={14} className="md:w-4 md:h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4" onClick={e => e.target === e.currentTarget && !isUploading && setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] md:max-h-[85vh] animate-in zoom-in-95 duration-200">
            <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Tambah Kamar Baru</h3>
              <button disabled={isUploading} onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors disabled:opacity-50"><X size={18} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 custom-scrollbar">
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setForm(p => ({ ...p, image: f })); }}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${dragging ? "border-[#0D6E6E] bg-[#0D6E6E]/5" : "border-slate-200 hover:border-[#0D6E6E]/50 hover:bg-slate-50"}`}
              >
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setForm(p => ({ ...p, image: f })); }} />
                <Cloud size={28} className="text-slate-300 mx-auto mb-2 sm:mb-3 sm:w-8 sm:h-8" />
                <p className="text-slate-800 text-xs sm:text-sm font-medium px-2 truncate">{form.image ? form.image.name : "Seret & lepas foto kamar di sini"}</p>
                <p className="text-slate-500 text-[10px] sm:text-xs mt-1">atau klik untuk menelusuri file</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold text-slate-600 mb-1.5">Nomor Kamar *</label>
                  <input value={form.number} onChange={e => setForm(p => ({ ...p, number: e.target.value }))} placeholder="contoh: 101" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D6E6E]/30 focus:border-[#0D6E6E] transition-shadow" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold text-slate-600 mb-1.5">Harga Bulanan (Rp) *</label>
                  {/* UBAH TYPE JADI "text" DAN GUNAKAN handlePriceChange */}
                  <input 
                    type="text" 
                    value={form.price} 
                    onChange={handlePriceChange} 
                    placeholder="contoh: 1.200.000" 
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D6E6E]/30 focus:border-[#0D6E6E] transition-shadow" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-semibold text-slate-600 mb-1.5">Tipe Kamar *</label>
                <input value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} placeholder="contoh: Deluxe Double Room" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D6E6E]/30 focus:border-[#0D6E6E] transition-shadow" />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-semibold text-slate-600 mb-2 sm:mb-3">Fasilitas Kamar</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {facilitiesList.map(f => (
                    <button key={f} type="button" onClick={() => toggleFacility(f)} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-150 ${form.facilities.includes(f) ? "bg-[#0D6E6E] border-[#0D6E6E] text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:border-[#0D6E6E]/40 hover:bg-slate-50"}`}>
                      <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${form.facilities.includes(f) ? "border-transparent bg-white/20" : "border-slate-300 bg-white"}`}>
                        {form.facilities.includes(f) && <Check size={10} strokeWidth={3} className="text-white" />}
                      </div>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 flex gap-3 p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
              <button disabled={isUploading} onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm disabled:opacity-50">Batal</button>
              <button disabled={isUploading} onClick={handleSave} className="flex-1 px-4 py-2.5 bg-[#0D6E6E] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#0a5858] transition-colors shadow-sm shadow-[#0D6E6E]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isUploading ? <><Activity size={16} className="animate-spin" /> Menyimpan...</> : "Simpan Kamar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUB-VIEW: TENANT MANAGEMENT ──────────────────────────────────────────────
function TenantManagement() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", room: "", checkin: "", status: "Paid", phone: "" });

  const fetchTenants = async () => {
    const { data, error } = await supabase.from('tenants').select('*').order('created_at', { ascending: false });
    if (data) {
      setTenants(data.map((t: any) => ({
        id: t.id,
        name: t.name,
        room: t.room_number,
        checkin: t.check_in_date,
        status: t.payment_status,
        phone: t.phone
      })));
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleAdd = async () => {
    if (!form.name || !form.room) return;
    
    const { error } = await supabase.from('tenants').insert([{
      name: form.name,
      room_number: form.room,
      check_in_date: form.checkin || null,
      payment_status: form.status,
      phone: form.phone
    }]);

    if (!error) {
      fetchTenants();
      setForm({ name: "", room: "", checkin: "", status: "Paid", phone: "" });
      setShowForm(false);
    } else {
      alert("Gagal menambahkan penghuni: " + error.message);
    }
  };

  const handleTogglePayment = async (tenant: Tenant) => {
    const newStatus = tenant.status === "Paid" ? "Pending" : "Paid";
    const { error } = await supabase.from('tenants').update({ payment_status: newStatus }).eq('id', tenant.id);
    if (!error) fetchTenants();
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Yakin ingin menghapus data penghuni ini?")) return;
    const { error } = await supabase.from('tenants').delete().eq('id', id);
    if (!error) fetchTenants();
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-0">
        <p className="text-slate-500 text-xs md:text-sm"><span className="font-bold text-slate-700">{tenants.length}</span> penghuni aktif</p>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="flex items-center justify-center gap-2 bg-[#0D6E6E] hover:bg-[#0a5858] text-white text-xs md:text-sm font-semibold px-4 py-2.5 md:py-2.5 rounded-xl transition-all duration-200 shadow-sm w-full sm:w-auto"
        >
          {showForm ? <><X size={16} /> Batal</> : <><Plus size={16} /> Tambah Penghuni</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6 animate-in slide-in-from-top-2 duration-200 fade-in">
          <h3 className="font-bold text-slate-800 mb-4 md:mb-5 text-sm md:text-base">Informasi Penghuni Baru</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
            {[
              { label: "Nama Lengkap *", key: "name" as const, placeholder: "contoh: Budi Santoso", type: "text" },
              { label: "Nomor Kamar *", key: "room" as const, placeholder: "contoh: 202", type: "text" },
              { label: "Tanggal Masuk (Check-in)", key: "checkin" as const, placeholder: "", type: "date" },
              { label: "Nomor Telepon", key: "phone" as const, placeholder: "contoh: 0812-3456-7890", type: "text" },
            ].map(({ label, key, placeholder, type }) => (
              <div key={key}>
                <label className="block text-[10px] md:text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D6E6E]/30 focus:border-[#0D6E6E] transition-shadow"
                />
              </div>
            ))}
          </div>

          <div className="mb-5 md:mb-6">
            <label className="block text-[10px] md:text-xs font-semibold text-slate-600 mb-1.5">Status Pembayaran</label>
            <div className="flex gap-2 md:gap-3">
              {[
                { value: "Paid", label: "Lunas" },
                { value: "Pending", label: "Tertunda" },
              ].map(s => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, status: s.value }))}
                  className={`flex-1 sm:flex-none px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold border transition-all ${
                    form.status === s.value
                      ? s.value === "Paid"
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-rose-500 border-rose-500 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAdd} className="w-full sm:w-auto bg-[#0D6E6E] text-white px-6 py-2.5 rounded-xl text-xs md:text-sm font-semibold hover:bg-[#0a5858] transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Check size={16} /> Simpan Penghuni
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Nama", "Kamar", "Telepon", "Tanggal Masuk", "Pembayaran", "Aksi"].map(h => (
                  <th key={h} className="px-4 md:px-5 py-3 md:py-3.5 text-left text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tenants.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 md:px-5 py-3 md:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-[#0D6E6E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0D6E6E] text-[10px] md:text-xs font-bold">{t.name ? t.name[0] : "-"}</span>
                      </div>
                      <span className="font-semibold text-slate-800 text-xs md:text-sm">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-5 py-3 md:py-4 whitespace-nowrap">
                    <span className="font-bold text-slate-700 text-xs md:text-sm">#{t.room}</span>
                  </td>
                  <td className="px-4 md:px-5 py-3 md:py-4 text-slate-500 text-xs md:text-sm whitespace-nowrap">{t.phone}</td>
                  <td className="px-4 md:px-5 py-3 md:py-4 text-slate-500 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs md:text-sm">
                      <Calendar size={13} className="text-slate-400" />
                      {t.checkin || "-"}
                    </div>
                  </td>
                  <td className="px-4 md:px-5 py-3 md:py-4 whitespace-nowrap"><StatusBadge status={t.status} /></td>
                  <td className="px-4 md:px-5 py-3 md:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => handleTogglePayment(t)}
                        className="p-1.5 md:p-2 text-slate-400 hover:text-[#0D6E6E] hover:bg-[#0D6E6E]/10 rounded-lg transition-all"
                        title="Ubah status pembayaran"
                      >
                        <CreditCard size={14} className="md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 md:p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        title="Hapus penghuni"
                      >
                        <Trash2 size={14} className="md:w-4 md:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
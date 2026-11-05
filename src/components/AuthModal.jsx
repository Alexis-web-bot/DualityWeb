import React, { useState } from 'react';
import { Shield, X, LogIn, UserPlus, KeyRound, Mail, User } from 'lucide-react';
import PergaminoBox from './PergaminoBox';

/**
 * Modal de Autenticación (Login y Registro) para el Gremio de Exploradores.
 * Preparado para conectarse mediante JWT (JSON Web Tokens) a tu base de datos
 * y sincronizar la cuenta entre la PWA de React y la App móvil de Android.
 */
export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    clasePreferida: 'Guerrero del Alba'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Estructura lista para conectar con fetch('http://tu-api/api/auth/login')
    const sessionUser = {
      username: mode === 'register' ? formData.username : (formData.email.split('@')[0] || 'Explorador'),
      email: formData.email,
      rango: 'Rango Bronce',
      clase: formData.clasePreferida,
      token: 'jwt-simulated-token-duality-2026'
    };

    localStorage.setItem('duality_user', JSON.stringify(sessionUser));
    onLoginSuccess(sessionUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <PergaminoBox>
          {/* Cabecera del Modal */}
          <div className="flex items-center justify-between border-b-2 border-[#8F7643] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-ribbonRed" />
              <div>
                <h3 className="font-display text-xl font-bold text-parchmentText">
                  {mode === 'login' ? 'Acceso al Gremio' : 'Registro de Explorador'}
                </h3>
                <span className="text-xs font-fantasy font-bold text-guildBlue">
                  Cuenta Sincronizada Web PWA & App Móvil
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded bg-[#3B2A1A]/15 hover:bg-[#3B2A1A]/30 text-parchmentText">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selector de Pestaña (Login / Registro) */}
          <div className="grid grid-cols-2 gap-2 mb-4 font-fantasy text-xs">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 border ${
                mode === 'login'
                  ? 'bg-guildBlue text-goldLight border-goldPrimary shadow'
                  : 'bg-[#3B2A1A]/10 text-parchmentText border-[#8F7643]'
              }`}
            >
              <LogIn className="w-4 h-4" /> Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 border ${
                mode === 'register'
                  ? 'bg-guildBlue text-goldLight border-goldPrimary shadow'
                  : 'bg-[#3B2A1A]/10 text-parchmentText border-[#8F7643]'
              }`}
            >
              <UserPlus className="w-4 h-4" /> Crear Cuenta
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            {mode === 'register' && (
              <div>
                <label className="block font-fantasy font-bold text-xs text-parchmentText mb-1">
                  Nombre de Explorador (Gamertag)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-guildBlue absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Kaelen_Eclipse"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/70 border border-[#8F7643] text-parchmentText focus:outline-none focus:ring-2 focus:ring-guildBlue"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-fantasy font-bold text-xs text-parchmentText mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-guildBlue absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="explorador@gremio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/70 border border-[#8F7643] text-parchmentText focus:outline-none focus:ring-2 focus:ring-guildBlue"
                />
              </div>
            </div>

            <div>
              <label className="block font-fantasy font-bold text-xs text-parchmentText mb-1">
                Contraseña Rúnica
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-guildBlue absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/70 border border-[#8F7643] text-parchmentText focus:outline-none focus:ring-2 focus:ring-guildBlue"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block font-fantasy font-bold text-xs text-parchmentText mb-1">
                  Clase Inicial para tu Perfil
                </label>
                <select
                  value={formData.clasePreferida}
                  onChange={(e) => setFormData({ ...formData, clasePreferida: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/70 border border-[#8F7643] text-parchmentText font-bold focus:outline-none"
                >
                  <option>Guerrero del Alba</option>
                  <option>Guardián de Égida</option>
                  <option>Taumaturgo Astral</option>
                  <option>Alquimista del Vacío</option>
                  <option>Cazador de Sombras</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="wax-seal w-full py-3 mt-2 rounded-xl text-white font-fantasy font-extrabold text-xs tracking-wider transition hover:scale-[1.01]"
            >
              {mode === 'login' ? 'Entrar al Gremio (Sincronizar JWT)' : 'Registrar Cuenta en Base de Datos'}
            </button>
          </form>
        </PergaminoBox>
      </div>
    </div>
  );
}
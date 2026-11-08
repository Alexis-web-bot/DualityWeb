import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // <-- Importamos auth directo

export default function EditProfileModal({ isOpen, onClose, user, onUpdateAvatar }) {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  // Sincroniza el avatar actual cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      setSelectedAvatar(user?.avatar || '/avatarares/turnos_slime_verde.webp');
    }
  }, [isOpen, user?.avatar]);

  const avataresDisponibles = [
    { id: 'arbol', src: '/avatarares/turnos_arbol.webp', nombre: 'Guerrero Árbol' },
    { id: 'bandida', src: '/avatarares/turnos_bandida.webp', nombre: 'Bandida Silvestre' },
    { id: 'bruja', src: '/avatarares/turnos_burja.webp', nombre: 'Hechicera Sombría' },
    { id: 'slime_verde', src: '/avatarares/turnos_slime_verde.webp', nombre: 'Slime Esmeralda' },
    { id: 'slime_mole', src: '/avatarares/turnos_slime_mole.webp', nombre: 'Slime Rústico' },
    { id: 'slime_lila', src: '/avatarares/turnos_slime_lila.webp', nombre: 'Slime Astral' },
    { id: 'slime_crema', src: '/avatarares/turnos_slime_cremapng.webp', nombre: 'Slime Crema' },
  ];

  const handleGuardarCambios = async () => {
    // Tomamos el UID directo de Firebase por si el estado de React llega incompleto
    const uidSeguro = user?.uid || auth.currentUser?.uid;
    
    if (!uidSeguro) {
      console.error("No se encontró el UID del usuario.");
      alert("Tu sesión está inestable. Por favor, cierra sesión y vuelve a entrar.");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, 'usuarios', uidSeguro);
      
      await setDoc(userRef, {
        avatar: selectedAvatar,
      }, { merge: true });
      
      onUpdateAvatar(selectedAvatar);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el avatar en Firebase:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-[#12121a] border-2 border-[#d4af37] rounded-xl shadow-2xl text-[#f3f4f6]">
        
        <h3 className="text-xl font-bold text-center text-[#d4af37] mb-4 uppercase tracking-widest font-serif">
          Personalizar Insignia
        </h3>
        
        <p className="text-sm text-center text-gray-400 mb-6 font-fantasy">
          Elige el icono que portarás en los anales del gremio.
        </p>

        {/* Cuadrícula de Avatares */}
        <div className="grid grid-cols-3 gap-4 mb-6 max-h-60 overflow-y-auto p-2">
          {avataresDisponibles.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.src)}
              className={`relative cursor-pointer group flex flex-col items-center p-2 rounded-lg transition-all ${
                selectedAvatar === avatar.src 
                  ? 'bg-[#d4af37]/20 border-2 border-[#d4af37] scale-105 shadow-[0_0_15px_rgba(212,165,55,0.4)]' 
                  : 'border border-gray-700 hover:border-gray-500 hover:bg-white/5'
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#d4af37] shadow-md bg-black">
                <img src={avatar.src} alt={avatar.nombre} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] mt-2 text-center text-gray-300 font-fantasy font-bold">{avatar.nombre}</span>
            </div>
          ))}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 font-fantasy">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardarCambios}
            disabled={loading}
            className="px-5 py-2 bg-gradient-to-r from-guildBlue to-[#1a2d5c] hover:brightness-110 border border-goldPrimary text-goldLight font-bold rounded-lg shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Forjar Cambios'}
          </button>
        </div>

      </div>
    </div>
  );
}
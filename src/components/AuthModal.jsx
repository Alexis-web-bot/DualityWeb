import React, { useState, useEffect } from 'react';
import { X, Mail, Key, User, Shield, LogIn, UserPlus, AlertTriangle } from 'lucide-react';
import PergaminoBox from './PergaminoBox';
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc
} from '../firebaseConfig';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      limpiarCampos();
    }
  }, [isOpen]);

  const limpiarCampos = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setErrorMsg('');
    setLoading(false);
  };

  const cambiarTab = (modoLogin) => {
    setIsLogin(modoLogin);
    limpiarCampos();
  };

  const handleClose = () => {
    limpiarCampos();
    onClose();
  };

  const traducirErrorFirebase = (codigo) => {
    switch (codigo) {
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está registrado en el Gremio.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos. Verifica tus datos.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
      default:
        return 'Ocurrió un error en la autenticación. Inténtalo de nuevo.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isLogin && username.trim() === '') {
      setErrorMsg('Por favor, ingresa tu nombre en el Gremio.');
      return;
    }

    if (email.trim() === '') {
      setErrorMsg('El campo de correo electrónico es obligatorio.');
      return;
    }

    if (password.trim() === '') {
      setErrorMsg('El campo de contraseña es obligatorio.');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        let savedUsername = user.email.split('@')[0];
        try {
          const userDocRef = doc(db, 'usuarios', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            savedUsername = userDoc.data().username;
          }
        } catch (err) {
          console.error('No se pudo recuperar el perfil de Firestore:', err);
        }

        onLoginSuccess({
          username: savedUsername,
          email: user.email
        });
        handleClose();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'usuarios', user.uid), {
          username: username.trim(),
          email: user.email,
          createdAt: new Date().toISOString()
        });

        onLoginSuccess({
          username: username.trim(),
          email: user.email
        });
        handleClose();
      }
    } catch (error) {
      setErrorMsg(traducirErrorFirebase(error.code));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full relative">
        <PergaminoBox bodyClassName="space-y-5 px-6 py-6">
          <div className="flex items-center justify-between border-b-2 border-[#8F7643]/40 pb-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-parchmentText flex items-center gap-2 uppercase tracking-wider">
              <Shield className="w-6 h-6 text-ribbonRed" /> Acceso al Gremio
            </h3>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg bg-[#3B2A1A]/15 text-parchmentText hover:bg-ribbonRed hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => cambiarTab(true)}
              className={`flex-1 py-2.5 rounded-xl font-fantasy font-bold text-xs flex items-center justify-center gap-2 transition ${
                isLogin
                  ? 'bg-guildBlue text-goldLight border-2 border-goldPrimary shadow-inner'
                  : 'bg-[#3B2A1A]/10 text-parchmentText border border-[#8F7643]/50 hover:bg-[#3B2A1A]/20'
              }`}
            >
              <LogIn className="w-4 h-4" /> Iniciar Sesión
            </button>
            <button
              onClick={() => cambiarTab(false)}
              className={`flex-1 py-2.5 rounded-xl font-fantasy font-bold text-xs flex items-center justify-center gap-2 transition ${
                !isLogin
                  ? 'bg-guildBlue text-goldLight border-2 border-goldPrimary shadow-inner'
                  : 'bg-[#3B2A1A]/10 text-parchmentText border border-[#8F7643]/50 hover:bg-[#3B2A1A]/20'
              }`}
            >
              <UserPlus className="w-4 h-4" /> Crear Cuenta
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-ribbonRed/10 border border-ribbonRed/50 flex items-start gap-2 text-ribbonRed text-xs font-bold font-serifBody">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-1.5">
                <label className="block text-xs font-fantasy font-bold text-parchmentText uppercase tracking-wider">
                  Nombre de Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-guildBlue" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border-2 border-[#8F7643]/60 focus:border-guildBlue focus:bg-white text-dualityDeep font-serifBody outline-none transition"
                    placeholder="Tu nombre en el Gremio"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-fantasy font-bold text-parchmentText uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-guildBlue" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border-2 border-[#8F7643]/60 focus:border-guildBlue focus:bg-white text-dualityDeep font-serifBody outline-none transition"
                  placeholder="ejemplo@gremio.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-fantasy font-bold text-parchmentText uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-guildBlue" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border-2 border-[#8F7643]/60 focus:border-guildBlue focus:bg-white text-dualityDeep font-serifBody outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full wax-seal py-3 rounded-xl text-white font-fantasy font-extrabold text-sm uppercase tracking-widest shadow-lg hover:brightness-110 transition disabled:opacity-50"
              >
                {loading ? 'Procesando...' : (isLogin ? 'Entrar al Gremio' : 'Forjar Alianza')}
              </button>
            </div>
          </form>
        </PergaminoBox>
      </div>
    </div>
  );
}
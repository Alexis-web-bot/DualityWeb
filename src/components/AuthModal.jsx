import React, { useState, useEffect } from 'react';
import { X, Mail, Key, User, Shield, LogIn, UserPlus, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import PergaminoBox from './PergaminoBox';
import {
  auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, getDoc
} from '../firebaseConfig';

const diccionario = {
  es: {
    title: 'Acceso al Gremio', loginTab: 'Iniciar Sesión', registerTab: 'Crear Cuenta',
    userLabel: 'Nombre de Usuario', userPlace: 'Tu nombre en el Gremio',
    emailLabel: 'Correo Electrónico', emailPlace: 'ejemplo@gremio.com',
    passLabel: 'Contraseña', loginBtn: 'Entrar al Gremio', registerBtn: 'Forjar Alianza',
    processing: 'Procesando...',
    errEmptyUser: 'Por favor, ingresa tu nombre en el Gremio.',
    errEmptyEmail: 'El campo de correo electrónico es obligatorio.',
    errEmptyPass: 'El campo de contraseña es obligatorio.',
    errInUse: 'Este correo electrónico ya está registrado en el Gremio.',
    errInvalidEmail: 'El formato del correo electrónico no es válido.',
    errInvalidCreds: 'Correo o contraseña incorrectos. Verifica tus datos.',
    errWeak: 'La contraseña es muy débil. Debe tener al menos 6 caracteres.',
    errDefault: 'Ocurrió un error en la autenticación. Inténtalo de nuevo.'
  },
  en: {
    title: 'Guild Access', loginTab: 'Log In', registerTab: 'Create Account',
    userLabel: 'Username', userPlace: 'Your name in the Guild',
    emailLabel: 'Email Address', emailPlace: 'example@guild.com',
    passLabel: 'Password', loginBtn: 'Enter the Guild', registerBtn: 'Forge Alliance',
    processing: 'Processing...',
    errEmptyUser: 'Please enter your Guild username.',
    errEmptyEmail: 'The email field is mandatory.',
    errEmptyPass: 'The password field is mandatory.',
    errInUse: 'This email is already registered in the Guild.',
    errInvalidEmail: 'Invalid email format.',
    errInvalidCreds: 'Incorrect email or password. Please verify your data.',
    errWeak: 'Password is too weak. Must be at least 6 characters.',
    errDefault: 'An authentication error occurred. Please try again.'
  }
};

export default function AuthModal({ isOpen, onClose, onLoginSuccess, lang = 'es' }) {
  const t = diccionario[lang];
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { if (!isOpen) limpiarCampos(); }, [isOpen]);

  const limpiarCampos = () => {
    setEmail(''); setPassword(''); setUsername('');
    setErrorMsg(''); setLoading(false); setShowPassword(false);
  };

  const cambiarTab = (modoLogin) => { setIsLogin(modoLogin); limpiarCampos(); };
  const handleClose = () => { limpiarCampos(); onClose(); };

  const traducirErrorFirebase = (codigo) => {
    switch (codigo) {
      case 'auth/email-already-in-use': return t.errInUse;
      case 'auth/invalid-email': return t.errInvalidEmail;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential': return t.errInvalidCreds;
      case 'auth/weak-password': return t.errWeak;
      default: return t.errDefault;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setErrorMsg('');
    if (!isLogin && username.trim() === '') { setErrorMsg(t.errEmptyUser); return; }
    if (email.trim() === '') { setErrorMsg(t.errEmptyEmail); return; }
    if (password.trim() === '') { setErrorMsg(t.errEmptyPass); return; }

    setLoading(true);
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        let savedUsername = user.email.split('@')[0];
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) savedUsername = userDoc.data().username;
        } catch (err) {}
        onLoginSuccess({ username: savedUsername, email: user.email, uid: user.uid });
        handleClose();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'usuarios', user.uid), {
          username: username.trim(), email: user.email, createdAt: new Date().toISOString()
        });
        onLoginSuccess({ username: username.trim(), email: user.email, uid: user.uid });
        handleClose();
      }
    } catch (error) { setErrorMsg(traducirErrorFirebase(error.code)); } 
    finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full relative">
        <PergaminoBox bodyClassName="space-y-5 px-6 py-6">
          <div className="flex items-center justify-between border-b-2 border-[#8F7643]/40 pb-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-parchmentText flex items-center gap-2 uppercase tracking-wider">
              <Shield className="w-6 h-6 text-ribbonRed" /> {t.title}
            </h3>
            <button onClick={handleClose} className="p-1.5 rounded-lg bg-[#3B2A1A]/15 text-parchmentText hover:bg-ribbonRed hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => cambiarTab(true)} className={`flex-1 py-2.5 rounded-xl font-fantasy font-bold text-xs flex items-center justify-center gap-2 transition ${isLogin ? 'bg-guildBlue text-goldLight border-2 border-goldPrimary shadow-inner' : 'bg-[#3B2A1A]/10 text-parchmentText border border-[#8F7643]/50 hover:bg-[#3B2A1A]/20'}`}>
              <LogIn className="w-4 h-4" /> {t.loginTab}
            </button>
            <button onClick={() => cambiarTab(false)} className={`flex-1 py-2.5 rounded-xl font-fantasy font-bold text-xs flex items-center justify-center gap-2 transition ${!isLogin ? 'bg-guildBlue text-goldLight border-2 border-goldPrimary shadow-inner' : 'bg-[#3B2A1A]/10 text-parchmentText border border-[#8F7643]/50 hover:bg-[#3B2A1A]/20'}`}>
              <UserPlus className="w-4 h-4" /> {t.registerTab}
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
                <label className="block text-xs font-fantasy font-bold text-parchmentText uppercase tracking-wider">{t.userLabel}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-guildBlue" />
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border-2 border-[#8F7643]/60 focus:border-guildBlue focus:bg-white text-dualityDeep font-serifBody outline-none transition" placeholder={t.userPlace} />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-fantasy font-bold text-parchmentText uppercase tracking-wider">{t.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-guildBlue" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border-2 border-[#8F7643]/60 focus:border-guildBlue focus:bg-white text-dualityDeep font-serifBody outline-none transition" placeholder={t.emailPlace} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-fantasy font-bold text-parchmentText uppercase tracking-wider">{t.passLabel}</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-guildBlue" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/50 border-2 border-[#8F7643]/60 focus:border-guildBlue focus:bg-white text-dualityDeep font-serifBody outline-none transition" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-guildBlue transition-colors focus:outline-none">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading} className="w-full wax-seal py-3 rounded-xl text-white font-fantasy font-extrabold text-sm uppercase tracking-widest shadow-lg hover:brightness-110 transition disabled:opacity-50">
                {loading ? t.processing : (isLogin ? t.loginBtn : t.registerBtn)}
              </button>
            </div>
          </form>
        </PergaminoBox>
      </div>
    </div>
  );
}
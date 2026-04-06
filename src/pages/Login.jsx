import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('확인 이메일을 발송했습니다. 이메일을 확인해주세요!');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        navigate('/');
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  };

  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-[500px] mx-auto min-h-screen">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl lg:text-5xl font-light tracking-tight mb-3">
          {isSignUp ? '회원가입' : '로그인'}
        </h1>
        <p className="text-on-surface-variant font-label text-sm tracking-wide">
          {isSignUp ? 'ART CURATOR의 회원이 되어보세요' : '계정에 로그인하세요'}
        </p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-error-container text-on-error-container text-sm font-label rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-6 p-4 bg-secondary-fixed text-on-secondary-fixed text-sm font-label rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignUp && (
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              required
              className="w-full px-4 py-4 border border-outline-variant/30 bg-transparent font-body text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
        )}

        <div>
          <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            className="w-full px-4 py-4 border border-outline-variant/30 bg-transparent font-body text-sm focus:outline-none focus:border-secondary transition-colors"
          />
        </div>

        <div>
          <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full px-4 py-4 border border-outline-variant/30 bg-transparent font-body text-sm focus:outline-none focus:border-secondary transition-colors"
          />
        </div>

        {isSignUp && (
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-4 border border-outline-variant/30 bg-transparent font-body text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
        )}

        {!isSignUp && (
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-secondary" />
              <span className="font-label text-xs text-on-surface-variant">로그인 유지</span>
            </label>
            <a href="#" className="font-label text-xs text-secondary hover:underline">비밀번호 찾기</a>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-primary text-on-primary font-label text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-container transition-all disabled:opacity-50"
        >
          {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant/20"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-label text-[10px] uppercase tracking-widest text-outline">또는</span>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full py-4 border border-outline-variant/30 font-label text-xs uppercase tracking-widest hover:bg-surface-container-low transition-all flex items-center justify-center gap-3"
      >
        <span className="material-symbols-outlined" style={{fontSize: '18px'}}>mail</span>
        Google로 계속하기
      </button>

      <div className="text-center pt-6">
        <p className="font-label text-sm text-on-surface-variant">
          {isSignUp ? '이미 계정이 있으신가요?' : '아직 회원이 아니신가요?'}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
            className="ml-2 text-secondary font-semibold hover:underline"
          >
            {isSignUp ? '로그인' : '회원가입'}
          </button>
        </p>
      </div>

      {isSignUp && (
        <p className="text-center text-[10px] text-on-surface-variant font-label mt-8 leading-relaxed">
          회원가입 시 ART CURATOR의 <a href="#" className="underline">이용약관</a> 및 <a href="#" className="underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
        </p>
      )}
    </main>
  );
}

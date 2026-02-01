import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: setAuthContext } = useAuth();
  const { login, loading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(username, password);
      setAuthContext(response.access_token, response.user);
      navigate('/shipments');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__card}>
        <h1 className={styles.login__title}>FlowTMS</h1>
        <p className={styles.login__subtitle}>Transportation Management System</p>
        <form className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.login__field}>
            <label className={styles.login__label}>Username</label>
            <input
              className={styles.login__input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className={styles.login__field}>
            <label className={styles.login__label}>Password</label>
            <input
              className={styles.login__input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <div className={styles.login__error}>{error}</div>}
          <button className={styles.login__button} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className={styles.login__hint}>
          <strong>Demo Credentials:</strong>
          <br />
          Admin: username: admin, password: admin123
          <br />
          Employee: username: employee, password: employee123
        </div>
      </div>
    </div>
  );
}

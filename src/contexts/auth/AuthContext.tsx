import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

interface User {
  email: string;
  password: string;
}

interface UserInfo {
  email: string;
}

interface AuthContextData {
  user: UserInfo | null;
  login: (data: User) => Promise<void | User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<UserInfo | null>('psi-user', null);
  const getUser = useReadLocalStorage('psi-user');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (getUser !== null) {
      setUser(getUser as UserInfo);
    }
  }, []);

  const isAuthenticated = !!user;

  async function login(data: User) {
    // login with backend...

    if (data.email !== 'gabrielgoomes.desouza@gmail.com' || data.password !== 'asd123') {
      throw Error('Something went wrong!');
    }

    const setUserInfo = {
      email: data.email,
    };

    setUser(setUserInfo);
    const origin = location.state?.from?.pathname || '/clients';
    navigate(origin, { replace: true });
  }

  async function logout() {
    setUser(null);
    navigate('/', { replace: true });
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

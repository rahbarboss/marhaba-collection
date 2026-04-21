import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { OrderAddress, UserProfile } from "../types";

interface UserContextValue {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  setUser: (user: UserProfile | null) => void;
  login: (credentials: { username: string; password: string }) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: OrderAddress) => void;
}

const ADMIN_USERNAME = "gulamsarwar@786";
const ADMIN_PASSWORD = "@gulamsarwar786";

const defaultAdmin: UserProfile = {
  id: "admin-001",
  name: "Gulab Sarwar",
  email: "gulamsarwar@786",
  phone: "+91 9334808340",
  isAdmin: true,
  referralCode: "ADMIN786",
  rewardPoints: 5000,
  language: "en",
  savedAddresses: [
    {
      name: "Gulab Sarwar",
      phone: "+91 9334808340",
      line1: "Main Road, Patna",
      city: "Patna",
      state: "Bihar",
      pincode: "800001",
    },
  ],
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(null);

  const setUser = useCallback((u: UserProfile | null) => {
    setUserState(u);
  }, []);

  const login = useCallback(
    (credentials: { username: string; password: string }): boolean => {
      if (
        credentials.username === ADMIN_USERNAME &&
        credentials.password === ADMIN_PASSWORD
      ) {
        setUserState(defaultAdmin);
        return true;
      }
      const guestUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: credentials.username.split("@")[0] ?? "User",
        email: credentials.username,
        phone: "",
        isAdmin: false,
        referralCode: `REF${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        rewardPoints: 100,
        language: "en",
        savedAddresses: [],
      };
      setUserState(guestUser);
      return true;
    },
    [],
  );

  const logout = useCallback(() => {
    setUserState(null);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserState((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const addAddress = useCallback((address: OrderAddress) => {
    setUserState((prev) =>
      prev
        ? { ...prev, savedAddresses: [...prev.savedAddresses, address] }
        : null,
    );
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAdmin: user?.isAdmin ?? false,
        isLoggedIn: user !== null,
        setUser,
        login,
        logout,
        updateProfile,
        addAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

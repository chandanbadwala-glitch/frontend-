import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { fetchAPI } from "./api";

export type RequestStage =
  | "New request"
  | "Admin reviewing"
  | "Candidate contacted"
  | "Employee accepted"
  | "Connected";

export const requestStages: RequestStage[] = [
  "New request",
  "Admin reviewing",
  "Candidate contacted",
  "Employee accepted",
  "Connected",
];

export type StaffRequest = {
  id: string;
  _id?: string;
  restaurant: any;
  owner: any;
  role: string;
  city: string;
  vacancies: number;
  salary: string;
  urgent: boolean;
  candidate?: any;
  stage: RequestStage;
  createdAt: string;
};

export type EmployeeProfile = {
  id: string;
  _id?: string;
  user: any;
  role: string;
  category: string;
  city: string;
  state: string;
  experience: number;
  skills: string[];
  languages: string[];
  rating: number;
  expectedSalary: number;
  availability: string;
  qualification: string;
  status: string;
  verified: boolean;
  badge: string;
  matchScore: number;
  resumeScore: number;
  initials: string;
  name?: string;
};

export type Application = {
  id: string;
  employee: string;
  jobTitle: string;
  restaurant: string;
  stage: RequestStage;
  createdAt: string;
};

export type Notification = {
  id: string;
  audience: "admin" | "owner" | "employee";
  title: string;
  body: string;
  time: string;
};

type Ctx = {
  requests: StaffRequest[];
  employees: EmployeeProfile[];
  restaurants: any[];
  applications: Application[];
  notifications: Notification[];
  stats: any;
  pendingUsers: any[];
  loading: boolean;
  fetchData: () => Promise<void>;
  requestStaff: (input: Omit<StaffRequest, "id" | "stage" | "createdAt" | "owner">) => Promise<void>;
  applyToJob: (input: Omit<Application, "id" | "stage" | "createdAt">) => void;
  advanceRequest: (id: string) => Promise<void>;
  advanceApplication: (id: string) => void;
  approveUser: (id: string) => Promise<void>;
};

const PlatformContext = createContext<Ctx | null>(null);

const now = () => "Just now";
const uid = () => Math.random().toString(36).slice(2, 9);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<StaffRequest[]>([]);
  const [employees, setEmployees] = useState<EmployeeProfile[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.role === 'admin') {
          const [reqs, st, emps, pending] = await Promise.all([
            fetchAPI('/admin/requests'),
            fetchAPI('/admin/stats'),
            fetchAPI('/admin/employees'),
            fetchAPI('/admin/pending-users')
          ]);
          setRequests(reqs.map((r: any) => ({ ...r, id: r._id })));
          setStats(st);
          setEmployees(emps.map((e: any) => ({ ...e, id: e._id, name: e.user?.name })));
          setPendingUsers(pending.map((p: any) => ({ ...p, id: p._id })));
        } else if (user.role === 'owner') {
          const [reqs, emps, rests] = await Promise.all([
            fetchAPI('/hiring/requests'),
            fetchAPI('/hiring/employees'),
            fetchAPI('/hiring/restaurants')
          ]);
          setRequests(reqs.map((r: any) => ({ ...r, id: r._id })));
          setEmployees(emps.map((e: any) => ({ ...e, id: e._id, name: e.user?.name })));
          setRestaurants(rests.map((r: any) => ({ ...r, id: r._id })));
        } else if (user.role === 'employee') {
          const reqs = await fetchAPI('/hiring/jobs');
          setRequests(reqs.map((r: any) => ({ ...r, id: r._id })));
        }
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      requests,
      employees,
      restaurants,
      applications,
      notifications,
      stats,
      pendingUsers,
      loading,
      fetchData,
      requestStaff: async (input) => {
        try {
          await fetchAPI('/hiring/request', {
            method: 'POST',
            body: JSON.stringify(input)
          });
          await fetchData();
          setNotifications((prev) => [
            { id: uid(), audience: "owner", title: "Request sent to admin", body: "Our hiring desk will shortlist verified candidates for you.", time: now() },
            ...prev,
          ]);
        } catch (err) {
          console.error("Failed to request staff:", err);
        }
      },
      applyToJob: (input) => {
        const id = uid();
        setApplications((prev) => [{ ...input, id, stage: "New request", createdAt: now() }, ...prev]);
      },
      advanceRequest: async (id) => {
        try {
          await fetchAPI(`/admin/requests/${id}/advance`, {
            method: 'PUT'
          });
          await fetchData();
        } catch (err) {
          console.error("Failed to advance request:", err);
        }
      },
      advanceApplication: (id) =>
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, stage: "Candidate contacted" } : a))),
      approveUser: async (id) => {
        try {
          await fetchAPI(`/admin/approve-user/${id}`, { method: 'PUT' });
          await fetchData();
        } catch (err) {
          console.error("Failed to approve user:", err);
        }
      },
    }),
    [requests, employees, applications, notifications, stats, pendingUsers, loading]
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error("usePlatform must be used inside PlatformProvider");
  return ctx;
}
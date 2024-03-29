import { Toaster } from "./ui/toaster";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="container">{children}</div>
      <Toaster />
    </div>
  );
}

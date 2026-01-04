import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-sm">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-sm">by Lighthouse Team</span>
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Lighthouse Magazine. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}


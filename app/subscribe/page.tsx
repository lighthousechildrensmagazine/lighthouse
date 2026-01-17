import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function SubscribePage() {
    return (
        <main className="min-h-screen bg-[#fffbeb] text-[#1e1b4b] relative overflow-hidden">
            {/* Background Decorative Elements - simpler version of home for consistency */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center text-indigo-600 font-bold hover:underline mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 text-center">
                    <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-10 h-10 text-lime-600" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Subscribe to Lighthouse
                    </h1>

                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join our community of curious minds! We are currently finalizing our subscription plans.
                    </p>

                    <div className="bg-indigo-50 rounded-xl p-6 md:p-8 max-w-lg mx-auto border border-indigo-100">
                        <p className="font-bold text-lg mb-2">Want to be notified?</p>
                        <p className="text-slate-600 mb-6">Sign up for our newsletter to get updates when subscriptions open.</p>

                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                            >
                                Notify Me
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

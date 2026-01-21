"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { subscribeUser } from "@/lib/api";

function SubscriptionForm() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const result = await subscribeUser(email, phone);
        if (result.success) {
            setStatus("success");
            setEmail("");
            setPhone("");
        } else {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-bold">
                Thanks! You've been subscribed.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number (optional)"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50"
            >
                {status === "loading" ? "Joining..." : "Notify Me"}
            </button>
            {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
        </form>
    );
}

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

                        <SubscriptionForm />
                    </div>
                </div>
            </div>
        </main>
    );
}

"use client";

import Link from "next/link";
import { ArrowLeft, Send, Upload, User, Mail, Phone, School, FileText } from "lucide-react";
import { useState, useRef } from "react";
import { submitArticle } from "@/lib/api";

export default function SubmitPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        schoolGrade: "",
        content: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // In a real app, we would upload the file to storage (S3/Drive) first,
        // then send the data + file URL to the backend.
        // Since we are mocking/simulating for now:
        const result = await submitArticle({ ...formData, file });

        if (result.success) {
            setStatus("success");
            setFormData({ fullName: "", email: "", phone: "", schoolGrade: "", content: "" });
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
            console.error("Submission error:", result.message);
            setStatus("error");
            // Ideally we'd show the specific message to the user, but for now log it.
            if (result.message) alert(result.message); // Simple feedback for now
        }
    };

    if (status === "success") {
        return (
            <div className="min-h-screen bg-[#fffbeb] text-[#1e1b4b] flex items-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 text-center max-w-lg w-full">
                    <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 text-lime-600" />
                    </div>
                    <h2 className="text-3xl font-display font-bold mb-4">Submission Received!</h2>
                    <p className="text-lg text-slate-600 mb-8">
                        Thank you for sharing your creativity with Lighthouse. We'll review your submission and get back to you soon!
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        Back to Home
                    </Link>
                    <button
                        onClick={() => setStatus("idle")}
                        className="block w-full mt-4 text-indigo-600 font-semibold hover:underline"
                    >
                        Submit another article
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fffbeb] text-[#1e1b4b] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center text-indigo-600 font-bold hover:underline mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border border-white/50">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-indigo-900">
                            Submit Your Work
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Got a story, poem, or drawing? We'd love to see it! Fill out the form below to submit your work to Lighthouse.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="block text-sm font-bold text-slate-700 pl-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white/50"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 pl-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white/50"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 pl-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Mobile Number"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white/50"
                                    />
                                </div>
                            </div>

                            {/* School & Grade */}
                            <div className="space-y-2">
                                <label htmlFor="schoolGrade" className="block text-sm font-bold text-slate-700 pl-1">
                                    School & Grade <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <School className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        id="schoolGrade"
                                        name="schoolGrade"
                                        required
                                        value={formData.schoolGrade}
                                        onChange={handleChange}
                                        placeholder="e.g. Springfield High, Grade 8"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="space-y-2">
                            <label htmlFor="content" className="block text-sm font-bold text-slate-700 pl-1">
                                Write your article here <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <textarea
                                    id="content"
                                    name="content"
                                    required
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={8}
                                    placeholder="Type your story, poem, or article content here..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white/50 resize-y"
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <label htmlFor="file" className="block text-sm font-bold text-slate-700 pl-1">
                                Attach Pictures (Optional)
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf,.doc,.docx"
                                    className="hidden"
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 hover:bg-white/50 transition-colors cursor-pointer text-center group"
                                >
                                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">
                                        {file ? (
                                            <span className="text-indigo-600 font-bold">{file.name}</span>
                                        ) : (
                                            <>Click to upload or drag and drop<br /><span className="text-slate-400 font-normal">Images, PDF, or Word docs</span></>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-lime-400 text-slate-900 font-bold text-lg rounded-xl hover:bg-lime-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                {status === "loading" ? (
                                    "Submitting..."
                                ) : (
                                    <>
                                        Submit <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>

                        {status === "error" && (
                            <p className="text-red-500 text-center font-bold bg-red-50 p-3 rounded-lg">
                                Oops! Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}

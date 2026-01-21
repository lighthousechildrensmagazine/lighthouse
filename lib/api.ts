
export const API_URL = "https://script.google.com/macros/s/AKfycbzhQe_QmULqAEBDqxysfFpiVvDYZA-QljNKl1L-YHUoYZvJB3MqxBuOFzzxqk1KEWKO/exec";

export interface Issue {
    id: string;
    title: string;
    issueNumber?: number; // Might not exist in Drive data, we'll auto-generate or parse
    date: string;
    pdfUrl: string;
    coverImage?: string;
}

export async function fetchIssues(): Promise<Issue[]> {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.success && Array.isArray(data.issues)) {
            // Transform data if needed
            return data.issues.map((item: any, index: number) => ({
                id: item.id,
                title: item.title,
                issueNumber: data.issues.length - index, // Simple auto-numbering based on sort
                date: item.date,
                pdfUrl: item.pdfUrl,
                coverImage: item.coverImage
            }));
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch issues:", error);
        return [];
    }
}

export async function subscribeUser(email: string, phone: string): Promise<{ success: boolean; message?: string }> {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            mode: "no-cors", // Important for Google Apps Script
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, phone }),
        });

        // With no-cors, we can't read the response, but we assume it worked.
        return { success: true };
    } catch (error) {
        console.error("Subscription failed:", error);
        return { success: false, message: "Network error" };
    }
}

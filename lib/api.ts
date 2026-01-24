
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
                issueNumber: item.issueNumber || (data.issues.length - index), // Use API data or fallback
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
                "Content-Type": "text/plain;charset=utf-8",
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


export interface ArticleSubmission {
    fullName: string;
    email: string;
    phone: string;
    schoolGrade: string;
    content: string;
    file?: File | null;
}

// Helper to convert file to Base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === "string") {
                // Remove the "data:*/*;base64," prefix
                const base64 = reader.result.split(",")[1];
                resolve(base64);
            } else {
                reject(new Error("Failed to convert file to base64"));
            }
        };
        reader.onerror = error => reject(error);
    });
};

export async function submitArticle(data: ArticleSubmission): Promise<{ success: boolean; message?: string }> {
    try {
        let fileBase64 = "";
        let fileName = "";
        let mimeType = "";

        if (data.file) {
            // Check file size (limit to ~4MB to be safe with GAS execution limits)
            if (data.file.size > 4 * 1024 * 1024) {
                return { success: false, message: "File is too large. Please upload a file smaller than 4MB." };
            }

            console.log("Processing file:", data.file.name, "Size:", data.file.size);
            fileBase64 = await fileToBase64(data.file);
            fileName = data.file.name;
            mimeType = data.file.type;
        } else {
            console.log("No file attached to submission.");
        }

        const payload = {
            type: "submission",
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            schoolGrade: data.schoolGrade,
            content: data.content,
            file: fileBase64,
            fileName: fileName,
            mimeType: mimeType
        };

        console.log("Sending payload to GAS:", { ...payload, file: payload.file ? "(base64 data)" : "empty" });

        const res = await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload),
        });

        // With no-cors, we can't read response, assume success if no error thrown
        return { success: true };
    } catch (error) {
        console.error("Submission failed:", error);
        return { success: false, message: "Network error" };
    }
}

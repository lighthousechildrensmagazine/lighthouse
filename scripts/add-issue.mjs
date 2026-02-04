
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import poppler from 'pdf-poppler';

// Helper for ESM directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ISSUES_DIR = path.join(__dirname, '../public/issues');
const COVERS_DIR = path.join(__dirname, '../public/covers');
const DATA_FILE = path.join(__dirname, '../data/issues.ts');

// Ensure directories exist
if (!fs.existsSync(ISSUES_DIR)) fs.mkdirSync(ISSUES_DIR, { recursive: true });
if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });

async function main() {
    console.log('🔍 Scanning for new PDFs in public/issues/ ...');

    const files = fs.readdirSync(ISSUES_DIR).filter(file => file.toLowerCase().endsWith('.pdf'));

    if (files.length === 0) {
        console.log('✨ No PDFs found. Drop a .pdf file into "public/issues" and run this again.');
        return;
    }

    // Read existing data
    let dataContent = fs.readFileSync(DATA_FILE, 'utf-8');

    const existingFiles = new Set();
    const matchSource = dataContent.matchAll(/pdfUrl:\s*["']\/lighthouse\/issues\/([^"']+)["']/g);
    for (const match of matchSource) {
        existingFiles.add(match[1]);
    }

    const newFiles = files.filter(f => !existingFiles.has(f));

    if (newFiles.length === 0) {
        console.log('✅ All PDFs are already processed.');
        return;
    }

    console.log(`🆕 Found ${newFiles.length} new PDF(s). Processing...`);

    const newEntries = [];

    for (const file of newFiles) {
        const filePath = path.join(ISSUES_DIR, file);
        const issueNumMatch = file.match(/(\d+)/);
        const issueNum = issueNumMatch ? parseInt(issueNumMatch[1]) : 999;
        const title = file.replace('.pdf', '').replace(/-/g, ' ');
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);

        // Generate Cover Image
        const outputName = file.replace('.pdf', '');
        const opts = {
            format: 'jpg',
            out_dir: COVERS_DIR,
            out_prefix: outputName,
            page: 1,
            scale: 1024
        };

        console.log(`📷 Generating cover for: ${file}...`);
        try {
            await poppler.convert(filePath, opts);
            console.log(`   - Cover generated successfully!`);
        } catch (err) {
            console.error(`   - ❌ Error generating cover: ${err.message}`);
        }

        // Poppler output format can vary (-1.jpg or -01.jpg depending on version)
        // We check for common patterns. It usually pads page numbers if multiple pages, 
        // but for single page extraction it might use -1 or -01.
        const possibleGeneratedNames = [
            `${outputName}-1.jpg`,
            `${outputName}-01.jpg`,
            `${outputName}-1.JPG`,
            `${outputName}-01.JPG`
        ];

        let generatedCoverName = null;
        for (const name of possibleGeneratedNames) {
            if (fs.existsSync(path.join(COVERS_DIR, name))) {
                generatedCoverName = name;
                break;
            }
        }

        const finalCoverName = `${outputName}.jpg`;
        const finalPath = path.join(COVERS_DIR, finalCoverName);

        // If generated file exists, rename it. If using fallback or error, check manual.
        let coverUrl = "";

        if (generatedCoverName) {
            const generatedPath = path.join(COVERS_DIR, generatedCoverName);
            try {
                // Check if final path exists and delete it to avoid EPERM on rename if logic was different
                if (fs.existsSync(finalPath)) {
                    fs.unlinkSync(finalPath);
                }
                fs.renameSync(generatedPath, finalPath);
                coverUrl = `/covers/${finalCoverName}`;
            } catch (e) {
                console.error(`Error renaming cover: ${e}`);
                // Use original if rename failed
                coverUrl = `/covers/${generatedCoverName}`;
            }
        } else if (fs.existsSync(finalPath)) {
            // Maybe it was already there manual?
            coverUrl = `/covers/${finalCoverName}`;
        }

        const newEntry = `
  {
    id: "${id}",
    title: "${title}",
    issueNumber: ${issueNum},
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    pdfUrl: "/issues/${file}",
    ${coverUrl ? `coverImage: "${coverUrl}",` : '// No coverImage generated'}
  },`;

        newEntries.push(newEntry);
        console.log(`- Added entry: ${title}`);
    }

    // Insert new entries into the array
    // We look for 'export const issues: Issue[] = [' and insert after
    const splitPoint = 'export const issues: Issue[] = [';
    const parts = dataContent.split(splitPoint);

    if (parts.length === 2) {
        const updatedContent = parts[0] + splitPoint + newEntries.join('') + parts[1];
        fs.writeFileSync(DATA_FILE, updatedContent);
        console.log('🎉 Successfully updated data/issues.ts!');
    } else {
        console.error('❌ Could not parse data/issues.ts. Please check the file format.');
    }

}

main().catch(console.error);

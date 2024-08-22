import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const response = await fetch("https://fr.pornhub.com/video?o=cm");
        if (!response.ok) {
            throw new Error('Failed to fetch the page');
        }

        const html = await response.text();
        const match = html.match(/<div class="title">\s*<a\s*href="([^"]+)"[^>]*>/);
        
        if (match && match[1]) {
            const url = `https://fr.pornhub.com${match[1]}`;
            return NextResponse.json({ url });
        } else {
            return NextResponse.json({ error: 'Video URL not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
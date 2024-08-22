import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const response = await fetch("https://fr.pornhub.com/video?o=cm");
        if (!response.ok) {
            throw new Error('Failed to fetch the page');
        }

        const html = await response.text();
        let arg = html.split('<div class="title">\n                <a                    href="')[1]
        arg = arg.split(`" onclick="setEntryCookie('VidPg-premVid')"   class="">`)[0]
        let url = "https://fr.pornhub.com" + arg

        if (url) {
            return NextResponse.json({url:  `https://fr.pornhub.com${url}` });
        } else {
            return NextResponse.json({ error: 'Video URL not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
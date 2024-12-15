const form = document.getElementById('urlForm');
const proxyUrl = "https://proxy.example.workers.dev"; // Replace with your Cloudflare Worker URL

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const targetUrl = document.getElementById('urlInput').value;

    // Validate the URL to prevent abuse
    try {
        new URL(targetUrl); // Throws if the URL is invalid
    } catch {
        alert('Invalid URL. Please enter a valid URL.');
        return;
    }

    // Use the proxy to construct the iframe URL
    const proxiedUrl = `${proxyUrl}?url=${encodeURIComponent(targetUrl)}`;

    // Open a new tab and dynamically write the iframe into it
    const newTab = window.open('about:blank', '_blank');
    if (newTab) {
        newTab.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Proxied Content</title>
                <style>
                    body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
                    iframe { border: none; width: 100%; height: 100%; }
                </style>
            </head>
            <body>
                <iframe src="${proxiedUrl}"></iframe>
            </body>
            </html>
        `);
        newTab.document.close();
    } else {
        alert('Popup blocked! Please allow popups for this site.');
    }
});

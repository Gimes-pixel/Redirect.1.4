const form = document.getElementById('urlForm');
const iframeContainer = document.getElementById('iframeContainer');
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

    // Use the proxy to load the URL in an iframe
    iframeContainer.innerHTML = ''; // Clear existing iframe
    const iframe = document.createElement('iframe');
    iframe.src = `${proxyUrl}?url=${encodeURIComponent(targetUrl)}`;
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    iframeContainer.appendChild(iframe);
});

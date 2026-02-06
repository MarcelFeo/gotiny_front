// API Configuration
const API_BASE_URL = 'http://localhost:8081';
const API_ENDPOINTS = {
    shorten: `${API_BASE_URL}/gotiny`,
    redirect: `${API_BASE_URL}/r/`
};

// DOM Elements
const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const loadingState = document.getElementById('loadingState');
const resultCard = document.getElementById('resultCard');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const shortUrlDisplay = document.getElementById('shortUrlDisplay');
const copyBtn = document.getElementById('copyBtn');
const qrCodeImage = document.getElementById('qrCodeImage');
const downloadQrBtn = document.getElementById('downloadQrBtn');
const originalUrl = document.getElementById('originalUrl');
const createdAt = document.getElementById('createdAt');
const createNewBtn = document.getElementById('createNewBtn');
const totalLinksElement = document.getElementById('totalLinks');

// State
let currentShortUrl = '';
let totalLinksCreated = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTotalLinks();
    setupEventListeners();
    animateStats();

    // Add error handler for QR code image
    qrCodeImage.addEventListener('error', function() {
        console.error('Erro ao carregar QR Code. URL:', this.src);
        showError('Erro ao carregar o QR Code');
    });

    qrCodeImage.addEventListener('load', function() {
        console.log('QR Code carregado com sucesso!');
    });
});

// Event Listeners
function setupEventListeners() {
    urlForm.addEventListener('submit', handleFormSubmit);
    copyBtn.addEventListener('click', handleCopyClick);
    downloadQrBtn.addEventListener('click', handleDownloadQr);
    createNewBtn.addEventListener('click', resetForm);

    // Auto-select URL on focus
    shortUrlDisplay.addEventListener('focus', function() {
        this.select();
    });
}

// Form Submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const url = urlInput.value.trim();

    if (!isValidUrl(url)) {
        showError('Por favor, insira uma URL válida');
        return;
    }

    await shortenUrl(url);
}

// Validate URL
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Shorten URL
async function shortenUrl(url) {
    hideError();
    hideResult();
    showLoading();

    try {
        const response = await fetch(API_ENDPOINTS.shorten, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                urlLong: url
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao encurtar URL');
        }

        const data = await response.json();
        console.log('Resposta da API:', data); // Debug
        displayResult(data);
        incrementTotalLinks();

    } catch (error) {
        console.error('Error:', error);
        showError('Ocorreu um erro ao encurtar a URL. Verifique se a API está rodando.');
    } finally {
        hideLoading();
    }
}

// Display Result
function displayResult(data) {
    // Build the complete redirect URL
    // If data.urlShort is just the code (e.g., "kAY6wz"), build the full URL
    if (data.redirectUserUrl) {
        currentShortUrl = data.redirectUserUrl;
    } else if (data.urlShort) {
        // Check if urlShort is just the code or the full URL
        if (data.urlShort.startsWith('http')) {
            currentShortUrl = data.urlShort;
        } else {
            // Build the full redirect URL with /r/ path
            currentShortUrl = `${API_BASE_URL}/r/${data.urlShort}`;
        }
    }

    console.log('URL curta completa:', currentShortUrl); // Debug

    // Set short URL
    shortUrlDisplay.value = currentShortUrl;

    // Set QR Code
    console.log('data.urlQrCode original:', data.urlQrCode); // Debug

    if (data.urlQrCode) {
        let qrCodeUrl = data.urlQrCode;

        console.log('QR Code URL tipo:', typeof qrCodeUrl); // Debug
        console.log('QR Code URL primeiros 50 chars:', qrCodeUrl.substring(0, 50)); // Debug

        // Check if it's already a data URL or needs to be converted
        if (qrCodeUrl.startsWith('data:image')) {
            console.log('QR Code detectado como data:image'); // Debug
            qrCodeImage.src = qrCodeUrl;
        } else if (qrCodeUrl.startsWith('http://') || qrCodeUrl.startsWith('https://')) {
            console.log('QR Code detectado como URL HTTP'); // Debug
            qrCodeImage.src = qrCodeUrl;
        } else {
            // Assume it's base64 without prefix, add it
            console.log('QR Code detectado como Base64 puro'); // Debug
            qrCodeImage.src = `data:image/png;base64,${qrCodeUrl}`;
        }

        console.log('QR Code src final:', qrCodeImage.src.substring(0, 100)); // Debug
        qrCodeImage.alt = 'QR Code para ' + currentShortUrl;
    } else {
        console.log('AVISO: data.urlQrCode está vazio ou undefined!'); // Debug
    }

    // Set original URL
    originalUrl.textContent = data.urlLong;

    // Set created date
    if (data.urlCreated_at) {
        const date = new Date(data.urlCreated_at);
        createdAt.textContent = formatDate(date);
    }

    // Show result card with animation
    resultCard.classList.remove('hidden');

    // Trigger animations
    setTimeout(() => {
        shortUrlDisplay.focus();
        shortUrlDisplay.select();
    }, 300);
}

// Format Date
function formatDate(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return 'Agora mesmo';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `Há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `Há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Copy to Clipboard
async function handleCopyClick() {
    try {
        await navigator.clipboard.writeText(currentShortUrl);

        // Visual feedback
        const copyIcon = copyBtn.querySelector('.copy-icon');
        const checkIcon = copyBtn.querySelector('.check-icon');

        copyIcon.classList.add('hidden');
        checkIcon.classList.remove('hidden');
        copyBtn.classList.add('copied');

        setTimeout(() => {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
            copyBtn.classList.remove('copied');
        }, 2000);

    } catch (error) {
        console.error('Error copying:', error);
        showError('Erro ao copiar URL');
    }
}

// Download QR Code
function handleDownloadQr() {
    const qrCodeSrc = qrCodeImage.src;

    if (!qrCodeSrc) {
        showError('QR Code não disponível');
        return;
    }

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = qrCodeSrc;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Visual feedback
    const originalText = downloadQrBtn.innerHTML;
    downloadQrBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 8L7 11L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Download realizado!
    `;

    setTimeout(() => {
        downloadQrBtn.innerHTML = originalText;
    }, 2000);
}

// Reset Form
function resetForm() {
    urlInput.value = '';
    urlInput.focus();
    hideResult();
    hideError();
}

// Show/Hide States
function showLoading() {
    loadingState.classList.remove('hidden');
}

function hideLoading() {
    loadingState.classList.add('hidden');
}

function showResult() {
    resultCard.classList.remove('hidden');
}

function hideResult() {
    resultCard.classList.add('hidden');
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');

    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// Total Links Counter
function incrementTotalLinks() {
    totalLinksCreated++;
    saveTotalLinks();
    animateCounter(totalLinksElement, totalLinksCreated);
}

function loadTotalLinks() {
    const saved = localStorage.getItem('totalLinksCreated');
    totalLinksCreated = saved ? parseInt(saved, 10) : 0;
    totalLinksElement.textContent = totalLinksCreated;
}

function saveTotalLinks() {
    localStorage.setItem('totalLinksCreated', totalLinksCreated.toString());
}

// Animate Counter
function animateCounter(element, targetValue) {
    const startValue = parseInt(element.textContent, 10) || 0;
    const duration = 500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Animate Stats on Load
function animateStats() {
    if (totalLinksCreated > 0) {
        animateCounter(totalLinksElement, totalLinksCreated);
    }
}

// Input validation on typing
urlInput.addEventListener('input', function() {
    const url = this.value.trim();

    if (url && !isValidUrl(url)) {
        this.style.borderColor = 'var(--error)';
    } else {
        this.style.borderColor = '';
    }
});

// Enter key shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to reset
    if (e.key === 'Escape' && !resultCard.classList.contains('hidden')) {
        resetForm();
    }

    // CMD/CTRL + K to focus input
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        urlInput.focus();
    }
});

// Add loading animation to input
urlInput.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
});

urlInput.addEventListener('blur', function() {
    this.parentElement.style.transform = '';
});

// Paste event handler
urlInput.addEventListener('paste', function(e) {
    setTimeout(() => {
        const url = this.value.trim();
        if (isValidUrl(url)) {
            // Auto-submit on paste if valid URL (optional)
            // urlForm.dispatchEvent(new Event('submit'));
        }
    }, 0);
});

// Console Easter Egg
console.log('%c🚀 GoTiny URL Shortener', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
console.log('%cFeito com ❤️ e muito código', 'font-size: 12px; color: #a0a0b0;');
console.log('%cDica: Pressione CMD/CTRL + K para focar no input!', 'font-size: 12px; color: #7c3aed;');

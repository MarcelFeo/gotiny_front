document.getElementById("shortenForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Simulação de retorno da API
    const fakeShortUrl = "http://localhost:8081/r/LD6sm";

    document.getElementById("shortUrl").textContent = fakeShortUrl;
    document.getElementById("shortUrl").href = fakeShortUrl;
    document.getElementById("result").classList.remove("d-none");
});

function copyLink() {
    const link = document.getElementById("shortUrl").textContent;
    navigator.clipboard.writeText(link);
    alert("Link copiado!");
}

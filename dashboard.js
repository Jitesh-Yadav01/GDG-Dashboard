const SUPABASE_URL = "https://htlzhrihaokkymnpzwyd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bHpocmloYW9ra3ltbnB6d3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NzM3MDMsImV4cCI6MjA3NjI0OTcwM30.emPdJkv7e8X6h90RfztwpwJtZpOZOVOaO8KWkfjIdYM";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const container = document.getElementById("data-container");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const closeModal = document.getElementById("close-modal");

async function loadData() {
    const response = await supabase
        .from("formSubmissions")
        .select("*");

    const data = response.data;
    const error = response.error;

    if (error) {
        container.innerHTML = `<p style='color:red;'>Error fetching data: ${error.message}</p>`;
        return;
    }

    if (!data || data.length === 0) {
        container.innerHTML = "<p>No submissions found.</p>";
        return;
    }

    data.forEach(function(item) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML =
            `<div class="info">
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Email:</strong> ${item["college-email"]}</p>
                <p><strong>Branch:</strong> ${item.branch}</p>
                <p><strong>Phone:</strong> ${item["phone-no"]}</p>
                <p><strong>Priority:</strong> ${item.priority}</p>
            </div>
            <button class="view-btn">View More</button>`;

        card.querySelector(".view-btn").addEventListener("click", function() {
            let index = Array.from(container.children).indexOf(card) + 1;
            let html = "";
            html += `<div style='text-align:left; overflow:scroll'>`;
            html += `<h2 style='margin-bottom:18px;font-size:20px;'>Submission Details (${index})</h2>`;
            html += `<div style='display:grid;grid-template-columns:180px 1fr;row-gap:10px;column-gap:16px;'>`;
            html += `<div><strong>Name:</strong></div><div>${item.name || ""}</div>`;
            html += `<div><strong>Email:</strong></div><div>${item["college-email"] || ""}</div>`;
            html += `<div><strong>Branch:</strong></div><div>${item.branch || ""}</div>`;
            html += `<div><strong>Registration Number:</strong></div><div>${item["reg-no"] || ""}</div>`;
            html += `<div><strong>Phone:</strong></div><div>${item["phone-no"] || ""}</div>`;
            html += `<div><strong>Priority:</strong></div><div>${item.priority || ""}</div>`;
            html += `<div><strong>Domain:</strong></div><div>${item.domain || ""}</div>`;
            html += `<div><strong>Best Project (GitHub):</strong></div><div>${item.project || ""}</div>`;
            html += `<div style='grid-column:1/3;'><strong>Why do you want to join GDSC?</strong><br>${item["why-to-join"] || "No reason provided."}</div>`;
            html += `</div></div>`;
            modalText.innerHTML = html;
            modal.style.display = "flex";
        });

        container.appendChild(card);
    });
}

closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

loadData();

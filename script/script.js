const form = document.getElementById('form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('name').value;
        const password = document.getElementById('pass').value;

        if (username === 'admin' && password === 'admin123') {
            window.location.href = 'index2.html';
        } else {
            alert('Invalid username or password!');
        }
    });
}

let allIssues = [];

async function loadIssues() {

    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const result = await response.json();

    allIssues = result.data;

    renderIssues(allIssues);
}

function renderIssues(issues) {
    const container = document.getElementById("issue_container");
    container.innerHTML = "";
    document.getElementById("issueCount").textContent = issues.length;
    issues.forEach(issue => {

        let priorityColor = "bg-yellow-100 text-yellow-700";
        if (issue.priority === "high") {
            priorityColor = "bg-red-100 text-red-600";
        } else if (issue.priority === "medium") {
            priorityColor = "bg-yellow-100 text-yellow-500";
        }
          else priorityColor = "bg-gray-100 text-gray-400";

        const date = new Date(issue.createdAt).toLocaleDateString();

        const labelsHTML = issue.labels.map(label => {
            const labelColor =
                 label === "bug"
            ? "bg-red-100 text-red-600"
            : label === "help wanted"
            ? "bg-yellow-100 text-yellow-600"
            : label === "enhancement"
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-gray-600";

            return `
                <span class="text-xs px-3 py-1 rounded-full ${labelColor} font-medium">
                    ${label.toUpperCase()}
                </span>
            `;
        }).join("");

        const statusBorder =
    issue.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";

        const card = `
        <div class="bg-white rounded-xl shadow-sm border-t border-gray-200 p-5 relative ${statusBorder}">

            <!-- Priority -->
            <div class="absolute top-4 right-4">
                <span class="px-3 py-1 text-xs rounded-full font-semibold uppercase ${priorityColor}">
                    ${issue.priority}
                </span>
            </div>

            <!-- Title -->
            <div class="flex flex-col items-start gap-3 mb-2">
                <img src="${issue.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-Status.png'}"
         class="w-6 h-6"
         alt="">

    <h3 class="font-semibold text-gray-800 text-sm pr-16">
        ${issue.title}
    </h3>
            </div>

            <!-- Description -->
            <p class="text-gray-500 text-xs mb-4">
                ${issue.description}
            </p>

            <!-- Labels -->
            <div class="flex gap-2 flex-wrap mb-4">
                ${labelsHTML}
            </div>

            <!-- Footer -->
            <div class=" text-xs text-gray-400 border-t pt-3">
                <div>#${issue.id} by ${issue.author}</div>
                <div>${date}</div>
            </div>

        </div>
        `;

        container.innerHTML += card;
    });
}

function setActiveButton(activeBtn) {

    document.querySelectorAll("#allBtn,#openBtn,#closedBtn").forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline","border-gray-300","text-gray-500");
    });

    activeBtn.classList.remove("btn-outline","border-gray-300","text-gray-500");
    activeBtn.classList.add("btn-primary");
}

document.getElementById("allBtn").onclick = function() {
    setActiveButton(this);
    renderIssues(allIssues);
};

document.getElementById("openBtn").onclick = function() {
    setActiveButton(this);
    const openIssues = allIssues.filter(issue => issue.status === "open");
    renderIssues(openIssues);
};

document.getElementById("closedBtn").onclick = function() {
    setActiveButton(this);
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    renderIssues(closedIssues);
};

loadIssues();
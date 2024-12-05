const API_URL = 'http://127.0.0.1:3333';

async function loadMessages() {
    const response = await fetch(`${API_URL}/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    const tableBody = document.getElementById('messages-table');
    tableBody.innerHTML = '';

    data?.messages?.forEach(message => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${message.id}</td>
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.subject}</td>
            <td>${message.text}</td>
            <td class="table-actions">
                <button class="btn btn-danger btn-sm" onclick="deleteMessage('${message.id}')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function deleteMessage(id) {
    if (!confirm('Tem certeza de que deseja excluir esta mensagem?')) return;

    await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }});
    loadMessages();
}

async function loadTestimonials() {
    const response = await fetch(`${API_URL}/feedbacks`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    const tableBody = document.getElementById('testimonials-table');
    tableBody.innerHTML = '';

    data?.forEach(testimonial => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${testimonial.id}</td>
            <td>${testimonial.name}</td>
            <td>${testimonial.age}</td>
            <td>${testimonial.text}</td>
            <td class="table-actions">
                <button class="btn btn-danger btn-sm" onclick="deleteTestimonial('${testimonial.id}')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function deleteTestimonial(id) {
    if (!confirm('Tem certeza de que deseja excluir este depoimento?')) return;

    await fetch(`${API_URL}/feedbacks/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }});
    loadTestimonials();
}

async function initializeDashboard() {
    await loadMessages();
    await loadTestimonials();
}

document.addEventListener('DOMContentLoaded', initializeDashboard);
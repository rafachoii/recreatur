const API_URL = 'http://127.0.0.1:3333';

async function loadMessages() {
    try {
        const response = await fetch(`${API_URL}/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) throw new Error('Erro ao carregar mensagens');

        const data = await response.json();
        const tableBody = document.getElementById('messages-table');
        tableBody.innerHTML = '';

        data?.messages?.forEach(message => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.subject}</td>
                <td>${message.message}</td>
                <td class="table-actions">
                    <button class="btn btn-danger btn-sm" onclick="deleteMessage('${message._id}')">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
    }
}

async function deleteMessage(id) {
    if (confirm('Tem certeza de que deseja excluir esta mensagem?')) {
        await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
        loadMessages();
    }
}

async function submitTestimonial(event) {
    event.preventDefault(); 

    const name = document.getElementById('testimonial-name').value;
    const age = document.getElementById('testimonial-age').value;
    const comment = document.getElementById('testimonial-text').value;

    console.log({ name, age, comment }); 

    try {
        const response = await fetch(`${API_URL}/feedbacks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, comment })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro ao adicionar depoimento:', errorData);
            alert('Erro ao enviar o depoimento. Tente novamente.');
        } else {
            alert('Depoimento adicionado com sucesso!');
            document.getElementById('add-testimonial-form').reset(); 
            await loadTestimonials(); 
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao enviar o depoimento. Tente novamente.');
    }
}

document.getElementById('add-testimonial-form').addEventListener('submit', submitTestimonial);

async function loadTestimonials() {
    try {
        const response = await fetch(`${API_URL}/feedbacks`, { method: 'GET' });
        const testimonials = await response.json();
        const tableBody = document.getElementById('testimonials-table');
        tableBody.innerHTML = '';

        testimonials.forEach(({ id, name, age, comment }) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${id}</td>
                <td>${name}</td>
                <td>${age}</td>
                <td>${comment}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteTestimonial('${id}')">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
    }
}

async function deleteTestimonial(id) {
    if (confirm('Tem certeza de que deseja excluir este depoimento?')) {
        await fetch(`${API_URL}/feedbacks/${id}`, { method: 'DELETE' });
        loadTestimonials();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://127.0.0.1:3333/auth/me", {
            method: "GET",
            credentials: "include", 
        });

        const data = await response.json();

        if (response.ok) {
            if (data.user.type !== "ADMIN") {
                alert("Acesso negado. Apenas administradores podem acessar esta página.");
                window.location.href = "/paginas/login.html"; 
            } else {
                
            }
        } else {
            alert("Usuário não autenticado. Faça login novamente.");
            window.location.href = "/paginas/login.html";
        }
    } catch (error) {
        console.error("Erro na verificação de autenticação:", error);
        alert("Ocorreu um erro. Por favor, tente novamente.");
        window.location.href = "/paginas/login.html";
    }
});
const API_URL = "http://localhost:3333";

async function loadTestimonials() {
    try {
        const response = await fetch(`${API_URL}/feedbacks`);
        const testimonials = await response.json();

        const carouselInner = document.getElementById('carousel-inner');
        carouselInner.innerHTML = ''; 

        testimonials.forEach((testimonial, index) => {
            const isActive = index === 0 ? 'active' : '';

            const testimonialItem = document.createElement('div');
            testimonialItem.classList.add('carousel-item', isActive);

            testimonialItem.innerHTML = `
                <div class="depoimento-texto">
                    <p>"${testimonial.comment}"</p>
                </div>
                <div class="depoimento-info">
                    <h3 class="depoimento-nome">${testimonial.name}</h3>
                    <p class="depoimento-idade">${testimonial.age} anos</p>
                </div>
            `;

            carouselInner.appendChild(testimonialItem);
        });
    } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
    }
}

async function submitTestimonial(event) {
    event.preventDefault();

    const name = document.getElementById('testimonial-name').value;
    const age = document.getElementById('testimonial-age').value;
    const comment = document.getElementById('testimonial-text').value;

    try {
        const response = await fetch(`${API_URL}/feedbacks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, comment })
        });

        if (response.ok) {
            alert('Depoimento enviado com sucesso!');
            await loadTestimonials(); 
        } else {
            alert('Erro ao enviar o depoimento. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao enviar depoimento:', error);
        alert('Erro ao enviar o depoimento. Tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', loadTestimonials);
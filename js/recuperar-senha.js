document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reset-password-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("form2Example11").value;

    if (!email) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3333/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "E-mail enviado com sucesso!");
      } else {
        alert(data.error || "Erro ao enviar o e-mail.");
      }
    } catch (error) {
      console.error("Erro ao se conectar ao servidor:", error);
      alert("Erro ao processar a solicitação. Tente novamente mais tarde.");
    }
  });
});

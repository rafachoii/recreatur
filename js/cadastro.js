document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("form2Example11").value.trim();
      const password = document.getElementById("form2Example22").value.trim();

      const payload = { email, password };

      console.log("Tentando enviar dados para o servidor:", payload);

      try {
          const response = await fetch("http://127.0.0.1:3333/auth/signup", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
          });

          if (response.ok) {
              const data = await response.json();
              alert("Conta criada com sucesso!");
              console.log("Resposta do servidor:", data);
              window.location.href = "/login";
          } else {
              const contentType = response.headers.get("Content-Type");
              if (contentType && contentType.includes("application/json")) {
                  const errorData = await response.json();
                  alert(`Erro: ${errorData.message || "Erro ao criar conta"}`);
              } else {
                  const errorText = await response.text();
                  alert(`Erro inesperado: ${errorText}`);
              }
          }
      } catch (error) {
          console.error("Erro de conexão:", error);
          alert("Erro de conexão com o servidor. Verifique se ele está ativo e acessível.");
      }
  });
});

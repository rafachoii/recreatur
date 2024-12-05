document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#login-form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const email = document.querySelector("#form2Example11").value;
      const password = document.querySelector("#form2Example22").value;
  
      if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      try {
        const response = await fetch("http://127.0.0.1:3333/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Login realizado com sucesso!");
          window.location.href = "/paginas/dashboard.html";
        } else {
          alert(data.message || "Erro no login. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
      }
    });
  });
    
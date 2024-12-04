document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form"); 
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); 
  
      const email = document.getElementById("form2Example11").value;
      const password = document.getElementById("form2Example22").value;
  
      const payload = {
        email: email,
        password: password,
      };
  
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
          console.log(data); 
          window.location.href = "/login";
        } else {
          const errorData = await response.json();
          alert(`Erro: ${errorData.message || "Erro ao criar conta"}`);
        }
      } catch (error) {
        console.error("Erro ao se conectar ao servidor:", error);
        alert("Erro ao criar conta. Por favor, tente novamente.");
      }
    });
  });
  
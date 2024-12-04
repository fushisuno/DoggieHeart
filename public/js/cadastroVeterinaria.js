
document.getElementById('codigo_postal').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '');
    const cepError = document.getElementById('cep-error');

    if (cep !== "") {
        const validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            document.getElementById('cidade').value = "..."
            document.getElementById('rua').value = "..."
            document.getElementById('bairro').value = "..."
            document.getElementById('uf').value = "..."

            cepError.style.display = "none";

            fetch(`/cep/${cep}`)
                .then(response => response.json())
                .then(data => {
                    if (!("erro" in data)) {
                        document.getElementById('cidade').value = data.localidade || "";
                        document.getElementById('rua').value = data.logradouro || "";
                        document.getElementById('bairro').value = data.bairro || "";
                        document.getElementById('uf').value = data.uf || "";
                    } else {
                        limparCampos();
                        cepError.textContent = "CEP não encontrado.";
                        cepError.style.display = "block";
                    }
                })
                .catch(error => {
                    limparCampos();
                    cepError.textContent = "Erro ao buscar o CEP. Por favor, tente novamente.";
                    cepError.style.display = "block";
                    console.error(error);
                });
        } else {
            // CEP inválido
            limparCampos();
            cepError.textContent = "Formato de CEP inválido.";
            cepError.style.display = "block";
        }
    }
});

function limparCampos() {
    document.getElementById('cidade').value = "";
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('cep-error').style.display = "none";
}

const elemento = (id) => document.getElementById(id);

let revisaoAtual = null;
const revisoesPublicadas = new Set();

const exemplo = `from repositories.usuario_repository import salvar

def cadastrar(dados):
    senha = "senha_ficticia_123"
    resultado = eval(dados)

    try:
        salvar(resultado)
    except:
        print("Erro ao salvar")

    return resultado
`;

// Evita interpretar texto do código como HTML.
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = String(texto ?? "");
  return div.innerHTML;
}

async function api(url, dados) {
  const resposta = await fetch(url, {
    method: dados ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    ...(dados ? { body: JSON.stringify(dados) } : {}),
  });

  const resultado = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(resultado?.erro || `Não foi possível concluir (HTTP ${resposta.status}).`);
  }

  if (resultado === null) {
    throw new Error("O servidor retornou uma resposta inválida.");
  }

  return resultado;
}

elemento("origem").addEventListener("change", () => {
  const github = elemento("origem").value === "github";
  elemento("entrada-codigo").hidden = github;
  elemento("entrada-github").hidden = !github;
});

elemento("exemplo").addEventListener("click", () => {
  elemento("caminho").value = "controllers/exemplo.py";
  elemento("codigo").value = exemplo;
  elemento("arquivos").value = "";
});

function mostrarAchados() {
  if (!revisaoAtual) return;

  const filtro = elemento("filtro").value;

  const achados = revisaoAtual.achados.filter(
    (item) => filtro === "Todos" || item.categoria === filtro
  );

  elemento("achados").className = "";

  if (!achados.length) {
    elemento("achados").innerHTML =
      '<p class="vazio">Nenhum achado nesta seleção. ' +
      "Isso não garante ausência de problemas.</p>";
    return;
  }

  const classes = { Alta: "alta", Média: "media", Baixa: "baixa" };

  elemento("achados").innerHTML = achados.map((item) => `
    <article class="achado">
      <span class="gravidade ${classes[item.gravidade]}">
        ${escapar(item.gravidade)} · ${escapar(item.categoria)}
      </span>
      <h3>${escapar(item.titulo)}</h3>
      <div class="local">
        ${escapar(item.arquivo)}
        ${item.linha ? ":" + escapar(item.linha) : ""}
      </div>
      <p class="sugestao">${escapar(item.sugestao)}</p>
    </article>
  `).join("");
}

function mostrarRevisao(revisao) {
  revisaoAtual = revisao;

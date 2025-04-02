import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Dropdown perfil
document.querySelector('.seta_triangulo').addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

    
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown-menu');
    const setaTrianguloButton = document.querySelector('.seta_triangulo');

    if (dropdown.style.display === 'block' && !dropdown.contains(event.target) && !setaTrianguloButton.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});
// Dropdown perfil 

// Dropdown sino 
document.querySelector('.notificacao_button').addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown-sino');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown-sino')
    const notificacaoButton = document.querySelector('.notificacao_button');

    if (dropdown.style.display === 'block' && !dropdown.contains(event.target) && !notificacaoButton.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});
// Dropdown sino 



// Mapa das salas
// Configuração do Supabase
const SUPABASE_URL = "https://empowwoylkcksdglmbub.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcG93d295bGtja3NkZ2xtYnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTgzMzEsImV4cCI6MjA1NzI5NDMzMX0.sR_13QefeQEzC1A-9Uu4KtUoQXBTpIkhZe4mgsw298c";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Elementos do DOM
const mapaSalas = document.getElementById("mapaSalas");
const modal = document.getElementById("modalSala");
const modalTitulo = document.getElementById("modalTitulo");
const modalRecursos = document.getElementById("modalRecursos");
const modalCapacidade = document.getElementById("modalCapacidade");
const fecharModal = document.getElementById("fecharModal");

// Função para buscar as salas no Supabase
async function carregarSalas() {
    try {
        const { data: salas, error } = await supabase.from("Sala").select("*");

        if (error) throw error;
        console.log("Dados recebidos:", salas); // Debug

        renderizarSalas(salas);
    } catch (err) {
        console.error("Erro ao buscar salas:", err);
    }
}

// Função para renderizar as salas no HTML
function renderizarSalas(salas) {
    mapaSalas.innerHTML = ""; // Limpa antes de renderizar

    salas.forEach(sala => {
        const divSala = document.createElement("div");
        divSala.classList.add("sala");

        // Define classes de status
        if (sala.status === "disponivel") divSala.classList.add("disponivel");
        if (sala.status === "ocupado") divSala.classList.add("ocupado");
        if (sala.status === "reserva") divSala.classList.add("reserva");
        if (sala.status === "indisponivel") divSala.classList.add("indisponivel");

        // Define conteúdo e atributos
        divSala.textContent = sala.Nome;
        divSala.dataset.nome = sala.Nome;
        divSala.dataset.recursos = sala.Recursos;
        divSala.dataset.capacidade = sala.Capacidade;

        // Adiciona evento de clique para abrir o modal
        divSala.addEventListener("click", () => abrirModal(sala));

        // Adiciona ao container
        mapaSalas.appendChild(divSala);
    });
}

// Função para abrir o modal com as informações da sala
function abrirModal(sala) {
    modalTitulo.textContent = sala.Nome;
    modalRecursos.textContent = sala.Recursos;
    modalCapacidade.textContent = sala.Capacidade;
    modal.showModal();
}

// Fechar modal ao clicar no botão
fecharModal.addEventListener("click", () => modal.close());

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarSalas);

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

const mapaSalas = document.getElementById("mapaSalas");

// Função para carregar salas do banco de dados
async function carregarSalas() {
    const { data, error } = await supabase.from("Sala").select("*");

    if (error) {
        console.error("Erro ao buscar salas:", error);
        return;
    }

    // Limpa o mapa antes de adicionar novos elementos
    mapaSalas.innerHTML = "";

    // Itera sobre os dados e cria os elementos
    data.forEach(sala => {
        const div = document.createElement("div");
        div.classList.add("sala", sala.status);
        div.textContent = sala.numero;
        mapaSalas.appendChild(div);
    });
}

// Chama a função ao carregar a página
carregarSalas();
// Mapa das salas

const { data, error } = await supabase.from("Sala").select("*");

console.log("Dados recebidos:", data);
console.log("Erro:", error);

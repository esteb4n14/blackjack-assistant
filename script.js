document.getElementById('btnAnalizar').addEventListener('click', () => {
    const dealer = parseInt(document.getElementById('dealer').value);
    const p1 = parseInt(document.getElementById('player1').value);
    const p2 = parseInt(document.getElementById('player2').value);
    
    const resultadoDiv = document.getElementById('resultado');
    const { accion, clase } = obtenerEstrategia(dealer, p1, p2);
    
    resultadoDiv.innerText = accion;
    resultadoDiv.className = `resultado-panel ${clase}`;
});

function obtenerEstrategia(dealer, p1, p2) {
    const total = p1 + p2;
    const esPar = (p1 === p2);
    const esSuave = (p1 === 11 || p2 === 11) && !esPar;

    // 1. PARES
    if (esPar) {
        if (p1 === 11 || p1 === 8) return { accion: "Dividir", clase: "res-split" };
        if (p1 === 10) return { accion: "Plantarse", clase: "res-stand" };
        if (p1 === 9) return (dealer === 7 || dealer >= 10) ? { accion: "Plantarse", clase: "res-stand" } : { accion: "Dividir", clase: "res-split" };
        if (p1 === 7 && dealer <= 7) return { accion: "Dividir", clase: "res-split" };
        if (p1 === 6 && dealer <= 6) return { accion: "Dividir", clase: "res-split" };
        if (p1 === 4 && (dealer === 5 || dealer === 6)) return { accion: "Dividir", clase: "res-split" };
        if ((p1 === 2 || p1 === 3) && dealer <= 7) return { accion: "Dividir", clase: "res-split" };
    }

    // 2. MANOS SUAVES
    if (esSuave) {
        const otra = (p1 === 11) ? p2 : p1;
        if (otra >= 8) return { accion: "Plantarse", clase: "res-stand" };
        if (otra === 7) {
            if (dealer >= 3 && dealer <= 6) return { accion: "Doblar / Plantarse", clase: "res-double" };
            if (dealer === 2 || dealer === 7 || dealer === 8) return { accion: "Plantarse", clase: "res-stand" };
        }
        if (otra >= 4 && dealer >= 4 && dealer <= 6) return { accion: "Doblar / Pedir", clase: "res-double" };
        if (otra >= 2 && dealer >= 5 && dealer <= 6) return { accion: "Doblar / Pedir", clase: "res-double" };
    }

    // 3. SURRENDER (Rendición)
    if (total === 16 && dealer >= 9) return { accion: "Rendirse", clase: "res-surrender" };
    if (total === 15 && dealer === 10) return { accion: "Rendirse", clase: "res-surrender" };

    // 4. MANOS DURAS
    if (total >= 17) return { accion: "Plantarse", clase: "res-stand" };
    if (total >= 13 && dealer <= 6) return { accion: "Plantarse", clase: "res-stand" };
    if (total === 12 && (dealer >= 4 && dealer <= 6)) return { accion: "Plantarse", clase: "res-stand" };
    if (total === 11) return { accion: "Doblar", clase: "res-double" };
    if (total === 10 && dealer <= 9) return { accion: "Doblar", clase: "res-double" };
    if (total === 9 && (dealer >= 3 && dealer <= 6)) return { accion: "Doblar", clase: "res-double" };

    return { accion: "Pedir", clase: "res-hit" };
}
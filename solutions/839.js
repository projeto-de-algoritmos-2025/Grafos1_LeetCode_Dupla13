const numSimilarGroups = strs => {
    let graph = new Graph(strs.length); 
    let explored = new Map();
    let groups = 0;

    // Percorra a lista de cadeia de caracteres 
    for (let i = 0; i < strs.length; i++) {
        for (let j = i + 1; j < strs.length; j++) {
            let a = strs[i], b = strs[j];
            let diff = [];

            for (let k = 0; k < a.length; k++) {

                // Compare cada posição das duas cadeias
                if (a[k] !== b[k]) {

                    // Registre onde elas diferem 
                    diff.push(k);
                    if (diff.length > 2) break;
                }
            }
            // Se não houver diferença, são idênticas
            if (diff.length === 0) {
                graph.addEdge(i, j);
            }
            // Se houver duas diferenças e forem trocadas, também são semelhantes
            else if (diff.length === 2 && a[diff[0]] === b[diff[1]] && a[diff[1]] === b[diff[0]]) {
                graph.addEdge(i, j);
            }
        }
    }

    for (let t of graph.adjList.keys()) {
        explored.set(t, false);
    }

    // Percorra os vértices do grafo 
    for (let i = 0; i < strs.length; i++) {
        if (!explored.get(i)) {
            let search = BFS(graph, i);

            // Reistre os nós explorados
            for (let [node, val] of search) {
                if (val) {
                    explored.set(node, true);
                }
            }
            groups++;
        }
    }
    return groups;
};

class Graph {

    // Construtor da classe
    constructor(nodes) {
        this.nodes = nodes;             
        this.adjList = new Map();  

        // Criação da lista de adjacência      
        for (let i = 0; i <= nodes; i++) {
            this.adjList.set(i, []);
        }
    }

  // Adição de aresta não-dirigida
    addEdge(v, w) {
        this.adjList.get(v).push(w);    
        this.adjList.get(w).push(v);
    }
}

// BFS normal
function BFS(G, s) {
  
    // Declaração de variáveis
    let explored = new Map();
    let queue = [];

    // Inicialização da variável 'explored'
    for (let t of G.adjList.keys()) {
        explored.set(t, false);
    }

    explored.set(s, true);
    queue.push(s);

    while (queue.length > 0) {
        let w = queue.shift();
        
        // Percorre todos os vizinhos de w
        for (let v of G.adjList.get(w)) {
            // Se o vizinho ainda não foi explorado
            if (!explored.get(v)) {
                explored.set(v, true); // marca como visitado
                queue.push(v);         // adiciona à fila
            }
        }
    }

    // Retorne o mapa de vértices visitados
    return explored;
}

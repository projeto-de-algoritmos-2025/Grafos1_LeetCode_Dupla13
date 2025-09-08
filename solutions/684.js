let findRedundantConnection = function(edges) {

    // Criação do grafo vazio
    let graph = new Graph(edges.length + 1);

    for (let [v, w] of edges) {
        
        // Se w é alcançável a partir de v
        if (DFS(graph, v).get(w)) {

            // A aresta (v, w) fecha um ciclo
            return [v, w];
        }
        // Senão, adiciona a aresta no grafo
        graph.addEdge(v, w);
    }

    // Retorne uma lista vazia caso a verificação seja falsa
    return [];
};

class Graph {

    // Construtor da classe
    constructor(nodes) {
        this.nodes = nodes;             
        this.adjList = new Map();  

        // Criação da lista de adjacência      
        for (let i = 1; i <= nodes; i++) {
            this.adjList.set(i, []);
        }
    }

  // Adição de aresta não-dirigida
    addEdge(v, w) {
        this.adjList.get(v).push(w);    
        this.adjList.get(w).push(v);
    }
}

// DFS interativa, sem o uso da recursão
function DFS(G, s) {
  
    // Declaração de variáveis
    let visited = new Map();
    let stack = [s];

    // Inicialização da variável 'visited'
    for (let t of G.adjList.keys()) {
        visited.set(t, false);
    }

    while (stack.length > 0) {
        let v = stack.pop();
        
        // Se o vértice não foi visitado
        if (!visited.get(v)) {

            // Agora tá visitado
            visited.set(v, true);

            // Adiciona todos os vértices adjacentes não visitados à pilha
            for (let w of G.adjList.get(v)) {
                if (!visited.get(w)) {
                    stack.push(w);
                }
            }
        }
    }

    // Retorne o mapa de vértices visitados
    return visited;
}

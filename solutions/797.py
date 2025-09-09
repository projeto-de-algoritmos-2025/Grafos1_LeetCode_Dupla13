''' 
797. All Paths From Source to Target: https://leetcode.com/problems/all-paths-from-source-to-target/description/
Exercício resolvido por Vinícius de Jesus

Esse exercício foi resolvido utilizando DFS;
'''

# Recebe o grafo em questão, 
# representado como uma lista em que índice representa um vétice,
# e que os valores são referências a outros índices.

# Recebe um "caminho", que vai sendo formado conforme o grafo se aprofunda.
# Caso não haja mais caminho, então o último elemento do caminho é eliminado(backtracking).
# Caso o grafo todo tenha sido percorrido,
# a resposta é registrada como cópia do caminho no momento.

def runGraph(graph, node, answer, path):
    path.append(node)

    if node == len(graph) - 1:
        answer.append(list(path))
    else:
        for child in graph[node]:
            runGraph(graph, child, answer, path)
    path.pop()

class Solution(object):
    def allPathsSourceTarget(self, graph):
        answer = []
        runGraph(graph, 0, answer, [])
        return answer
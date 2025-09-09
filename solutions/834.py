''' 
834. Sum of Distances in Tree: https://leetcode.com/problems/sum-of-distances-in-tree/
Exercício resolvido por Vinícius de Jesus

Esse exercício foi resolvido utilizando DFS e Reroot;
'''

# Primeiro inicializo uma lista de subárvores e uma lista de somas
# em que indices correspondem a vétices.
# O grafo é inicializado, ligando cada índice a uma lista com outros indices.
# Primeiro se faz uma DFS para contar APENAS em relação à raíz(0);
# E então essa contagem é propagada para outros vértices,
# tendo a soma em cada vértice como a soma da raíz somada com o número de vértices que é subtraído
# pelo dobro do tamanho da subárvore do vétice;
# O cálculo é realizado recursivamente, aplicando a resposta em backtracking; 

def dfs1(graph, node, subTreeSizeList, parent=None):
    subTreeSizeList[node] = 1
    count = 0
    for child in graph[node]:
        if child == parent:
            continue
        count += dfs1(graph, child, subTreeSizeList, node)
        subTreeSizeList[node] += subTreeSizeList[child]
        count += subTreeSizeList[child]  
    return count

def dfs2(graph, node, subTreeSizeList, answer, n, parent=None):
    for child in graph[node]:
        if child == parent:
            continue
        answer[child] = answer[node] + (n - 2 * subTreeSizeList[child])
        dfs2(graph, child, subTreeSizeList, answer, n, node)


class Solution(object):
    def sumOfDistancesInTree(self, n, edges):
        subTreeSizeList = [0] * n
        answer = [0] * n

        graph = {i: [] for i in range(n)}
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        answer[0] = dfs1(graph, 0, subTreeSizeList)
        dfs2(graph, 0, subTreeSizeList, answer, n)
        return answer

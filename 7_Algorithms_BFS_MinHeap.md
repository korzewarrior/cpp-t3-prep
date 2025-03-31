# C++ Algorithms: BFS and Min Heap

## 1. Breadth-First Search (BFS) Algorithm

### 1.1 What is BFS?

Breadth-First Search is a graph traversal algorithm that explores all vertices of a graph at the present depth before moving on to vertices at the next depth level. 

Key properties of BFS:
- Visits nodes level by level (explores all neighbors before moving to the next level)
- Uses a queue data structure for processing
- Guarantees the shortest path in unweighted graphs
- Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
- Space Complexity: O(V)

### 1.2 BFS Algorithm Steps

1. Start with a source vertex
2. Mark it as visited and add it to a queue
3. While the queue is not empty:
   - Dequeue a vertex from the queue
   - Process the vertex (print it, or perform any required operation)
   - Explore all unvisited adjacent vertices:
     - Mark them as visited
     - Enqueue them

### 1.3 BFS Implementation

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <unordered_map>
#include <unordered_set>

// Graph implementation using adjacency list
class Graph {
private:
    std::unordered_map<int, std::vector<int>> adjacencyList;

public:
    // Add an edge between vertices u and v
    void addEdge(int u, int v, bool bidirectional = true) {
        adjacencyList[u].push_back(v);
        if (bidirectional) {
            adjacencyList[v].push_back(u);
        }
    }
    
    // BFS traversal starting from vertex s
    void BFS(int start) {
        // Set to track visited vertices
        std::unordered_set<int> visited;
        
        // Queue for BFS
        std::queue<int> q;
        
        // Mark start as visited and enqueue
        visited.insert(start);
        q.push(start);
        
        std::cout << "BFS Traversal starting from vertex " << start << ": ";
        
        while (!q.empty()) {
            // Dequeue a vertex from queue
            int current = q.front();
            q.pop();
            
            // Process the current vertex
            std::cout << current << " ";
            
            // Get all adjacent vertices of the dequeued vertex
            // If an adjacent vertex hasn't been visited, mark it as visited and enqueue it
            for (int neighbor : adjacencyList[current]) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
        
        std::cout << std::endl;
    }
    
    // Print the graph
    void printGraph() {
        std::cout << "Graph adjacency list:" << std::endl;
        for (const auto& pair : adjacencyList) {
            std::cout << pair.first << " -> ";
            for (int v : pair.second) {
                std::cout << v << " ";
            }
            std::cout << std::endl;
        }
    }
};

// Example usage
int main() {
    Graph g;
    
    // Add edges to the graph
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);
    
    g.printGraph();
    
    // Perform BFS starting from vertex 2
    g.BFS(2);
    
    return 0;
}
```

### 1.4 Common Applications of BFS

1. **Shortest Path in Unweighted Graphs**: Finding the shortest path between two nodes
2. **Connected Components**: Finding all connected components in an undirected graph
3. **Web Crawlers**: Exploring web pages level by level
4. **Social Networks**: Finding all friends within a certain number of connections
5. **Puzzle Solving**: Solving puzzles like the "Sliding Puzzle" or "Water Jug Problem"

### 1.5 BFS with Path Tracking

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <unordered_map>
#include <unordered_set>

// Example of BFS for finding the shortest path
std::vector<int> shortestPath(const std::unordered_map<int, std::vector<int>>& graph, int start, int end) {
    // Set to track visited vertices
    std::unordered_set<int> visited;
    
    // Queue for BFS - stores {vertex, path to vertex}
    std::queue<std::pair<int, std::vector<int>>> q;
    
    // Initialize path with the start vertex
    std::vector<int> initialPath = {start};
    
    // Mark start as visited and enqueue
    visited.insert(start);
    q.push({start, initialPath});
    
    while (!q.empty()) {
        auto [current, path] = q.front();
        q.pop();
        
        // If we reached the destination
        if (current == end) {
            return path;
        }
        
        // Check all neighbors
        if (graph.find(current) != graph.end()) {
            for (int neighbor : graph.at(current)) {
                if (visited.find(neighbor) == visited.end()) {
                    // Create a new path by extending the current path
                    std::vector<int> newPath = path;
                    newPath.push_back(neighbor);
                    
                    // Mark as visited and enqueue
                    visited.insert(neighbor);
                    q.push({neighbor, newPath});
                }
            }
        }
    }
    
    // No path found
    return {};
}

int main() {
    // Create a graph using an adjacency list
    std::unordered_map<int, std::vector<int>> graph;
    
    // Add edges
    graph[0] = {1, 2};
    graph[1] = {0, 2, 3};
    graph[2] = {0, 1, 3, 4};
    graph[3] = {1, 2, 4, 5};
    graph[4] = {2, 3, 5};
    graph[5] = {3, 4};
    
    // Find shortest path from 0 to 5
    std::vector<int> path = shortestPath(graph, 0, 5);
    
    // Print the path
    if (!path.empty()) {
        std::cout << "Shortest path from 0 to 5: ";
        for (int vertex : path) {
            std::cout << vertex << " ";
        }
        std::cout << std::endl;
    } else {
        std::cout << "No path exists." << std::endl;
    }
    
    return 0;
}
```

## 2. Min Heap Data Structure

### 2.1 What is a Min Heap?

A Min Heap is a complete binary tree where the value of each node is less than or equal to the values of its children. This property ensures that the minimum element is always at the root of the heap.

Key properties of a Min Heap:
- Complete binary tree structure (filled at all levels except possibly the last, filled from left to right)
- The minimum element is always at the root
- Efficient for operations that require access to the minimum element
- Time Complexity:
  - Peek (get minimum): O(1)
  - Insert: O(log n)
  - Extract minimum: O(log n)
  - Heapify: O(n)

### 2.2 Min Heap Operations

1. **Insert**: Add a new element
   - Add the element at the end of the heap
   - "Bubble up" the element to its correct position (compare with parent and swap if needed)

2. **Extract Min**: Remove the minimum element
   - Replace the root with the last element
   - "Bubble down" the new root to its correct position

3. **Peek**: View the minimum element without removing it

4. **Heapify**: Convert an array into a heap structure

### 2.3 Min Heap Implementation

```cpp
#include <iostream>
#include <vector>
#include <algorithm> // For std::swap

class MinHeap {
private:
    std::vector<int> heap;
    
    // Helper functions to get parent and child indices
    int parent(int i) { return (i - 1) / 2; }
    int leftChild(int i) { return 2 * i + 1; }
    int rightChild(int i) { return 2 * i + 2; }
    
    // Helper function to maintain heap property by bubbling up
    void bubbleUp(int i) {
        // While we haven't reached the root and parent is greater than current
        while (i > 0 && heap[parent(i)] > heap[i]) {
            std::swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }
    
    // Helper function to maintain heap property by bubbling down
    void bubbleDown(int i) {
        int minIndex = i;
        int left = leftChild(i);
        int right = rightChild(i);
        int size = heap.size();
        
        // If left child exists and is smaller than current minimum
        if (left < size && heap[left] < heap[minIndex]) {
            minIndex = left;
        }
        
        // If right child exists and is smaller than current minimum
        if (right < size && heap[right] < heap[minIndex]) {
            minIndex = right;
        }
        
        // If minIndex is not the current node, swap and continue
        if (i != minIndex) {
            std::swap(heap[i], heap[minIndex]);
            bubbleDown(minIndex);
        }
    }

public:
    // Constructor
    MinHeap() {}
    
    // Constructor with initial values
    MinHeap(const std::vector<int>& array) {
        // Copy the array and heapify
        heap = array;
        heapify();
    }
    
    // Check if heap is empty
    bool isEmpty() const {
        return heap.empty();
    }
    
    // Get the size of the heap
    int size() const {
        return heap.size();
    }
    
    // Get the minimum element (peek)
    int getMin() const {
        if (isEmpty()) {
            throw std::runtime_error("Heap is empty");
        }
        return heap[0];
    }
    
    // Insert a new element
    void insert(int value) {
        // Add the element at the end
        heap.push_back(value);
        
        // Bubble up to maintain heap property
        bubbleUp(heap.size() - 1);
    }
    
    // Extract the minimum element
    int extractMin() {
        if (isEmpty()) {
            throw std::runtime_error("Heap is empty");
        }
        
        // Store the minimum
        int minValue = heap[0];
        
        // Replace root with the last element
        heap[0] = heap.back();
        heap.pop_back();
        
        // Bubble down to maintain heap property (only if the heap is not empty)
        if (!isEmpty()) {
            bubbleDown(0);
        }
        
        return minValue;
    }
    
    // Heapify - convert the vector into a valid heap
    void heapify() {
        int size = heap.size();
        // Start from the last non-leaf node and bubble down each
        for (int i = size / 2 - 1; i >= 0; i--) {
            bubbleDown(i);
        }
    }
    
    // Print the heap (for debugging)
    void printHeap() const {
        std::cout << "Heap elements: ";
        for (int val : heap) {
            std::cout << val << " ";
        }
        std::cout << std::endl;
    }
};

int main() {
    // Create an empty min heap
    MinHeap minHeap;
    
    // Insert elements
    minHeap.insert(4);
    minHeap.insert(2);
    minHeap.insert(8);
    minHeap.insert(1);
    minHeap.insert(6);
    
    std::cout << "After insertions:" << std::endl;
    minHeap.printHeap();
    
    // Get the minimum element
    std::cout << "Minimum element: " << minHeap.getMin() << std::endl;
    
    // Extract the minimum element
    int min = minHeap.extractMin();
    std::cout << "Extracted min: " << min << std::endl;
    std::cout << "After extraction:" << std::endl;
    minHeap.printHeap();
    
    // Create a heap from an existing array
    std::vector<int> array = {10, 5, 6, 2, 12, 7, 9};
    MinHeap heapFromArray(array);
    
    std::cout << "Heap created from array:" << std::endl;
    heapFromArray.printHeap();
    
    // Extract all elements in sorted order
    std::cout << "Elements in sorted order: ";
    while (!heapFromArray.isEmpty()) {
        std::cout << heapFromArray.extractMin() << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 2.4 Using std::priority_queue as a Min Heap

C++ STL provides `std::priority_queue` that can be configured as a min heap:

```cpp
#include <iostream>
#include <queue>
#include <vector>

int main() {
    // Define a min heap using priority_queue
    // By default, priority_queue is a max heap, so we use greater<int> to make it a min heap
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    
    // Insert elements
    minHeap.push(4);
    minHeap.push(2);
    minHeap.push(8);
    minHeap.push(1);
    minHeap.push(6);
    
    std::cout << "Min heap size: " << minHeap.size() << std::endl;
    std::cout << "Top (minimum) element: " << minHeap.top() << std::endl;
    
    // Extract elements in ascending order
    std::cout << "Elements in sorted order: ";
    while (!minHeap.empty()) {
        std::cout << minHeap.top() << " ";
        minHeap.pop();
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 2.5 Common Applications of Min Heap

1. **Priority Queue**: Implementing priority queues where the lowest priority item is processed first
2. **Dijkstra's Algorithm**: Finding shortest paths in a graph
3. **Prim's Algorithm**: Constructing minimum spanning trees
4. **Huffman Coding**: Building Huffman trees for compression
5. **Heap Sort**: Sorting an array in O(n log n) time

### 2.6 Min Heap vs. Max Heap

- **Min Heap**: The minimum element is at the root, and every parent is smaller than its children.
- **Max Heap**: The maximum element is at the root, and every parent is larger than its children.

Both have similar structures but differ only in the ordering property. To convert a min-heap implementation to a max-heap, simply reverse the comparison operations. 
# C++ TEST III ULTIMATE CHEATSHEET

> This comprehensive reference covers all essential C++ concepts for advanced programming exams and interviews. Designed for both quick reference and deep understanding, it includes practical examples of every major C++ feature from basic I/O to advanced memory management, templates, and data structures.

## 📋 HOW TO USE THIS CHEATSHEET

**For handwritten notes:**
- **Side 1 (High Priority)**: Essentials & I/O, Inheritance & Polymorphism, Templates & STL
- **Side 2 (High Priority)**: Smart Pointers, Operator Overloading, Common Pitfalls
- **If space allows**: Algorithms and Multi-file Organization
- **Pro tip**: For maximum space efficiency, write small code examples in pencil so you can erase and rewrite if needed!

**For digital reference:**
- Use the section links to quickly navigate to relevant topics
- Code examples can be copied directly into your IDE for testing

---

## I. ESSENTIALS & I/O

### Class Definition & Memory
```cpp
// Class Definition
class MyClass {
private:
    int data;
    int* arr;
public:
    // Constructors
    MyClass() : data(0), arr(nullptr) {}                    // Default
    MyClass(int d) : data(d), arr(new int[d]) {}            // Parameterized
    MyClass(const MyClass& other);                          // Copy constructor
    MyClass& operator=(const MyClass& other);               // Assignment
    MyClass(MyClass&& other) noexcept;                      // Move constructor (C++11)
    MyClass& operator=(MyClass&& other) noexcept;           // Move assignment (C++11)
    ~MyClass() { delete[] arr; }                            // Destructor

    // Accessors
    int getData() const { return data; }                    // Getter
    void setData(int d) { data = d; }                       // Setter
};

// Implementation outside class
MyClass::MyClass(const MyClass& other) : data(other.data), arr(new int[other.data]) {
    for (int i = 0; i < data; i++) arr[i] = other.arr[i];
}

MyClass& MyClass::operator=(const MyClass& other) {
    if (this != &other) {                                   // Check self-assignment
        delete[] arr;                                       // Free existing resources
        data = other.data;
        arr = new int[data];                                // Allocate new resources
        for (int i = 0; i < data; i++) arr[i] = other.arr[i];
    }
    return *this;
}

// Move constructor
MyClass::MyClass(MyClass&& other) noexcept : data(other.data), arr(other.arr) {
    other.data = 0;
    other.arr = nullptr;                                    // Transfer ownership
}

// Memory Allocation
MyClass obj1;                    // Stack - automatic cleanup
MyClass obj2(10);                // Stack with parameters
MyClass* ptr = new MyClass(5);   // Heap - manual cleanup needed
delete ptr;                      // MUST delete to avoid leaks
MyClass* arr = new MyClass[10];  // Array of objects
delete[] arr;                    // Delete array ([] required!)
```

### I/O Operations
```cpp
// Console I/O
#include <iostream>
#include <iomanip>                          // For formatting
std::cout << "Output" << variable << std::endl;
std::cout << std::setw(10) << std::fixed << std::setprecision(2) << 3.14159;
int num; std::cin >> num;                   // Input

// File I/O
#include <fstream>
std::ifstream inFile("input.txt");          // Open for reading
if (inFile.is_open()) {
    std::string line;
    while (std::getline(inFile, line)) {    // Read line by line
        // Process line
    }
    // Or read word by word
    std::string word;
    while (inFile >> word) {
        // Process word
    }
    inFile.close();
}

std::ofstream outFile("output.txt");        // Open for writing
if (outFile.is_open()) {
    outFile << "Text to write" << std::endl;
    outFile.close();
}

std::ofstream appendFile("data.txt", std::ios::app);  // Append mode

// String streams
#include <sstream>
std::stringstream ss;
ss << "Value: " << 42;                      // Write to stream
std::string str = ss.str();                 // Get string

int val;
ss >> val;                                  // Read from stream
```

### Loops & Iterations
```cpp
// Traditional for loop
for (int i = 0; i < n; i++) { /* use i */ }

// Range-based for (C++11)
for (const auto& item : container) { /* use item */ }

// Iterator-based loop
for (auto it = container.begin(); it != container.end(); ++it) {
    // *it gives the value
}

// While and do-while
while (condition) { /* code */ }
do { /* code */ } while (condition);

// Loop control
break;      // Exit loop
continue;   // Skip to next iteration
```

## II. INHERITANCE & POLYMORPHISM

### Basic Inheritance
```cpp
class Base {
protected:
    int x;
public:
    Base(int x) : x(x) {}
    void baseMethod() { std::cout << "Base method\n"; }
    virtual void virtualMethod() { std::cout << "Base virtual method\n"; }
    virtual ~Base() {}                 // VITAL: Virtual destructor
};

class Derived : public Base {          // public inheritance
    int y;
public:
    Derived(int x, int y) : Base(x), y(y) {}
    void derivedMethod() { std::cout << "Derived method\n"; }
    void virtualMethod() override {    // Override keyword is C++11
        std::cout << "Derived virtual method\n";
    }
};

// Usage
Base* ptr = new Derived(1, 2);         // Upcast - implicit
ptr->virtualMethod();                  // Calls Derived::virtualMethod()
delete ptr;                            // Proper cleanup with virtual destructor

// Downcasting
Derived* dPtr = dynamic_cast<Derived*>(ptr);    // Safe downcast
if (dPtr) { /* ptr points to Derived object */ }
```

### Access Specifiers
```cpp
// public inheritance:
// - public members stay public
// - protected members stay protected
// - private members are inaccessible

// protected inheritance:
// - public & protected members become protected
// - private members are inaccessible

// private inheritance:
// - public & protected members become private
// - private members are inaccessible
```

### Abstract Classes & Pure Virtual Functions
```cpp
class Shape {                          // Abstract class
public:
    virtual double area() const = 0;   // Pure virtual function
    virtual double perimeter() = 0;    // Pure virtual function
    virtual void draw() { std::cout << "Drawing shape\n"; }
    virtual ~Shape() {}
};

class Circle : public Shape {
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    double perimeter() override { return 2 * 3.14159 * radius; }
};

// Cannot instantiate abstract class: Shape s; // Error!
Shape* s = new Circle(5.0);            // Correct usage
```

### Multiple Inheritance
```cpp
class A { public: void funcA() {} };
class B { public: void funcB() {} };
class C : public A, public B { /* inherits both */ };

// Diamond problem
class Base { protected: int x; };
class Derived1 : virtual public Base {};    // virtual inheritance!
class Derived2 : virtual public Base {};    // virtual inheritance!
class Final : public Derived1, public Derived2 {}; // single Base instance

// Ambiguity resolution
C c;
c.funcA();                             // Unambiguous
c.funcB();                             // Unambiguous
// If both A and B had func():
// c.A::func();                        // Specify which one
```

## III. TEMPLATES & STL

### Function Templates
```cpp
// Basic template
template <typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// Multiple types
template <typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {    // Trailing return type (C++11)
    return a + b;
}

// Template specialization
template <typename T>
void print(T value) {
    std::cout << "Generic: " << value << std::endl;
}

template <>                             // Specialization for char*
void print<char*>(char* value) {
    std::cout << "String: " << value << std::endl;
}

// Usage
int i = max<int>(10, 20);              // Explicit type
double d = max(3.14, 2.71);            // Type inferred
```

### Class Templates
```cpp
template <typename T, int Size = 10>    // Type & non-type parameter
class Array {
private:
    T data[Size];
public:
    T& operator[](int index) { return data[index]; }
    const T& operator[](int index) const { return data[index]; }
    int size() const { return Size; }
};

// Usage
Array<int, 5> intArray;                // Array of 5 ints
Array<double> doubleArray;             // Array of 10 doubles
```

### STL Containers
```cpp
// Vector - dynamic array
#include <vector>
std::vector<int> vec = {1, 2, 3};      // C++11 initialization
vec.push_back(4);                       // Add to end
vec.pop_back();                         // Remove last
vec.size();                             // Get size
vec[0];                                 // Access by index
vec.at(0);                              // Bounds-checked access
vec.front();                            // First element
vec.back();                             // Last element
vec.empty();                            // Check if empty
vec.clear();                            // Remove all elements
vec.reserve(100);                       // Reserve capacity

// List - doubly-linked list
#include <list>
std::list<int> lst = {1, 2, 3};
lst.push_back(4);                       // Add to end
lst.push_front(0);                      // Add to front
lst.pop_back();                         // Remove last
lst.pop_front();                        // Remove first
lst.remove(2);                          // Remove all 2s
lst.sort();                             // Sort elements

// Map - key/value pairs (ordered)
#include <map>
std::map<std::string, int> ages;
ages["Alice"] = 30;                     // Insert/update
ages.insert({"Bob", 25});               // C++11 insert
ages.at("Alice");                       // Bounds-checked access
ages["Alice"];                          // Access (inserts if not found)
ages.count("Alice");                    // 1 if exists, 0 if not
ages.erase("Bob");                      // Remove entry
for (const auto& pair : ages) {         // C++11 iteration
    std::cout << pair.first << ": " << pair.second << std::endl;
}
// C++17 structured binding:
// for (const auto& [name, age] : ages) { /* use name, age */ }

// Set - unique elements (ordered)
#include <set>
std::set<int> numbers = {1, 2, 3};
numbers.insert(4);                      // Insert element
numbers.erase(2);                       // Remove element
numbers.count(1);                       // 1 if exists, 0 if not
auto it = numbers.find(3);              // Iterator to element or end()

// Unordered variants (hash-based, typically faster)
#include <unordered_map>
#include <unordered_set>
std::unordered_map<std::string, int> hash_map;
std::unordered_set<int> hash_set;
```

### STL Algorithms
```cpp
#include <algorithm>
#include <numeric>                     // For accumulate, etc.

std::vector<int> v = {5, 3, 1, 4, 2};

// Sorting
std::sort(v.begin(), v.end());                          // Default: ascending
std::sort(v.begin(), v.end(), std::greater<int>());     // Descending
std::sort(v.begin(), v.end(),                           // Custom comparator
         [](int a, int b) { return a < b; });

// Finding
auto it = std::find(v.begin(), v.end(), 3);             // Find value
auto it2 = std::find_if(v.begin(), v.end(),             // Find with predicate
                       [](int x) { return x > 3; });
// After find operations, check: if (it != v.end()) { /* found */ }

// Counting
int count = std::count(v.begin(), v.end(), 2);          // Count occurrences
int count_if = std::count_if(v.begin(), v.end(),        // Count with predicate
                           [](int x) { return x % 2 == 0; });

// Transforming
std::transform(v.begin(), v.end(), v.begin(),           // In-place transform
              [](int x) { return x * 2; });

// Other useful algorithms
std::for_each(v.begin(), v.end(),                       // Apply function to all
             [](int& x) { x += 1; });
int sum = std::accumulate(v.begin(), v.end(), 0);       // Reduce to single value
auto [min_it, max_it] = std::minmax_element(v.begin(), v.end());
std::fill(v.begin(), v.end(), 0);                       // Fill with value
std::replace(v.begin(), v.end(), 1, 100);               // Replace values
std::copy(v.begin(), v.end(), result.begin());          // Copy to another container
```

## IV. SMART POINTERS & MEMORY MANAGEMENT

```cpp
#include <memory>

// Unique pointer (exclusive ownership)
std::unique_ptr<int> p1 = std::make_unique<int>(10);     // C++14
// Prior to C++14: std::unique_ptr<int> p1(new int(10));
int val = *p1;                          // Dereference
p1.reset();                             // Release and destroy
p1.reset(new int(20));                  // Reset with new resource
int* raw_ptr = p1.get();                // Get raw pointer (no ownership transfer)
// Cannot copy, but can move:
std::unique_ptr<int> p2 = std::move(p1);  // p1 now nullptr

// Shared pointer (reference counted)
std::shared_ptr<int> s1 = std::make_shared<int>(20);
std::shared_ptr<int> s2 = s1;           // Both own the object
int count = s1.use_count();             // Get reference count
s1.reset();                             // Decrement count, maybe destroy

// Weak pointer (non-owning observer)
std::weak_ptr<int> w1 = s2;             // Doesn't increase count
bool expired = w1.expired();            // Check if observed object exists
std::shared_ptr<int> s3 = w1.lock();    // Get shared_ptr if alive
if (s3) { /* Object exists, use s3 */ }

// Custom deleters
auto deleter = [](int* p) { 
    std::cout << "Deleting " << *p << std::endl; 
    delete p; 
};
std::unique_ptr<int, decltype(deleter)> p3(new int(30), deleter);
std::shared_ptr<int> s4(new int(40), deleter);
```

## V. OPERATOR OVERLOADING

```cpp
class Complex {
private:
    double real, imag;
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}
    
    // Basic arithmetic operators
    Complex operator+(const Complex& other) const {       // Binary +
        return Complex(real + other.real, imag + other.imag);
    }
    Complex operator-(const Complex& other) const {       // Binary -
        return Complex(real - other.real, imag - other.imag);
    }
    Complex operator*(const Complex& other) const {       // Binary *
        return Complex(
            real * other.real - imag * other.imag,
            real * other.imag + imag * other.real
        );
    }
    
    // Compound assignment
    Complex& operator+=(const Complex& other) {           // +=
        real += other.real;
        imag += other.imag;
        return *this;
    }
    
    // Unary operators
    Complex operator-() const {                           // Unary -
        return Complex(-real, -imag);
    }
    Complex& operator++() {                               // Pre-increment ++x
        ++real;
        return *this;
    }
    Complex operator++(int) {                             // Post-increment x++
        Complex temp = *this;
        ++real;
        return temp;
    }
    
    // Comparison operators
    bool operator==(const Complex& other) const {         // Equality ==
        return real == other.real && imag == other.imag;
    }
    bool operator!=(const Complex& other) const {         // Inequality !=
        return !(*this == other);
    }
    
    // Subscript operator
    double& operator[](int index) {                       // []
        if (index == 0) return real;
        if (index == 1) return imag;
        throw std::out_of_range("Index must be 0 or 1");
    }
    
    // Function call operator
    double operator()(double x) const {                   // ()
        return real * x + imag;
    }
    
    // Stream operators (as friend functions)
    friend std::ostream& operator<<(std::ostream& os, const Complex& c);
    friend std::istream& operator>>(std::istream& is, Complex& c);
};

// Stream insertion operator (non-member)
std::ostream& operator<<(std::ostream& os, const Complex& c) {
    os << c.real;
    if (c.imag >= 0) os << "+" << c.imag << "i";
    else os << c.imag << "i";
    return os;
}

// Stream extraction operator (non-member)
std::istream& operator>>(std::istream& is, Complex& c) {
    is >> c.real >> c.imag;
    return is;
}

// Non-member binary operator (for cases like: 5 + object)
Complex operator+(double d, const Complex& c) {
    return Complex(d + c.real, c.imag);
}
```

## VI. ALGORITHMS & DATA STRUCTURES

### Breadth-First Search (BFS)
```cpp
#include <queue>
#include <vector>
#include <unordered_set>

// Adjacency list representation of graph
using Graph = std::vector<std::vector<int>>;

void BFS(const Graph& graph, int start) {
    std::vector<bool> visited(graph.size(), false);
    std::queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        int current = q.front();
        q.pop();
        std::cout << current << " ";
        
        for (int neighbor : graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}

// BFS to find shortest path
std::vector<int> shortestPath(const Graph& graph, int start, int end) {
    std::vector<int> parent(graph.size(), -1);
    std::vector<bool> visited(graph.size(), false);
    std::queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty() && !visited[end]) {
        int current = q.front();
        q.pop();
        
        for (int neighbor : graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                parent[neighbor] = current;
                q.push(neighbor);
            }
        }
    }
    
    if (!visited[end]) return {};  // No path found
    
    // Reconstruct path
    std::vector<int> path;
    for (int at = end; at != -1; at = parent[at]) {
        path.push_back(at);
    }
    std::reverse(path.begin(), path.end());
    return path;
}
```

### Min Heap
```cpp
#include <vector>
#include <algorithm>  // For std::swap

class MinHeap {
private:
    std::vector<int> heap;
    
    int parent(int i) { return (i - 1) / 2; }
    int leftChild(int i) { return 2 * i + 1; }
    int rightChild(int i) { return 2 * i + 2; }
    
    void bubbleUp(int i) {
        while (i > 0 && heap[parent(i)] > heap[i]) {
            std::swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }
    
    void bubbleDown(int i) {
        int minIndex = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < heap.size() && heap[left] < heap[minIndex])
            minIndex = left;
        if (right < heap.size() && heap[right] < heap[minIndex])
            minIndex = right;
        
        if (i != minIndex) {
            std::swap(heap[i], heap[minIndex]);
            bubbleDown(minIndex);
        }
    }
    
public:
    bool isEmpty() const { return heap.empty(); }
    int size() const { return heap.size(); }
    
    int peek() const {
        if (isEmpty()) throw std::runtime_error("Heap is empty");
        return heap[0];
    }
    
    void insert(int val) {
        heap.push_back(val);
        bubbleUp(heap.size() - 1);
    }
    
    int extractMin() {
        if (isEmpty()) throw std::runtime_error("Heap is empty");
        
        int min = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        
        if (!isEmpty()) bubbleDown(0);
        return min;
    }
    
    // Build heap from array in O(n) time
    void buildHeap(const std::vector<int>& array) {
        heap = array;
        for (int i = heap.size() / 2 - 1; i >= 0; i--) {
            bubbleDown(i);
        }
    }
};

// STL priority_queue as min heap
#include <queue>
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
minHeap.push(5);           // Insert
int min = minHeap.top();   // Get min
minHeap.pop();             // Extract min
```

## VII. MULTI-FILE ORGANIZATION

### Header File (.h)
```cpp
// MyClass.h
#ifndef MYCLASS_H   // Header guard prevents multiple inclusion
#define MYCLASS_H

class MyClass {
private:
    int data;
public:
    MyClass();              // Declaration only
    void setData(int val);  // Declaration only
    int getData() const;    // Declaration only
};

#endif // MYCLASS_H
```

### Implementation File (.cpp)
```cpp
// MyClass.cpp
#include "MyClass.h"  // Include the header file

// Definition of the methods
MyClass::MyClass() : data(0) {}

void MyClass::setData(int val) {
    data = val;
}

int MyClass::getData() const {
    return data;
}
```

### Main File
```cpp
// main.cpp
#include "MyClass.h"
#include <iostream>

int main() {
    MyClass obj;
    obj.setData(42);
    std::cout << obj.getData() << std::endl;
    return 0;
}
```

### Compilation Process
```
// Compile individual files
g++ -c MyClass.cpp -o MyClass.o
g++ -c main.cpp -o main.o

// Link object files
g++ MyClass.o main.o -o program

// Or compile in one step
g++ MyClass.cpp main.cpp -o program
```

## VIII. COMMON PITFALLS & FIXES

1. **Memory leaks**: Always `delete` what you `new` or use smart pointers (see [Section IV](#iv-smart-pointers--memory-management))
   ```cpp
   int* p = new int(10);
   // ... code ...
   delete p;  // Don't forget this!
   p = nullptr;  // Prevent dangling pointer
   ```

2. **Missing virtual destructor**: Always make base class destructors virtual
   ```cpp
   class Base {
   public:
       virtual ~Base() {}  // Virtual!
   };
   ```

3. **Object slicing**: Occurs when derived object is assigned to base object
   ```cpp
   Derived d;
   Base b = d;  // Slices off Derived parts
   // Fix: Use pointers or references
   Base& ref = d;  // No slicing
   ```

4. **Self-assignment**: Always check in assignment operators
   ```cpp
   if (this != &other) {  // Check self-assignment
       // Assignment code
   }
   ```

5. **Iterator invalidation**: Modifying a container may invalidate iterators
   ```cpp
   // Problem:
   for (auto it = vec.begin(); it != vec.end(); ++it) {
       if (*it == 5) vec.erase(it);  // it is now invalid!
   }
   // Fix:
   for (auto it = vec.begin(); it != vec.end(); ) {
       if (*it == 5) it = vec.erase(it);  // erase returns next valid iterator
       else ++it;
   }
   ```

6. **Resource management**: Use RAII (Resource Acquisition Is Initialization)
   ```cpp
   class FileHandler {
       std::ifstream file;
   public:
       FileHandler(const std::string& filename) : file(filename) {}
       ~FileHandler() { if (file.is_open()) file.close(); }
   };
   ```

7. **Inheritance vs. Composition**: "is-a" vs. "has-a" relationship
   ```cpp
   // Inheritance (is-a)
   class Bird : public Animal {}
   
   // Composition (has-a)
   class Car {
       Engine engine;  // Car has-an Engine
   };
   ```

8. **Const correctness**: Mark methods that don't modify the object as const
   ```cpp
   int getValue() const;  // Method won't modify object
   ```

## IX. CODE COMPLETION PATTERNS

### Function Implementation
```cpp
ReturnType ClassName::methodName(Type1 param1, Type2 param2) {
    // Access members directly
    memberVar = param1;
    
    // Calculate result
    ReturnType result = someCalculation();
    
    // Return
    return result;
}
```

### Loop Patterns
```cpp
// Finding in container
auto it = std::find_if(container.begin(), container.end(),
                      [&](const auto& item) { return item.matches(criteria); });
if (it != container.end()) {
    // Found
    return *it;
} else {
    // Not found
    return defaultValue;
}

// Accumulating result
ResultType result = initialValue;
for (const auto& item : container) {
    result = combineWith(result, transform(item));
}
return result;
```

### Recursive Pattern
```cpp
ReturnType recursive(ParamType param) {
    // Base case
    if (baseCondition(param)) {
        return baseValue;
    }
    
    // Recursive case
    return combineWith(
        recursive(reduceParam(param))
    );
}
```

### Error Handling
```cpp
// Try-catch approach
try {
    // Code that might throw
    int result = riskyOperation();
    return result;
} catch (const std::exception& e) {
    // Handle error
    std::cerr << "Error: " << e.what() << std::endl;
    return defaultValue;
}

// Error code approach
ErrorCode error;
int result = riskyOperation(&error);
if (error != ErrorCode::Success) {
    // Handle error
    return defaultValue;
}
return result;
```

### STL Algorithm Chain
```cpp
auto result = container;
// Sort
std::sort(result.begin(), result.end());
// Remove duplicates
auto newEnd = std::unique(result.begin(), result.end());
result.erase(newEnd, result.end());
// Transform
std::transform(result.begin(), result.end(), result.begin(),
              [](const auto& item) { return transform(item); });
return result;
```

---

*This cheat sheet was created to help C++ programmers succeed on exams and technical interviews. Feel free to share it with attribution.* 
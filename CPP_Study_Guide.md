# C++ Test III Study Guide

> **Quick Reference Guide**: This document provides concise explanations of all topics for Test III with links to more detailed materials.

## Table of Contents

1. [Object-Oriented Programming Basics](#1-object-oriented-programming-basics)
2. [C++ I/O Operations](#2-c-io-operations)
3. [Inheritance and Polymorphism](#3-inheritance-and-polymorphism)
4. [Multi-file Class Organization](#4-multi-file-class-organization)
5. [Templates and STL](#5-templates-and-stl)
6. [Smart Pointers](#6-smart-pointers)
7. [Operator Overloading](#7-operator-overloading)
8. [Algorithms: BFS and Min Heap](#8-algorithms-bfs-and-min-heap)

---

## 1. Object-Oriented Programming Basics

### Key Concepts:

- **Class**: Blueprint for objects, containing data members and member functions
- **Object**: Instance of a class
- **Encapsulation**: Hiding implementation details, exposing only necessary interfaces
- **Data Members**: Variables inside a class
- **Member Functions**: Functions that operate on class data

### Memory Allocation:

**Stack vs. Heap:**

| Stack | Heap |
|-------|------|
| Automatic memory management | Manual memory management (with `new`/`delete`) |
| Limited size | Larger memory space |
| Faster allocation | Slower allocation |
| Objects created with: `ClassName obj;` | Objects created with: `ClassName* ptr = new ClassName();` |
| Access with dot operator: `obj.member` | Access with arrow operator: `ptr->member` |
| Auto cleanup when out of scope | Must use `delete` to avoid memory leaks |

### Constructors and Destructors:

```cpp
class MyClass {
public:
    // Default constructor
    MyClass() { /*...*/ }
    
    // Parameterized constructor
    MyClass(int val) : member(val) { /*...*/ }
    
    // Destructor
    ~MyClass() { /*...*/ }
    
private:
    int member;
};
```

✅ **Quick Tip**: Always define destructors for classes that allocate resources dynamically.

📑 **Detailed Reference**: See [1_OOP_Basics.md](1_OOP_Basics.md) for complete examples and explanations.

---

## 2. C++ I/O Operations

### Console I/O:

```cpp
#include <iostream>

// Output to console
std::cout << "Hello, world!" << std::endl;

// Input from console
int number;
std::cin >> number;
```

### File I/O:

```cpp
#include <fstream>

// Writing to a file
std::ofstream outFile("output.txt");
if (outFile.is_open()) {
    outFile << "Writing to a file." << std::endl;
    outFile.close();
}

// Reading from a file
std::ifstream inFile("input.txt");
if (inFile.is_open()) {
    std::string line;
    while (getline(inFile, line)) {
        std::cout << line << std::endl;
    }
    inFile.close();
}
```

### Stream Formatting:

- `std::setw(n)`: Set field width
- `std::setprecision(n)`: Set floating point precision
- `std::fixed`: Fixed decimal notation
- `std::scientific`: Scientific notation
- `std::left`, `std::right`: Alignment

✅ **Quick Tip**: Always check if files opened successfully before performing operations.

📑 **Detailed Reference**: See [2_CPP_IO.md](2_CPP_IO.md) for complete examples and explanations.

---

## 3. Inheritance and Polymorphism

### Inheritance:

```cpp
// Base class
class Animal {
protected:
    std::string name;
public:
    Animal(std::string n) : name(n) {}
    virtual void makeSound() const { std::cout << "..." << std::endl; }
};

// Derived class
class Dog : public Animal {
public:
    Dog(std::string n) : Animal(n) {}
    void makeSound() const override { std::cout << "Woof!" << std::endl; }
};
```

### Key Inheritance Concepts:

- **public inheritance**: Public and protected members of the base class remain public and protected in the derived class
- **protected inheritance**: Public and protected members become protected in the derived class
- **private inheritance**: Public and protected members become private in the derived class

### Polymorphism Types:

- **Compile-time (static)**: Function overloading, operator overloading
- **Runtime (dynamic)**: Virtual functions

### Virtual Functions:

```cpp
class Base {
public:
    virtual void show() { std::cout << "Base class" << std::endl; }
    virtual ~Base() {}  // Virtual destructor is crucial
};

class Derived : public Base {
public:
    void show() override { std::cout << "Derived class" << std::endl; }
};

// Polymorphic behavior
Base* ptr = new Derived();
ptr->show();  // Calls Derived::show()
delete ptr;   // Properly calls ~Derived() then ~Base()
```

### Abstract Classes and Pure Virtual Functions:

```cpp
class Shape {  // Abstract class
public:
    virtual double area() const = 0;  // Pure virtual function
    virtual ~Shape() {}
};

class Circle : public Shape {
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};
```

### Multiple Inheritance:

```cpp
class A { /*...*/ };
class B { /*...*/ };
class C : public A, public B { /*...*/ };  // Inherits from both A and B
```

✅ **Quick Tip**: Always make base class destructors virtual when using polymorphism.

📑 **Detailed Reference**: See [3_Inheritance_Polymorphism.md](3_Inheritance_Polymorphism.md) for complete examples and explanations.

---

## 4. Multi-file Class Organization

### Header File (.h / .hpp):

```cpp
// Rectangle.h
#ifndef RECTANGLE_H
#define RECTANGLE_H

class Rectangle {
private:
    double width;
    double height;
    
public:
    Rectangle(double w, double h);
    double area() const;
    double perimeter() const;
};

#endif // RECTANGLE_H
```

### Implementation File (.cpp):

```cpp
// Rectangle.cpp
#include "Rectangle.h"

Rectangle::Rectangle(double w, double h) : width(w), height(h) {}

double Rectangle::area() const {
    return width * height;
}

double Rectangle::perimeter() const {
    return 2 * (width + height);
}
```

### Key Concepts:

- **Header Guards**: Prevent multiple inclusions of the same header
- **Declaration vs. Definition**: Headers contain declarations, source files contain definitions
- **Include Directive**: `#include` brings in declarations from headers
- **Scope Resolution**: Use `ClassName::` to define members outside the class

✅ **Quick Tip**: Always use header guards to prevent multiple inclusion issues.

📑 **Detailed Reference**: See [4_MultiFile_Classes.md](4_MultiFile_Classes.md) for complete examples and explanations.

---

## 5. Templates and STL

### Function Templates:

```cpp
template <typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// Usage
int maxInt = max(10, 20);            // T is int
double maxDouble = max(3.14, 2.71);  // T is double
```

### Class Templates:

```cpp
template <typename T>
class Box {
private:
    T value;
    
public:
    Box(T val) : value(val) {}
    T getValue() const { return value; }
};

// Usage
Box<int> intBox(123);
Box<std::string> stringBox("Hello");
```

### STL Containers:

- **Sequence containers**: `vector`, `list`, `deque`, `array`
- **Associative containers**: `set`, `map`, `unordered_set`, `unordered_map`

```cpp
// Vector example
std::vector<int> numbers = {1, 2, 3, 4, 5};
numbers.push_back(6);
for (int num : numbers) {
    std::cout << num << " ";
}
```

### STL Iterators:

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

// Using iterators
for (auto it = vec.begin(); it != vec.end(); ++it) {
    std::cout << *it << " ";
}
```

### STL Algorithms:

```cpp
#include <algorithm>
#include <vector>

std::vector<int> nums = {5, 2, 8, 1, 9};

// Sorting
std::sort(nums.begin(), nums.end());

// Finding
auto it = std::find(nums.begin(), nums.end(), 8);

// Transforming
std::transform(nums.begin(), nums.end(), nums.begin(), 
              [](int n) { return n * 2; });
```

✅ **Quick Tip**: Use `auto` with iterators to save typing and improve readability.

📑 **Detailed Reference**: See [5_Templates_STL.md](5_Templates_STL.md) for complete examples and explanations.

---

## 6. Smart Pointers

### Types of Smart Pointers:

1. **unique_ptr**: Exclusive ownership
2. **shared_ptr**: Shared ownership with reference counting
3. **weak_ptr**: Non-owning reference to a shared_ptr

### unique_ptr:

```cpp
#include <memory>

// Creating a unique_ptr
std::unique_ptr<int> ptr1 = std::make_unique<int>(42);

// Cannot be copied
// std::unique_ptr<int> ptr2 = ptr1;  // Error!

// Can be moved
std::unique_ptr<int> ptr2 = std::move(ptr1);  // ptr1 becomes nullptr
```

### shared_ptr:

```cpp
// Creating a shared_ptr
std::shared_ptr<int> ptr1 = std::make_shared<int>(42);

// Can be copied
std::shared_ptr<int> ptr2 = ptr1;  // Both point to the same object

// Check reference count
std::cout << "Count: " << ptr1.use_count() << std::endl;  // 2
```

### weak_ptr:

```cpp
std::shared_ptr<int> shared = std::make_shared<int>(42);
std::weak_ptr<int> weak = shared;

// Use lock() to get a shared_ptr
if (auto temp = weak.lock()) {
    std::cout << *temp << std::endl;
} else {
    std::cout << "Object no longer exists" << std::endl;
}
```

✅ **Quick Tip**: Prefer `std::make_unique` and `std::make_shared` over direct constructor calls.

📑 **Detailed Reference**: See [6_Smart_Pointers.md](6_Smart_Pointers.md) for complete examples and explanations.

---

## 7. Operator Overloading

### Basic Syntax:

```cpp
class Complex {
private:
    double real;
    double imag;
    
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}
    
    // Member function operator overloading
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
    
    // Friend function for non-member operator overloading
    friend std::ostream& operator<<(std::ostream& os, const Complex& c);
};

// Non-member operator overloading
std::ostream& operator<<(std::ostream& os, const Complex& c) {
    os << c.real;
    if (c.imag >= 0) os << " + " << c.imag << "i";
    else os << " - " << -c.imag << "i";
    return os;
}
```

### Common Operators to Overload:

1. **Binary operators**: `+`, `-`, `*`, `/`
2. **Assignment operators**: `=`, `+=`, `-=`
3. **Comparison operators**: `==`, `!=`, `<`, `>`
4. **Stream operators**: `<<`, `>>`
5. **Unary operators**: `++`, `--`, `-`, `!`
6. **Subscript operator**: `[]`
7. **Function call operator**: `()`

✅ **Quick Tip**: Overload operators only when their meaning is intuitive for your class.

📑 **Detailed Reference**: See [8_Operator_Overloading.md](8_Operator_Overloading.md) for complete examples and explanations.

---

## 8. Algorithms: BFS and Min Heap

### Breadth-First Search (BFS):

```cpp
void BFS(Graph& graph, int startVertex) {
    std::queue<int> queue;
    std::vector<bool> visited(graph.size(), false);
    
    visited[startVertex] = true;
    queue.push(startVertex);
    
    while (!queue.empty()) {
        int current = queue.front();
        queue.pop();
        std::cout << current << " ";
        
        for (int neighbor : graph.getNeighbors(current)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
}
```

### BFS Properties:

- Visits nodes level by level
- Uses a queue data structure
- Time complexity: O(V + E)
- Space complexity: O(V)
- Finds shortest path in unweighted graphs

### Min Heap:

```cpp
class MinHeap {
private:
    std::vector<int> heap;
    
    void bubbleUp(int index);
    void bubbleDown(int index);
    
public:
    void insert(int value);
    int extractMin();
    int peek() const;
    bool isEmpty() const;
};
```

### Min Heap Operations:

- **insert**: Add element to the end, then bubble up - O(log n)
- **extractMin**: Return the root, replace with last element, then bubble down - O(log n)
- **peek**: Return the minimum element (root) - O(1)

✅ **Quick Tip**: BFS uses a queue (FIFO), while DFS uses a stack (LIFO).

📑 **Detailed Reference**: See [7_Algorithms_BFS_MinHeap.md](7_Algorithms_BFS_MinHeap.md) for complete examples and explanations.

---

## Quick Review Guide

### Memory Management Checklist:

- [ ] Always delete what you new
- [ ] Use smart pointers when possible
- [ ] Make base class destructors virtual
- [ ] Check for self-assignment in operator=
- [ ] Implement the Rule of Three/Five for classes with resources

### Common C++ Pitfalls:

1. **Memory leaks**: Forgetting to delete dynamically allocated memory
2. **Dangling pointers**: Using pointers after deletion
3. **Double free**: Deleting memory twice
4. **Object slicing**: Losing derived class information when assigning to base class
5. **Missing virtual destructors**: Causing incomplete cleanup

### Essential C++11/14 Features for the Test:

- `auto` type inference
- Range-based for loops
- Lambda expressions
- Smart pointers
- Move semantics

---

## Practice Questions

1. Explain the difference between stack and heap memory allocation.
2. What is the diamond problem in multiple inheritance and how can it be solved?
3. Write a class template for a generic pair of values.
4. Explain the difference between `unique_ptr` and `shared_ptr`.
5. When would you use virtual functions? Provide an example.
6. Write a simple class that overloads the addition operator.
7. Describe the BFS algorithm and its time complexity.
8. How do you implement a proper copy constructor and assignment operator?

---

## Quick Reference Card

| Topic | Key Points |
|-------|------------|
| OOP Basics | Classes, objects, encapsulation, constructors, destructors |
| I/O | iostream, fstream, formatting (iomanip) |
| Inheritance | Base class, derived class, protected members, virtual methods |
| Polymorphism | Virtual functions, overriding, runtime type resolution |
| Multi-file | Header (.h/.hpp), implementation (.cpp), header guards |
| Templates | Function templates, class templates, template specialization |
| STL | vector, map, algorithms (sort, find, transform) |
| Smart Pointers | unique_ptr, shared_ptr, weak_ptr |
| Operator Overloading | Binary, unary, assignment, comparison, stream operators |
| Algorithms | BFS (queue-based), Min Heap (complete binary tree) | 
# C++ Test III Topics Overview

> This document provides an outline of all topics covered on Test III and serves as a reference to the more detailed study materials.

## 3. Create C++ Programs to Solve Problems

### 3.1 Basic C++ Concepts

#### 3.1.1 Describe the aspects of the object-oriented paradigm
- QQ 3.1.1 Test III & IV

#### 3.1.2 Inputting and outputting in C++

##### 3.1.2.1 Create formatted output to standard out (using std::cout, etc.)
- QQ 3.1.2 Test III & IV

##### 3.1.2.2 Gather input from standard input (using std::cin, etc.)
- QQ 3.1.2 Test III & IV

##### 3.1.2.4 Use stream classes to read in data from a file (using std::ifstream)
- QQ 3.1.2 Test III & IV

##### 3.1.2.5 Use stream classes to output data to a file (using std::ofstream)
- QQ 3.1.2 Test III & IV

#### 3.1.3 Define classes and instantiate objects

##### 3.1.3.1 Create classes
- QQ 3.1.3 Test III & IV

##### 3.1.3.2 Instantiate objects on stack
- QQ 3.1.3 Test III & IV

##### 3.1.3.3 Instantiate objects on the heap (using pointers + new)
- QQ 3.1.3 Test III & IV

##### 3.1.3.4 Define methods (member functions) using the scope resolution operator (ClassName::methodName)
- QQ 3.1.3 Test III & IV

##### 3.1.3.9 Modify class member's visibility (public, private, protected)
- QQ 3.1.3 Test III & IV

> **Note:** Topics 3.1.3.5–3.1.3.8 and 3.1.3.10–3.1.3.12 either don't have "Test III" markers or are empty.

### 3.2 Object-Oriented Programming

#### 3.2.1 Create derived and included classes

##### 3.2.1.1 Describe general rules of inheritance
- QQ 3.2.1 Test III & IV

##### 3.2.1.2 Create derived classes using inheritance (public inheritance)
- QQ 3.2.1 Test III & IV

##### 3.2.1.3 Implement is-a and has-a relationships between classes
- QQ 3.2.1 Test III & IV

##### 3.2.1.4 Use static, constant, and dynamic casting (static_cast, const_cast, dynamic_cast)
- QQ 3.2.1 Test III & IV

#### 3.2.2 Alter the functionality of derived classes

##### 3.2.2.1 Use polymorphism to alter class behavior (virtual functions, etc.)
- QQ 3.2.2 Test III & IV

##### 3.2.2.2 Describe the difference between method overloading and overriding
- QQ 3.2.2 Test III & IV

##### 3.2.2.3 Create an abstract class (pure virtual methods)
- QQ 3.2.2 Test III & IV

##### 3.2.2.4 Override methods in a class
- QQ 3.2.2 Test III & IV

#### 3.2.3 Create classes using multiple files
- QQ 3.2.3 Test III & IV

> **Note:** Topics 3.2.4 and 3.2.5 mention advanced or multiple inheritance concepts. Only "Test III & IV" reference is 3.2.5's "Describe basic concepts of multiple inheritance."

### 3.3 Advanced C++ Concepts

#### 3.3.1 Template classes

##### 3.3.1.2 Create classes that use templating
- QQ 3.3.1 Test III & IV

#### 3.3.2 Use the standard template library

##### 3.3.2.1 Use the standard template library's sequence containers (std::vector, std::list, etc.)
- QQ 3.3.2 Test III & IV

##### 3.3.2.2 Use the standard template library's associative containers (std::set, std::map, etc.)
- QQ 3.3.2 Test III & IV

##### 3.3.2.3 Retrieve iterators for STL containers and use them to evaluate higher-order functions (std::find, std::for_each, etc.)
- QQ 3.3.2 Test III & IV

##### 3.3.2.4 Use the reference operator (&) to get a pointer (reference) to a value in a container
- QQ 3.3.2 Test III & IV

#### 3.3.3 Use smart pointers with STL containers and abstract classes

##### 3.3.3.1 Automate variable lifecycle with smart pointers (std::unique_ptr, std::shared_ptr)
- QQ 3.3.3 Test III & IV

#### 3.3.4 Advanced function and method features
> **Note:** Pass by reference and operator overloading are noted as "Test III & IV," but double-check your notes if only some of these appear on Test III.

### 3.4 Algorithms and Data Structures in C++

#### 3.4.1 Develop a C++ program that uses the breadth-first search (BFS) algorithm

##### 3.4.1.1 Describe the BFS algorithm
- QQ 3.4.1 Test III & IV

##### 3.4.1.2 Implement the BFS algorithm
- QQ 3.4.1 Test III & IV

#### 3.4.2 Develop a C++ program that implements the min heap

##### 3.4.2.1 Describe the min heap data structure
- QQ 3.4.2 Test III & IV

##### 3.4.2.2 Implement the min heap data structure
- QQ 3.4.2 Test III & IV

## Study Tips for Test III

### Review Object-Oriented Concepts:
- Class creation, inheritance, polymorphism, abstract classes, overriding vs. overloading
- Creating and using objects on stack vs. heap
- Access specifiers (public, private, protected)

### Practice C++ I/O (both file and console):
- `std::cin`, `std::cout`, `std::ifstream`, `std::ofstream`

### Multiple Files / Makefiles:
- Understand how to split class definitions into headers (`.hpp`/`.h`) and implementation files (`.cpp`)

### Templates and the STL:
- Template classes; how to declare/define them in headers
- Working with `std::vector`, `std::list`, `std::map`, etc.
- Smart pointers (`std::unique_ptr`, `std::shared_ptr`)

### Algorithms and Data Structures:
- BFS (concept and code)
- Min-heap (concept and code)
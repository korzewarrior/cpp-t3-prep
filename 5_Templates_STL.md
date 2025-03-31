# C++ Templates and the Standard Template Library (STL)

## 1. Introduction to Templates

Templates in C++ allow you to create generic classes and functions that can work with any data type. They enable type-independent programming while maintaining type safety.

### Function Templates

Function templates allow you to create a single function that can operate on different data types.

```cpp
// Simple function template
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    // Use with integers
    int i1 = 10, i2 = 20;
    std::cout << "Max(int): " << maximum(i1, i2) << std::endl;
    
    // Use with doubles
    double d1 = 10.5, d2 = 20.5;
    std::cout << "Max(double): " << maximum(d1, d2) << std::endl;
    
    // Use with strings
    std::string s1 = "apple", s2 = "banana";
    std::cout << "Max(string): " << maximum(s1, s2) << std::endl;
    
    return 0;
}
```

### Multiple Template Parameters

You can define templates with multiple type parameters:

```cpp
template <typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

int main() {
    int i = 10;
    double d = 20.5;
    
    // Mix different types
    auto result = add(i, d);  // result is a double
    std::cout << "10 + 20.5 = " << result << std::endl;
    
    return 0;
}
```

## 2. Class Templates

Class templates allow you to create generic classes that can work with different data types.

### Basic Class Template

```cpp
#include <iostream>

template <typename T>
class Box {
private:
    T value;
    
public:
    Box(T val) : value(val) {}
    
    T getValue() const {
        return value;
    }
    
    void setValue(T val) {
        value = val;
    }
};

int main() {
    // Box containing an integer
    Box<int> intBox(123);
    std::cout << "Integer box: " << intBox.getValue() << std::endl;
    
    // Box containing a double
    Box<double> doubleBox(123.456);
    std::cout << "Double box: " << doubleBox.getValue() << std::endl;
    
    // Box containing a string
    Box<std::string> stringBox("Hello, World!");
    std::cout << "String box: " << stringBox.getValue() << std::endl;
    
    return 0;
}
```

### Template Specialization

You can provide specialized implementations for specific types:

```cpp
#include <iostream>
#include <string>

// Primary template
template <typename T>
class DataFormatter {
public:
    std::string format(const T& data) {
        return std::to_string(data);
    }
};

// Specialization for std::string
template <>
class DataFormatter<std::string> {
public:
    std::string format(const std::string& data) {
        return "\"" + data + "\"";
    }
};

// Specialization for bool
template <>
class DataFormatter<bool> {
public:
    std::string format(const bool& data) {
        return data ? "true" : "false";
    }
};

int main() {
    DataFormatter<int> intFormatter;
    DataFormatter<double> doubleFormatter;
    DataFormatter<std::string> stringFormatter;
    DataFormatter<bool> boolFormatter;
    
    std::cout << "Int: " << intFormatter.format(42) << std::endl;
    std::cout << "Double: " << doubleFormatter.format(3.14159) << std::endl;
    std::cout << "String: " << stringFormatter.format("Hello") << std::endl;
    std::cout << "Bool: " << boolFormatter.format(true) << std::endl;
    
    return 0;
}
```

### Template with Default Types

You can provide default types for template parameters:

```cpp
template <typename T, typename U = int>
class Pair {
private:
    T first;
    U second;
    
public:
    Pair(T f, U s) : first(f), second(s) {}
    
    T getFirst() const { return first; }
    U getSecond() const { return second; }
};

int main() {
    // Using both template parameters
    Pair<std::string, double> p1("Temperature", 36.5);
    
    // Using default for second parameter
    Pair<std::string> p2("Count", 10);  // U defaults to int
    
    return 0;
}
```

## 3. Standard Template Library (STL) Overview

The STL is a collection of template classes and functions that provide common data structures and algorithms. It consists of:

1. **Containers**: Data structures like vector, list, map, etc.
2. **Iterators**: Objects that allow traversal of containers
3. **Algorithms**: Functions for searching, sorting, manipulating elements, etc.
4. **Function Objects**: Objects that act like functions
5. **Adaptors**: Components that modify the interface of other components

## 4. STL Sequence Containers

Sequence containers store elements in a linear sequence.

### std::vector

A dynamic array that can grow or shrink in size.

```cpp
#include <iostream>
#include <vector>

int main() {
    // Create a vector of integers
    std::vector<int> numbers;
    
    // Add elements to the vector
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);
    
    // Access elements
    std::cout << "First element: " << numbers[0] << std::endl;
    std::cout << "Second element: " << numbers[1] << std::endl;
    std::cout << "Third element: " << numbers.at(2) << std::endl;  // Bounds checking
    
    // Size of the vector
    std::cout << "Size: " << numbers.size() << std::endl;
    
    // Iterate through the vector
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Insert at a specific position
    numbers.insert(numbers.begin() + 1, 15);  // Insert 15 after the first element
    
    // Remove an element
    numbers.erase(numbers.begin() + 2);  // Remove the third element
    
    // Final vector
    std::cout << "Final vector: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### std::list

A doubly-linked list that allows efficient insertions and deletions at any position.

```cpp
#include <iostream>
#include <list>

int main() {
    // Create a list of integers
    std::list<int> numbers;
    
    // Add elements to the list
    numbers.push_back(10);    // Add to end
    numbers.push_front(5);    // Add to beginning
    numbers.push_back(15);    // Add to end
    
    // Size of the list
    std::cout << "Size: " << numbers.size() << std::endl;
    
    // Iterate through the list
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Insert at a specific position
    auto it = numbers.begin();
    std::advance(it, 1);      // Move to the second element
    numbers.insert(it, 7);    // Insert 7 as the second element
    
    // Remove an element
    it = numbers.begin();
    std::advance(it, 2);      // Move to the third element
    numbers.erase(it);        // Remove the third element
    
    // Final list
    std::cout << "Final list: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### std::deque

A double-ended queue that supports efficient insertions and deletions at both ends.

```cpp
#include <iostream>
#include <deque>

int main() {
    // Create a deque of integers
    std::deque<int> numbers;
    
    // Add elements to the deque
    numbers.push_back(10);    // Add to end
    numbers.push_front(5);    // Add to beginning
    numbers.push_back(15);    // Add to end
    
    // Access elements
    std::cout << "First element: " << numbers.front() << std::endl;
    std::cout << "Last element: " << numbers.back() << std::endl;
    std::cout << "Second element: " << numbers[1] << std::endl;
    
    // Size of the deque
    std::cout << "Size: " << numbers.size() << std::endl;
    
    // Iterate through the deque
    std::cout << "All elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Insert at a specific position
    numbers.insert(numbers.begin() + 1, 7);
    
    // Remove elements
    numbers.pop_front();  // Remove first element
    numbers.pop_back();   // Remove last element
    
    // Final deque
    std::cout << "Final deque: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## 5. STL Associative Containers

Associative containers implement sorted data structures that can be quickly searched.

### std::set

A collection of unique keys, sorted by keys.

```cpp
#include <iostream>
#include <set>
#include <string>

int main() {
    // Create a set of strings
    std::set<std::string> names;
    
    // Insert elements
    names.insert("Alice");
    names.insert("Bob");
    names.insert("Charlie");
    names.insert("Alice");  // Duplicate - will be ignored
    
    // Size of the set
    std::cout << "Size: " << names.size() << std::endl;
    
    // Check if an element exists
    if (names.find("Bob") != names.end()) {
        std::cout << "Bob is in the set" << std::endl;
    }
    
    // Iterate through the set
    std::cout << "All names: ";
    for (const auto& name : names) {
        std::cout << name << " ";
    }
    std::cout << std::endl;
    
    // Remove an element
    names.erase("Bob");
    
    // Final set
    std::cout << "Final set: ";
    for (const auto& name : names) {
        std::cout << name << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### std::map

A collection of key-value pairs, sorted by keys, keys are unique.

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    // Create a map of string to int
    std::map<std::string, int> ages;
    
    // Insert elements
    ages["Alice"] = 30;
    ages["Bob"] = 25;
    ages.insert({"Charlie", 35});
    
    // Access elements
    std::cout << "Alice's age: " << ages["Alice"] << std::endl;
    std::cout << "Bob's age: " << ages.at("Bob") << std::endl;
    
    // Check if a key exists
    if (ages.find("Dave") == ages.end()) {
        std::cout << "Dave is not in the map" << std::endl;
    }
    
    // Size of the map
    std::cout << "Size: " << ages.size() << std::endl;
    
    // Iterate through the map
    std::cout << "All entries:\n";
    for (const auto& pair : ages) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    // Remove an element
    ages.erase("Bob");
    
    // Final map
    std::cout << "Final map:\n";
    for (const auto& [name, age] : ages) {  // Using structured binding (C++17)
        std::cout << name << ": " << age << std::endl;
    }
    
    return 0;
}
```

### std::unordered_map

A hash table that stores key-value pairs with unique keys (not sorted).

```cpp
#include <iostream>
#include <unordered_map>
#include <string>

int main() {
    // Create an unordered_map of string to double
    std::unordered_map<std::string, double> prices;
    
    // Insert elements
    prices["Apple"] = 1.99;
    prices["Banana"] = 0.99;
    prices["Orange"] = 1.49;
    
    // Access elements
    std::cout << "Apple price: $" << prices["Apple"] << std::endl;
    
    // Check if a key exists
    if (prices.find("Grape") == prices.end()) {
        std::cout << "Grape price not found" << std::endl;
    }
    
    // Size of the map
    std::cout << "Number of items: " << prices.size() << std::endl;
    
    // Iterate through the map
    std::cout << "All prices:\n";
    for (const auto& [item, price] : prices) {
        std::cout << item << ": $" << price << std::endl;
    }
    
    return 0;
}
```

## 6. STL Iterators

Iterators are objects that allow you to traverse through containers.

### Types of Iterators

1. **Input Iterators**: Read from a container (forward moving, read-only)
2. **Output Iterators**: Write to a container (forward moving, write-only)
3. **Forward Iterators**: Move forward and read/write
4. **Bidirectional Iterators**: Move forward and backward, read/write
5. **Random Access Iterators**: Move in any direction, random access

### Basic Iterator Usage

```cpp
#include <iostream>
#include <vector>
#include <list>

int main() {
    // Vector with random access iterators
    std::vector<int> vec = {10, 20, 30, 40, 50};
    
    std::cout << "Vector using iterators: ";
    for (auto it = vec.begin(); it != vec.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // List with bidirectional iterators
    std::list<int> lst = {10, 20, 30, 40, 50};
    
    std::cout << "List using iterators: ";
    for (std::list<int>::iterator it = lst.begin(); it != lst.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // Reverse iteration
    std::cout << "Vector in reverse: ";
    for (auto rit = vec.rbegin(); rit != vec.rend(); ++rit) {
        std::cout << *rit << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Iterator Functions

```cpp
#include <iostream>
#include <vector>
#include <iterator>  // For std::advance, std::distance

int main() {
    std::vector<int> vec = {10, 20, 30, 40, 50};
    
    // Using advance to move an iterator
    auto it = vec.begin();
    std::advance(it, 2);  // Move forward by 2 positions
    std::cout << "After advancing by 2: " << *it << std::endl;  // 30
    
    // Using next/prev to create new iterators
    auto it2 = std::next(it);  // Iterator to the next element
    auto it3 = std::prev(it);  // Iterator to the previous element
    
    std::cout << "Next element: " << *it2 << std::endl;      // 40
    std::cout << "Previous element: " << *it3 << std::endl;  // 20
    
    // Measuring distance between iterators
    auto distance = std::distance(vec.begin(), it);
    std::cout << "Distance from begin: " << distance << std::endl;  // 2
    
    return 0;
}
```

## 7. STL Algorithms

The STL provides numerous algorithms for working with containers.

### Non-modifying Sequence Operations

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> vec = {30, 10, 50, 20, 40};
    
    // Find an element
    auto it = std::find(vec.begin(), vec.end(), 20);
    if (it != vec.end()) {
        std::cout << "Found 20 at position: " << std::distance(vec.begin(), it) << std::endl;
    }
    
    // Count occurrences
    std::vector<int> nums = {1, 2, 3, 1, 2, 1, 5, 6};
    int count = std::count(nums.begin(), nums.end(), 1);
    std::cout << "Count of 1: " << count << std::endl;
    
    // Check if all elements satisfy a condition
    bool allPositive = std::all_of(vec.begin(), vec.end(), 
                                  [](int x) { return x > 0; });
    std::cout << "All positive: " << (allPositive ? "Yes" : "No") << std::endl;
    
    // Check if any element satisfies a condition
    bool anyGreaterThan40 = std::any_of(vec.begin(), vec.end(), 
                                       [](int x) { return x > 40; });
    std::cout << "Any > 40: " << (anyGreaterThan40 ? "Yes" : "No") << std::endl;
    
    // Find minimum and maximum
    auto [minIt, maxIt] = std::minmax_element(vec.begin(), vec.end());
    std::cout << "Min: " << *minIt << ", Max: " << *maxIt << std::endl;
    
    // Calculate sum
    int sum = std::accumulate(vec.begin(), vec.end(), 0);
    std::cout << "Sum: " << sum << std::endl;
    
    return 0;
}
```

### Modifying Sequence Operations

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

void printVector(const std::vector<int>& vec, const std::string& label) {
    std::cout << label << ": ";
    for (int num : vec) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

int main() {
    std::vector<int> vec = {30, 10, 50, 20, 40};
    printVector(vec, "Original");
    
    // Sort
    std::sort(vec.begin(), vec.end());
    printVector(vec, "Sorted");
    
    // Reverse
    std::reverse(vec.begin(), vec.end());
    printVector(vec, "Reversed");
    
    // Transform elements
    std::transform(vec.begin(), vec.end(), vec.begin(),
                  [](int x) { return x * 2; });
    printVector(vec, "Doubled");
    
    // Replace elements
    std::vector<int> nums = {10, 20, 10, 30, 10, 40};
    std::replace(nums.begin(), nums.end(), 10, 99);
    printVector(nums, "Replaced 10 with 99");
    
    // Remove elements
    std::vector<int> toRemove = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // Remove all even numbers
    auto newEnd = std::remove_if(toRemove.begin(), toRemove.end(),
                                [](int x) { return x % 2 == 0; });
    toRemove.erase(newEnd, toRemove.end());
    printVector(toRemove, "After removing even numbers");
    
    return 0;
}
```

### Sorting and Related Operations

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

struct Person {
    std::string name;
    int age;
    
    // For printing
    friend std::ostream& operator<<(std::ostream& os, const Person& p) {
        os << p.name << " (" << p.age << ")";
        return os;
    }
};

template<typename T>
void printVector(const std::vector<T>& vec, const std::string& label) {
    std::cout << label << ": ";
    for (const auto& item : vec) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
}

int main() {
    // Sorting with custom comparator
    std::vector<int> vec = {30, 10, 50, 20, 40};
    
    // Sort in descending order
    std::sort(vec.begin(), vec.end(), std::greater<int>());
    printVector(vec, "Sorted (descending)");
    
    // Partial sort (first 3 elements)
    std::vector<int> vec2 = {30, 10, 50, 20, 40};
    std::partial_sort(vec2.begin(), vec2.begin() + 3, vec2.end());
    printVector(vec2, "Partial sort (first 3)");
    
    // Sort objects by custom criteria
    std::vector<Person> people = {
        {"Alice", 30},
        {"Bob", 25},
        {"Charlie", 35},
        {"Dave", 20}
    };
    
    // Sort by age
    std::sort(people.begin(), people.end(), 
              [](const Person& a, const Person& b) { return a.age < b.age; });
    printVector(people, "People sorted by age");
    
    // Sort by name
    std::sort(people.begin(), people.end(), 
              [](const Person& a, const Person& b) { return a.name < b.name; });
    printVector(people, "People sorted by name");
    
    // Binary search on a sorted range
    std::vector<int> sortedVec = {10, 20, 30, 40, 50};
    bool found = std::binary_search(sortedVec.begin(), sortedVec.end(), 30);
    std::cout << "30 found: " << (found ? "Yes" : "No") << std::endl;
    
    // Find bounds of a value
    auto lower = std::lower_bound(sortedVec.begin(), sortedVec.end(), 30);
    auto upper = std::upper_bound(sortedVec.begin(), sortedVec.end(), 30);
    
    std::cout << "Lower bound of 30: " 
              << std::distance(sortedVec.begin(), lower) << std::endl;
    std::cout << "Upper bound of 30: " 
              << std::distance(sortedVec.begin(), upper) << std::endl;
    
    return 0;
}
```

## 8. STL Higher-Order Functions and Algorithms

The STL provides a rich set of algorithms that work with iterators to perform operations on containers. These higher-order functions often take function objects or lambdas as parameters, allowing for customizable behavior.

### 8.1 Non-Modifying Sequence Operations

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 3, 2};
    std::vector<std::string> names = {"Alice", "Bob", "Charlie", "Dave"};
    
    // std::find - finds an element in a range
    auto it = std::find(numbers.begin(), numbers.end(), 3);
    if (it != numbers.end()) {
        std::cout << "Found 3 at position: " << std::distance(numbers.begin(), it) << std::endl;
    }
    
    // std::find_if - finds an element that satisfies a predicate
    auto longName = std::find_if(names.begin(), names.end(), 
                                [](const std::string& name) { return name.length() > 5; });
    if (longName != names.end()) {
        std::cout << "First name longer than 5 chars: " << *longName << std::endl;
    }
    
    // std::count - counts occurrences of a value
    int countThrees = std::count(numbers.begin(), numbers.end(), 3);
    std::cout << "Number of 3s: " << countThrees << std::endl;
    
    // std::count_if - counts elements that satisfy a predicate
    int countEven = std::count_if(numbers.begin(), numbers.end(), 
                                 [](int n) { return n % 2 == 0; });
    std::cout << "Number of even values: " << countEven << std::endl;
    
    // std::for_each - applies a function to each element
    std::cout << "All names: ";
    std::for_each(names.begin(), names.end(), 
                 [](const std::string& name) { std::cout << name << " "; });
    std::cout << std::endl;
    
    return 0;
}
```

### 8.2 Modifying Sequence Operations

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // std::transform - applies a function to a range and stores the result
    std::vector<int> squared(numbers.size());
    std::transform(numbers.begin(), numbers.end(), squared.begin(),
                  [](int n) { return n * n; });
    
    std::cout << "Squared numbers: ";
    for (int n : squared) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // std::replace - replaces all occurrences of a value
    std::vector<int> data = {1, 2, 3, 2, 4, 2, 5};
    std::replace(data.begin(), data.end(), 2, 99);
    
    std::cout << "After replacing 2 with 99: ";
    for (int n : data) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // std::replace_if - replaces elements that satisfy a predicate
    std::vector<int> moreData = {1, 2, 3, 4, 5, 6, 7, 8};
    std::replace_if(moreData.begin(), moreData.end(),
                    [](int n) { return n % 2 == 0; }, 0);
    
    std::cout << "After replacing even numbers with 0: ";
    for (int n : moreData) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 8.3 Sorting and Related Operations

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

class Person {
public:
    std::string name;
    int age;
    
    Person(std::string n, int a) : name(n), age(a) {}
    
    // For showing in output
    friend std::ostream& operator<<(std::ostream& os, const Person& p) {
        os << p.name << "(" << p.age << ")";
        return os;
    }
};

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3, 7, 4};
    
    // std::sort - sorts elements in ascending order
    std::sort(numbers.begin(), numbers.end());
    
    std::cout << "Sorted numbers: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // std::sort with custom comparator (descending order)
    std::sort(numbers.begin(), numbers.end(), std::greater<int>());
    
    std::cout << "Sorted numbers (descending): ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // Custom object sorting
    std::vector<Person> people = {
        {"Alice", 25},
        {"Bob", 30},
        {"Charlie", 20},
        {"Dave", 35}
    };
    
    // Sort by age
    std::sort(people.begin(), people.end(),
              [](const Person& a, const Person& b) { return a.age < b.age; });
    
    std::cout << "People sorted by age: ";
    for (const auto& p : people) {
        std::cout << p << " ";
    }
    std::cout << std::endl;
    
    // Sort by name
    std::sort(people.begin(), people.end(),
              [](const Person& a, const Person& b) { return a.name < b.name; });
    
    std::cout << "People sorted by name: ";
    for (const auto& p : people) {
        std::cout << p << " ";
    }
    std::cout << std::endl;
    
    // std::partial_sort - sorts part of a range
    std::vector<int> partialSortData = {5, 2, 8, 1, 9, 3, 7, 4};
    std::partial_sort(partialSortData.begin(), 
                      partialSortData.begin() + 4, 
                      partialSortData.end());
    
    std::cout << "First 4 sorted elements: ";
    for (int n : partialSortData) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 8.4 Numeric Operations

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <functional>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // std::accumulate - computes the sum of elements
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Sum: " << sum << std::endl;
    
    // std::accumulate with custom operation (multiplication)
    int product = std::accumulate(numbers.begin(), numbers.end(), 1, 
                                 std::multiplies<int>());
    std::cout << "Product: " << product << std::endl;
    
    // std::accumulate with lambda for custom operation
    int sumOfSquares = std::accumulate(numbers.begin(), numbers.end(), 0,
                                      [](int total, int val) { return total + val*val; });
    std::cout << "Sum of squares: " << sumOfSquares << std::endl;
    
    // std::inner_product - computes the inner product of two ranges
    std::vector<int> vec1 = {1, 2, 3};
    std::vector<int> vec2 = {4, 5, 6};
    int innerProduct = std::inner_product(vec1.begin(), vec1.end(), 
                                          vec2.begin(), 0);
    std::cout << "Inner product: " << innerProduct << std::endl;
    
    // std::adjacent_difference - computes the differences between adjacent elements
    std::vector<int> sequence = {1, 2, 4, 7, 11, 16};
    std::vector<int> differences(sequence.size());
    
    std::adjacent_difference(sequence.begin(), sequence.end(), 
                            differences.begin());
    
    std::cout << "Adjacent differences: ";
    for (size_t i = 0; i < differences.size(); ++i) {
        std::cout << differences[i] << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 8.5 Additional Useful Algorithms

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    // std::generate - fills a range with generated values
    std::vector<int> generated(10);
    int value = 1;
    std::generate(generated.begin(), generated.end(), 
                 [&value]() { return value++; });
    
    std::cout << "Generated sequence: ";
    for (int n : generated) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // std::shuffle - randomly reorders elements
    std::vector<int> deck = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(deck.begin(), deck.end(), g);
    
    std::cout << "Shuffled deck: ";
    for (int card : deck) {
        std::cout << card << " ";
    }
    std::cout << std::endl;
    
    // std::unique - removes consecutive duplicates
    std::vector<int> duplicates = {1, 1, 2, 2, 2, 3, 4, 4, 5, 5, 5, 5};
    auto newEnd = std::unique(duplicates.begin(), duplicates.end());
    duplicates.erase(newEnd, duplicates.end());
    
    std::cout << "After removing consecutive duplicates: ";
    for (int n : duplicates) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // std::minmax_element - finds both minimum and maximum elements
    std::vector<int> data = {3, 1, 4, 1, 5, 9, 2, 6};
    auto [minIt, maxIt] = std::minmax_element(data.begin(), data.end());
    
    std::cout << "Min element: " << *minIt << std::endl;
    std::cout << "Max element: " << *maxIt << std::endl;
    
    return 0;
}
```

### 8.6 Custom Comparators and Function Objects

STL algorithms often accept comparators or predicates as arguments. These can be function pointers, function objects (functors), or lambdas.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
#include <string>

// Custom function object for checking if a number is divisible by n
class DivisibleBy {
private:
    int divisor;
    
public:
    DivisibleBy(int div) : divisor(div) {}
    
    bool operator()(int value) const {
        return value % divisor == 0;
    }
};

// Regular function for checking if a string starts with a character
bool startsWithA(const std::string& str) {
    return !str.empty() && str[0] == 'A';
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Using function object
    DivisibleBy isDivisibleBy3(3);
    int countDiv3 = std::count_if(numbers.begin(), numbers.end(), isDivisibleBy3);
    
    std::cout << "Numbers divisible by 3: " << countDiv3 << std::endl;
    
    // Using the same function object in a find_if
    auto firstDiv3 = std::find_if(numbers.begin(), numbers.end(), isDivisibleBy3);
    if (firstDiv3 != numbers.end()) {
        std::cout << "First number divisible by 3: " << *firstDiv3 << std::endl;
    }
    
    // Using a function pointer
    std::vector<std::string> names = {"Alice", "Bob", "Anna", "Alex", "Charlie"};
    auto firstA = std::find_if(names.begin(), names.end(), startsWithA);
    
    if (firstA != names.end()) {
        std::cout << "First name starting with 'A': " << *firstA << std::endl;
    }
    
    // Using a lambda expression
    auto isEven = [](int n) { return n % 2 == 0; };
    int countEven = std::count_if(numbers.begin(), numbers.end(), isEven);
    
    std::cout << "Number of even values: " << countEven << std::endl;
    
    // Putting it all together: find even numbers divisible by 3
    auto evenAndDiv3 = [&isDivisibleBy3](int n) { return n % 2 == 0 && isDivisibleBy3(n); };
    auto found = std::find_if(numbers.begin(), numbers.end(), evenAndDiv3);
    
    if (found != numbers.end()) {
        std::cout << "First even number divisible by 3: " << *found << std::endl;
    }
    
    return 0;
}
```

### 8.7 Using the Reference Operator with Containers

The reference operator (`&`) can be used to get a reference to container elements, which can be useful for modifying elements in-place or avoiding copies.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

class LargeObject {
private:
    std::string name;
    std::vector<int> data;
    
public:
    LargeObject(std::string n = "Default", int size = 1000) 
        : name(n), data(size, 0) {}
    
    void setName(const std::string& newName) {
        name = newName;
    }
    
    std::string getName() const {
        return name;
    }
    
    // For demonstration: modify all data elements
    void modify() {
        for (auto& value : data) {
            value += 1;
        }
    }
};

int main() {
    std::vector<LargeObject> objects;
    
    // Create a few objects
    objects.push_back(LargeObject("Object 1"));
    objects.push_back(LargeObject("Object 2"));
    objects.push_back(LargeObject("Object 3"));
    
    // Display initial names
    std::cout << "Initial names:" << std::endl;
    for (const auto& obj : objects) {
        std::cout << obj.getName() << std::endl;
    }
    
    // Find an object by name
    auto it = std::find_if(objects.begin(), objects.end(),
                         [](const LargeObject& obj) { return obj.getName() == "Object 2"; });
    
    if (it != objects.end()) {
        // Get a reference to the found object
        LargeObject& objRef = *it;
        
        // Modify the object through the reference
        objRef.setName("Modified Object 2");
        objRef.modify();
        
        std::cout << "\nAfter modification:" << std::endl;
        for (const auto& obj : objects) {
            std::cout << obj.getName() << std::endl;
        }
    }
    
    // Using auto& to get references in a for loop
    std::cout << "\nModifying all objects using references:" << std::endl;
    for (auto& obj : objects) {
        obj.setName(obj.getName() + " (updated)");
    }
    
    for (const auto& obj : objects) {
        std::cout << obj.getName() << std::endl;
    }
    
    return 0;
}
```

In this example, the `&` operator is used to create references to elements in a container, which allows for modifying them without making copies. This is particularly important for large objects where copying would be expensive.

## 9. Complete Example: Custom Template Class with STL

This example demonstrates a custom template class that uses STL containers and algorithms.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <stdexcept>

template <typename T>
class DataCollection {
private:
    std::vector<T> data;
    
public:
    // Add data to the collection
    void add(const T& item) {
        data.push_back(item);
    }
    
    // Get item at a specific index
    T& at(size_t index) {
        if (index >= data.size()) {
            throw std::out_of_range("Index out of range");
        }
        return data[index];
    }
    
    // Get reference to first item
    T& front() {
        if (data.empty()) {
            throw std::out_of_range("Collection is empty");
        }
        return data.front();
    }
    
    // Get reference to last item
    T& back() {
        if (data.empty()) {
            throw std::out_of_range("Collection is empty");
        }
        return data.back();
    }
    
    // Get size of collection
    size_t size() const {
        return data.size();
    }
    
    // Check if collection is empty
    bool empty() const {
        return data.empty();
    }
    
    // Sort the collection
    void sort() {
        std::sort(data.begin(), data.end());
    }
    
    // Sort with custom comparator
    template <typename Compare>
    void sort(Compare comp) {
        std::sort(data.begin(), data.end(), comp);
    }
    
    // Find an item
    bool contains(const T& item) const {
        return std::find(data.begin(), data.end(), item) != data.end();
    }
    
    // Remove an item
    void remove(const T& item) {
        auto newEnd = std::remove(data.begin(), data.end(), item);
        data.erase(newEnd, data.end());
    }
    
    // Get iterator to beginning
    typename std::vector<T>::iterator begin() {
        return data.begin();
    }
    
    // Get iterator to end
    typename std::vector<T>::iterator end() {
        return data.end();
    }
    
    // Get const iterator to beginning
    typename std::vector<T>::const_iterator begin() const {
        return data.begin();
    }
    
    // Get const iterator to end
    typename std::vector<T>::const_iterator end() const {
        return data.end();
    }
};

// Example usage with a custom class
class Student {
private:
    std::string name;
    int id;
    double gpa;
    
public:
    Student(const std::string& name, int id, double gpa)
        : name(name), id(id), gpa(gpa) {}
    
    std::string getName() const { return name; }
    int getId() const { return id; }
    double getGpa() const { return gpa; }
    
    // For sorting and finding
    bool operator<(const Student& other) const {
        return id < other.id;
    }
    
    bool operator==(const Student& other) const {
        return id == other.id;
    }
    
    friend std::ostream& operator<<(std::ostream& os, const Student& student) {
        os << student.name << " (ID: " << student.id << ", GPA: " << student.gpa << ")";
        return os;
    }
};

int main() {
    // DataCollection with integers
    DataCollection<int> numbers;
    
    numbers.add(30);
    numbers.add(10);
    numbers.add(50);
    numbers.add(20);
    numbers.add(40);
    
    std::cout << "Numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    numbers.sort();
    
    std::cout << "Sorted numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // DataCollection with Student objects
    DataCollection<Student> students;
    
    students.add(Student("Alice", 1001, 3.8));
    students.add(Student("Bob", 1003, 3.5));
    students.add(Student("Charlie", 1002, 3.9));
    
    std::cout << "\nStudents:" << std::endl;
    for (const auto& student : students) {
        std::cout << student << std::endl;
    }
    
    // Sort by ID (using operator<)
    students.sort();
    
    std::cout << "\nStudents sorted by ID:" << std::endl;
    for (const auto& student : students) {
        std::cout << student << std::endl;
    }
    
    // Sort by GPA (using custom comparator)
    students.sort([](const Student& a, const Student& b) {
        return a.getGpa() > b.getGpa();  // Descending order
    });
    
    std::cout << "\nStudents sorted by GPA (descending):" << std::endl;
    for (const auto& student : students) {
        std::cout << student << std::endl;
    }
    
    // Access and modify an element
    students.at(0).getName();  // Get name of first student
    
    // Test contains and remove
    DataCollection<int> moreNumbers;
    moreNumbers.add(10);
    moreNumbers.add(20);
    moreNumbers.add(30);
    moreNumbers.add(20);  // Duplicate
    
    std::cout << "\nMore numbers: ";
    for (int num : moreNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Contains 20: " << (moreNumbers.contains(20) ? "Yes" : "No") << std::endl;
    
    moreNumbers.remove(20);  // Remove all occurrences of 20
    
    std::cout << "After removing 20: ";
    for (int num : moreNumbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## 10. Key Points to Remember

1. **Templates**:
   - Function templates create generic functions for any data type
   - Class templates create generic classes for any data type
   - Template parameters can have default types
   - Template specialization allows custom implementations for specific types

2. **STL Sequence Containers**:
   - `std::vector`: Dynamic array with random access
   - `std::list`: Doubly-linked list for efficient insertions/deletions
   - `std::deque`: Double-ended queue with efficient operations at both ends

3. **STL Associative Containers**:
   - `std::set`: Collection of unique, sorted keys
   - `std::map`: Collection of key-value pairs, sorted by keys
   - `std::unordered_map`: Hash table of key-value pairs (not sorted)

4. **STL Iterators**:
   - Objects that allow traversal of containers
   - Different types: input, output, forward, bidirectional, random access
   - Common operations: increment, dereference, comparison
   - Helper functions: `advance`, `distance`, `next`, `prev`

5. **STL Algorithms**:
   - Non-modifying: `find`, `count`, `all_of`, `any_of`, `min_element`, etc.
   - Modifying: `sort`, `reverse`, `transform`, `replace`, `remove`, etc.
   - Use iterators to specify ranges

6. **Reference Operator**:
   - Use `&` to get a reference to a container element
   - Can be used to modify elements through pointers or references 
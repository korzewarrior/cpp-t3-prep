# C++ Operator Overloading

## 1. Introduction to Operator Overloading

Operator overloading is a powerful feature in C++ that allows you to redefine the behavior of operators (like +, -, *, /, ==, etc.) for user-defined types. This enables you to use custom objects with familiar operators, making your code more intuitive and readable.

### 1.1 Basic Syntax

```cpp
class ClassName {
public:
    // Member function operator overloading
    ReturnType operator+(const ClassName& obj) {
        // Implementation
    }
};

// Non-member function operator overloading
ReturnType operator-(const ClassName& obj1, const ClassName& obj2) {
    // Implementation
}
```

## 2. Types of Operator Overloading

### 2.1 Binary Operators (+, -, *, /, %, etc.)

```cpp
#include <iostream>

class Complex {
private:
    double real;
    double imag;
    
public:
    // Constructor
    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}
    
    // Member function to overload + operator
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
    
    // Member function to overload - operator
    Complex operator-(const Complex& other) const {
        return Complex(real - other.real, imag - other.imag);
    }
    
    // Member function to overload * operator
    Complex operator*(const Complex& other) const {
        // Complex multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i
        return Complex(
            real * other.real - imag * other.imag,
            real * other.imag + imag * other.real
        );
    }
    
    // Display function
    void display() const {
        std::cout << real;
        if (imag >= 0) 
            std::cout << " + " << imag << "i";
        else 
            std::cout << " - " << -imag << "i";
        std::cout << std::endl;
    }
};

int main() {
    Complex c1(3.0, 2.0);
    Complex c2(1.0, 4.0);
    
    std::cout << "c1 = ";
    c1.display();
    
    std::cout << "c2 = ";
    c2.display();
    
    Complex sum = c1 + c2;
    std::cout << "c1 + c2 = ";
    sum.display();
    
    Complex diff = c1 - c2;
    std::cout << "c1 - c2 = ";
    diff.display();
    
    Complex product = c1 * c2;
    std::cout << "c1 * c2 = ";
    product.display();
    
    return 0;
}
```

### 2.2 Unary Operators (++, --, -, !, etc.)

```cpp
#include <iostream>

class Counter {
private:
    int count;
    
public:
    Counter(int c = 0) : count(c) {}
    
    // Prefix increment (++c)
    Counter& operator++() {
        ++count;
        return *this;
    }
    
    // Postfix increment (c++)
    Counter operator++(int) {
        Counter temp = *this;
        ++count;
        return temp;
    }
    
    // Unary minus operator (negation)
    Counter operator-() const {
        return Counter(-count);
    }
    
    void display() const {
        std::cout << "Count: " << count << std::endl;
    }
    
    int getValue() const {
        return count;
    }
};

int main() {
    Counter c1(5);
    std::cout << "Initial: ";
    c1.display();
    
    // Prefix increment
    ++c1;
    std::cout << "After ++c1: ";
    c1.display();
    
    // Postfix increment
    Counter c2 = c1++;
    std::cout << "c2 = c1++: ";
    c2.display();
    std::cout << "c1 after postfix: ";
    c1.display();
    
    // Unary minus
    Counter c3 = -c1;
    std::cout << "-c1: ";
    c3.display();
    
    return 0;
}
```

### 2.3 Assignment Operators (=, +=, -=, *=, etc.)

```cpp
#include <iostream>

class Number {
private:
    int value;
    
public:
    Number(int v = 0) : value(v) {}
    
    // Assignment operator
    Number& operator=(const Number& other) {
        // Check for self-assignment
        if (this != &other) {
            value = other.value;
        }
        return *this;
    }
    
    // Compound assignment operator +=
    Number& operator+=(const Number& other) {
        value += other.value;
        return *this;
    }
    
    // Compound assignment operator -=
    Number& operator-=(const Number& other) {
        value -= other.value;
        return *this;
    }
    
    void display() const {
        std::cout << "Value: " << value << std::endl;
    }
};

int main() {
    Number n1(10);
    Number n2(5);
    
    std::cout << "Initial n1: ";
    n1.display();
    std::cout << "Initial n2: ";
    n2.display();
    
    // Assignment
    Number n3;
    n3 = n1;
    std::cout << "n3 = n1: ";
    n3.display();
    
    // Compound assignment
    n1 += n2;
    std::cout << "n1 += n2: ";
    n1.display();
    
    n1 -= n2;
    std::cout << "n1 -= n2: ";
    n1.display();
    
    return 0;
}
```

### 2.4 Comparison Operators (==, !=, <, >, <=, >=)

```cpp
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    
public:
    Person(std::string n = "", int a = 0) : name(n), age(a) {}
    
    // Equality operator
    bool operator==(const Person& other) const {
        return (name == other.name && age == other.age);
    }
    
    // Inequality operator
    bool operator!=(const Person& other) const {
        return !(*this == other);
    }
    
    // Less than operator (for sorting, etc.)
    bool operator<(const Person& other) const {
        if (name != other.name) {
            return name < other.name;
        }
        return age < other.age;
    }
    
    // Greater than operator
    bool operator>(const Person& other) const {
        return other < *this;
    }
    
    // Less than or equal operator
    bool operator<=(const Person& other) const {
        return !(other < *this);
    }
    
    // Greater than or equal operator
    bool operator>=(const Person& other) const {
        return !(*this < other);
    }
    
    void display() const {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};

int main() {
    Person p1("Alice", 30);
    Person p2("Bob", 25);
    Person p3("Alice", 30);
    
    std::cout << "p1: ";
    p1.display();
    std::cout << "p2: ";
    p2.display();
    std::cout << "p3: ";
    p3.display();
    
    std::cout << "p1 == p3: " << (p1 == p3 ? "true" : "false") << std::endl;
    std::cout << "p1 != p2: " << (p1 != p2 ? "true" : "false") << std::endl;
    std::cout << "p1 < p2: " << (p1 < p2 ? "true" : "false") << std::endl;
    std::cout << "p1 > p2: " << (p1 > p2 ? "true" : "false") << std::endl;
    
    return 0;
}
```

### 2.5 Stream Operators (<<, >>)

```cpp
#include <iostream>
#include <string>

class Date {
private:
    int day;
    int month;
    int year;
    
public:
    Date(int d = 1, int m = 1, int y = 2023) : day(d), month(m), year(y) {}
    
    // Allow access to private members
    friend std::ostream& operator<<(std::ostream& os, const Date& date);
    friend std::istream& operator>>(std::istream& is, Date& date);
};

// Output stream operator (non-member function)
std::ostream& operator<<(std::ostream& os, const Date& date) {
    os << date.month << "/" << date.day << "/" << date.year;
    return os;
}

// Input stream operator (non-member function)
std::istream& operator>>(std::istream& is, Date& date) {
    char slash1, slash2;
    is >> date.month >> slash1 >> date.day >> slash2 >> date.year;
    
    // Check if format is correct
    if (slash1 != '/' || slash2 != '/') {
        is.setstate(std::ios::failbit);
    }
    
    return is;
}

int main() {
    Date today(31, 3, 2024);
    std::cout << "Today is: " << today << std::endl;
    
    Date inputDate;
    std::cout << "Enter a date (MM/DD/YYYY): ";
    std::cin >> inputDate;
    
    if (std::cin.fail()) {
        std::cout << "Invalid date format!" << std::endl;
    } else {
        std::cout << "You entered: " << inputDate << std::endl;
    }
    
    return 0;
}
```

### 2.6 Subscript Operator ([])

```cpp
#include <iostream>
#include <stdexcept>

class Array {
private:
    int* data;
    int size;
    
public:
    Array(int s = 10) : size(s) {
        data = new int[size]{0};  // Initialize all elements to 0
    }
    
    ~Array() {
        delete[] data;
    }
    
    // Copy constructor
    Array(const Array& other) : size(other.size) {
        data = new int[size];
        for (int i = 0; i < size; ++i) {
            data[i] = other.data[i];
        }
    }
    
    // Assignment operator
    Array& operator=(const Array& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new int[size];
            for (int i = 0; i < size; ++i) {
                data[i] = other.data[i];
            }
        }
        return *this;
    }
    
    // Subscript operator (non-const version)
    int& operator[](int index) {
        if (index < 0 || index >= size) {
            throw std::out_of_range("Array index out of bounds");
        }
        return data[index];
    }
    
    // Subscript operator (const version)
    const int& operator[](int index) const {
        if (index < 0 || index >= size) {
            throw std::out_of_range("Array index out of bounds");
        }
        return data[index];
    }
    
    // Return array size
    int getSize() const {
        return size;
    }
};

int main() {
    Array arr(5);
    
    try {
        // Setting values
        for (int i = 0; i < arr.getSize(); ++i) {
            arr[i] = i * 10;
        }
        
        // Getting values
        std::cout << "Array elements: ";
        for (int i = 0; i < arr.getSize(); ++i) {
            std::cout << arr[i] << " ";
        }
        std::cout << std::endl;
        
        // Test out-of-bounds
        // arr[10] = 100;  // This will throw an exception
    }
    catch (const std::out_of_range& e) {
        std::cout << "Exception: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### 2.7 Function Call Operator (())

```cpp
#include <iostream>
#include <cmath>

// Function object (functor) for calculating power
class Power {
private:
    double exponent;
    
public:
    Power(double exp = 2.0) : exponent(exp) {}
    
    // Function call operator
    double operator()(double base) const {
        return std::pow(base, exponent);
    }
};

int main() {
    // Create a functor to calculate square
    Power square;
    std::cout << "5 squared: " << square(5) << std::endl;
    
    // Create a functor to calculate cube
    Power cube(3.0);
    std::cout << "5 cubed: " << cube(5) << std::endl;
    
    // Use the functor directly
    std::cout << "2 to the power of 4: " << Power(4)(2) << std::endl;
    
    return 0;
}
```

## 3. Guidelines for Operator Overloading

1. **Maintain Intuitive Behavior**: Overloaded operators should behave similarly to built-in types.
2. **Return by Value vs. Reference**: Return by reference for operators that modify the object (+=, -=), return by value for binary operations (+, -).
3. **Member vs. Non-member**: Binary operators are often better as non-members, especially when the left operand could be a built-in type.
4. **Consistency**: Implement related operators together (if you implement ==, also implement !=).
5. **Always Check for Self-Assignment** in assignment operators to avoid unnecessary work and potential bugs.
6. **Consider Efficiency**: Optimize operator implementations, especially for frequent operations.

## 4. Operators That Cannot Be Overloaded

The following operators cannot be overloaded in C++:

- Scope resolution operator (::)
- Member selection operator (.)
- Member selection through pointer (->*)
- Ternary conditional operator (?:)
- sizeof operator
- typeid operator
- static_cast, dynamic_cast, const_cast, reinterpret_cast

## 5. When to Use Operator Overloading

- **User-defined types that represent mathematical entities**: Complex numbers, vectors, matrices
- **Container classes**: Arrays, lists, maps
- **Smart pointers**: Mimicking pointer behavior
- **Iterator classes**: Providing container traversal
- **String classes**: String concatenation, comparison
- **Date/Time classes**: Date arithmetic, comparisons

Remember that excessive or unintuitive operator overloading can make code harder to understand. Always strive for clarity and consistency. 
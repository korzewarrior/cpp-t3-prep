# C++ Object-Oriented Programming Basics

## 1. Creating Classes in C++

Classes are the foundation of object-oriented programming in C++. They provide a blueprint for objects.

### Basic Class Structure

```cpp
class ClassName {
private:
    // Private members (data and functions)
    // Only accessible within the class

protected:
    // Protected members
    // Accessible within the class and derived classes

public:
    // Public members
    // Accessible from anywhere
    
    // Constructor
    ClassName();
    
    // Destructor
    ~ClassName();
    
    // Member functions (methods)
    void memberFunction();
};
```

### Example: Creating a Simple Class

```cpp
#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    int id;
    double gpa;

public:
    // Constructor
    Student(std::string name, int id, double gpa) {
        this->name = name;
        this->id = id;
        this->gpa = gpa;
    }
    
    // Default constructor
    Student() {
        name = "Unknown";
        id = 0;
        gpa = 0.0;
    }
    
    // Getter methods
    std::string getName() const {
        return name;
    }
    
    int getId() const {
        return id;
    }
    
    double getGpa() const {
        return gpa;
    }
    
    // Setter methods
    void setName(std::string newName) {
        name = newName;
    }
    
    void setId(int newId) {
        id = newId;
    }
    
    void setGpa(double newGpa) {
        if (newGpa >= 0.0 && newGpa <= 4.0) {
            gpa = newGpa;
        } else {
            std::cout << "Invalid GPA value!" << std::endl;
        }
    }
    
    // Display method
    void display() const {
        std::cout << "Student: " << name << " (ID: " << id << ", GPA: " << gpa << ")" << std::endl;
    }
};

int main() {
    // Creating objects using the class
    Student student1("Alice Smith", 12345, 3.8);
    Student student2("Bob Jones", 67890, 3.5);
    Student student3; // Uses default constructor
    
    // Using object methods
    student1.display();
    student2.display();
    student3.display();
    
    // Modifying object data using setters
    student3.setName("Charlie Brown");
    student3.setId(11223);
    student3.setGpa(3.2);
    student3.display();
    
    return 0;
}
```

## 2. Instantiating Objects

### Stack vs. Heap Allocation

In C++, objects can be created either on the stack or on the heap.

#### Stack Allocation

Stack-allocated objects are automatically managed by the compiler. They are created and destroyed automatically when they go out of scope.

```cpp
void someFunction() {
    Student alice("Alice", 12345, 3.8); // Created on stack
    alice.display();
    
    // At the end of this function, 'alice' is automatically destroyed
}
```

#### Heap Allocation (using pointers and 'new')

Heap-allocated objects are created using the `new` operator and must be explicitly destroyed using the `delete` operator.

```cpp
void someFunction() {
    // Create student on the heap
    Student* bob = new Student("Bob", 67890, 3.5);
    bob->display(); // Use arrow operator for pointer
    
    // Must explicitly delete to avoid memory leaks
    delete bob;
}
```

### Key Differences

| Stack Allocation | Heap Allocation |
|------------------|-----------------|
| Faster allocation | Slower allocation |
| Size known at compile time | Size can be determined at runtime |
| Limited space | Larger memory space |
| Automatic cleanup | Manual cleanup required (delete) |
| Use dot (.) operator | Use arrow (->) operator |
| Objects have automatic lifetime | Objects persist until explicitly deleted |

## 3. Defining Methods (Member Functions)

### Inside the Class Definition

```cpp
class Rectangle {
private:
    double length;
    double width;
    
public:
    // Method defined inside the class
    double area() {
        return length * width;
    }
    
    // Method declaration only
    double perimeter();
    
    // Constructor
    Rectangle(double l, double w);
};
```

### Outside the Class Definition (using scope resolution operator)

```cpp
// Method implementation
double Rectangle::perimeter() {
    return 2 * (length + width);
}

// Constructor implementation
Rectangle::Rectangle(double l, double w) {
    length = l;
    width = w;
}
```

### Method Types

#### Accessors (Getters)

```cpp
double getLength() const { // 'const' indicates this method doesn't modify the object
    return length;
}
```

#### Mutators (Setters)

```cpp
void setLength(double l) {
    if (l > 0) {
        length = l;
    }
}
```

#### Constant Methods

The `const` keyword after a method declaration indicates that the method will not modify any member variables.

```cpp
void display() const {
    std::cout << "Length: " << length << ", Width: " << width << std::endl;
}
```

#### Static Methods

Static methods belong to the class rather than any specific object. They can be called without creating an object.

```cpp
class MathUtils {
public:
    static double square(double x) {
        return x * x;
    }
};

// Call without creating an object
double result = MathUtils::square(5.0);
```

## 4. Member Visibility

### Public Members

- Accessible from anywhere the object is visible
- Used for interface methods and public data

### Private Members

- Only accessible within the class itself
- Used for implementation details and data encapsulation

### Protected Members

- Accessible within the class and its derived classes
- Used for members that derived classes need to access

### Example

```cpp
class BankAccount {
private:
    // Only accessible within this class
    double balance;
    int accountNumber;
    
protected:
    // Accessible within this class and derived classes
    std::string accountType;
    double interestRate;
    
public:
    // Accessible from anywhere
    BankAccount(int accNum, double initialBalance);
    void deposit(double amount);
    bool withdraw(double amount);
    double getBalance() const;
};
```

## 5. Full Class Example with All Concepts

```cpp
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    
protected:
    std::string address;
    
public:
    // Constructors
    Person() : name("Unknown"), age(0), address("Unknown") {}
    
    Person(std::string name, int age, std::string address) {
        this->name = name;
        this->age = age;
        this->address = address;
    }
    
    // Destructor
    ~Person() {
        std::cout << "Person " << name << " is being destroyed." << std::endl;
    }
    
    // Accessor methods
    std::string getName() const {
        return name;
    }
    
    int getAge() const {
        return age;
    }
    
    std::string getAddress() const {
        return address;
    }
    
    // Mutator methods
    void setName(std::string newName) {
        name = newName;
    }
    
    void setAge(int newAge) {
        if (newAge >= 0 && newAge <= 120) {
            age = newAge;
        } else {
            std::cout << "Invalid age value!" << std::endl;
        }
    }
    
    void setAddress(std::string newAddress) {
        address = newAddress;
    }
    
    // Display method
    void display() const {
        std::cout << "Person: " << name << ", Age: " << age << ", Address: " << address << std::endl;
    }
    
    // Static method
    static int getCurrentYear() {
        return 2024;
    }
};

int main() {
    // Stack allocation
    Person person1("John Doe", 30, "123 Main St");
    person1.display();
    
    // Heap allocation
    Person* person2 = new Person("Jane Smith", 25, "456 Oak Ave");
    person2->display();
    
    // Using getters and setters
    std::cout << "Name: " << person1.getName() << std::endl;
    person1.setAge(31);
    person1.display();
    
    // Using static method
    std::cout << "Current year: " << Person::getCurrentYear() << std::endl;
    
    // Clean up heap allocation
    delete person2;
    
    return 0;
}
```

## Key Points to Remember

1. **Encapsulation**: Use private members to hide implementation details
2. **Class Design**: Keep classes focused on a single responsibility
3. **Memory Management**: Always delete heap-allocated objects to prevent memory leaks
4. **Const Correctness**: Use `const` for methods that don't modify the object
5. **Stack vs. Heap**: Prefer stack allocation when possible for automatic memory management
6. **Scope Resolution**: Use the `::` operator to define methods outside the class
7. **Access Control**: Use public, private, and protected appropriately to control access to class members 
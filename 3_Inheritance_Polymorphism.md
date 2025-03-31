# C++ Inheritance and Polymorphism

## 1. Inheritance Basics

Inheritance is a fundamental concept in object-oriented programming that allows a class (derived class) to inherit properties and behaviors from another class (base class).

### Basic Inheritance Syntax

```cpp
// Base class
class BaseClass {
    // members of the base class
};

// Derived class
class DerivedClass : public BaseClass {
    // additional members of the derived class
};
```

### Example: Simple Inheritance

```cpp
#include <iostream>
#include <string>

// Base class
class Vehicle {
protected:
    std::string brand;
    int year;
    
public:
    Vehicle(std::string brand, int year) : brand(brand), year(year) {}
    
    void honk() const {
        std::cout << "Beep! Beep!" << std::endl;
    }
    
    void displayInfo() const {
        std::cout << "Brand: " << brand << ", Year: " << year << std::endl;
    }
};

// Derived class
class Car : public Vehicle {
private:
    int numDoors;
    
public:
    Car(std::string brand, int year, int doors) 
        : Vehicle(brand, year), numDoors(doors) {}
    
    void displayCarInfo() const {
        displayInfo();
        std::cout << "Number of doors: " << numDoors << std::endl;
    }
};

int main() {
    // Create a Car object
    Car myCar("Toyota", 2022, 4);
    
    // Use methods from the base class
    myCar.honk();
    
    // Use method from the derived class
    myCar.displayCarInfo();
    
    return 0;
}
```

### Access Specifiers in Inheritance

The way members of the base class are inherited depends on the access specifier used in the inheritance declaration:

- **public inheritance**: 
  - Public members of the base class become public members of the derived class
  - Protected members of the base class become protected members of the derived class
  - Private members of the base class are not accessible directly in the derived class

- **protected inheritance**:
  - Public and protected members of the base class become protected members of the derived class
  - Private members of the base class are not accessible directly in the derived class

- **private inheritance**:
  - Public and protected members of the base class become private members of the derived class
  - Private members of the base class are not accessible directly in the derived class

```cpp
// Public inheritance
class Derived1 : public Base {};

// Protected inheritance
class Derived2 : protected Base {};

// Private inheritance
class Derived3 : private Base {};
```

## 2. Types of Relationships

### Is-A Relationship (Inheritance)

The "is-a" relationship is modeled through inheritance. It represents that a derived class is a specialized version of the base class.

```cpp
// Animal is the base class
class Animal {
public:
    void eat() { std::cout << "The animal eats food." << std::endl; }
    void breathe() { std::cout << "The animal breathes." << std::endl; }
};

// Dog "is-a" Animal
class Dog : public Animal {
public:
    void bark() { std::cout << "The dog barks." << std::endl; }
};

// Cat "is-a" Animal
class Cat : public Animal {
public:
    void meow() { std::cout << "The cat meows." << std::endl; }
};
```

In this example:
- A Dog "is-a" Animal
- A Cat "is-a" Animal

### Has-A Relationship (Composition)

The "has-a" relationship is modeled through composition. It represents that a class contains an instance of another class as a member.

```cpp
// Engine as a component
class Engine {
private:
    int horsepower;
    
public:
    Engine(int hp) : horsepower(hp) {}
    
    void start() { std::cout << "Engine started." << std::endl; }
    void stop() { std::cout << "Engine stopped." << std::endl; }
    int getHorsepower() const { return horsepower; }
};

// Car "has-a" Engine
class Car {
private:
    Engine engine;  // Car has an Engine component
    std::string brand;
    
public:
    Car(std::string brand, int hp) : engine(hp), brand(brand) {}
    
    void start() { 
        std::cout << brand << " car starting..." << std::endl;
        engine.start();
    }
    
    void stop() {
        std::cout << brand << " car stopping..." << std::endl;
        engine.stop();
    }
    
    void displayInfo() {
        std::cout << "Brand: " << brand << ", Horsepower: " << engine.getHorsepower() << std::endl;
    }
};
```

In this example:
- A Car "has-a" Engine (composition)

## 3. Type Casting in Inheritance

### Static Casting

`static_cast` is used for conversions between related classes, particularly up and down the inheritance hierarchy.

```cpp
#include <iostream>

class Base {
public:
    void baseFunction() { std::cout << "Base function" << std::endl; }
};

class Derived : public Base {
public:
    void derivedFunction() { std::cout << "Derived function" << std::endl; }
};

int main() {
    // Upcasting (implicit, doesn't require static_cast)
    Base* basePtr;
    Derived derived;
    basePtr = &derived;  // Implicit upcast is safe
    
    // Downcasting (requires explicit static_cast)
    Derived* derivedPtr = static_cast<Derived*>(basePtr);
    derivedPtr->derivedFunction();  // Safe because basePtr points to a Derived object
    
    // Caution: Incorrect downcasting can lead to undefined behavior
    Base baseObj;
    // Derived* badPtr = static_cast<Derived*>(&baseObj);  // Compiles but leads to undefined behavior
    
    return 0;
}
```

### Dynamic Casting

`dynamic_cast` is used for safe downcasting in polymorphic class hierarchies. It performs runtime type checking.

```cpp
#include <iostream>

class Base {
public:
    virtual ~Base() {}  // Virtual destructor makes this class polymorphic
    virtual void speak() { std::cout << "Base speaks" << std::endl; }
};

class Derived1 : public Base {
public:
    void speak() override { std::cout << "Derived1 speaks" << std::endl; }
    void derived1Function() { std::cout << "Derived1 function" << std::endl; }
};

class Derived2 : public Base {
public:
    void speak() override { std::cout << "Derived2 speaks" << std::endl; }
    void derived2Function() { std::cout << "Derived2 function" << std::endl; }
};

int main() {
    Base* basePtr1 = new Derived1();
    Base* basePtr2 = new Derived2();
    
    // Safe downcasting with dynamic_cast
    Derived1* derived1Ptr = dynamic_cast<Derived1*>(basePtr1);
    if (derived1Ptr) {
        std::cout << "Successfully cast to Derived1" << std::endl;
        derived1Ptr->derived1Function();
    } else {
        std::cout << "Failed to cast to Derived1" << std::endl;
    }
    
    // Attempt to cast basePtr2 to Derived1 (should fail)
    Derived1* wrongPtr = dynamic_cast<Derived1*>(basePtr2);
    if (wrongPtr) {
        std::cout << "Successfully cast to Derived1" << std::endl;
        wrongPtr->derived1Function();
    } else {
        std::cout << "Failed to cast to Derived1" << std::endl;
    }
    
    // Clean up
    delete basePtr1;
    delete basePtr2;
    
    return 0;
}
```

### Const Casting

`const_cast` is used to add or remove the const qualifier from a variable.

```cpp
#include <iostream>

void modifyData(int* data) {
    *data = 100;
}

int main() {
    const int constValue = 42;
    
    // Removing const qualifier (generally not recommended)
    int* nonConstPtr = const_cast<int*>(&constValue);
    *nonConstPtr = 50;  // Modifies the const variable (undefined behavior)
    
    std::cout << "constValue: " << constValue << std::endl;
    std::cout << "*nonConstPtr: " << *nonConstPtr << std::endl;
    
    // A more legitimate use case
    const int* constIntPtr = new int(10);
    // Cannot modify *constIntPtr directly
    // *constIntPtr = 20;  // Error
    
    // But if we know it's safe, we can use const_cast
    int* mutablePtr = const_cast<int*>(constIntPtr);
    *mutablePtr = 20;
    
    std::cout << "*constIntPtr: " << *constIntPtr << std::endl;
    
    delete constIntPtr;
    
    return 0;
}
```

## 4. Polymorphism

Polymorphism allows objects of different classes to be treated as objects of a common base class. In C++, polymorphism is primarily achieved through virtual functions.

### Virtual Functions

Virtual functions enable dynamic binding (runtime method resolution), allowing a derived class method to be called through a base class pointer.

```cpp
#include <iostream>
#include <string>

class Animal {
public:
    std::string name;
    
    Animal(std::string name) : name(name) {}
    
    // Virtual function
    virtual void makeSound() const {
        std::cout << name << " makes a generic sound." << std::endl;
    }
    
    // Non-virtual function
    void eat() const {
        std::cout << name << " eats food." << std::endl;
    }
};

class Dog : public Animal {
public:
    Dog(std::string name) : Animal(name) {}
    
    // Override the virtual function
    void makeSound() const override {
        std::cout << name << " barks: Woof! Woof!" << std::endl;
    }
};

class Cat : public Animal {
public:
    Cat(std::string name) : Animal(name) {}
    
    // Override the virtual function
    void makeSound() const override {
        std::cout << name << " meows: Meow!" << std::endl;
    }
};

int main() {
    Animal* animals[3];
    animals[0] = new Animal("Generic Animal");
    animals[1] = new Dog("Buddy");
    animals[2] = new Cat("Whiskers");
    
    for (int i = 0; i < 3; i++) {
        // Polymorphic call - the correct version is called based on the actual object type
        animals[i]->makeSound();
        
        // Non-polymorphic call - always calls Animal::eat()
        animals[i]->eat();
        
        std::cout << "-------------------" << std::endl;
    }
    
    // Clean up
    for (int i = 0; i < 3; i++) {
        delete animals[i];
    }
    
    return 0;
}
```

### Virtual Destructors

When using polymorphism, it's crucial to declare the base class destructor as virtual to ensure proper cleanup of derived objects.

```cpp
#include <iostream>

class Base {
public:
    Base() { std::cout << "Base constructor" << std::endl; }
    
    // Non-virtual destructor (problematic)
    ~Base() { std::cout << "Base destructor" << std::endl; }
};

class Derived : public Base {
private:
    int* data;
    
public:
    Derived() : Base() {
        std::cout << "Derived constructor" << std::endl;
        data = new int(100);
    }
    
    ~Derived() {
        std::cout << "Derived destructor" << std::endl;
        delete data;  // Clean up the allocated memory
    }
};

int main() {
    // Problem: When a derived object is deleted through a base pointer,
    // only the base class destructor is called if it's not virtual
    Base* ptr = new Derived();
    delete ptr;  // Only calls ~Base(), not ~Derived() - causes memory leak!
    
    return 0;
}
```

Correct implementation with virtual destructor:

```cpp
#include <iostream>

class Base {
public:
    Base() { std::cout << "Base constructor" << std::endl; }
    
    // Virtual destructor ensures derived destructor is called
    virtual ~Base() { std::cout << "Base destructor" << std::endl; }
};

class Derived : public Base {
private:
    int* data;
    
public:
    Derived() : Base() {
        std::cout << "Derived constructor" << std::endl;
        data = new int(100);
    }
    
    ~Derived() override {
        std::cout << "Derived destructor" << std::endl;
        delete data;  // Clean up the allocated memory
    }
};

int main() {
    // With virtual destructor, both ~Derived() and ~Base() are called
    Base* ptr = new Derived();
    delete ptr;  // Correctly calls ~Derived() then ~Base()
    
    return 0;
}
```

## 5. Method Overloading vs. Overriding

### Method Overloading

Method overloading involves defining multiple methods with the same name but different parameters within the same class.

```cpp
#include <iostream>
#include <string>

class Calculator {
public:
    // Overloaded methods with different parameter types
    int add(int a, int b) {
        std::cout << "Adding two integers" << std::endl;
        return a + b;
    }
    
    double add(double a, double b) {
        std::cout << "Adding two doubles" << std::endl;
        return a + b;
    }
    
    // Overloaded methods with different number of parameters
    int add(int a, int b, int c) {
        std::cout << "Adding three integers" << std::endl;
        return a + b + c;
    }
};

int main() {
    Calculator calc;
    
    std::cout << "5 + 3 = " << calc.add(5, 3) << std::endl;
    std::cout << "5.2 + 3.7 = " << calc.add(5.2, 3.7) << std::endl;
    std::cout << "5 + 3 + 2 = " << calc.add(5, 3, 2) << std::endl;
    
    return 0;
}
```

### Method Overriding

Method overriding occurs when a derived class provides a specific implementation for a method already defined in the base class.

```cpp
#include <iostream>

class Shape {
public:
    virtual double area() const {
        return 0.0;  // Default implementation
    }
    
    virtual void draw() const {
        std::cout << "Drawing a generic shape" << std::endl;
    }
};

class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    // Override area() method
    double area() const override {
        return 3.14159 * radius * radius;
    }
    
    // Override draw() method
    void draw() const override {
        std::cout << "Drawing a circle with radius " << radius << std::endl;
    }
};

class Rectangle : public Shape {
private:
    double width;
    double height;
    
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    
    // Override area() method
    double area() const override {
        return width * height;
    }
    
    // Override draw() method
    void draw() const override {
        std::cout << "Drawing a rectangle with width " << width 
                  << " and height " << height << std::endl;
    }
};

int main() {
    Shape* shapes[3];
    shapes[0] = new Shape();
    shapes[1] = new Circle(5.0);
    shapes[2] = new Rectangle(4.0, 6.0);
    
    for (int i = 0; i < 3; i++) {
        shapes[i]->draw();
        std::cout << "Area: " << shapes[i]->area() << std::endl;
        std::cout << "-------------------" << std::endl;
    }
    
    // Clean up
    for (int i = 0; i < 3; i++) {
        delete shapes[i];
    }
    
    return 0;
}
```

### Key Differences

| Method Overloading | Method Overriding |
|--------------------|-------------------|
| Same class | Base and derived classes |
| Different parameters | Same parameters |
| Resolved at compile time | Resolved at runtime (for virtual functions) |
| Not related to inheritance | Requires inheritance |
| Not polymorphic | Enables polymorphism |

## 6. Abstract Classes and Pure Virtual Functions

An abstract class is a class that cannot be instantiated and is designed to be inherited from. It contains at least one pure virtual function.

### Pure Virtual Functions

A pure virtual function is declared by assigning it to 0:

```cpp
virtual return_type function_name(parameters) = 0;
```

### Example: Abstract Class

```cpp
#include <iostream>
#include <string>
#include <vector>

// Abstract class
class Shape {
public:
    // Pure virtual functions
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual void draw() const = 0;
    
    // Regular virtual function with implementation
    virtual void displayInfo() const {
        std::cout << "Area: " << area() << std::endl;
        std::cout << "Perimeter: " << perimeter() << std::endl;
    }
    
    // Regular non-virtual function
    void moveToOrigin() {
        std::cout << "Moving shape to origin" << std::endl;
    }
    
    // Virtual destructor
    virtual ~Shape() {}
};

// Concrete derived class
class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    // Implement all pure virtual functions
    double area() const override {
        return 3.14159 * radius * radius;
    }
    
    double perimeter() const override {
        return 2 * 3.14159 * radius;
    }
    
    void draw() const override {
        std::cout << "Drawing circle with radius " << radius << std::endl;
    }
};

// Another concrete derived class
class Rectangle : public Shape {
private:
    double width;
    double height;
    
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    
    // Implement all pure virtual functions
    double area() const override {
        return width * height;
    }
    
    double perimeter() const override {
        return 2 * (width + height);
    }
    
    void draw() const override {
        std::cout << "Drawing rectangle with width " << width 
                  << " and height " << height << std::endl;
    }
};

int main() {
    // Shape shape;  // Error: Cannot instantiate an abstract class
    
    // Create derived objects
    Circle circle(5.0);
    Rectangle rectangle(4.0, 6.0);
    
    // Create a vector of shape pointers
    std::vector<Shape*> shapes;
    shapes.push_back(&circle);
    shapes.push_back(&rectangle);
    
    // Polymorphic calls
    for (Shape* shape : shapes) {
        shape->draw();
        shape->displayInfo();
        shape->moveToOrigin();
        std::cout << "-------------------" << std::endl;
    }
    
    return 0;
}
```

## 7. Complete Example: Inheritance and Polymorphism

This example demonstrates a more complex class hierarchy involving multiple levels of inheritance and polymorphism.

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>

// Base abstract class
class Employee {
protected:
    std::string name;
    int id;
    
public:
    Employee(const std::string& name, int id) : name(name), id(id) {}
    
    // Pure virtual function
    virtual double calculatePay() const = 0;
    
    // Virtual functions
    virtual void displayInfo() const {
        std::cout << "Employee ID: " << id << std::endl;
        std::cout << "Name: " << name << std::endl;
    }
    
    virtual std::string getJobTitle() const {
        return "Employee";
    }
    
    // Virtual destructor
    virtual ~Employee() {}
};

// Derived class
class SalariedEmployee : public Employee {
protected:
    double annualSalary;
    
public:
    SalariedEmployee(const std::string& name, int id, double salary)
        : Employee(name, id), annualSalary(salary) {}
    
    double calculatePay() const override {
        return annualSalary / 12.0;  // Monthly pay
    }
    
    void displayInfo() const override {
        Employee::displayInfo();
        std::cout << "Annual Salary: $" << annualSalary << std::endl;
        std::cout << "Monthly Pay: $" << calculatePay() << std::endl;
    }
    
    std::string getJobTitle() const override {
        return "Salaried Employee";
    }
};

// Another derived class
class HourlyEmployee : public Employee {
private:
    double hourlyRate;
    double hoursWorked;
    
public:
    HourlyEmployee(const std::string& name, int id, double rate, double hours)
        : Employee(name, id), hourlyRate(rate), hoursWorked(hours) {}
    
    double calculatePay() const override {
        double regularPay = std::min(40.0, hoursWorked) * hourlyRate;
        double overtimePay = std::max(0.0, hoursWorked - 40.0) * hourlyRate * 1.5;
        return regularPay + overtimePay;
    }
    
    void displayInfo() const override {
        Employee::displayInfo();
        std::cout << "Hourly Rate: $" << hourlyRate << std::endl;
        std::cout << "Hours Worked: " << hoursWorked << std::endl;
        std::cout << "Weekly Pay: $" << calculatePay() << std::endl;
    }
    
    std::string getJobTitle() const override {
        return "Hourly Employee";
    }
};

// Further derived class (multi-level inheritance)
class Manager : public SalariedEmployee {
private:
    double bonus;
    
public:
    Manager(const std::string& name, int id, double salary, double bonus)
        : SalariedEmployee(name, id, salary), bonus(bonus) {}
    
    double calculatePay() const override {
        return SalariedEmployee::calculatePay() + (bonus / 12.0);
    }
    
    void displayInfo() const override {
        SalariedEmployee::displayInfo();
        std::cout << "Monthly Bonus: $" << (bonus / 12.0) << std::endl;
        std::cout << "Total Monthly Pay: $" << calculatePay() << std::endl;
    }
    
    std::string getJobTitle() const override {
        return "Manager";
    }
};

// A utility function demonstrating polymorphism
void processEmployee(const Employee& emp) {
    std::cout << "Processing " << emp.getJobTitle() << "..." << std::endl;
    emp.displayInfo();
    std::cout << "-------------------" << std::endl;
}

int main() {
    // Create different types of employees
    SalariedEmployee alice("Alice Johnson", 101, 60000.0);
    HourlyEmployee bob("Bob Smith", 102, 20.0, 45.0);
    Manager charlie("Charlie Brown", 103, 80000.0, 12000.0);
    
    // Use the utility function with different employee types
    processEmployee(alice);
    processEmployee(bob);
    processEmployee(charlie);
    
    // Demonstrate polymorphism with a container
    std::vector<std::unique_ptr<Employee>> employees;
    employees.push_back(std::make_unique<SalariedEmployee>("David Wilson", 104, 55000.0));
    employees.push_back(std::make_unique<HourlyEmployee>("Eva Martinez", 105, 18.0, 40.0));
    employees.push_back(std::make_unique<Manager>("Frank Lee", 106, 90000.0, 15000.0));
    
    std::cout << "Employee List:" << std::endl;
    std::cout << "===================" << std::endl;
    
    for (const auto& emp : employees) {
        std::cout << emp->getJobTitle() << ": " << std::endl;
        emp->displayInfo();
        std::cout << "-------------------" << std::endl;
    }
    
    return 0;
}
```

## 8. Multiple Inheritance

Multiple inheritance allows a class to inherit from more than one base class. This is a powerful feature in C++, but it must be used carefully to avoid complexity and ambiguity issues.

### 8.1 Basic Syntax

```cpp
class Base1 {
    // Base1 members
};

class Base2 {
    // Base2 members
};

// Inheriting from multiple base classes
class Derived : public Base1, public Base2 {
    // Derived class members
};
```

### 8.2 Example of Multiple Inheritance

```cpp
#include <iostream>

class Vehicle {
protected:
    std::string manufacturer;
    int year;
    
public:
    Vehicle(std::string manufacturer, int year) 
        : manufacturer(manufacturer), year(year) {}
    
    void displayVehicleInfo() const {
        std::cout << "Manufacturer: " << manufacturer << ", Year: " << year << std::endl;
    }
};

class Engine {
protected:
    int horsepower;
    std::string fuelType;
    
public:
    Engine(int horsepower, std::string fuelType) 
        : horsepower(horsepower), fuelType(fuelType) {}
    
    void displayEngineInfo() const {
        std::cout << "Engine: " << horsepower << " HP, Fuel: " << fuelType << std::endl;
    }
};

// Car inherits from both Vehicle and Engine
class Car : public Vehicle, public Engine {
private:
    std::string model;
    int numDoors;
    
public:
    Car(std::string manufacturer, int year, 
        int horsepower, std::string fuelType,
        std::string model, int numDoors)
        : Vehicle(manufacturer, year), 
          Engine(horsepower, fuelType),
          model(model), numDoors(numDoors) {}
    
    void displayCarInfo() const {
        displayVehicleInfo();
        displayEngineInfo();
        std::cout << "Model: " << model << ", Doors: " << numDoors << std::endl;
    }
};

int main() {
    Car myCar("Toyota", 2023, 180, "Gasoline", "Camry", 4);
    myCar.displayCarInfo();
    
    return 0;
}
```

### 8.3 The Diamond Problem

One of the most significant challenges with multiple inheritance is the "diamond problem." This occurs when a class inherits from two classes that both inherit from a common base class.

```
    BaseClass
    /       \
 Derived1  Derived2
    \       /
     Derived3
```

In this scenario, Derived3 inherits two copies of BaseClass's members - one through Derived1 and another through Derived2. This causes ambiguity.

### 8.4 Solution: Virtual Inheritance

Virtual inheritance solves the diamond problem by ensuring only one instance of the base class exists in the inheritance hierarchy.

```cpp
#include <iostream>

class Animal {
protected:
    std::string name;
    
public:
    Animal(std::string name) : name(name) {}
    
    void eat() const {
        std::cout << name << " is eating." << std::endl;
    }
};

// Virtual inheritance
class Mammal : virtual public Animal {
public:
    Mammal(std::string name) : Animal(name) {}
    
    void breathe() const {
        std::cout << name << " breathes with lungs." << std::endl;
    }
};

// Virtual inheritance
class WingedAnimal : virtual public Animal {
public:
    WingedAnimal(std::string name) : Animal(name) {}
    
    void flap() const {
        std::cout << name << " flaps its wings." << std::endl;
    }
};

// Without virtual inheritance, this would have two Animal instances
class Bat : public Mammal, public WingedAnimal {
public:
    // Need to explicitly call the Animal constructor 
    // because of virtual inheritance
    Bat(std::string name) 
        : Animal(name), Mammal(name), WingedAnimal(name) {}
    
    void sleep() const {
        std::cout << name << " sleeps upside down." << std::endl;
    }
};

int main() {
    Bat bat("Bruce");
    bat.eat();      // From Animal
    bat.breathe();  // From Mammal
    bat.flap();     // From WingedAnimal
    bat.sleep();    // From Bat
    
    return 0;
}
```

### 8.5 Guidelines for Using Multiple Inheritance

1. **Use sparingly**: Multiple inheritance can increase complexity.
2. **Prefer composition over inheritance** when possible.
3. **Use virtual inheritance** when inheriting from multiple classes that share a common base class.
4. **Be cautious with method name collisions** across different base classes.
5. **Explicitly qualify ambiguous method calls** with the base class name when necessary:

```cpp
// If both Base1 and Base2 have a method called display()
Derived d;
d.Base1::display();  // Call display() from Base1
d.Base2::display();  // Call display() from Base2
```

### 8.6 Common Applications of Multiple Inheritance

1. **Interface implementation**: A class can inherit from multiple abstract base classes (interfaces).
2. **Mixin classes**: Small, focused classes that each provide a specific feature.
3. **Model complex real-world relationships**: Some domain models naturally fit a multiple inheritance structure.

Multiple inheritance is a powerful tool in C++ that should be used judiciously and with awareness of potential pitfalls. 
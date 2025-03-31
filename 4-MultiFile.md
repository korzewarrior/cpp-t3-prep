# Organizing C++ Classes Across Multiple Files

## 1. Why Use Multiple Files?

Organizing C++ code across multiple files provides several benefits:

1. **Improved Code Organization**: Separating declaration and implementation helps organize code logically
2. **Reduced Compilation Time**: Changes to implementation don't require recompiling all code that uses the class
3. **Reusability**: Classes can be easily reused in other projects
4. **Encapsulation**: Interface (declaration) can be separated from implementation details
5. **Modularity**: Promotes better design and separation of concerns

## 2. Basic Structure: Header and Implementation Files

In C++, a class is typically split into two files:

1. **Header file (.h or .hpp)**: Contains the class declaration, including member variables and method declarations
2. **Implementation file (.cpp)**: Contains the implementation of the methods declared in the header

### Example: A Simple Class in Multiple Files

#### Person.h (Header File)
```cpp
// Header guard to prevent multiple inclusions
#ifndef PERSON_H
#define PERSON_H

#include <string>

class Person {
private:
    std::string name;
    int age;

public:
    // Constructors
    Person();
    Person(const std::string& name, int age);
    
    // Accessor methods
    std::string getName() const;
    int getAge() const;
    
    // Mutator methods
    void setName(const std::string& name);
    void setAge(int age);
    
    // Other methods
    void display() const;
};

#endif // PERSON_H
```

#### Person.cpp (Implementation File)
```cpp
#include "Person.h"  // Include the header file
#include <iostream>

// Constructor implementations
Person::Person() : name("Unknown"), age(0) {
}

Person::Person(const std::string& name, int age) : name(name), age(age) {
}

// Accessor method implementations
std::string Person::getName() const {
    return name;
}

int Person::getAge() const {
    return age;
}

// Mutator method implementations
void Person::setName(const std::string& name) {
    this->name = name;
}

void Person::setAge(int age) {
    if (age >= 0 && age <= 120) {
        this->age = age;
    } else {
        std::cerr << "Invalid age value!" << std::endl;
    }
}

// Other method implementations
void Person::display() const {
    std::cout << "Name: " << name << ", Age: " << age << std::endl;
}
```

#### main.cpp (Client Code)
```cpp
#include <iostream>
#include "Person.h"

int main() {
    // Create Person objects
    Person p1;
    Person p2("Alice", 30);
    
    // Use the objects
    p1.setName("Bob");
    p1.setAge(25);
    
    p1.display();
    p2.display();
    
    return 0;
}
```

## 3. Header Guards

Header guards prevent multiple inclusions of the same header file, which can cause redefinition errors.

### Traditional Preprocessor Guards

```cpp
#ifndef HEADER_NAME_H
#define HEADER_NAME_H

// Header content goes here

#endif // HEADER_NAME_H
```

### Modern Pragma Once (Supported by most compilers)

```cpp
#pragma once

// Header content goes here
```

Both achieve the same goal, but `#pragma once` is more concise. However, traditional guards are more portable.

## 4. Forward Declarations

Forward declarations can be used to minimize header dependencies.

```cpp
// Forward declaration
class AnotherClass;

class MyClass {
private:
    AnotherClass* ptr;  // Using pointer doesn't require complete definition
    
public:
    void someMethod(AnotherClass* obj);  // Only needs pointer, not complete definition
};
```

Instead of including the full header for `AnotherClass`, we just inform the compiler that it exists. This reduces compile dependencies.

## 5. Working with Multiple Classes

### Example: Class Relationships Across Files

#### Address.h
```cpp
#ifndef ADDRESS_H
#define ADDRESS_H

#include <string>

class Address {
private:
    std::string street;
    std::string city;
    std::string state;
    std::string zipCode;
    
public:
    Address();
    Address(const std::string& street, const std::string& city, 
            const std::string& state, const std::string& zipCode);
            
    std::string getFullAddress() const;
    
    // Getters and setters
    std::string getStreet() const;
    void setStreet(const std::string& street);
    
    std::string getCity() const;
    void setCity(const std::string& city);
    
    std::string getState() const;
    void setState(const std::string& state);
    
    std::string getZipCode() const;
    void setZipCode(const std::string& zipCode);
};

#endif // ADDRESS_H
```

#### Address.cpp
```cpp
#include "Address.h"

Address::Address() : street(""), city(""), state(""), zipCode("") {
}

Address::Address(const std::string& street, const std::string& city,
                const std::string& state, const std::string& zipCode)
    : street(street), city(city), state(state), zipCode(zipCode) {
}

std::string Address::getFullAddress() const {
    return street + "\n" + city + ", " + state + " " + zipCode;
}

// Getters and setters implementation
std::string Address::getStreet() const { return street; }
void Address::setStreet(const std::string& street) { this->street = street; }

std::string Address::getCity() const { return city; }
void Address::setCity(const std::string& city) { this->city = city; }

std::string Address::getState() const { return state; }
void Address::setState(const std::string& state) { this->state = state; }

std::string Address::getZipCode() const { return zipCode; }
void Address::setZipCode(const std::string& zipCode) { this->zipCode = zipCode; }
```

#### Employee.h
```cpp
#ifndef EMPLOYEE_H
#define EMPLOYEE_H

#include <string>
#include "Address.h"  // Include Address header because we use it directly

class Employee {
private:
    std::string name;
    int id;
    double salary;
    Address homeAddress;  // Using Address class
    
public:
    Employee();
    Employee(const std::string& name, int id, double salary, const Address& address);
    
    void displayInfo() const;
    void giveRaise(double percentage);
    
    // Getters and setters
    std::string getName() const;
    void setName(const std::string& name);
    
    int getId() const;
    void setId(int id);
    
    double getSalary() const;
    void setSalary(double salary);
    
    Address getAddress() const;
    void setAddress(const Address& address);
};

#endif // EMPLOYEE_H
```

#### Employee.cpp
```cpp
#include "Employee.h"
#include <iostream>

Employee::Employee() : name(""), id(0), salary(0.0) {
}

Employee::Employee(const std::string& name, int id, double salary, const Address& address)
    : name(name), id(id), salary(salary), homeAddress(address) {
}

void Employee::displayInfo() const {
    std::cout << "Employee ID: " << id << std::endl;
    std::cout << "Name: " << name << std::endl;
    std::cout << "Salary: $" << salary << std::endl;
    std::cout << "Address: " << std::endl << homeAddress.getFullAddress() << std::endl;
}

void Employee::giveRaise(double percentage) {
    if (percentage > 0) {
        salary += salary * (percentage / 100.0);
        std::cout << name << " received a " << percentage << "% raise." << std::endl;
    }
}

// Getters and setters implementation
std::string Employee::getName() const { return name; }
void Employee::setName(const std::string& name) { this->name = name; }

int Employee::getId() const { return id; }
void Employee::setId(int id) { this->id = id; }

double Employee::getSalary() const { return salary; }
void Employee::setSalary(double salary) { this->salary = salary; }

Address Employee::getAddress() const { return homeAddress; }
void Employee::setAddress(const Address& address) { homeAddress = address; }
```

#### Main.cpp
```cpp
#include <iostream>
#include "Employee.h"
#include "Address.h"

int main() {
    // Create an address
    Address addr("123 Main St", "Anytown", "CA", "12345");
    
    // Create an employee with the address
    Employee emp("John Doe", 1001, 50000.0, addr);
    
    // Display employee information
    emp.displayInfo();
    
    // Give the employee a raise
    emp.giveRaise(10.0);
    
    // Display updated information
    emp.displayInfo();
    
    return 0;
}
```

## 6. Circular Dependencies

Circular dependencies occur when two or more classes depend on each other. This can be resolved using forward declarations.

### Example: Circular Dependency

#### Teacher.h
```cpp
#ifndef TEACHER_H
#define TEACHER_H

#include <string>
#include <vector>

// Forward declaration
class Student;

class Teacher {
private:
    std::string name;
    std::vector<Student*> students;  // Only using pointers, so forward declaration is enough
    
public:
    Teacher(const std::string& name);
    
    void addStudent(Student* student);
    void displayStudents() const;
    std::string getName() const;
};

#endif // TEACHER_H
```

#### Student.h
```cpp
#ifndef STUDENT_H
#define STUDENT_H

#include <string>
#include <vector>

// Forward declaration
class Teacher;

class Student {
private:
    std::string name;
    std::vector<Teacher*> teachers;  // Only using pointers, so forward declaration is enough
    
public:
    Student(const std::string& name);
    
    void addTeacher(Teacher* teacher);
    void displayTeachers() const;
    std::string getName() const;
};

#endif // STUDENT_H
```

#### Teacher.cpp
```cpp
#include "Teacher.h"
#include "Student.h"  // Need the full definition for implementation
#include <iostream>

Teacher::Teacher(const std::string& name) : name(name) {
}

void Teacher::addStudent(Student* student) {
    students.push_back(student);
}

void Teacher::displayStudents() const {
    std::cout << "Teacher " << name << " has students:" << std::endl;
    for (const auto& student : students) {
        std::cout << "- " << student->getName() << std::endl;
    }
}

std::string Teacher::getName() const {
    return name;
}
```

#### Student.cpp
```cpp
#include "Student.h"
#include "Teacher.h"  // Need the full definition for implementation
#include <iostream>

Student::Student(const std::string& name) : name(name) {
}

void Student::addTeacher(Teacher* teacher) {
    teachers.push_back(teacher);
}

void Student::displayTeachers() const {
    std::cout << "Student " << name << " has teachers:" << std::endl;
    for (const auto& teacher : teachers) {
        std::cout << "- " << teacher->getName() << std::endl;
    }
}

std::string Student::getName() const {
    return name;
}
```

#### Main.cpp
```cpp
#include <iostream>
#include "Teacher.h"
#include "Student.h"

int main() {
    // Create teachers and students
    Teacher t1("Mr. Smith");
    Teacher t2("Mrs. Johnson");
    
    Student s1("Alice");
    Student s2("Bob");
    Student s3("Charlie");
    
    // Establish relationships
    t1.addStudent(&s1);
    t1.addStudent(&s2);
    
    t2.addStudent(&s2);
    t2.addStudent(&s3);
    
    s1.addTeacher(&t1);
    s2.addTeacher(&t1);
    s2.addTeacher(&t2);
    s3.addTeacher(&t2);
    
    // Display relationships
    t1.displayStudents();
    t2.displayStudents();
    
    s1.displayTeachers();
    s2.displayTeachers();
    s3.displayTeachers();
    
    return 0;
}
```

## 7. Best Practices for Multi-File Class Design

1. **Use Header Guards**: Always use header guards or `#pragma once` to prevent multiple inclusions.

2. **Minimize Header Dependencies**: Include only what's necessary in headers.
   ```cpp
   // In header files, prefer forward declarations when possible
   class MyClass;  // Forward declaration
   
   // In implementation files, include the full header
   #include "MyClass.h"
   ```

3. **Don't Define Variables in Headers**: Avoid defining non-const static variables in headers.
   ```cpp
   // Bad (in header)
   int globalVar = 42;  // Creates multiple definitions
   
   // Good (in header)
   extern int globalVar;  // Just a declaration
   
   // Good (in .cpp file)
   int globalVar = 42;  // Definition
   ```

4. **Use Include Guards**: Always use header guards or `#pragma once`.

5. **Follow Standard File Extension Conventions**:
   - `.h` or `.hpp` for headers
   - `.cpp` for implementations

6. **Keep Headers Self-Contained**: A header should compile on its own.

7. **Use Forward Declarations** to break circular dependencies.

8. **Include What You Use (IWYU)**: Each file should include headers for all the symbols it uses directly.

## 8. Building Multi-File Projects

### Using g++ Directly

```bash
# Compile individual files to object files
g++ -c Person.cpp -o Person.o
g++ -c main.cpp -o main.o

# Link object files into executable
g++ Person.o main.o -o program

# Run the program
./program
```

### Using a Makefile

```makefile
# Makefile example

CXX = g++
CXXFLAGS = -Wall -std=c++17

SOURCES = Person.cpp Employee.cpp Address.cpp main.cpp
OBJECTS = $(SOURCES:.cpp=.o)
EXECUTABLE = program

all: $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CXX) $(OBJECTS) -o $@

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f $(OBJECTS) $(EXECUTABLE)
```

Then run:
```bash
make        # Build the program
./program   # Run the program
make clean  # Clean up object files and executable
```

### Using CMake

CMake is a more advanced build system generator. Create a `CMakeLists.txt` file:

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(program
    Person.cpp
    Employee.cpp
    Address.cpp
    main.cpp
)
```

Then build and run:
```bash
mkdir build
cd build
cmake ..
make
./program
```

## 9. Complete Example: Banking System

### Account.h
```cpp
#ifndef ACCOUNT_H
#define ACCOUNT_H

#include <string>

class Account {
private:
    std::string accountNumber;
    std::string accountHolder;
    double balance;
    
public:
    Account(const std::string& number, const std::string& holder, double initialBalance = 0.0);
    
    // Basic operations
    bool deposit(double amount);
    bool withdraw(double amount);
    double getBalance() const;
    
    // Accessors
    std::string getAccountNumber() const;
    std::string getAccountHolder() const;
    
    // Display
    virtual void displayDetails() const;
    
    // Virtual destructor
    virtual ~Account() {}
};

#endif // ACCOUNT_H
```

### Account.cpp
```cpp
#include "Account.h"
#include <iostream>
#include <iomanip>

Account::Account(const std::string& number, const std::string& holder, double initialBalance)
    : accountNumber(number), accountHolder(holder), balance(initialBalance) {
}

bool Account::deposit(double amount) {
    if (amount > 0) {
        balance += amount;
        return true;
    }
    return false;
}

bool Account::withdraw(double amount) {
    if (amount > 0 && amount <= balance) {
        balance -= amount;
        return true;
    }
    return false;
}

double Account::getBalance() const {
    return balance;
}

std::string Account::getAccountNumber() const {
    return accountNumber;
}

std::string Account::getAccountHolder() const {
    return accountHolder;
}

void Account::displayDetails() const {
    std::cout << "Account Details:" << std::endl;
    std::cout << "Number: " << accountNumber << std::endl;
    std::cout << "Holder: " << accountHolder << std::endl;
    std::cout << "Balance: $" << std::fixed << std::setprecision(2) << balance << std::endl;
}
```

### SavingsAccount.h
```cpp
#ifndef SAVINGS_ACCOUNT_H
#define SAVINGS_ACCOUNT_H

#include "Account.h"

class SavingsAccount : public Account {
private:
    double interestRate;  // Annual interest rate in percentage
    
public:
    SavingsAccount(const std::string& number, const std::string& holder, 
                  double initialBalance = 0.0, double rate = 0.0);
    
    // Methods specific to savings account
    void addInterest();
    double getInterestRate() const;
    void setInterestRate(double rate);
    
    // Override display method
    void displayDetails() const override;
};

#endif // SAVINGS_ACCOUNT_H
```

### SavingsAccount.cpp
```cpp
#include "SavingsAccount.h"
#include <iostream>
#include <iomanip>

SavingsAccount::SavingsAccount(const std::string& number, const std::string& holder,
                             double initialBalance, double rate)
    : Account(number, holder, initialBalance), interestRate(rate) {
}

void SavingsAccount::addInterest() {
    // Calculate interest and add to balance
    double interest = getBalance() * (interestRate / 100.0);
    deposit(interest);
}

double SavingsAccount::getInterestRate() const {
    return interestRate;
}

void SavingsAccount::setInterestRate(double rate) {
    if (rate >= 0) {
        interestRate = rate;
    }
}

void SavingsAccount::displayDetails() const {
    Account::displayDetails();
    std::cout << "Account Type: Savings" << std::endl;
    std::cout << "Interest Rate: " << std::fixed << std::setprecision(2) 
              << interestRate << "%" << std::endl;
}
```

### CheckingAccount.h
```cpp
#ifndef CHECKING_ACCOUNT_H
#define CHECKING_ACCOUNT_H

#include "Account.h"

class CheckingAccount : public Account {
private:
    double transactionFee;
    
public:
    CheckingAccount(const std::string& number, const std::string& holder,
                   double initialBalance = 0.0, double fee = 0.0);
    
    // Override withdraw to include fee
    bool withdraw(double amount);
    
    // Accessors
    double getTransactionFee() const;
    void setTransactionFee(double fee);
    
    // Override display method
    void displayDetails() const override;
};

#endif // CHECKING_ACCOUNT_H
```

### CheckingAccount.cpp
```cpp
#include "CheckingAccount.h"
#include <iostream>
#include <iomanip>

CheckingAccount::CheckingAccount(const std::string& number, const std::string& holder,
                                double initialBalance, double fee)
    : Account(number, holder, initialBalance), transactionFee(fee) {
}

bool CheckingAccount::withdraw(double amount) {
    // Withdraw amount plus fee
    return Account::withdraw(amount + transactionFee);
}

double CheckingAccount::getTransactionFee() const {
    return transactionFee;
}

void CheckingAccount::setTransactionFee(double fee) {
    if (fee >= 0) {
        transactionFee = fee;
    }
}

void CheckingAccount::displayDetails() const {
    Account::displayDetails();
    std::cout << "Account Type: Checking" << std::endl;
    std::cout << "Transaction Fee: $" << std::fixed << std::setprecision(2)
              << transactionFee << std::endl;
}
```

### Bank.h
```cpp
#ifndef BANK_H
#define BANK_H

#include <string>
#include <vector>
#include <memory>
#include "Account.h"

class Bank {
private:
    std::string name;
    std::vector<std::shared_ptr<Account>> accounts;
    
public:
    Bank(const std::string& name);
    
    void addAccount(std::shared_ptr<Account> account);
    std::shared_ptr<Account> findAccount(const std::string& accountNumber);
    void displayAllAccounts() const;
    
    std::string getName() const;
};

#endif // BANK_H
```

### Bank.cpp
```cpp
#include "Bank.h"
#include <iostream>

Bank::Bank(const std::string& name) : name(name) {
}

void Bank::addAccount(std::shared_ptr<Account> account) {
    accounts.push_back(account);
}

std::shared_ptr<Account> Bank::findAccount(const std::string& accountNumber) {
    for (auto& account : accounts) {
        if (account->getAccountNumber() == accountNumber) {
            return account;
        }
    }
    return nullptr;  // Account not found
}

void Bank::displayAllAccounts() const {
    std::cout << "Accounts at " << name << ":" << std::endl;
    std::cout << "========================================" << std::endl;
    
    for (const auto& account : accounts) {
        account->displayDetails();
        std::cout << "----------------------------------------" << std::endl;
    }
}

std::string Bank::getName() const {
    return name;
}
```

### Main.cpp
```cpp
#include <iostream>
#include <memory>
#include "Account.h"
#include "SavingsAccount.h"
#include "CheckingAccount.h"
#include "Bank.h"

int main() {
    // Create a bank
    Bank myBank("MyBank");
    
    // Create accounts
    std::shared_ptr<Account> acc1 = std::make_shared<SavingsAccount>(
        "SAV001", "John Doe", 1000.0, 2.5);
        
    std::shared_ptr<Account> acc2 = std::make_shared<CheckingAccount>(
        "CHK001", "Jane Smith", 2000.0, 1.5);
    
    // Add accounts to the bank
    myBank.addAccount(acc1);
    myBank.addAccount(acc2);
    
    // Display all accounts
    myBank.displayAllAccounts();
    
    // Perform operations
    std::cout << "\nPerforming operations...\n" << std::endl;
    
    // Get account
    auto savingsAcc = std::dynamic_pointer_cast<SavingsAccount>(
        myBank.findAccount("SAV001"));
    
    if (savingsAcc) {
        // Deposit
        savingsAcc->deposit(500.0);
        std::cout << "Deposited $500 to savings account." << std::endl;
        
        // Add interest
        savingsAcc->addInterest();
        std::cout << "Added interest to savings account." << std::endl;
    }
    
    auto checkingAcc = std::dynamic_pointer_cast<CheckingAccount>(
        myBank.findAccount("CHK001"));
    
    if (checkingAcc) {
        // Withdraw (includes fee)
        checkingAcc->withdraw(300.0);
        std::cout << "Withdrew $300 (plus fee) from checking account." << std::endl;
    }
    
    // Display updated accounts
    std::cout << "\nUpdated account details:" << std::endl;
    myBank.displayAllAccounts();
    
    return 0;
}
```

## 10. Key Points to Remember

1. **Separation of Concerns**: Separate class declaration (interface) from implementation.

2. **Header File Organization**: 
   - Include necessary headers
   - Use header guards
   - Declare, but don't define non-inline methods

3. **Implementation File Organization**:
   - Include the corresponding header file
   - Define all methods
   - Use the scope resolution operator (::) for all method definitions

4. **Forward Declarations**: Use to minimize header dependencies and break circular dependencies.

5. **Compilation Process**:
   - Each `.cpp` file is compiled separately into an object file
   - Object files are linked together to create the executable

6. **Build Tools**: Use makefiles, CMake, or IDE build systems to manage the compilation process. 
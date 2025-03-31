# C++ Input/Output (I/O) Operations

## 1. Console Input/Output

C++ provides I/O facilities through the `iostream` library, which includes standard input/output stream objects.

### Console Output with `std::cout`

```cpp
#include <iostream>

int main() {
    // Basic output
    std::cout << "Hello, World!" << std::endl;
    
    // Output with multiple items
    std::string name = "Alice";
    int age = 25;
    std::cout << "Name: " << name << ", Age: " << age << std::endl;
    
    // Output with numeric formatting
    double pi = 3.14159265359;
    std::cout << "Pi: " << pi << std::endl;         // Default precision
    
    return 0;
}
```

### Console Input with `std::cin`

```cpp
#include <iostream>
#include <string>

int main() {
    // Input integer
    int number;
    std::cout << "Enter a number: ";
    std::cin >> number;
    std::cout << "You entered: " << number << std::endl;
    
    // Input string
    std::string name;
    std::cout << "Enter your name: ";
    std::cin >> name;  // Note: This only reads until the first whitespace
    std::cout << "Hello, " << name << "!" << std::endl;
    
    // Clearing input buffer
    std::cin.ignore(10000, '\n');  // Clear any remaining input (up to 10000 chars or until newline)
    
    // Reading a line with spaces
    std::string fullName;
    std::cout << "Enter your full name: ";
    std::getline(std::cin, fullName);
    std::cout << "Hello, " << fullName << "!" << std::endl;
    
    return 0;
}
```

### Input Validation

```cpp
#include <iostream>
#include <limits>

int main() {
    int age;
    bool validInput = false;
    
    while (!validInput) {
        std::cout << "Enter your age (0-120): ";
        
        // Check if input is an integer
        if (std::cin >> age) {
            // Check if age is in valid range
            if (age >= 0 && age <= 120) {
                validInput = true;
            } else {
                std::cout << "Invalid age. Please enter a value between 0 and 120." << std::endl;
            }
        } else {
            // Clear error flags
            std::cin.clear();
            // Ignore bad input
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            std::cout << "Invalid input. Please enter a numeric value." << std::endl;
        }
    }
    
    std::cout << "Your age is: " << age << std::endl;
    
    return 0;
}
```

## 2. Formatted Output

### Manipulating Output Format

```cpp
#include <iostream>
#include <iomanip>  // Required for stream manipulators

int main() {
    double value = 123.456789;
    
    // Setting precision (number of digits)
    std::cout << "Default: " << value << std::endl;
    std::cout << "Precision 3: " << std::setprecision(3) << value << std::endl;
    std::cout << "Precision 6: " << std::setprecision(6) << value << std::endl;
    
    // Fixed precision (digits after decimal point)
    std::cout << "Fixed with 2 decimals: " << std::fixed << std::setprecision(2) << value << std::endl;
    
    // Scientific notation
    std::cout << "Scientific: " << std::scientific << value << std::endl;
    
    // Reset to default
    std::cout.unsetf(std::ios::fixed | std::ios::scientific);
    std::cout << std::setprecision(6);
    
    // Field width and alignment
    std::cout << "Left aligned: |" << std::left << std::setw(15) << 123 << "|" << std::endl;
    std::cout << "Right aligned: |" << std::right << std::setw(15) << 123 << "|" << std::endl;
    
    // Fill character
    std::cout << "With fill: |" << std::setfill('*') << std::setw(15) << 123 << "|" << std::endl;
    
    // Integer bases
    int num = 255;
    std::cout << "Decimal: " << std::dec << num << std::endl;
    std::cout << "Hexadecimal: 0x" << std::hex << num << std::endl;
    std::cout << "Octal: 0" << std::oct << num << std::endl;
    
    return 0;
}
```

## 3. File Input/Output

### Writing to a File with `std::ofstream`

```cpp
#include <iostream>
#include <fstream>  // Required for file streams
#include <string>

int main() {
    // Create and open a file for writing
    std::ofstream outputFile("example.txt");
    
    // Check if file opened successfully
    if (!outputFile.is_open()) {
        std::cerr << "Error: Could not open file for writing." << std::endl;
        return 1;
    }
    
    // Write to the file
    outputFile << "This is the first line of text." << std::endl;
    outputFile << "This is the second line of text." << std::endl;
    
    // Write numerical data
    int num = 42;
    double pi = 3.14159;
    outputFile << "Number: " << num << ", Pi: " << pi << std::endl;
    
    // Close the file
    outputFile.close();
    
    std::cout << "Data written to file successfully." << std::endl;
    return 0;
}
```

### Reading from a File with `std::ifstream`

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Open file for reading
    std::ifstream inputFile("example.txt");
    
    // Check if file opened successfully
    if (!inputFile.is_open()) {
        std::cerr << "Error: Could not open file for reading." << std::endl;
        return 1;
    }
    
    // Read file line by line
    std::string line;
    std::cout << "File contents:" << std::endl;
    
    while (std::getline(inputFile, line)) {
        std::cout << line << std::endl;
    }
    
    // Close the file
    inputFile.close();
    
    return 0;
}
```

### Reading Specific Data Types

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Create and write a file with mixed data
    {
        std::ofstream outFile("data.txt");
        outFile << "John 25 1.75" << std::endl;
        outFile << "Mary 30 1.65" << std::endl;
        outFile << "Bob 22 1.82" << std::endl;
        outFile.close();
    }
    
    // Open file for reading
    std::ifstream inFile("data.txt");
    
    if (!inFile.is_open()) {
        std::cerr << "Error: Could not open file." << std::endl;
        return 1;
    }
    
    // Read specific data types from each line
    std::string name;
    int age;
    double height;
    
    std::cout << "Parsed data:" << std::endl;
    std::cout << "---------------------------" << std::endl;
    std::cout << "Name\tAge\tHeight" << std::endl;
    std::cout << "---------------------------" << std::endl;
    
    while (inFile >> name >> age >> height) {
        std::cout << name << "\t" << age << "\t" << height << std::endl;
    }
    
    inFile.close();
    
    return 0;
}
```

### Binary File I/O

```cpp
#include <iostream>
#include <fstream>
#include <string>

struct Person {
    char name[50];
    int age;
    double height;
};

int main() {
    // Create a Person object
    Person person1;
    strcpy(person1.name, "Alice Johnson");
    person1.age = 28;
    person1.height = 1.68;
    
    // Write binary data to file
    std::ofstream outFile("person.bin", std::ios::binary);
    
    if (!outFile.is_open()) {
        std::cerr << "Error: Could not open file for writing." << std::endl;
        return 1;
    }
    
    outFile.write(reinterpret_cast<char*>(&person1), sizeof(Person));
    outFile.close();
    
    // Read binary data from file
    Person person2;
    std::ifstream inFile("person.bin", std::ios::binary);
    
    if (!inFile.is_open()) {
        std::cerr << "Error: Could not open file for reading." << std::endl;
        return 1;
    }
    
    inFile.read(reinterpret_cast<char*>(&person2), sizeof(Person));
    inFile.close();
    
    // Display read data
    std::cout << "Data read from binary file:" << std::endl;
    std::cout << "Name: " << person2.name << std::endl;
    std::cout << "Age: " << person2.age << std::endl;
    std::cout << "Height: " << person2.height << std::endl;
    
    return 0;
}
```

## 4. File Positioning and Status

### File Positioning

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Create a file with some content
    std::ofstream outFile("position_test.txt");
    outFile << "Line 1: This is the first line of text." << std::endl;
    outFile << "Line 2: This is the second line of text." << std::endl;
    outFile << "Line 3: This is the third line of text." << std::endl;
    outFile.close();
    
    // Open file for reading and writing
    std::fstream file("position_test.txt", std::ios::in | std::ios::out);
    
    if (!file.is_open()) {
        std::cerr << "Error: Could not open file." << std::endl;
        return 1;
    }
    
    // Get current position
    std::streampos initialPos = file.tellg();
    std::cout << "Initial position: " << initialPos << std::endl;
    
    // Read first line
    std::string line;
    std::getline(file, line);
    std::cout << "First line: " << line << std::endl;
    
    // Get new position after reading
    std::streampos afterFirstLine = file.tellg();
    std::cout << "Position after reading first line: " << afterFirstLine << std::endl;
    
    // Move to the beginning of the file
    file.seekg(0, std::ios::beg);
    std::getline(file, line);
    std::cout << "After seeking to beginning: " << line << std::endl;
    
    // Move to a specific position (beginning of third line)
    // Need to count byte position - in this case assuming we know it
    file.seekg(104, std::ios::beg);  // Position may vary depending on line endings
    std::getline(file, line);
    std::cout << "After seeking to position: " << line << std::endl;
    
    // Move relative to current position
    file.seekg(-20, std::ios::cur);
    std::getline(file, line);
    std::cout << "After seeking relative to current: " << line << std::endl;
    
    // Move to end and then back
    file.seekg(0, std::ios::end);
    std::streampos endPos = file.tellg();
    std::cout << "End position: " << endPos << std::endl;
    
    file.seekg(-10, std::ios::end);
    std::getline(file, line);
    std::cout << "After seeking from end: " << line << std::endl;
    
    file.close();
    
    return 0;
}
```

### File Status and Error Handling

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Try to open a non-existent file
    std::ifstream file("non_existent_file.txt");
    
    // Check file state
    if (!file) {
        std::cerr << "Failed to open file" << std::endl;
        
        // Check specific error states
        if (file.fail()) {
            std::cerr << "Error: failbit is set" << std::endl;
        }
        
        if (file.bad()) {
            std::cerr << "Error: badbit is set" << std::endl;
        }
        
        if (file.eof()) {
            std::cerr << "Error: eofbit is set" << std::endl;
        }
    }
    
    // Create and write to a new file
    std::ofstream outFile("test_status.txt");
    outFile << "Testing file status" << std::endl;
    outFile.close();
    
    // Open the file again
    std::ifstream inFile("test_status.txt");
    
    if (inFile.is_open()) {
        std::cout << "File opened successfully" << std::endl;
        
        // Read until end of file
        std::string line;
        while (std::getline(inFile, line)) {
            std::cout << "Read: " << line << std::endl;
        }
        
        // Check for EOF
        if (inFile.eof()) {
            std::cout << "Reached end of file" << std::endl;
        }
        
        // Clear the EOF flag
        inFile.clear();
        
        // Go back to beginning
        inFile.seekg(0, std::ios::beg);
        
        // Read again
        std::getline(inFile, line);
        std::cout << "After clearing flags and seeking: " << line << std::endl;
        
        inFile.close();
    }
    
    return 0;
}
```

## 5. Common I/O Issues and Solutions

### Problem: Input with Spaces

When using `std::cin >> variable`, input is read only until the first whitespace character.

**Solution:** Use `std::getline()` to read entire lines.

```cpp
std::string fullName;
std::cout << "Enter your full name: ";
std::getline(std::cin, fullName);
```

### Problem: Mixing Line and Token Input

When mixing `std::cin >>` with `std::getline()`, the newline character from previous input might be read by `getline()`.

**Solution:** Clear the input buffer before using `getline()`.

```cpp
int age;
std::cout << "Enter your age: ";
std::cin >> age;

std::cin.ignore(10000, '\n');  // Clear the input buffer

std::string fullName;
std::cout << "Enter your full name: ";
std::getline(std::cin, fullName);
```

### Problem: Checking for File Open Success

**Solution:** Always check if a file was opened successfully before reading/writing.

```cpp
std::ifstream file("data.txt");
if (!file.is_open()) {
    std::cerr << "Error: Could not open file." << std::endl;
    return 1;
}
```

### Problem: Binary vs. Text Mode

**Solution:** Specify the appropriate mode when opening files.

```cpp
// Text mode (default)
std::ofstream textFile("data.txt");

// Binary mode
std::ofstream binaryFile("data.bin", std::ios::binary);
```

## 6. Complete Example: Student Records System

This example combines console I/O and file I/O to create a simple student records system.

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iomanip>

struct Student {
    std::string name;
    int id;
    double gpa;
};

// Function to display a student record
void displayStudent(const Student& student) {
    std::cout << std::left << std::setw(20) << student.name 
              << std::right << std::setw(8) << student.id 
              << std::setw(8) << std::fixed << std::setprecision(2) << student.gpa 
              << std::endl;
}

// Function to display all student records
void displayAllStudents(const std::vector<Student>& students) {
    std::cout << "\n===== Student Records =====" << std::endl;
    std::cout << std::left << std::setw(20) << "Name" 
              << std::right << std::setw(8) << "ID" 
              << std::setw(8) << "GPA" 
              << std::endl;
    std::cout << "-----------------------------------" << std::endl;
    
    for (const auto& student : students) {
        displayStudent(student);
    }
    
    std::cout << "-----------------------------------" << std::endl;
}

// Function to add a new student
Student addStudent() {
    Student student;
    
    std::cout << "\nAdding a new student:" << std::endl;
    
    std::cout << "Enter name: ";
    std::cin.ignore();  // Clear buffer
    std::getline(std::cin, student.name);
    
    std::cout << "Enter ID: ";
    std::cin >> student.id;
    
    std::cout << "Enter GPA: ";
    std::cin >> student.gpa;
    
    return student;
}

// Function to save students to a file
void saveToFile(const std::vector<Student>& students, const std::string& filename) {
    std::ofstream outFile(filename);
    
    if (!outFile.is_open()) {
        std::cerr << "Error: Could not open file for writing: " << filename << std::endl;
        return;
    }
    
    for (const auto& student : students) {
        outFile << student.name << "," << student.id << "," << student.gpa << std::endl;
    }
    
    outFile.close();
    std::cout << "Data saved to " << filename << " successfully." << std::endl;
}

// Function to load students from a file
std::vector<Student> loadFromFile(const std::string& filename) {
    std::vector<Student> students;
    std::ifstream inFile(filename);
    
    if (!inFile.is_open()) {
        std::cerr << "Warning: Could not open file for reading: " << filename << std::endl;
        return students;
    }
    
    std::string line;
    while (std::getline(inFile, line)) {
        size_t pos1 = line.find(",");
        size_t pos2 = line.find(",", pos1 + 1);
        
        if (pos1 != std::string::npos && pos2 != std::string::npos) {
            Student student;
            student.name = line.substr(0, pos1);
            student.id = std::stoi(line.substr(pos1 + 1, pos2 - pos1 - 1));
            student.gpa = std::stod(line.substr(pos2 + 1));
            students.push_back(student);
        }
    }
    
    inFile.close();
    std::cout << "Loaded " << students.size() << " student records from " << filename << std::endl;
    
    return students;
}

int main() {
    const std::string FILENAME = "students.csv";
    std::vector<Student> students = loadFromFile(FILENAME);
    
    int choice;
    bool running = true;
    
    while (running) {
        std::cout << "\n===== Student Records System =====" << std::endl;
        std::cout << "1. Display all students" << std::endl;
        std::cout << "2. Add a new student" << std::endl;
        std::cout << "3. Save to file" << std::endl;
        std::cout << "4. Exit" << std::endl;
        std::cout << "Enter your choice (1-4): ";
        std::cin >> choice;
        
        switch (choice) {
            case 1:
                displayAllStudents(students);
                break;
                
            case 2:
                students.push_back(addStudent());
                std::cout << "Student added successfully." << std::endl;
                break;
                
            case 3:
                saveToFile(students, FILENAME);
                break;
                
            case 4:
                running = false;
                break;
                
            default:
                std::cout << "Invalid choice. Please try again." << std::endl;
        }
    }
    
    std::cout << "Thank you for using the Student Records System!" << std::endl;
    return 0;
}
```

## Key Points to Remember

1. **Standard I/O Streams**
   - `std::cout` for standard output
   - `std::cin` for standard input
   - `std::cerr` for error output
   - `std::clog` for logging output

2. **Input Validation**
   - Always check if input is valid
   - Use `std::cin.fail()` to detect input errors
   - Clear error flags with `std::cin.clear()`
   - Discard invalid input with `std::cin.ignore()`

3. **Output Formatting**
   - Use `<iomanip>` library for formatting
   - `std::setprecision()` for controlling precision
   - `std::setw()` for field width
   - `std::fixed`, `std::scientific` for number format

4. **File I/O**
   - Use `std::ifstream` for input from files
   - Use `std::ofstream` for output to files
   - Use `std::fstream` for both input and output
   - Always check if files are opened successfully
   - Close files when finished

5. **File Modes**
   - `std::ios::in` - Open for reading
   - `std::ios::out` - Open for writing
   - `std::ios::app` - Append to file
   - `std::ios::binary` - Binary mode
   - `std::ios::trunc` - Truncate file if it exists

6. **File Positioning**
   - `seekg()` and `seekp()` for positioning
   - `tellg()` and `tellp()` for getting current position
   - Positioning relative to beginning, current position, or end 
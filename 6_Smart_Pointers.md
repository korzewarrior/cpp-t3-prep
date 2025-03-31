# C++ Smart Pointers

## 1. Introduction to Smart Pointers

Smart pointers are wrapper classes that manage the lifetime of dynamically allocated objects. They help prevent memory leaks by automatically deallocating memory when it's no longer needed.

### Problems with Raw Pointers

Raw pointers in C++ can lead to several issues:

1. **Memory Leaks**: Forgetting to delete dynamically allocated memory
2. **Dangling Pointers**: Accessing memory that has already been freed
3. **Double Deletion**: Deleting the same memory twice
4. **Exception Safety**: Memory leaks when exceptions occur between allocation and deallocation

```cpp
// Problems with raw pointers
void rawPointerProblems() {
    // Memory leak: Forgot to delete
    int* leak = new int(42);
    // No delete here
    
    // Dangling pointer
    int* danglingPtr = new int(10);
    delete danglingPtr;  // Memory is freed
    *danglingPtr = 20;   // Undefined behavior - accessing freed memory
    
    // Double deletion
    int* doubleDelete = new int(30);
    delete doubleDelete;
    delete doubleDelete;  // Undefined behavior - double deletion
}
```

### Smart Pointer Types in C++

C++ provides three main types of smart pointers in the `<memory>` header:

1. **std::unique_ptr**: Exclusive ownership model - only one owner at a time
2. **std::shared_ptr**: Shared ownership model - multiple owners, reference-counted
3. **std::weak_ptr**: Non-owning reference to a shared_ptr, doesn't affect reference count

## 2. std::unique_ptr

A `std::unique_ptr` exclusively owns and manages a dynamically allocated object. It automatically deletes the object when the unique_ptr goes out of scope or is reset.

### Basic Usage

```cpp
#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Resource acquired\n"; }
    void use() { std::cout << "Resource used\n"; }
    ~Resource() { std::cout << "Resource released\n"; }
};

int main() {
    // Create a unique_ptr to a Resource
    std::unique_ptr<Resource> res1 = std::make_unique<Resource>();
    
    // Use the resource
    res1->use();
    
    // Reset the pointer (deletes the current object)
    res1.reset();
    
    // Create another unique_ptr
    std::unique_ptr<Resource> res2(new Resource());
    
    // Resource will be automatically deleted when res2 goes out of scope
    return 0;
}
```

### Ownership Transfer

A `std::unique_ptr` cannot be copied, but it can be moved, which transfers ownership:

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Resource {
public:
    Resource(int id) : id_(id) { 
        std::cout << "Resource " << id_ << " acquired\n"; 
    }
    
    void use() { 
        std::cout << "Resource " << id_ << " used\n"; 
    }
    
    ~Resource() { 
        std::cout << "Resource " << id_ << " released\n"; 
    }
    
private:
    int id_;
};

// Function that returns a unique_ptr
std::unique_ptr<Resource> createResource(int id) {
    return std::make_unique<Resource>(id);
}

// Function that takes a unique_ptr by value (ownership transfer)
void consumeResource(std::unique_ptr<Resource> res) {
    res->use();
    // Resource will be freed when function ends
}

int main() {
    // Create unique_ptr
    auto res1 = createResource(1);
    res1->use();
    
    // Transfer ownership to function (using std::move)
    consumeResource(std::move(res1));
    
    // res1 is now nullptr
    if (!res1) {
        std::cout << "res1 is now nullptr\n";
    }
    
    // Store unique_ptrs in a vector
    std::vector<std::unique_ptr<Resource>> resources;
    
    // Add resources to vector (using move semantics)
    resources.push_back(std::make_unique<Resource>(2));
    resources.push_back(std::make_unique<Resource>(3));
    
    // Use resources
    for (const auto& res : resources) {
        res->use();
    }
    
    // All resources will be freed when vector is destroyed
    return 0;
}
```

### Custom Deleters

You can specify custom deletion logic for a `std::unique_ptr`:

```cpp
#include <iostream>
#include <memory>
#include <fstream>

// Custom deleter function
void deleteFile(std::FILE* file) {
    if (file) {
        std::fclose(file);
        std::cout << "File closed\n";
    }
}

int main() {
    // Using a function pointer as deleter
    {
        std::unique_ptr<std::FILE, decltype(&deleteFile)> filePtr(
            std::fopen("example.txt", "w"), deleteFile);
        
        if (filePtr) {
            std::fputs("Hello, World!", filePtr.get());
            std::cout << "Wrote to file\n";
        }
        // File will be automatically closed when filePtr goes out of scope
    }
    
    // Using a lambda as deleter
    {
        auto fileDeleter = [](std::FILE* file) {
            if (file) {
                std::fclose(file);
                std::cout << "File closed (lambda)\n";
            }
        };
        
        std::unique_ptr<std::FILE, decltype(fileDeleter)> filePtr(
            std::fopen("example2.txt", "w"), fileDeleter);
        
        if (filePtr) {
            std::fputs("Hello again!", filePtr.get());
            std::cout << "Wrote to second file\n";
        }
    }
    
    return 0;
}
```

## 3. std::shared_ptr

A `std::shared_ptr` uses reference counting to manage the lifetime of a dynamically allocated object. The object is deleted when the last shared_ptr owning it is destroyed.

### Basic Usage

```cpp
#include <iostream>
#include <memory>

class Resource {
public:
    Resource(const std::string& name) : name_(name) {
        std::cout << "Resource " << name_ << " acquired\n";
    }
    
    void use() {
        std::cout << "Resource " << name_ << " used\n";
    }
    
    ~Resource() {
        std::cout << "Resource " << name_ << " released\n";
    }

private:
    std::string name_;
};

int main() {
    // Create a shared_ptr
    std::shared_ptr<Resource> res1 = std::make_shared<Resource>("First");
    
    {
        // Create another shared_ptr that shares ownership
        std::shared_ptr<Resource> res2 = res1;
        
        std::cout << "Reference count: " << res1.use_count() << std::endl;  // 2
        
        // Both pointers can use the resource
        res1->use();
        res2->use();
        
        // res2 will go out of scope, but resource is not deleted yet
    }
    
    std::cout << "After inner scope, reference count: " << res1.use_count() << std::endl;  // 1
    
    // Resource is still available through res1
    res1->use();
    
    // Reset res1 (resource will be deleted)
    res1.reset();
    
    std::cout << "After reset, reference count: " << res1.use_count() << std::endl;  // 0
    
    return 0;
}
```

### Shared Ownership

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include <string>

class SharedResource {
public:
    SharedResource(const std::string& name) : name_(name) {
        std::cout << "SharedResource " << name_ << " created\n";
    }
    
    ~SharedResource() {
        std::cout << "SharedResource " << name_ << " destroyed\n";
    }
    
    std::string getName() const { return name_; }

private:
    std::string name_;
};

// Function that stores shared_ptr in a container
void storeResource(std::vector<std::shared_ptr<SharedResource>>& container, 
                  std::shared_ptr<SharedResource> res) {
    container.push_back(res);
    std::cout << "Resource " << res->getName() 
              << " stored, reference count: " << res.use_count() << "\n";
}

int main() {
    std::vector<std::shared_ptr<SharedResource>> resources;
    
    // Create a shared resource
    auto res1 = std::make_shared<SharedResource>("Resource1");
    std::cout << "Initial reference count: " << res1.use_count() << "\n";  // 1
    
    // Share ownership with the container
    storeResource(resources, res1);  // Count becomes 2
    
    // Create a second reference to the same resource
    std::shared_ptr<SharedResource> res2 = res1;
    std::cout << "After second variable, count: " << res1.use_count() << "\n";  // 3
    
    // Create and store a new resource
    storeResource(resources, std::make_shared<SharedResource>("Resource2"));
    
    // Use the resources
    for (const auto& res : resources) {
        std::cout << "Using " << res->getName() 
                  << ", count: " << res.use_count() << "\n";
    }
    
    // Reset one reference
    res1.reset();
    std::cout << "After resetting res1, res2 count: " << res2.use_count() << "\n";
    
    // res2 and the vector's copy still own the first resource
    // It will be deleted when both res2 and the vector are destroyed
    
    return 0;
}
```

### Custom Deleters with shared_ptr

Similar to `unique_ptr`, `shared_ptr` also supports custom deleters:

```cpp
#include <iostream>
#include <memory>

struct NetworkConnection {
    NetworkConnection(const std::string& host) : host_(host) {
        std::cout << "Connected to " << host_ << "\n";
    }
    
    std::string host_;
};

void networkDeleter(NetworkConnection* conn) {
    std::cout << "Disconnecting from " << conn->host_ << "\n";
    delete conn;
}

int main() {
    // Using a function as deleter
    {
        std::shared_ptr<NetworkConnection> conn1(
            new NetworkConnection("example.com"), networkDeleter);
        
        // Use the connection
        std::cout << "Using connection to " << conn1->host_ << "\n";
    }
    
    // Using a lambda as deleter
    {
        auto conn2 = std::shared_ptr<NetworkConnection>(
            new NetworkConnection("api.example.org"),
            [](NetworkConnection* conn) {
                std::cout << "Lambda: Disconnecting from " << conn->host_ << "\n";
                delete conn;
            }
        );
        
        std::cout << "Using connection to " << conn2->host_ << "\n";
    }
    
    return 0;
}
```

## 4. std::weak_ptr

A `std::weak_ptr` provides a non-owning "weak" reference to an object managed by a `std::shared_ptr`. It doesn't affect the reference count and can't prevent the object from being deleted.

### Avoiding Circular References

One of the main uses of `weak_ptr` is to break circular references between `shared_ptr` objects, which would otherwise cause memory leaks:

```cpp
#include <iostream>
#include <memory>
#include <string>

class Person {
public:
    Person(const std::string& name) : name_(name) {
        std::cout << "Person " << name_ << " created\n";
    }
    
    ~Person() {
        std::cout << "Person " << name_ << " destroyed\n";
    }
    
    // Set a friend using shared_ptr (creates circular reference!)
    void setFriendBad(std::shared_ptr<Person> friend_) {
        friend_bad_ = friend_;
    }
    
    // Set a friend using weak_ptr (avoids circular reference)
    void setFriend(std::shared_ptr<Person> friend_) {
        friend_ = friend_;
    }
    
    void showFriend() const {
        // For weak_ptr, we need to check if it's still valid
        if (auto shared_friend = friend_.lock()) {
            std::cout << name_ << "'s friend is " << shared_friend->name_ << "\n";
        } else {
            std::cout << name_ << "'s friend is no longer available\n";
        }
    }
    
private:
    std::string name_;
    std::shared_ptr<Person> friend_bad_;  // Can cause circular reference
    std::weak_ptr<Person> friend_;        // Proper way to avoid circular reference
};

int main() {
    // Demonstrating circular reference problem
    {
        std::cout << "Demonstrating circular reference problem:\n";
        
        auto alice = std::make_shared<Person>("Alice");
        auto bob = std::make_shared<Person>("Bob");
        
        // Create circular reference
        alice->setFriendBad(bob);
        bob->setFriendBad(alice);
        
        std::cout << "Leaving scope, but alice and bob won't be destroyed!\n";
        // Memory leak: Both objects still have a reference count of 1 due to circular reference
    }
    
    std::cout << "\n";
    
    // Solving with weak_ptr
    {
        std::cout << "Solving with weak_ptr:\n";
        
        auto charlie = std::make_shared<Person>("Charlie");
        auto diana = std::make_shared<Person>("Diana");
        
        // Use weak_ptr to avoid circular reference
        charlie->setFriend(diana);
        diana->setFriend(charlie);
        
        diana->showFriend();
        
        std::cout << "Leaving scope, objects will be properly destroyed\n";
    }
    
    return 0;
}
```

### Observing Object Lifetime

Another use of `weak_ptr` is to observe an object without affecting its lifetime:

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Subject {
public:
    Subject(int id) : id_(id) {
        std::cout << "Subject " << id_ << " created\n";
    }
    
    ~Subject() {
        std::cout << "Subject " << id_ << " destroyed\n";
    }
    
    void doSomething() {
        std::cout << "Subject " << id_ << " doing something\n";
    }
    
private:
    int id_;
};

class Observer {
public:
    void setSubject(std::shared_ptr<Subject> subject) {
        subject_ = subject;
    }
    
    void notify() {
        if (auto subject = subject_.lock()) {
            std::cout << "Observer: Subject is available\n";
            subject->doSomething();
        } else {
            std::cout << "Observer: Subject is no longer available\n";
        }
    }
    
private:
    std::weak_ptr<Subject> subject_;  // Doesn't prevent subject from being destroyed
};

int main() {
    Observer observer;
    
    {
        auto subject = std::make_shared<Subject>(1);
        observer.setSubject(subject);
        
        // Observer can use the subject
        observer.notify();
        
        std::cout << "Subject will go out of scope now\n";
    }
    
    // Subject is destroyed, but observer still has a weak_ptr to it
    observer.notify();  // Will detect that subject is gone
    
    return 0;
}
```

### Checking and Converting weak_ptr

A `weak_ptr` cannot directly access the managed object. You must convert it to a `shared_ptr` first:

```cpp
#include <iostream>
#include <memory>

class Resource {
public:
    Resource(int value) : value_(value) {
        std::cout << "Resource " << value_ << " created\n";
    }
    
    ~Resource() {
        std::cout << "Resource " << value_ << " destroyed\n";
    }
    
    void use() {
        std::cout << "Using resource " << value_ << "\n";
    }
    
private:
    int value_;
};

int main() {
    std::weak_ptr<Resource> weakRes;
    
    {
        auto sharedRes = std::make_shared<Resource>(42);
        weakRes = sharedRes;
        
        // Check if resource is available
        if (!weakRes.expired()) {
            std::cout << "Resource is still alive, use_count: " 
                      << weakRes.use_count() << "\n";
        }
        
        // Convert weak_ptr to shared_ptr to use the resource
        if (auto sharedFromWeak = weakRes.lock()) {
            sharedFromWeak->use();
        } else {
            std::cout << "Failed to lock weak_ptr\n";
        }
    }
    
    // After shared_ptr is destroyed
    std::cout << "After shared_ptr is destroyed:\n";
    
    if (weakRes.expired()) {
        std::cout << "Resource is expired\n";
    }
    
    // Trying to lock an expired weak_ptr
    if (auto sharedFromWeak = weakRes.lock()) {
        sharedFromWeak->use();
    } else {
        std::cout << "Failed to lock weak_ptr, resource is gone\n";
    }
    
    return 0;
}
```

## 5. Using Smart Pointers with STL Containers

Smart pointers work well with STL containers, especially for managing dynamic objects:

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>
#include <string>

class Item {
public:
    Item(const std::string& name, int value) : name_(name), value_(value) {
        std::cout << "Item " << name_ << " created\n";
    }
    
    ~Item() {
        std::cout << "Item " << name_ << " destroyed\n";
    }
    
    std::string getName() const { return name_; }
    int getValue() const { return value_; }
    
private:
    std::string name_;
    int value_;
};

int main() {
    // Vector of unique_ptr
    std::vector<std::unique_ptr<Item>> uniqueItems;
    
    // Add items to the vector
    uniqueItems.push_back(std::make_unique<Item>("Sword", 100));
    uniqueItems.push_back(std::make_unique<Item>("Shield", 50));
    uniqueItems.push_back(std::make_unique<Item>("Potion", 25));
    
    // Access items
    for (const auto& item : uniqueItems) {
        std::cout << "Item: " << item->getName() 
                  << ", Value: " << item->getValue() << "\n";
    }
    
    // Sort items by value (requires move operations)
    std::sort(uniqueItems.begin(), uniqueItems.end(), 
              [](const auto& a, const auto& b) {
                  return a->getValue() < b->getValue();
              });
    
    std::cout << "After sorting:\n";
    for (const auto& item : uniqueItems) {
        std::cout << "Item: " << item->getName() 
                  << ", Value: " << item->getValue() << "\n";
    }
    
    // Vector of shared_ptr
    std::vector<std::shared_ptr<Item>> sharedItems;
    
    // Add items
    auto sword = std::make_shared<Item>("Excalibur", 1000);
    sharedItems.push_back(sword);
    sharedItems.push_back(std::make_shared<Item>("DragonShield", 500));
    
    // Multiple references to the same item
    sharedItems.push_back(sword);  // Add sword again
    
    std::cout << "\nShared items:\n";
    for (const auto& item : sharedItems) {
        std::cout << "Item: " << item->getName() 
                  << ", Value: " << item->getValue()
                  << ", Use count: " << item.use_count() << "\n";
    }
    
    // Items will be automatically deleted when vectors are destroyed
    return 0;
}
```

## 6. Using Smart Pointers with Abstract Classes

Smart pointers are particularly useful when working with abstract classes and polymorphism:

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include <string>

// Abstract base class
class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
    virtual void draw() const = 0;
};

class Circle : public Shape {
public:
    Circle(double radius) : radius_(radius) {}
    
    double area() const override {
        return 3.14159 * radius_ * radius_;
    }
    
    void draw() const override {
        std::cout << "Drawing a circle with radius " << radius_ << "\n";
    }
    
private:
    double radius_;
};

class Rectangle : public Shape {
public:
    Rectangle(double width, double height) : width_(width), height_(height) {}
    
    double area() const override {
        return width_ * height_;
    }
    
    void draw() const override {
        std::cout << "Drawing a rectangle with width " << width_ 
                  << " and height " << height_ << "\n";
    }
    
private:
    double width_;
    double height_;
};

// Factory function that returns a smart pointer to a Shape
std::unique_ptr<Shape> createShape(const std::string& type) {
    if (type == "circle") {
        return std::make_unique<Circle>(5.0);
    } else if (type == "rectangle") {
        return std::make_unique<Rectangle>(4.0, 3.0);
    }
    return nullptr;
}

int main() {
    // Vector of shapes using polymorphism
    std::vector<std::unique_ptr<Shape>> shapes;
    
    // Add shapes using the factory
    shapes.push_back(createShape("circle"));
    shapes.push_back(createShape("rectangle"));
    shapes.push_back(std::make_unique<Circle>(2.5));
    
    // Use polymorphism
    for (const auto& shape : shapes) {
        shape->draw();
        std::cout << "Area: " << shape->area() << "\n";
    }
    
    return 0;
}
```

## 7. Migrating from Raw Pointers to Smart Pointers

When modernizing existing code, you might need to convert raw pointers to smart pointers:

```cpp
#include <iostream>
#include <memory>

class Legacy {
public:
    Legacy() {
        std::cout << "Legacy object created\n";
    }
    
    ~Legacy() {
        std::cout << "Legacy object destroyed\n";
    }
    
    void doSomething() {
        std::cout << "Legacy object doing something\n";
    }
};

// Old function that returns a raw pointer (caller is responsible for deletion)
Legacy* createLegacyRaw() {
    return new Legacy();
}

// Old function that takes a raw pointer
void useLegacyRaw(Legacy* legacy) {
    if (legacy) {
        legacy->doSomething();
    }
}

// Modern function that returns a unique_ptr
std::unique_ptr<Legacy> createLegacyModern() {
    return std::make_unique<Legacy>();
}

// Modern function that takes a reference to a Legacy
void useLegacyModern(Legacy& legacy) {
    legacy.doSomething();
}

// Function that takes a shared_ptr by reference
void useLegacyShared(const std::shared_ptr<Legacy>& legacy) {
    if (legacy) {
        legacy->doSomething();
        std::cout << "Reference count: " << legacy.use_count() << "\n";
    }
}

int main() {
    // Old approach with raw pointers
    std::cout << "Using raw pointers (error-prone):\n";
    Legacy* rawLegacy = createLegacyRaw();
    useLegacyRaw(rawLegacy);
    delete rawLegacy;  // Manual deletion required
    
    // Modern approach with unique_ptr
    std::cout << "\nUsing unique_ptr:\n";
    auto modernLegacy = createLegacyModern();
    useLegacyModern(*modernLegacy);  // Pass by reference
    // No need to manually delete
    
    // Using shared_ptr when sharing is needed
    std::cout << "\nUsing shared_ptr:\n";
    auto sharedLegacy = std::make_shared<Legacy>();
    useLegacyShared(sharedLegacy);
    
    // Working with existing raw pointers (be careful)
    std::cout << "\nAdopting raw pointers (use with caution):\n";
    Legacy* rawPtr = new Legacy();
    
    // Take ownership of existing raw pointer (dangerous if pointer is used elsewhere)
    std::unique_ptr<Legacy> uniqueFromRaw(rawPtr);
    // rawPtr should not be used after this!
    
    // Don't do this:
    // delete rawPtr;  // Double deletion error!
    
    return 0;
}
```

## 8. Common Patterns and Best Practices

### Factory Functions

Factory functions that return smart pointers are a common pattern:

```cpp
template <typename T, typename... Args>
std::unique_ptr<T> createUnique(Args&&... args) {
    return std::make_unique<T>(std::forward<Args>(args)...);
}

template <typename T, typename... Args>
std::shared_ptr<T> createShared(Args&&... args) {
    return std::make_shared<T>(std::forward<Args>(args)...);
}
```

### Prefer make_unique and make_shared

Always prefer `std::make_unique` and `std::make_shared` over using `new` directly:

```cpp
// GOOD:
auto ptr1 = std::make_unique<MyClass>(arg1, arg2);
auto ptr2 = std::make_shared<MyClass>(arg1, arg2);

// AVOID:
std::unique_ptr<MyClass> ptr3(new MyClass(arg1, arg2));
std::shared_ptr<MyClass> ptr4(new MyClass(arg1, arg2));
```

Benefits of using make functions:
1. Exception safety
2. Single allocation for `std::make_shared` (object and control block)
3. Cleaner code

### Use const References for shared_ptr Parameters

When a function needs access to a shared resource but shouldn't affect ownership:

```cpp
// Good: Takes a const reference, doesn't increase reference count
void process(const std::shared_ptr<Resource>& resource) {
    resource->doSomething();
}

// Avoid: Takes by value, increases reference count unnecessarily
void processAvoid(std::shared_ptr<Resource> resource) {
    resource->doSomething();
}
```

### Use unique_ptr by Default

Use `std::unique_ptr` by default and only switch to `std::shared_ptr` when shared ownership is needed:

```cpp
// Start with unique_ptr
auto resource = std::make_unique<Resource>();

// Convert to shared_ptr only when sharing is needed
std::shared_ptr<Resource> sharedResource = std::move(resource);
```

## 9. Complete Example: Resource Management System

This example demonstrates a comprehensive use of smart pointers in a resource management system:

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <functional>

// Abstract base class for resources
class Resource {
public:
    Resource(const std::string& name) : name_(name) {
        std::cout << "Resource " << name_ << " created\n";
    }
    
    virtual ~Resource() {
        std::cout << "Resource " << name_ << " destroyed\n";
    }
    
    virtual void use() = 0;
    
    std::string getName() const { return name_; }
    
protected:
    std::string name_;
};

// Concrete resource types
class FileResource : public Resource {
public:
    FileResource(const std::string& name, const std::string& path)
        : Resource(name), path_(path) {}
    
    void use() override {
        std::cout << "Using file resource: " << name_ << " at " << path_ << "\n";
    }
    
private:
    std::string path_;
};

class NetworkResource : public Resource {
public:
    NetworkResource(const std::string& name, const std::string& url)
        : Resource(name), url_(url) {}
    
    void use() override {
        std::cout << "Using network resource: " << name_ << " at " << url_ << "\n";
    }
    
private:
    std::string url_;
};

class MemoryResource : public Resource {
public:
    MemoryResource(const std::string& name, size_t size)
        : Resource(name), size_(size) {}
    
    void use() override {
        std::cout << "Using memory resource: " << name_ << " (" << size_ << " bytes)\n";
    }
    
private:
    size_t size_;
};

// Resource manager class
class ResourceManager {
public:
    // Add a resource to the manager
    void addResource(std::shared_ptr<Resource> resource) {
        resources_[resource->getName()] = resource;
    }
    
    // Create and add a resource using a factory method
    template <typename T, typename... Args>
    std::shared_ptr<T> createResource(const std::string& name, Args&&... args) {
        auto resource = std::make_shared<T>(name, std::forward<Args>(args)...);
        addResource(resource);
        return resource;
    }
    
    // Get a resource by name
    std::shared_ptr<Resource> getResource(const std::string& name) {
        auto it = resources_.find(name);
        if (it != resources_.end()) {
            return it->second;
        }
        return nullptr;
    }
    
    // Remove a resource by name
    bool removeResource(const std::string& name) {
        return resources_.erase(name) > 0;
    }
    
    // Use all resources
    void useAllResources() {
        for (const auto& [name, resource] : resources_) {
            std::cout << "Resource '" << name << "' has " 
                      << resource.use_count() << " references\n";
            resource->use();
        }
    }
    
    // Get number of managed resources
    size_t getResourceCount() const {
        return resources_.size();
    }
    
private:
    std::map<std::string, std::shared_ptr<Resource>> resources_;
};

// Resource user class
class ResourceUser {
public:
    ResourceUser(const std::string& name) : name_(name) {}
    
    // Borrow a resource (doesn't take ownership)
    void borrowResource(std::shared_ptr<Resource> resource) {
        std::cout << name_ << " is borrowing resource: " << resource->getName() << "\n";
        resource->use();
    }
    
    // Keep a resource (takes shared ownership)
    void keepResource(std::shared_ptr<Resource> resource) {
        std::cout << name_ << " is keeping resource: " << resource->getName() << "\n";
        resources_.push_back(resource);
    }
    
    // Use all kept resources
    void useResources() {
        std::cout << name_ << " is using all kept resources:\n";
        for (const auto& resource : resources_) {
            resource->use();
        }
    }
    
    // Get count of kept resources
    size_t getResourceCount() const {
        return resources_.size();
    }
    
private:
    std::string name_;
    std::vector<std::shared_ptr<Resource>> resources_;
};

// Resource observer class (doesn't take ownership)
class ResourceMonitor {
public:
    // Watch a resource
    void watchResource(std::shared_ptr<Resource> resource) {
        std::cout << "Monitor is now watching: " << resource->getName() << "\n";
        resources_[resource->getName()] = resource;
    }
    
    // Check if resources are still available
    void checkResources() {
        std::cout << "Resource monitor checking resources:\n";
        
        auto it = resources_.begin();
        while (it != resources_.end()) {
            if (auto resource = it->second.lock()) {
                std::cout << "Resource '" << it->first << "' is still available\n";
                ++it;
            } else {
                std::cout << "Resource '" << it->first << "' has been released\n";
                it = resources_.erase(it);
            }
        }
    }
    
private:
    std::map<std::string, std::weak_ptr<Resource>> resources_;
};

int main() {
    // Create a resource manager
    ResourceManager manager;
    
    // Create various resource types
    auto file1 = manager.createResource<FileResource>("config", "/etc/config.xml");
    auto file2 = manager.createResource<FileResource>("data", "/var/data.db");
    manager.createResource<NetworkResource>("api", "https://api.example.com");
    manager.createResource<MemoryResource>("buffer", 1024 * 1024);
    
    std::cout << "Manager has " << manager.getResourceCount() << " resources\n\n";
    
    // Create a resource monitor (using weak_ptr)
    ResourceMonitor monitor;
    monitor.watchResource(file1);
    monitor.watchResource(file2);
    monitor.watchResource(manager.getResource("api"));
    
    // Create resource users
    ResourceUser user1("User1");
    ResourceUser user2("User2");
    
    // Users borrow resources (don't take ownership)
    user1.borrowResource(manager.getResource("config"));
    user2.borrowResource(manager.getResource("data"));
    
    // Users keep resources (take shared ownership)
    user1.keepResource(manager.getResource("api"));
    user1.keepResource(manager.getResource("buffer"));
    user2.keepResource(manager.getResource("config"));
    
    std::cout << "\nUser1 has " << user1.getResourceCount() << " resources\n";
    std::cout << "User2 has " << user2.getResourceCount() << " resources\n\n";
    
    // Check reference counts by using all resources
    std::cout << "Using all manager resources:\n";
    manager.useAllResources();
    
    std::cout << "\nUsers using their resources:\n";
    user1.useResources();
    user2.useResources();
    
    // Monitor checks resources
    std::cout << "\nInitial resource check:\n";
    monitor.checkResources();
    
    // Remove a resource from the manager
    std::cout << "\nRemoving 'api' from manager...\n";
    manager.removeResource("api");
    
    // Monitor checks again
    std::cout << "\nResource check after removal:\n";
    monitor.checkResources();
    
    // User1 still has a reference to the "api" resource
    std::cout << "\nUser1 using resources after 'api' was removed from manager:\n";
    user1.useResources();
    
    // Clear all users
    std::cout << "\nClearing all users...\n";
    user1 = ResourceUser("Empty1");
    user2 = ResourceUser("Empty2");
    
    // Monitor checks again
    std::cout << "\nFinal resource check:\n";
    monitor.checkResources();
    
    std::cout << "\nProgram ending, all remaining resources will be cleaned up\n";
    return 0;
}
```

## 10. Key Points to Remember

1. **Choose the Right Smart Pointer**:
   - `std::unique_ptr` for exclusive ownership
   - `std::shared_ptr` for shared ownership
   - `std::weak_ptr` for non-owning references to shared objects

2. **Create Smart Pointers**:
   - Use `std::make_unique<T>(args...)` for unique_ptr
   - Use `std::make_shared<T>(args...)` for shared_ptr

3. **Ownership Transfer**:
   - Move unique_ptr with `std::move()`
   - Copy shared_ptr for shared ownership
   - Use weak_ptr when you need a temporary reference

4. **Custom Deleters**:
   - Both unique_ptr and shared_ptr support custom deletion logic
   - Useful for resources that need special cleanup

5. **Breaking Circular References**:
   - Use weak_ptr to avoid circular references between shared_ptr objects

6. **Smart Pointers with Containers**:
   - Containers of unique_ptr need to use move semantics
   - Containers of shared_ptr can be copied normally

7. **Parameters and Return Values**:
   - Return unique_ptr when transferring ownership
   - Pass shared_ptr by const reference when borrowing
   - Pass unique_ptr by value when transferring ownership
   - Return shared_ptr when ownership is shared

8. **Working with Abstract Classes**:
   - Smart pointers work well with polymorphism
   - Store pointers to base classes, instantiate derived classes 
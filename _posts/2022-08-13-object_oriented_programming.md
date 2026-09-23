---
layout: post
title: "Object Oriented Programming"
categories: Programming
description: "Classes, inheritance, encapsulation and polymorphism in Python"
keywords: "Python, Object Oriented Programming"
date: 2022-08-13
---

## Object Oriented Programming

Programming languages designed primarily for OOP include: C++,Java,C#,Python,Ruby,PHP,Swift,JavaScript,Kotlin,Scala

```
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        print("Woof!")

    def display(self):
        print("Name:", self.name)
        print("Breed:", self.breed)

# Create an instance (object) of the Dog class
dog1 = Dog("Fido", "Golden Retriever")

# Call methods on the object
dog1.bark()
dog1.display()
    
```


**Class**: A class is a blueprint or template for creating objects. It defines the properties (attributes) and methods that an object of that class will have. A class defines the structure of the object, but it does not contain any specific data.


**Object**: In object-oriented programming, An Object is the actual thing you create from the blueprint


**Instance**: An Instance is just a more specific way of saying "object." It emphasizes that the object is an instance of a specific class.


**Method**: A method is a function that is defined within a class and is associated with an object. Methods define the behavior of the object, and they can be used to interact with the object's properties (attributes). Methods are typically used to retrieve or update the object's data.


The term 'object' is often used to refer both to actual data structures and to the general paradigm of object-oriented programming, we'll typically stick to the terms 'class' and 'instance' instead.


## Explanation

In this example, the Dog class is defined with two instance variables name and breed which are passed as arguments to the __init__ method. The __init__ method is a special method in Python classes that is called when an object of the class is created. The bark and display methods are also defined in the class.

We can create an object of the Dog class by calling it as a function and passing the required arguments, as you can see in the last line of the code dog1 = Dog("Fido", "Golden Retriever").

When we call the bark() method on the dog1 object, it will print "Woof!" to the console. The display() method prints the name and breed attributes of the dog1.

This example illustrates the basic concepts of OOP in Python: encapsulation of data and behavior within a class, and creating objects (instances) of that class.



## The Four Pillars of OOP


**1. Encapsulation**


Encapsulation is the practice of bundling data (attributes) and the methods that operate on that data into a single unit—the class.

It also includes the idea of data hiding, which means restricting direct access to an object's attributes. This prevents data from being changed in unexpected ways. In Python, we don't have true "private" variables, but we use conventions:

_single_underscore: A "protected" attribute. This is a convention that tells other programmers, "You can access this, but you probably shouldn't."

__double_underscore: A "private" attribute. Python performs name mangling on this, making it harder to access from outside the class.

Example:

Let's modify the Dog class to protect its name. Instead of changing name directly, we'll use a "getter" method.


```
class Dog:
    def __init__(self, name, breed):
        # We make 'name' private
        self.__name = name
        self.breed = breed
        
    def bark(self):
        print("Woof!")
        
    # A "getter" method to safely access the private name
    def get_name(self):
        return self.__name
        
    def display(self):
        # Use the getter method internally
        print("Name:", self.get_name())
        print("Breed:", self.breed)

dog1 = Dog("Fido", "Golden Retriever")

# This will work
dog1.display()

# This will cause an error! The attribute is "hidden".
# print(dog1.__name) 

# We must use the getter method
print("The dog's name is:", dog1.get_name())
```

**2. Inheritance**

   
Inheritance allows you to create a new class (a child or derived class) that "inherits" all the attributes and methods from an existing class (a parent or base class). This promotes code reuse.

The child class can use all the parent's functionality and can also override methods (give them a new definition) or add its own new methods.

Example:

Let's create a base Animal class. The Dog class can then inherit from Animal.

```
# 1. Define the Parent (Base) Class
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        print("This animal makes a sound.")

    def show_info(self):
        print(f"I am {self.name} and I am {self.age} years old.")

# 2. Define the Child (Derived) Class
# Dog "is-a" Animal
class Dog(Animal):
    def __init__(self, name, age, breed):
        # Call the __init__ of the parent class
        super().__init__(name, age)
        self.breed = breed # Add a new attribute

    # Override the parent's speak method
    def speak(self):
        print("Woof! Woof!")

# 3. Define another Child Class
class Cat(Animal):
    # This class inherits speak() and show_info()
    # without any changes.
    pass

# --- Using the classes ---
my_dog = Dog("Fido", 5, "Golden Retriever")
my_dog.show_info()  # This method was inherited from Animal
my_dog.speak()      # This method was overridden by Dog

my_cat = Cat("Whiskers", 3)
my_cat.show_info()  # Inherited from Animal
my_cat.speak()      # Inherited from Animal
```

**3. Polymorphism**


Polymorphism (from Greek, meaning "many forms") is the ability of different objects to respond to the same method call in different ways.

This concept works hand-in-hand with inheritance. In our example, both the Dog and Cat objects inherited from Animal and have a speak() method. Polymorphism allows us to treat them as if they are the same type of thing (an Animal) and trust that when we call speak(), each object will know how to perform its specific version of that action.

Example:


```
# Continuing from the Inheritance example...
fido = Dog("Fido", 5, "Golden Retriever")
whiskers = Cat("Whiskers", 3)

# This list contains two different types of objects
# But both are "Animals"
animals = [fido, whiskers]

# We can loop through and call the same method,
# and each object will respond in its own way.
print("\n--- Animal sounds ---")
for animal in animals:
    # This is polymorphism in action!
    animal.speak() 
Output:

--- Animal sounds ---
Woof! Woof!
This animal makes a sound.
```

**4. Abstraction**


Abstraction is the concept of hiding complex, low-level implementation details and only showing the essential features (the "interface") to the user.

When you drive a car, you use the steering wheel, pedals, and gear stick. You don't need to know how the engine's internal combustion works—that complexity is abstracted away.

In Python, this is often formally achieved using Abstract Base Classes (ABCs). An ABC defines what methods a child class must have, without dictating how they work.

Example:

Let's force all Animal subclasses to have a speak method.


```
from abc import ABC, abstractmethod

# The Parent class is now an Abstract Base Class
class Animal(ABC):
    def __init__(self, name):
        self.name = name

    # This is an abstract method.
    # It has no implementation here.
    @abstractmethod
    def speak(self):
        pass

# Dog MUST implement the speak() method
class Dog(Animal):
    def speak(self):
        print("Woof!")

# Cat MUST also implement the speak() method
class Cat(Animal):
    def speak(self):
        print("Meow!")

# If you try to create a class that *forgets*...
# class Fish(Animal):
#     pass

# ...Python will give you an error:
# TypeError: Can't instantiate abstract class Fish 
# with abstract method speak

fido = Dog("Fido")
whiskers = Cat("Whiskers")

fido.speak()
whiskers.speak()
```


This ensures that any object you create that is-an Animal is guaranteed to have the speak() functionality, which is very useful for reliable code.



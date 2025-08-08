'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, Plus, Trash2, Code, BookOpen, FileCode } from 'lucide-react';
import Link from 'next/link';

export default function VectorVisualization() {
  // State for language toggle
  const [language, setLanguage] = useState<'cpp' | 'java'>('cpp');

  // State for vector
  const [vector, setVector] = useState<number[]>([5, 9, 3, 7, 1, 8, 6, 2, 4]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [capacity, setCapacity] = useState(16);

  // State for animation
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [animationType, setAnimationType] = useState<'add' | 'remove' | 'insert' | 'sort' | 'reverse' | null>(null);
  const [animationStep, setAnimationStep] = useState<number>(0);
  const ANIMATION_DURATION = 1500;

  // Enhanced animation helper function
  const animateOperation = (index: number, type: 'add' | 'remove' | 'insert' | 'sort' | 'reverse') => {
    setAnimatingIndex(index);
    setAnimationType(type);
    setAnimationStep(1);

    // For multi-step animations
    if (type === 'sort' || type === 'reverse') {
      const totalSteps = 3;
      for (let step = 2; step <= totalSteps; step++) {
        setTimeout(() => {
          setAnimationStep(step);
        }, ANIMATION_DURATION * (step - 1) / totalSteps);
      }
    }

    setTimeout(() => {
      setAnimatingIndex(null);
      setAnimationType(null);
      setAnimationStep(0);
    }, ANIMATION_DURATION);
  };

  // Function to handle vector operations
  const handleAddElement = () => {
    if (inputValue !== '') {
      const newValue = parseInt(inputValue);
      animateOperation(vector.length, 'add');

      // Delayed execution to show animation first
      setTimeout(() => {
        setVector([...vector, newValue]);
        setInputValue('');

        // Increase capacity if needed
        if (vector.length + 1 >= capacity) {
          setCapacity(capacity * 2);
        }
      }, ANIMATION_DURATION / 2);
    }
  };

  const handleInsertElement = () => {
    if (inputValue !== '' && inputIndex !== '') {
      const newValue = parseInt(inputValue);
      const index = parseInt(inputIndex);
      if (index >= 0 && index <= vector.length) {
        animateOperation(index, 'insert');

        // Delayed execution
        setTimeout(() => {
          const newVector = [...vector];
          newVector.splice(index, 0, newValue);
          setVector(newVector);
          setInputValue('');
          setInputIndex('');

          // Increase capacity if needed
          if (vector.length + 1 >= capacity) {
            setCapacity(capacity * 2);
          }
        }, ANIMATION_DURATION / 2);
      }
    }
  };

  const handleRemoveElement = () => {
    if (inputIndex !== '') {
      const index = parseInt(inputIndex);
      if (index >= 0 && index < vector.length) {
        animateOperation(index, 'remove');

        // Delayed execution
        setTimeout(() => {
          const newVector = [...vector];
          newVector.splice(index, 1);
          setVector(newVector);
          setInputIndex('');
        }, ANIMATION_DURATION / 2);
      }
    }
  };

  const handleSortVector = () => {
    animateOperation(0, 'sort');
    setTimeout(() => {
      const newVector = [...vector];
      newVector.sort((a, b) => a - b);
      setVector(newVector);
    }, ANIMATION_DURATION / 2);
  };

  const handleReverseVector = () => {
    animateOperation(0, 'reverse');
    setTimeout(() => {
      const newVector = [...vector];
      newVector.reverse();
      setVector(newVector);
    }, ANIMATION_DURATION / 2);
  };

  const handleReserve = () => {
    if (inputValue !== '') {
      const newCapacity = parseInt(inputValue);
      if (newCapacity >= vector.length) {
        setCapacity(newCapacity);
        setInputValue('');
      }
    }
  };

  const handleShrinkToFit = () => {
    setCapacity(vector.length);
  };

  // Function to get built-in vector functions based on selected language
  const getBuiltInFunctions = () => {
    if (language === 'cpp') {
      return [
        { name: 'vector<T>()', description: 'Creates an empty vector' },
        { name: 'vector<T>(n)', description: 'Creates a vector with n elements' },
        { name: 'vector<T>(n, val)', description: 'Creates a vector with n elements initialized to val' },
        { name: 'size()', description: 'Returns the number of elements in the vector' },
        { name: 'empty()', description: 'Checks if the vector is empty' },
        { name: 'capacity()', description: 'Returns the size of allocated storage' },
        { name: 'reserve(n)', description: 'Requests that the vector capacity be at least n' },
        { name: 'shrink_to_fit()', description: 'Reduces capacity to fit the size' },
        { name: 'push_back()', description: 'Adds an element to the end of the vector' },
        { name: 'pop_back()', description: 'Removes the last element from the vector' },
        { name: 'insert()', description: 'Inserts elements at the specified position' },
        { name: 'erase()', description: 'Removes elements from specified positions' },
        { name: 'at()', description: 'Returns a reference to the element at specified position' },
        { name: 'front()', description: 'Returns a reference to the first element' },
        { name: 'back()', description: 'Returns a reference to the last element' },
        { name: 'clear()', description: 'Removes all elements from the vector' },
        { name: 'begin()', description: 'Returns an iterator to the first element' },
        { name: 'end()', description: 'Returns an iterator to the element after the last element' },
        { name: 'resize()', description: 'Changes the number of elements stored' },
        { name: 'swap()', description: 'Exchanges the content of the container by another' },
        { name: 'data()', description: 'Returns a direct pointer to the memory array' },
        { name: 'emplace()', description: 'Constructs element in-place at position' },
        { name: 'emplace_back()', description: 'Constructs element in-place at the end' },
        { name: 'assign()', description: 'Assigns new contents to the vector' }
      ];
    } else {
      return [
        { name: 'ArrayList<T>()', description: 'Creates an empty ArrayList' },
        { name: 'ArrayList<T>(collection)', description: 'Creates an ArrayList from a collection' },
        { name: 'ArrayList<T>(capacity)', description: 'Creates an ArrayList with specified initial capacity' },
        { name: 'size()', description: 'Returns the number of elements in the ArrayList' },
        { name: 'isEmpty()', description: 'Checks if the ArrayList is empty' },
        { name: 'ensureCapacity()', description: 'Increases capacity to ensure it can hold at least n elements' },
        { name: 'trimToSize()', description: 'Trims capacity to the list\'s current size' },
        { name: 'add(element)', description: 'Adds an element to the end of the ArrayList' },
        { name: 'add(index, element)', description: 'Inserts an element at the specified position' },
        { name: 'remove(index)', description: 'Removes the element at the specified position' },
        { name: 'remove(Object)', description: 'Removes the first occurrence of the specified element' },
        { name: 'get(index)', description: 'Returns the element at the specified position' },
        { name: 'set(index, element)', description: 'Replaces the element at a position with the specified element' },
        { name: 'contains(Object)', description: 'Checks if the ArrayList contains the specified element' },
        { name: 'indexOf(Object)', description: 'Returns the index of the first occurrence of the element' },
        { name: 'lastIndexOf(Object)', description: 'Returns the index of the last occurrence of the element' },
        { name: 'clear()', description: 'Removes all elements from the ArrayList' },
        { name: 'toArray()', description: 'Returns an array containing all elements in the ArrayList' },
        { name: 'addAll(collection)', description: 'Appends all elements in a collection to the end' },
        { name: 'addAll(index, collection)', description: 'Inserts all elements of a collection at a position' },
        { name: 'removeAll(collection)', description: 'Removes all elements that are also in the specified collection' },
        { name: 'retainAll(collection)', description: 'Retains only elements that are in the specified collection' },
        { name: 'subList(from, to)', description: 'Returns a view of a portion of the list' },
        { name: 'clone()', description: 'Returns a shallow copy of the ArrayList' }
      ];
    }
  };

  const renderSampleCode = () => {
    if (language === 'cpp') {
      return `
// C++ Vector Declaration and Initialization
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Creating vectors
    vector<int> vec1;                    // Empty vector
    vector<int> vec2(5);                 // Vector with 5 elements, initialized to 0
    vector<int> vec3(5, 10);             // Vector with 5 elements, all initialized to 10
    vector<int> vec4 = {5, 2, 7, 1, 9};  // Vector with 5 specific elements
    
    // Accessing elements
    cout << "Third element: " << vec4[2] << endl;          // Output: 7
    cout << "First element: " << vec4.at(0) << endl;       // Output: 5
    cout << "Last element: " << vec4.back() << endl;       // Output: 9
    cout << "First element: " << vec4.front() << endl;     // Output: 5
    
    // Capacity operations
    cout << "Size: " << vec4.size() << endl;               // Output: 5
    cout << "Capacity: " << vec4.capacity() << endl;       // Depends on implementation
    vec4.reserve(20);                                      // Reserve space for at least 20 elements
    cout << "New capacity: " << vec4.capacity() << endl;   // Output: At least 20
    
    // Modifying vectors
    vec4.push_back(10);                  // Add element to end
    vec4.pop_back();                     // Remove last element
    vec4.insert(vec4.begin() + 2, 8);    // Insert 8 at index 2
    vec4.erase(vec4.begin() + 1);        // Remove element at index 1
    
    // Resizing
    vec4.resize(10);                     // Resize to 10 elements (new elements initialized to 0)
    vec4.resize(3);                      // Shrink to 3 elements (excess elements are removed)
    
    // Iteration
    for (int i = 0; i < vec4.size(); i++) {
        cout << vec4[i] << " ";
    }
    cout << endl;
    
    // Range-based for loop (C++11)
    for (int element : vec4) {
        cout << element << " ";
    }
    cout << endl;
    
    // Using iterators
    for (auto it = vec4.begin(); it != vec4.end(); it++) {
        cout << *it << " ";
    }
    cout << endl;
    
    // Sorting
    sort(vec4.begin(), vec4.end());
    
    // Clear all elements
    vec4.clear();
    cout << "Size after clear: " << vec4.size() << endl;  // Output: 0
    
    return 0;
}`;
    } else {
      return `
// Java ArrayList Declaration and Initialization
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class VectorExample {
    public static void main(String[] args) {
        // Creating ArrayLists
        ArrayList<Integer> list1 = new ArrayList<>();              // Empty ArrayList
        ArrayList<Integer> list2 = new ArrayList<>(20);           // ArrayList with initial capacity of 20
        ArrayList<Integer> list3 = new ArrayList<>(Arrays.asList(5, 2, 7, 1, 9));  // Populated ArrayList
        
        // Fill with same value (no direct constructor for this in Java)
        ArrayList<Integer> list4 = new ArrayList<>(5);
        for (int i = 0; i < 5; i++) {
            list4.add(10);  // Add value 10 five times
        }
        
        // Accessing elements
        System.out.println("Third element: " + list3.get(2));        // Output: 7
        System.out.println("First element: " + list3.get(0));        // Output: 5
        System.out.println("Last element: " + list3.get(list3.size() - 1));  // Output: 9
        
        // Capacity operations
        System.out.println("Size: " + list3.size());                // Output: 5
        list3.ensureCapacity(20);                                  // Ensure capacity for at least 20 elements
        list3.trimToSize();                                        // Trim capacity to current size
        
        // Modifying ArrayList
        list3.add(10);                     // Add element to end
        list3.remove(list3.size() - 1);    // Remove last element
        list3.add(2, 8);                  // Insert 8 at index 2
        list3.remove(1);                  // Remove element at index 1
        
        // Iteration
        for (int i = 0; i < list3.size(); i++) {
            System.out.print(list3.get(i) + " ");
        }
        System.out.println();
        
        // Enhanced for loop
        for (Integer element : list3) {
            System.out.print(element + " ");
        }
        System.out.println();
        
        // Using forEach method (Java 8+)
        list3.forEach(element -> System.out.print(element + " "));
        System.out.println();
        
        // Sorting
        Collections.sort(list3);
        
        // Search
        int index = list3.indexOf(8);
        System.out.println("Index of 8: " + index);
        boolean contains = list3.contains(5);
        System.out.println("Contains 5: " + contains);
        
        // Clear all elements
        list3.clear();
        System.out.println("Size after clear: " + list3.size());  // Output: 0
    }
}`;
    }
  };

  return (
    <div className="w-full bg-slate-950 min-h-screen text-white">
      <nav className="w-full px-6 py-4 border-b border-white/10 backdrop-blur-md bg-slate-950/80">
        <div className="w-full flex items-center justify-between">
          <Link href="/home">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-sm"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Code Morph
              </span>
            </div>
          </Link>

          <span className="text-sm text-white/70">
            Version 2.0
          </span>
        </div>
      </nav>

      <div className="w-full px-4 py-8 min-h-screen">
        <div className="flex justify-center items-center mb-6">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-4">Vector Data Structures</h1>

            {/* Language Toggle */}
            <div className="flex space-x-4">
              <button
                onClick={() => setLanguage('cpp')}
                className={`relative px-6 py-2 rounded-lg text-md font-semibold transition-all duration-300
                    shadow-lg border border-transparent overflow-hidden
                    ${language === 'cpp'
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white shadow-indigo-500/50 ring-2 ring-indigo-400 scale-105'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500 hover:bg-gray-700 hover:shadow-lg hover:scale-105'}`}
              >
                C++
              </button>
              <button
                onClick={() => setLanguage('java')}
                className={`relative px-6 py-2 rounded-lg text-md font-semibold transition-all duration-300
                    shadow-lg border border-transparent overflow-hidden
                    ${language === 'java'
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white shadow-indigo-500/50 ring-2 ring-indigo-400 scale-105'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500 hover:bg-gray-700 hover:shadow-lg hover:scale-105'}`}
              >
                Java
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full">
            <Tabs defaultValue="theory">
              <TabsList className="mb-6 mx-auto flex justify-center bg-slate-800 text-slate-400 gap-8">
                <TabsTrigger value="theory" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                  <BookOpen size={16} />
                  Theory
                </TabsTrigger>
                <TabsTrigger value="visualization" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                  <Code size={16} />
                  Visualization
                </TabsTrigger>
                <TabsTrigger value="builtInFunctions" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                  <FileCode size={16} />
                  Built-in Functions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="theory" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">Introduction to Vectors</h2>
                    <p className="text-slate-300 mb-2">Dynamic arrays with automatic memory management</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg text-slate-300">
                      {language === 'cpp'
                        ? 'A vector is a dynamic array that can grow or shrink in size automatically.'
                        : 'An ArrayList is a resizable array implementation that can grow or shrink dynamically.'}
                      It provides the functionality of a dynamic array along with additional features for efficient
                      memory management and operations.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Key Characteristics:</h3>
                    <ul className="list-disc pl-8 space-y-2 text-slate-300">
                      <li>Dynamic size (can grow and shrink as needed)</li>
                      <li>Contiguous memory allocation for efficient access</li>
                      <li>Random access in constant time (O(1))</li>
                      <li>Amortized constant time insertion at the end</li>
                      <li>Automatic memory management</li>
                      <li>Built-in capacity management</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">How Vectors Work:</h3>
                    <ul className="list-disc pl-8 space-y-2 text-slate-300">
                      <li><strong>Dynamic Resizing:</strong> When a vector runs out of space, it allocates a new, larger block of memory (typically 1.5x or 2x the current size), copies the existing elements, and deallocates the old memory.</li>
                      <li><strong>Capacity vs Size:</strong> Size is the number of elements currently in the vector, while capacity is the total number of elements it can hold before needing to resize.</li>
                      <li><strong>Amortized Complexity:</strong> While individual insertions might occasionally be costly due to resizing, the amortized cost over many operations remains constant.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Common Operations and Time Complexity:</h3>
                    <ul className="list-disc pl-8 space-y-4 text-slate-300">
                      <li><strong>Access by index:</strong> O(1) - Constant time</li>
                      <li><strong>Insertion/deletion at end:</strong> O(1) amortized - Usually constant, occasionally O(n) when resizing</li>
                      <li><strong>Insertion/deletion at beginning or middle:</strong> O(n) - Linear time due to element shifting</li>
                      <li><strong>Search (unsorted vector):</strong> O(n) - Linear time</li>
                      <li><strong>Size query:</strong> O(1) - Constant time</li>
                      <li><strong>Resizing:</strong> O(n) - Linear time to allocate new memory and copy elements</li>
                    </ul>

                    <div className="mt-6">
                      <h3 className="text-xl font-semibold">Implementation Details:</h3>
                      <p className="mt-2 text-slate-300">
                        {language === 'cpp'
                          ? 'In C++, std::vector is implemented as a template class. It maintains three pointers internally: start (pointing to the first element), finish (pointing just past the last element), and end_of_storage (pointing to the end of allocated storage).'
                          : 'In Java, ArrayList is implemented using an internal array. When the array fills up, a new larger array is created (typically 1.5x the size), and elements are copied over.'}
                      </p>
                      <p className="mt-2 text-slate-300">
                        The resize factor (how much the capacity increases when full) is implementation-dependent but is typically 1.5x or 2x the current size. This growth factor ensures an amortized constant insertion time.
                      </p>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-lg mt-6 border border-slate-700">
                      <h3 className="text-xl font-semibold">Implementation in {language.toUpperCase()}</h3>
                      <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto mt-2">
                        <code>{renderSampleCode()}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Advantages and Limitations</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Advantages:</h3>
                      <ul className="list-disc pl-8 space-y-2 text-slate-300">
                        <li>Dynamic sizing (grows and shrinks as needed)</li>
                        <li>Random access in constant time</li>
                        <li>Efficient memory usage with capacity management</li>
                        <li>Fast insertion/deletion at the end</li>
                        <li>Sequential memory layout improves cache performance</li>
                        <li>Rich set of built-in functions and algorithms</li>
                        <li>No need to manage memory manually</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Limitations:</h3>
                      <ul className="list-disc pl-8 space-y-2 text-slate-300">
                        <li>Insertion/deletion in the middle is slow (O(n))</li>
                        <li>Occasional performance spikes during resizing</li>
                        <li>May waste memory if capacity is much larger than size</li>
                        <li>No built-in support for non-contiguous storage</li>
                        <li>Cannot efficiently insert/delete at the beginning</li>
                        <li>Not ideal for frequent insertions/deletions at arbitrary positions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Comparison with Other Data Structures</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700">
                      <thead className="bg-slate-900">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Feature</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">{language === 'cpp' ? 'Vector' : 'ArrayList'}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Static Array</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Linked List</th>
                        </tr>
                      </thead>
                      <tbody className="bg-slate-800 divide-y divide-slate-700">
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Memory Layout</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Contiguous</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Contiguous</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Non-contiguous</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Size</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Dynamic</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Fixed</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Dynamic</td>
                        </tr>
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Access Time</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(n)</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Insertion at End</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1) amortized</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Not supported</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1) with tail pointer</td>
                        </tr>
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Insertion in Middle</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(n)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Not supported</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1) after finding position</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Deletion in Middle</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(n)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Not supported</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1) after finding position</td>
                        </tr>
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Memory Overhead</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Medium</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Low</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">High</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Cache Performance</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Good</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Excellent</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Poor</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visualization" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Vector Visualization</h2>
                    <p className="text-slate-300">Interact with a vector to see operations in action</p>
                  </div>
                  <div className="space-y-6">
                    <div className="relative">
                      <h3 className="text-md font-semibold mb-2 text-center">Current Vector (size: {vector.length}, capacity: {capacity})</h3>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {vector.map((value, index) => (
                          <div
                            key={index}
                            className={`
                              flex flex-col items-center rounded-md p-4 w-16 transition-all duration-500
                              ${animatingIndex === index
                                ? `${animationType === 'add' ? 'bg-green-600 scale-110 shadow-lg shadow-green-500/50' :
                                  animationType === 'remove' ? 'bg-red-600 scale-90 opacity-70' :
                                    animationType === 'insert' ? 'bg-blue-600 scale-110 shadow-lg shadow-blue-500/50' :
                                      'bg-blue-600'
                                }`
                                : 'bg-slate-700'
                              }
                              ${animationType === 'sort' && animationStep > 0 ? 'translate-y-2' : ''}
                              ${animationType === 'reverse' && animationStep > 0 ? 'rotate-180' : ''}
                            `}
                          >
                            <span className={`text-lg font-bold transition-all duration-300 ${animatingIndex === index ? 'text-white' : ''}`}>
                              {value}
                            </span>
                            <span className="text-xs text-slate-400">idx: {index}</span>
                          </div>
                        ))}
                        {/* Show empty capacity slots */}
                        {Array.from({ length: capacity - vector.length }).map((_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="flex flex-col items-center bg-slate-600/30 border border-dashed border-slate-500 rounded-md p-4 w-16"
                          >
                            <span className="text-lg font-bold text-slate-500">-</span>
                            <span className="text-xs text-slate-500">unused</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                      <div className="space-y-2">
                        <p className="font-medium text-center">Value</p>
                        <Input
                          id="input-value"
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Enter value"
                          className="bg-slate-700 border-slate-600 focus:border-indigo-500 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-center">Index</p>
                        <Input
                          id="input-index"
                          type="number"
                          value={inputIndex}
                          onChange={(e) => setInputIndex(e.target.value)}
                          placeholder="Enter index"
                          className="bg-slate-700 border-slate-600 focus:border-indigo-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      <Button
                        onClick={handleAddElement}
                        variant="outline"
                        className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                        disabled={inputValue === ''}
                      >
                        <Plus size={16} className="mr-2" />
                        Push back
                      </Button>
                      <Button
                        onClick={handleInsertElement}
                        variant="outline"
                        className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                        disabled={inputIndex === '' || inputValue === ''}
                      >
                        <Plus size={16} className="mr-2" />
                        Insert at index
                      </Button>
                      <Button
                        onClick={handleRemoveElement}
                        variant="destructive"
                        className="bg-red-800 hover:bg-red-700 text-white"
                        disabled={inputIndex === ''}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Erase at index
                      </Button>
                      <Button onClick={handleSortVector} variant="secondary" className="bg-indigo-800 hover:bg-indigo-700 text-white">
                        <ArrowUpDown size={16} className="mr-2" />
                        Sort
                      </Button>
                      <Button onClick={handleReverseVector} variant="secondary" className="bg-indigo-800 hover:bg-indigo-700 text-white">
                        Reverse
                      </Button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      <Button
                        onClick={handleReserve}
                        variant="outline"
                        className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                        disabled={inputValue === ''}
                      >
                        Reserve capacity
                      </Button>
                      <Button onClick={handleShrinkToFit} variant="outline" className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600">
                        Shrink to fit
                      </Button>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2 text-center">Operation Result ({language.toUpperCase()}):</h3>
                      <div className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
                        {language === 'cpp' ? (
                          <pre>{`vector<int> vec = {${vector.join(', ')}};
// Vector size: ${vector.length}
// Vector capacity: ${capacity}
// First element: ${vector[0] || 'N/A'}
// Last element: ${vector[vector.length - 1] || 'N/A'}`}</pre>
                        ) : (
                          <pre>{`ArrayList<Integer> list = new ArrayList<>(Arrays.asList(${vector.join(', ')}));
// ArrayList size: ${vector.length}
// ArrayList capacity: ~${capacity}
// First element: ${vector[0] || 'N/A'}
// Last element: ${vector[vector.length - 1] || 'N/A'}`}</pre>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="builtInFunctions" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">{language === 'cpp' ? 'C++ Vector' : 'Java ArrayList'} Built-in Functions</h2>
                    <p className="text-slate-300">Common operations and their usage</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">API Reference</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-700">
                        <thead className="bg-slate-900">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Function</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-slate-800 divide-y divide-slate-700">
                          {getBuiltInFunctions().map((func, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-slate-800/70' : 'bg-slate-800/40'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">{func.name}</td>
                              <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">{func.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 text-center">Example Usage</h3>
                      <div className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
                        {language === 'cpp' ? (
                          <pre>{`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> vec = {5, 2, 8, 1, 9};
    
    // Size and capacity
    cout << "Size: " << vec.size() << endl;          // Output: 5
    cout << "Capacity: " << vec.capacity() << endl;  // Output: varies
    cout << "Empty: " << (vec.empty() ? "Yes" : "No") << endl; // Output: No
    
    // Adding elements
    vec.push_back(6);           // Add to end
    vec.insert(vec.begin() + 2, 7); // Insert 7 at index 2
    
    // Accessing elements
    cout << "First: " << vec.front() << endl;      // Output: 5
    cout << "Last: " << vec.back() << endl;        // Output: 6
    cout << "At index 2: " << vec.at(2) << endl;   // Output: 7
    
    // Capacity management
    vec.reserve(20);           // Reserve space for 20 elements
    vec.shrink_to_fit();       // Reduce capacity to fit size
    
    // Sorting and searching
    sort(vec.begin(), vec.end());
    bool found = binary_search(vec.begin(), vec.end(), 5);
    cout << "Found 5: " << (found ? "Yes" : "No") << endl;
    
    // Find min and max
    auto minIt = min_element(vec.begin(), vec.end());
    auto maxIt = max_element(vec.begin(), vec.end());
    cout << "Min: " << *minIt << ", Max: " << *maxIt << endl;
    
    // Removing elements
    vec.pop_back();            // Remove last element
    vec.erase(vec.begin() + 1); // Remove element at index 1
    vec.clear();               // Remove all elements
    
    return 0;
}`}</pre>
                        ) : (
                          <pre>{`import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class VectorExample {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        
        // Size and capacity
        System.out.println("Size: " + list.size());        // Output: 5
        System.out.println("Empty: " + (list.isEmpty() ? "Yes" : "No")); // Output: No
        
        // Adding elements
        list.add(6);               // Add to end
        list.add(2, 7);            // Insert 7 at index 2
        
        // Accessing elements
        System.out.println("First: " + list.get(0));       // Output: 5
        System.out.println("Last: " + list.get(list.size() - 1)); // Output: 6
        System.out.println("At index 2: " + list.get(2));  // Output: 7
        
        // Capacity management
        list.ensureCapacity(20);   // Ensure capacity for 20 elements
        list.trimToSize();         // Trim capacity to current size
        
        // Sorting and searching
        Collections.sort(list);
        int index = Collections.binarySearch(list, 5);
        System.out.println("Found 5 at index: " + index);
        
        // Find min and max
        int min = Collections.min(list);
        int max = Collections.max(list);
        System.out.println("Min: " + min + ", Max: " + max);
        
        // Check contains
        boolean contains = list.contains(8);
        System.out.println("Contains 8: " + (contains ? "Yes" : "No"));
        
        // Find index
        int pos = list.indexOf(8);
        System.out.println("Index of 8: " + pos);
        
        // Removing elements
        list.remove(list.size() - 1);    // Remove last element
        list.remove(1);                  // Remove element at index 1
        list.clear();                    // Remove all elements
        
        System.out.println("Size after clear: " + list.size()); // Output: 0
    }
}`}</pre>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
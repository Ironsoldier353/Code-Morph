'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, Plus, Trash2, Code, BookOpen, FileCode } from 'lucide-react';
import Link from 'next/link';

export default function ArrayVisualization() {
  // State for language toggle
  const [language, setLanguage] = useState<'cpp' | 'java'>('cpp');

  // State for 1D array
  const [array1D, setArray1D] = useState<number[]>([5, 9, 3, 7, 1, 8, 6, 2, 4]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');

  // State for 2D array
  const [array2D] = useState<number[][]>([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ]);

  // State for animation
  // State for animation
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [animating2DIndex] = useState<{ row: number, col: number } | null>(null);
  const [animationType, setAnimationType] = useState<'add' | 'remove' | 'insert' | 'sort' | 'reverse' | null>(null);
  const [animationStep, setAnimationStep] = useState<number>(0);
  const ANIMATION_DURATION = 1500; // Longer duration for better visibility

  

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

  // Function to handle 1D array operations
  const handleAddElement = () => {
    if (inputValue !== '') {
      const newValue = parseInt(inputValue);
      animateOperation(array1D.length, 'add');

      // Delayed execution to show animation first
      setTimeout(() => {
        setArray1D([...array1D, newValue]);
        setInputValue('');
      }, ANIMATION_DURATION / 2);
    }
  };

  const handleInsertElement = () => {
    if (inputValue !== '' && inputIndex !== '') {
      const newValue = parseInt(inputValue);
      const index = parseInt(inputIndex);
      if (index >= 0 && index <= array1D.length) {
        animateOperation(index, 'insert');

        // Delayed execution
        setTimeout(() => {
          const newArray = [...array1D];
          newArray.splice(index, 0, newValue);
          setArray1D(newArray);
          setInputValue('');
          setInputIndex('');
        }, ANIMATION_DURATION / 2);
      }
    }
  };

  const handleRemoveElement = () => {
    if (inputIndex !== '') {
      const index = parseInt(inputIndex);
      if (index >= 0 && index < array1D.length) {
        animateOperation(index, 'remove');

        // Delayed execution
        setTimeout(() => {
          const newArray = [...array1D];
          newArray.splice(index, 1);
          setArray1D(newArray);
          setInputIndex('');
        }, ANIMATION_DURATION / 2);
      }
    }
  };

  const handleSortArray = () => {
    animateOperation(0, 'sort');
    setTimeout(() => {
      const newArray = [...array1D];
      newArray.sort((a, b) => a - b);
      setArray1D(newArray);
    }, ANIMATION_DURATION / 2);
  };

  const handleReverseArray = () => {
    animateOperation(0, 'reverse');
    setTimeout(() => {
      const newArray = [...array1D];
      newArray.reverse();
      setArray1D(newArray);
    }, ANIMATION_DURATION / 2);
  };

  // Function to get built-in array functions based on selected language
  const getBuiltInFunctions = () => {
    if (language === 'cpp') {
      return [
        { name: 'size()', description: 'Returns the number of elements in the array' },
        { name: 'empty()', description: 'Checks if the array is empty' },
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
        { name: 'sort()', description: 'Sorts elements in ascending order (from <algorithm>)' },
        { name: 'reverse()', description: 'Reverses the order of elements (from <algorithm>)' },
        { name: 'find()', description: 'Finds element with specific value (from <algorithm>)' },
        { name: 'count()', description: 'Counts elements with specific value (from <algorithm>)' },
        { name: 'max_element()', description: 'Returns the largest element (from <algorithm>)' },
        { name: 'min_element()', description: 'Returns the smallest element (from <algorithm>)' },
        { name: 'accumulate()', description: 'Sums up elements of array (from <numeric>)' },
        { name: 'binary_search()', description: 'Tests if value exists in sorted array (from <algorithm>)' },
        { name: 'lower_bound()', description: 'Returns iterator to first element not less than given value (from <algorithm>)' },
        { name: 'upper_bound()', description: 'Returns iterator to first element greater than given value (from <algorithm>)' }
      ];
    } else {
      return [
        { name: 'length', description: 'Returns the number of elements in the array' },
        { name: 'clone()', description: 'Creates a shallow copy of the array' },
        { name: 'toString()', description: 'Converts array to string' },
        { name: 'toArray()', description: 'Converts collection to array (for ArrayList)' },
        { name: 'add()', description: 'Adds element to ArrayList' },
        { name: 'remove()', description: 'Removes element from ArrayList' },
        { name: 'get()', description: 'Returns element at specified index from ArrayList' },
        { name: 'set()', description: 'Changes element at specified index in ArrayList' },
        { name: 'size()', description: 'Returns number of elements in ArrayList' },
        { name: 'clear()', description: 'Removes all elements from ArrayList' },
        { name: 'isEmpty()', description: 'Checks if ArrayList is empty' },
        { name: 'contains()', description: 'Checks if ArrayList contains specified element' },
        { name: 'indexOf()', description: 'Returns position of first occurrence of specified element' },
        { name: 'lastIndexOf()', description: 'Returns position of last occurrence of specified element' },
        { name: 'subList()', description: 'Returns portion of list between specified indices' },
        { name: 'toArray()', description: 'Converts ArrayList to array' },
        { name: 'sort()', description: 'Sorts elements in ascending order (Arrays.sort() or Collections.sort())' },
        { name: 'binarySearch()', description: 'Searches for value in sorted array (Arrays.binarySearch())' },
        { name: 'fill()', description: 'Fills array with specified element (Arrays.fill())' },
        { name: 'equals()', description: 'Compares two arrays (Arrays.equals())' },
        { name: 'copyOf()', description: 'Copies array with new length (Arrays.copyOf())' },
        { name: 'copyOfRange()', description: 'Copies specified range of array (Arrays.copyOfRange())' },
        { name: 'asList()', description: 'Returns fixed-size list backed by array (Arrays.asList())' }
      ];
    }
  };

  const renderSampleCode = () => {
    if (language === 'cpp') {
      return `
// C++ Array Declaration and Initialization
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Static Array
    int staticArray[5] = {1, 2, 3, 4, 5};
    
    // Dynamic Array (Vector)
    vector<int> dynamicArray = {5, 2, 7, 1, 9};
    
    // Accessing elements
    cout << "Third element: " << staticArray[2] << endl;  // Output: 3
    cout << "First element: " << dynamicArray.at(0) << endl;  // Output: 5
    
    // Basic operations
    dynamicArray.push_back(10);  // Add element to end
    dynamicArray.pop_back();  // Remove last element
    
    // Inserting element at index 2
    dynamicArray.insert(dynamicArray.begin() + 2, 8);
    
    // Removing element at index 1
    dynamicArray.erase(dynamicArray.begin() + 1);
    
    // Sorting the array
    sort(dynamicArray.begin(), dynamicArray.end());
    
    // 2D Array declaration
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    // 2D vector
    vector<vector<int>> matrix2D = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    return 0;
}
`;
    } else {
      return `
// Java Array Declaration and Initialization
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;

public class ArrayExample {
    public static void main(String[] args) {
        // Static Array
        int[] staticArray = {1, 2, 3, 4, 5};
        
        // Dynamic Array (ArrayList)
        ArrayList<Integer> dynamicArray = new ArrayList<>(Arrays.asList(5, 2, 7, 1, 9));
        
        // Accessing elements
        System.out.println("Third element: " + staticArray[2]);  // Output: 3
        System.out.println("First element: " + dynamicArray.get(0));  // Output: 5
        
        // Basic operations
        dynamicArray.add(10);  // Add element to end
        dynamicArray.remove(dynamicArray.size() - 1);  // Remove last element
        
        // Inserting element at index 2
        dynamicArray.add(2, 8);
        
        // Removing element at index 1
        dynamicArray.remove(1);
        
        // Sorting the array
        Collections.sort(dynamicArray);
        
        // 2D Array declaration
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        };
        
        // 2D ArrayList
        ArrayList<ArrayList<Integer>> matrix2D = new ArrayList<>();
        ArrayList<Integer> row1 = new ArrayList<>(Arrays.asList(1, 2, 3, 4));
        ArrayList<Integer> row2 = new ArrayList<>(Arrays.asList(5, 6, 7, 8));
        ArrayList<Integer> row3 = new ArrayList<>(Arrays.asList(9, 10, 11, 12));
        matrix2D.add(row1);
        matrix2D.add(row2);
        matrix2D.add(row3);
    }
}
`;
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
            <h1 className="text-3xl font-bold text-center mb-4">Array Data Structures</h1>

            {/* Language Toggle - Using the style from your section selectors */}
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
                    <h2 className="text-2xl font-bold mb-2">Introduction to Arrays</h2>
                    <p className="text-slate-300 mb-2">The fundamental data structure for sequential storage</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg text-slate-300">
                      An array is a collection of elements of the same type stored at contiguous memory locations.
                      It is the simplest data structure where each data element can be randomly accessed by using its index number.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Key Characteristics:</h3>
                    <ul className="list-disc pl-8 space-y-2 text-slate-300">
                      <li>Elements are stored in contiguous memory locations</li>
                      <li>Random access (O(1) time complexity for access by index)</li>
                      <li>Fixed size for static arrays, dynamic size for vector/ArrayList</li>
                      <li>All elements must be of the same data type</li>
                      <li>Index-based (starting from 0 in most languages)</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Types of Arrays:</h3>
                    <ul className="list-disc pl-8 space-y-2 text-slate-300">
                      <li><strong>One-dimensional arrays:</strong> Linear collection of elements (e.g., [1, 2, 3, 4])</li>
                      <li><strong>Multi-dimensional arrays:</strong> Arrays of arrays, like 2D arrays (matrices), 3D arrays, etc.</li>
                      <li><strong>Static arrays:</strong> Fixed size defined at compile time (traditional arrays)</li>
                      <li><strong>Dynamic arrays:</strong> Size can be modified at runtime (vectors in C++, ArrayList in Java)</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Common Operations and Time Complexity:</h3>
                    <ul className="list-disc pl-8 space-y-4 text-slate-300">
                      <li><strong>Access by index:</strong> O(1) - Constant time</li>
                      <li><strong>Search (unsorted array):</strong> O(n) - Linear time</li>
                      <li><strong>Search (sorted array):</strong> O(log n) - Binary search</li>
                      <li><strong>Insertion at end (dynamic array):</strong> O(1) amortized</li>
                      <li><strong>Insertion at arbitrary position:</strong> O(n) - need to shift elements</li>
                      <li><strong>Deletion:</strong> O(n) - need to shift elements</li>
                      <li><strong>Traversal:</strong> O(n) - need to visit each element</li>
                    </ul>

                    <div className="mt-6">
                      <h3 className="text-xl font-semibold">Memory Representation:</h3>
                      <p className="mt-2 text-slate-300">
                        In memory, an array of size n and data type T occupies (n × sizeof(T)) contiguous bytes.
                        For example, an integer array of size 5 in C++ (assuming 4 bytes per integer) would occupy 20 bytes of memory.
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
                        <li>Simple and easy to use</li>
                        <li>Random access in O(1) time</li>
                        <li>Good cache locality improves performance</li>
                        <li>Memory efficient (minimal overhead per element)</li>
                        <li>Foundation for other data structures</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Limitations:</h3>
                      <ul className="list-disc pl-8 space-y-2 text-slate-300">
                        <li>Fixed size for static arrays</li>
                        <li>Insertion/deletion in middle is expensive (O(n))</li>
                        <li>Memory wastage for sparse arrays</li>
                        <li>Cannot store elements of different data types</li>
                        <li>Not suitable for frequent insertions/deletions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visualization" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">1D Array Visualization</h2>
                    <p className="text-slate-300">Interact with a one-dimensional array to see operations in action</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {array1D.map((value, index) => (
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
                      <Button onClick={handleAddElement}
                        variant="outline"
                        className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                        disabled={inputValue === '' || inputValue === undefined}
                      >
                        <Plus size={16} className="mr-2" />
                        Add to End
                      </Button>
                      <Button
                        onClick={handleInsertElement}
                        variant="outline"
                        className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                        disabled={inputIndex === '' || inputIndex === undefined || inputValue === '' || inputValue === undefined}
                      >
                        <Plus size={16} className="mr-2" />
                        Insert at Index
                      </Button>
                      <Button onClick={handleRemoveElement}
                        variant="destructive"
                        className="bg-red-800 hover:bg-red-700 text-white"
                        disabled={inputIndex === '' || inputIndex === undefined}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Remove at Index
                      </Button>
                      <Button onClick={handleSortArray} variant="secondary" className="bg-indigo-800 hover:bg-indigo-700 text-white">
                        <ArrowUpDown size={16} className="mr-2" />
                        Sort
                      </Button>
                      <Button onClick={handleReverseArray} variant="secondary" className="bg-indigo-800 hover:bg-indigo-700 text-white">
                        Reverse
                      </Button>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2 text-center">Operation Result ({language.toUpperCase()}):</h3>
                      <div className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
                        {language === 'cpp' ? (
                          <pre>{`vector<int> arr = {${array1D.join(', ')}};
  // Array size: ${array1D.length}
  // First element: ${array1D[0] || 'N/A'}
  // Last element: ${array1D[array1D.length - 1] || 'N/A'}`}</pre>
                        ) : (
                          <pre>{`ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(${array1D.join(', ')}));
  // Array size: ${array1D.length}
  // First element: ${array1D[0] || 'N/A'}
  // Last element: ${array1D[array1D.length - 1] || 'N/A'}`}</pre>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">2D Array Visualization</h2>
                    <p className="text-slate-300">Matrix representation and operations</p>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 place-items-center">
                      <table className="border-collapse border border-slate-600">
                        <tbody>
                          {array2D.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((value, colIndex) => (
                                <td
                                  key={colIndex}
                                  className={`border border-slate-600 p-4 text-center
                                    ${animating2DIndex && animating2DIndex.row === rowIndex && animating2DIndex.col === colIndex
                                      ? 'bg-blue-600 animate-pulse'
                                      : 'bg-slate-700'}`}
                                >
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2 text-center">2D Array Code Representation ({language.toUpperCase()}):</h3>
                      <div className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
                        {language === 'cpp' ? (
                          <pre>{`// 2D Array (Matrix) 
  vector<vector<int>> matrix = {
  ${array2D.map(row => `    {${row.join(', ')}}`).join(',\n')}
  };
  
  // Accessing element at position [1][2]: ${array2D[1] ? array2D[1][2] : 'N/A'}
  // Number of rows: ${array2D.length}
  // Number of columns in first row: ${array2D[0] ? array2D[0].length : 0}`}</pre>
                        ) : (
                          <pre>{`// 2D Array (Matrix)
  int[][] matrix = {
  ${array2D.map(row => `    {${row.join(', ')}}`).join(',\n')}
  };
  
  // Accessing element at position [1][2]: ${array2D[1] ? array2D[1][2] : 'N/A'}
  // Number of rows: ${array2D.length}
  // Number of columns in first row: ${array2D[0] ? array2D[0].length : 0}`}</pre>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="builtInFunctions" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">{language.toUpperCase()} Array Built-in Functions</h2>
                    <p className="text-slate-300">Comprehensive list of built-in functions for arrays in {language.toUpperCase()}</p>
                  </div>
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
      vector<int> arr = {5, 2, 8, 1, 9};
      
      // Size of array
      cout << "Size: " << arr.size() << endl;  // Output: 5
      
      // Check if empty
      cout << "Is empty: " << (arr.empty() ? "Yes" : "No") << endl;  // Output: No
      
      // Add element to end
      arr.push_back(6);
      
      // Access elements
      cout << "First element: " << arr.front() << endl;  // Output: 5
      cout << "Last element: " << arr.back() << endl;   // Output: 6
      cout << "Element at index 2: " << arr.at(2) << endl;  // Output: 8
      
      // Sorting
      sort(arr.begin(), arr.end());
      // arr is now {1, 2, 5, 6, 8, 9}
      
      // Binary search (on sorted array)
      bool found = binary_search(arr.begin(), arr.end(), 5);
      cout << "Found 5: " << (found ? "Yes" : "No") << endl;  // Output: Yes
      
      // Find min and max
      auto minElement = min_element(arr.begin(), arr.end());
      auto maxElement = max_element(arr.begin(), arr.end());
      cout << "Min: " << *minElement << ", Max: " << *maxElement << endl;  // Output: Min: 1, Max: 9
      
      return 0;
  }`}</pre>
                      ) : (
                        <pre>{`import java.util.ArrayList;
  import java.util.Arrays;
  import java.util.Collections;
  
  public class ArrayExample {
      public static void main(String[] args) {
          ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
          
          // Size of array
          System.out.println("Size: " + arr.size());  // Output: 5
          
          // Check if empty
          System.out.println("Is empty: " + (arr.isEmpty() ? "Yes" : "No"));  // Output: No
          
          // Add element to end
          arr.add(6);
          
          // Access elements
          System.out.println("First element: " + arr.get(0));  // Output: 5
          System.out.println("Last element: " + arr.get(arr.size() - 1));  // Output: 6
          System.out.println("Element at index 2: " + arr.get(2));  // Output: 8
          
          // Sorting
          Collections.sort(arr);
          // arr is now [1, 2, 5, 6, 8, 9]
          
          // Binary search (on sorted array)
          int index = Collections.binarySearch(arr, 5);
          System.out.println("Found 5 at index: " + index);  // Output: Found 5 at index: 2
          
          // Find min and max
          int min = Collections.min(arr);
          int max = Collections.max(arr);
          System.out.println("Min: " + min + ", Max: " + max);  // Output: Min: 1, Max: 9
          
          // Remove elements
          arr.remove(Integer.valueOf(5));  // Remove value 5
          arr.remove(0);  // Remove element at index 0
          
          // Check if contains
          boolean contains = arr.contains(8);
          System.out.println("Contains 8: " + (contains ? "Yes" : "No"));  // Output: Yes
          
          // Clear array
          arr.clear();
          System.out.println("Size after clear: " + arr.size());  // Output: 0
      }
  }`}</pre>
                      )}
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
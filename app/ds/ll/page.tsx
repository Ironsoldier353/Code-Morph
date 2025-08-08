'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RefreshCw, BookOpen, Code, FileCode } from 'lucide-react';
import Link from 'next/link';

const LinkedListPage = () => {
  const [language, setLanguage] = useState('cpp');
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed] = useState(1000); // in ms
  const [nodeValues, setNodeValues] = useState([10, 20, 30]);
  const [operation, setOperation] = useState('traverse');
  const [insertValue, setInsertValue] = useState(15);
  const [insertPosition, setInsertPosition] = useState(1);
  
  // Use ref for interval to avoid dependency issues
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get max steps for current operation
  const getMaxSteps = () => {
    if (operation === 'traverse') return nodeValues.length + 1;
    if (operation === 'insert') return 4;
    if (operation === 'delete') return 3;
    return 0;
  };

  // Reset animation when operation changes
  useEffect(() => {
    setAnimationStep(0);
    stopAnimation();
    return () => stopAnimation();
  }, [operation]);

  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);

  const startAnimation = () => {
    if (isAnimating) return;
    
    if (animationStep >= getMaxSteps()) {
      resetAnimationStepOnly(); 
    }
    
    stopAnimation();
    setIsAnimating(true);
    
    animationIntervalRef.current = setInterval(() => {
      setAnimationStep(prev => {
        const next = prev + 1;
        
        // Handle the completion of operations
        if (next >= getMaxSteps()) {
          stopAnimation();
          
          // When an operation completes, update the nodeValues state
          if (operation === 'insert' && next === 4) {
            // Apply insertion
            const newArray = [...nodeValues];
            newArray.splice(insertPosition, 0, insertValue);
            setNodeValues(newArray);
          } else if (operation === 'delete' && next === 3) {
            // Apply deletion
            const newArray = [...nodeValues];
            newArray.splice(insertPosition, 1);
            setNodeValues(newArray);
          }
          
          return next; // Keep the last step visible
        }
        return next;
      });
    }, animationSpeed);
  };

  const stopAnimation = () => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
    setIsAnimating(false);
  };

  const resetAnimationStepOnly = () => {
    stopAnimation();
    setAnimationStep(0);
  };

  const resetAnimation = () => {
    stopAnimation();
    setAnimationStep(0);
    setNodeValues([10, 20, 30]); // Reset to original values
  };

  // Code examples
  const cppCode = `// C++ implementation of Singly Linked List
#include <iostream>
using namespace std;

// Node structure
class Node {
public:
    int data;
    Node* next;
    
    // Constructor
    Node(int value) {
        data = value;
        next = NULL;
    }
};

class LinkedList {
private:
    Node* head;
    
public:
    // Constructor
    LinkedList() {
        head = NULL;
    }
    
    // Insert a new node at the beginning
    void insertAtHead(int value) {
        Node* newNode = new Node(value);
        newNode->next = head;
        head = newNode;
    }
    
    // Insert at a given position (0-based index)
    void insertAt(int position, int value) {
        if (position < 0) {
            cout << "Invalid position" << endl;
            return;
        }
        
        if (position == 0) {
            insertAtHead(value);
            return;
        }
        
        Node* temp = head;
        for (int i = 0; i < position - 1 && temp != NULL; i++) {
            temp = temp->next;
        }
        
        if (temp == NULL) {
            cout << "Position out of bounds" << endl;
            return;
        }
        
        Node* newNode = new Node(value);
        newNode->next = temp->next;
        temp->next = newNode;
    }
    
    // Delete node at a given position
    void deleteAt(int position) {
        if (head == NULL) {
            cout << "List is empty" << endl;
            return;
        }
        
        Node* temp = head;
        
        if (position == 0) {
            head = head->next;
            delete temp;
            return;
        }
        
        for (int i = 0; i < position - 1 && temp != NULL; i++) {
            temp = temp->next;
        }
        
        if (temp == NULL || temp->next == NULL) {
            cout << "Position out of bounds" << endl;
            return;
        }
        
        Node* toDelete = temp->next;
        temp->next = temp->next->next;
        delete toDelete;
    }
    
    // Display the linked list
    void display() {
        Node* temp = head;
        while (temp != NULL) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
    
    // Destructor
    ~LinkedList() {
        Node* current = head;
        while (current != NULL) {
            Node* next = current->next;
            delete current;
            current = next;
        }
    }
};`;

  const javaCode = `// Java implementation of Singly Linked List
public class LinkedList {
    // Node class
    static class Node {
        int data;
        Node next;
        
        // Constructor
        Node(int value) {
            data = value;
            next = null;
        }
    }
    
    private Node head;
    
    // Constructor
    public LinkedList() {
        head = null;
    }
    
    // Insert a new node at the beginning
    public void insertAtHead(int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode;
    }
    
    // Insert at a given position (0-based index)
    public void insertAt(int position, int value) {
        if (position < 0) {
            System.out.println("Invalid position");
            return;
        }
        
        if (position == 0) {
            insertAtHead(value);
            return;
        }
        
        Node temp = head;
        for (int i = 0; i < position - 1 && temp != null; i++) {
            temp = temp.next;
        }
        
        if (temp == null) {
            System.out.println("Position out of bounds");
            return;
        }
        
        Node newNode = new Node(value);
        newNode.next = temp.next;
        temp.next = newNode;
    }
    
    // Delete node at a given position
    public void deleteAt(int position) {
        if (head == null) {
            System.out.println("List is empty");
            return;
        }
        
        Node temp = head;
        
        if (position == 0) {
            head = head.next;
            return;
        }
        
        for (int i = 0; i < position - 1 && temp != null; i++) {
            temp = temp.next;
        }
        
        if (temp == null || temp.next == null) {
            System.out.println("Position out of bounds");
            return;
        }
        
        temp.next = temp.next.next;
    }
    
    // Display the linked list
    public void display() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }
    
    // Search for a value
    public boolean search(int value) {
        Node temp = head;
        while (temp != null) {
            if (temp.data == value) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }
    
    // Get size of the list
    public int size() {
        int count = 0;
        Node temp = head;
        while (temp != null) {
            count++;
            temp = temp.next;
        }
        return count;
    }
}`;

  const renderNodes = () => {
    let currentValues = [...nodeValues];
    
    if (operation === 'insert' && animationStep >= 3 && animationStep < 4) {
      const newArray = [...currentValues];
      newArray.splice(insertPosition, 0, insertValue);
      currentValues = newArray;
    } else if (operation === 'delete' && animationStep >= 2 && animationStep < 3) {
      if (insertPosition < currentValues.length) {
        const newArray = [...currentValues];
        newArray.splice(insertPosition, 1);
        currentValues = newArray;
      }
    }
    
    // Create a row of nodes with better arrow positioning
    const nodeRow = (
      <div className="flex items-center justify-start overflow-x-auto pb-4">
        {currentValues.map((value, i) => {
          const isHighlighted = 
            (operation === 'traverse' && i === animationStep - 1) ||
            (operation === 'insert' && ((animationStep === 2 && i === insertPosition - 1) || 
                                    (animationStep === 3 && i === insertPosition))) ||
            (operation === 'delete' && ((animationStep === 2 && i === insertPosition - 1) || 
                                    (animationStep === 2 && i === insertPosition)));
          
          return (
            <div key={i} className="flex items-center">
              {/* Node */}
              <div className={`flex flex-col items-center justify-center rounded-lg ${
                isHighlighted ? 'bg-blue-600 scale-110 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
              } p-4 w-24 h-24 transition-all duration-300 border-2 ${
                isHighlighted ? 'border-blue-400' : 'border-slate-600'
              }`}>
                <div className={`text-lg font-bold ${isHighlighted ? 'text-white' : 'text-slate-200'}`}>
                  {value}
                </div>
                <div className={`text-xs ${isHighlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                  Node {i}
                </div>
              </div>
              
              {/* Arrow to next node */}
              {i < currentValues.length - 1 && (
                <div className="mx-2 flex items-center">
                  <div className={`w-12 h-2 ${
                    animationStep === i + 1 && operation === 'traverse' ? 'bg-blue-500' : 'bg-slate-500'
                  } rounded-sm transition-all duration-300`}></div>
                  <div className={`w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 ${
                    animationStep === i + 1 && operation === 'traverse' ? 'border-l-blue-500' : 'border-l-slate-500'
                  } transition-all duration-300`}></div>
                </div>
              )}
            </div>
          );
        })}
        
        {/* NULL node */}
        <div className="flex flex-col items-center justify-center rounded-lg bg-slate-600 border-2 border-slate-500 p-4 w-24 h-24">
          <div className="text-lg font-bold text-slate-300">NULL</div>
        </div>
      </div>
    );
    
    // Add new node visualization for insert operation
    if (operation === 'insert' && animationStep === 1) {
      return (
        <div className="flex flex-col mb-8">
          <div className="flex items-center mb-6 justify-center">
            <div className="flex flex-col items-center justify-center rounded-lg bg-green-600 border-2 border-green-400 p-4 w-24 h-24 mr-4 shadow-lg shadow-green-500/50">
              <div className="text-lg font-bold text-white">{insertValue}</div>
              <div className="text-xs text-green-200">New Node</div>
            </div>
            <div className="flex items-center">
              <div className="text-lg font-semibold px-4 text-slate-300">→</div>
              <div className="text-lg font-semibold text-slate-300">Ready to be inserted</div>
            </div>
          </div>
          {nodeRow}
        </div>
      );
    }
    
    return <div className="mb-8">{nodeRow}</div>;
  };
  
  const getAnimationDescription = () => {
    if (operation === 'traverse') {
      if (animationStep === 0) return "Starting traversal from head";
      if (animationStep <= nodeValues.length) {
        return `Visiting node at position ${animationStep - 1} with value ${nodeValues[animationStep - 1]}`;
      }
      return "Traversal complete";
    } else if (operation === 'insert') {
      const steps = [
        "Preparing to insert new node with value " + insertValue,
        "Creating new node with value " + insertValue,
        `Finding position ${insertPosition} for insertion`,
        `Inserting new node at position ${insertPosition}`,
        "Insertion complete"
      ];
      return steps[Math.min(animationStep, steps.length - 1)];
    } else if (operation === 'delete') {
      const steps = [
        `Preparing to delete node at position ${insertPosition}`,
        `Finding position ${insertPosition} for deletion`,
        `Updating references to skip node at position ${insertPosition}`,
        "Deletion complete"
      ];
      return steps[Math.min(animationStep, steps.length - 1)];
    }
    return "";
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
            <h1 className="text-3xl font-bold text-center mb-4">Singly Linked List</h1>

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
                  Common Operations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="theory" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">Introduction to Linked Lists</h2>
                    <p className="text-slate-300 mb-2">Dynamic data structure with non-contiguous memory allocation</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg text-slate-300">
                      A singly linked list is a linear data structure that consists of nodes where each node contains data and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked lists do not require contiguous memory allocation, making insertions and deletions more efficient at certain positions.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Key Characteristics:</h3>
                    <ul className="list-disc pl-8 space-y-2 text-slate-300">
                      <li>Dynamic size (can grow and shrink as needed)</li>
                      <li>Non-contiguous memory allocation</li>
                      <li>Sequential access (no random access)</li>
                      <li>Efficient insertion and deletion at known positions</li>
                      <li>Each node contains data and a pointer to the next node</li>
                      <li>The last node points to NULL, indicating the end of the list</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">How Linked Lists Work:</h3>
                    <ul className="list-disc pl-8 space-y-2 text-slate-300">
                      <li><strong>Node Structure:</strong> Each node contains two parts: data (the actual value) and next (pointer to the next node).</li>
                      <li><strong>Head Pointer:</strong> The linked list maintains a head pointer that points to the first node in the list.</li>
                      <li><strong>Traversal:</strong> To access any element, you must start from the head and follow the next pointers sequentially.</li>
                      <li><strong>Dynamic Memory:</strong> Nodes are allocated dynamically as needed, allowing the list to grow during runtime.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Common Operations and Time Complexity:</h3>
                    <ul className="list-disc pl-8 space-y-4 text-slate-300">
                      <li><strong>Access by Index:</strong> O(n) - Must traverse from head to reach a specific position</li>
                      <li><strong>Insert at Beginning:</strong> O(1) - Constant time operation</li>
                      <li><strong>Insert at End:</strong> O(n) - Need to traverse to the end first (O(1) with tail pointer)</li>
                      <li><strong>Insert at Position:</strong> O(n) - Need to traverse to the position first</li>
                      <li><strong>Delete at Beginning:</strong> O(1) - Constant time operation</li>
                      <li><strong>Delete at End:</strong> O(n) - Need to find the second-last node</li>
                      <li><strong>Delete at Position:</strong> O(n) - Need to traverse to the position first</li>
                      <li><strong>Search:</strong> O(n) - May need to traverse the entire list</li>
                    </ul>

                    <div className="bg-slate-900 p-4 rounded-lg mt-6 border border-slate-700">
                      <h3 className="text-xl font-semibold">Implementation in {language.toUpperCase()}</h3>
                      <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto mt-2">
                        <code>{language === 'cpp' ? cppCode : javaCode}</code>
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
                        <li>Dynamic size - can grow or shrink during runtime</li>
                        <li>Efficient insertion and deletion at the beginning (O(1))</li>
                        <li>Memory efficient - allocates exactly what is needed</li>
                        <li>No memory waste (unlike arrays with unused allocated space)</li>
                        <li>Easy to implement stacks and queues</li>
                        <li>No need to declare size beforehand</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Limitations:</h3>
                      <ul className="list-disc pl-8 space-y-2 text-slate-300">
                        <li>No random access - must traverse from head</li>
                        <li>Extra memory overhead for storing pointers</li>
                        <li>Not cache-friendly due to non-contiguous memory</li>
                        <li>Cannot use binary search efficiently</li>
                        <li>Reverse traversal is not straightforward</li>
                        <li>No constant time access to elements by index</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Comparison with Arrays</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700">
                      <thead className="bg-slate-900">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Feature</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Linked List</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Array</th>
                        </tr>
                      </thead>
                      <tbody className="bg-slate-800 divide-y divide-slate-700">
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Memory Layout</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Non-contiguous</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Contiguous</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Size</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Dynamic</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Fixed (in most cases)</td>
                        </tr>
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Access Time</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(n)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1)</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Insertion at Beginning</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(n)</td>
                        </tr>
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Insertion at End</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(n)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1)</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Deletion at Beginning</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(n)</td>
                        </tr>
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Memory Overhead</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">High (extra pointers)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Low</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Cache Performance</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Poor</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Good</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visualization" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Interactive Linked List Visualization</h2>
                    <p className="text-slate-300">Watch how different operations work on a linked list</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-4 mb-4 justify-center">
                      <Button 
                        variant={operation === 'traverse' ? 'default' : 'outline'} 
                        onClick={() => setOperation('traverse')}
                        className={operation === 'traverse' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'}
                      >
                        Traverse
                      </Button>
                      <Button 
                        variant={operation === 'insert' ? 'default' : 'outline'} 
                        onClick={() => setOperation('insert')}
                        className={operation === 'insert' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'}
                      >
                        Insert
                      </Button>
                      <Button 
                        variant={operation === 'delete' ? 'default' : 'outline'} 
                        onClick={() => setOperation('delete')}
                        className={operation === 'delete' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'}
                      >
                        Delete
                      </Button>
                    </div>
                    
                    {(operation === 'insert' || operation === 'delete') && (
                      <div className="flex items-center justify-center gap-4 mb-4">
                        {operation === 'insert' && (
                          <div className="flex items-center gap-2">
                            <label htmlFor="insertValue" className="text-slate-300">Value:</label>
                            <Input
                              id="insertValue"
                              type="number"
                              className="bg-slate-700 border-slate-600 focus:border-indigo-500 text-white w-20"
                              value={insertValue}
                              onChange={(e) => setInsertValue(parseInt(e.target.value) || 0)}
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <label htmlFor="insertPosition" className="text-slate-300">Position:</label>
                          <Input
                            id="insertPosition"
                            type="number"
                            className="bg-slate-700 border-slate-600 focus:border-indigo-500 text-white w-20"
                            value={insertPosition}
                            onChange={(e) => setInsertPosition(parseInt(e.target.value) || 0)}
                            min={0}
                            max={nodeValues.length}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    {renderNodes()}
                  </div>
                  
                  <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-lg text-center">
                    <p className="font-semibold text-slate-200">{getAnimationDescription()}</p>
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-6">
                    <Button 
                      onClick={startAnimation} 
                      disabled={isAnimating}
                      className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white"
                    >
                      <Play className="h-4 w-4" /> Start
                    </Button>
                    <Button 
                      onClick={stopAnimation} 
                      disabled={!isAnimating}
                      className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    >
                      <Pause className="h-4 w-4" /> Pause
                    </Button>
                    <Button 
                      onClick={resetAnimation} 
                      className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    >
                      <RefreshCw className="h-4 w-4" /> Reset
                    </Button>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-center">Current State ({language.toUpperCase()}):</h3>
                    <div className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
                      {language === 'cpp' ? (
                        <pre>{`// Current Linked List State
LinkedList list;
${nodeValues.map(val => `list.insertAtTail(${val});`).join('\n')}
// List: ${nodeValues.join(' -> ')} -> NULL
// Size: ${nodeValues.length} nodes`}</pre>
                      ) : (
                        <pre>{`// Current Linked List State
LinkedList list = new LinkedList();
${nodeValues.map(val => `list.insertAtTail(${val});`).join('\n')}
// List: ${nodeValues.join(' -> ')} -> null
// Size: ${nodeValues.length} nodes`}</pre>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="builtInFunctions" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Common Linked List Operations</h2>
                    <p className="text-slate-300">Essential operations and their implementations</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Operations Reference</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-700">
                        <thead className="bg-slate-900">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Operation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Time Complexity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-slate-800 divide-y divide-slate-700">
                          <tr className="bg-slate-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">insertAtHead(value)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">O(1)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Insert a new node at the beginning</td>
                          </tr>
                          <tr className="bg-slate-800/40">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">insertAtTail(value)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Insert a new node at the end</td>
                          </tr>
                          <tr className="bg-slate-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">insertAt(position, value)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Insert a new node at specified position</td>
                          </tr>
                          <tr className="bg-slate-800/40">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">deleteAtHead()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">O(1)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Remove the first node</td>
                          </tr>
                          <tr className="bg-slate-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">deleteAtTail()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Remove the last node</td>
                          </tr>
                          <tr className="bg-slate-800/40">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">deleteAt(position)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Remove node at specified position</td>
                          </tr>
                          <tr className="bg-slate-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">search(value)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Search for a value in the list</td>
                          </tr>
                          <tr className="bg-slate-800/40">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">display()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Print all elements in the list</td>
                          </tr>
                          <tr className="bg-slate-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">size()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Count the number of nodes</td>
                          </tr>
                          <tr className="bg-slate-800/40">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">reverse()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Reverse the order of nodes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 text-center">Complete Example Usage</h3>
                      <div className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
                        {language === 'cpp' ? (
                          <pre>{`#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    
    Node(int value) {
        data = value;
        next = nullptr;
    }
};

class LinkedList {
private:
    Node* head;
    
public:
    LinkedList() { head = nullptr; }
    
    // Insert at the beginning
    void insertAtHead(int value) {
        Node* newNode = new Node(value);
        newNode->next = head;
        head = newNode;
        cout << "Inserted " << value << " at head" << endl;
    }
    
    // Insert at the end
    void insertAtTail(int value) {
        Node* newNode = new Node(value);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
        cout << "Inserted " << value << " at tail" << endl;
    }
    
    // Search for a value
    bool search(int value) {
        Node* temp = head;
        int position = 0;
        while (temp != nullptr) {
            if (temp->data == value) {
                cout << "Found " << value << " at position " << position << endl;
                return true;
            }
            temp = temp->next;
            position++;
        }
        cout << "Value " << value << " not found" << endl;
        return false;
    }
    
    // Display the list
    void display() {
        cout << "List: ";
        Node* temp = head;
        while (temp != nullptr) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
    
    // Get size
    int size() {
        int count = 0;
        Node* temp = head;
        while (temp != nullptr) {
            count++;
            temp = temp->next;
        }
        return count;
    }
};

int main() {
    LinkedList list;
    
    // Insert some values
    list.insertAtHead(10);
    list.insertAtHead(20);
    list.insertAtTail(30);
    list.insertAtTail(40);
    
    // Display the list
    list.display();  // Output: List: 20 -> 10 -> 30 -> 40 -> NULL
    
    // Search for values
    list.search(30);  // Found 30 at position 2
    list.search(50);  // Value 50 not found
    
    // Get size
    cout << "Size: " << list.size() << endl;  // Size: 4
    
    return 0;
}`}</pre>
                        ) : (
                          <pre>{`class Node {
    int data;
    Node next;
    
    Node(int value) {
        data = value;
        next = null;
    }
}

class LinkedList {
    private Node head;
    
    public LinkedList() {
        head = null;
    }
    
    // Insert at the beginning
    public void insertAtHead(int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode;
        System.out.println("Inserted " + value + " at head");
    }
    
    // Insert at the end
    public void insertAtTail(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
        System.out.println("Inserted " + value + " at tail");
    }
    
    // Search for a value
    public boolean search(int value) {
        Node temp = head;
        int position = 0;
        while (temp != null) {
            if (temp.data == value) {
                System.out.println("Found " + value + " at position " + position);
                return true;
            }
            temp = temp.next;
            position++;
        }
        System.out.println("Value " + value + " not found");
        return false;
    }
    
    // Display the list
    public void display() {
        System.out.print("List: ");
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }
    
    // Get size
    public int size() {
        int count = 0;
        Node temp = head;
        while (temp != null) {
            count++;
            temp = temp.next;
        }
        return count;
    }
}

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        
        // Insert some values
        list.insertAtHead(10);
        list.insertAtHead(20);
        list.insertAtTail(30);
        list.insertAtTail(40);
        
        // Display the list
        list.display();  // Output: List: 20 -> 10 -> 30 -> 40 -> null
        
        // Search for values
        list.search(30);  // Found 30 at position 2
        list.search(50);  // Value 50 not found
        
        // Get size
        System.out.println("Size: " + list.size());  // Size: 4
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
};

export default LinkedListPage;
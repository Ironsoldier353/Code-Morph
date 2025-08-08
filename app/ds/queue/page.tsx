'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RefreshCw, BookOpen, Code, FileCode } from 'lucide-react';
import Link from 'next/link';

const QueuePage = () => {
  const [language, setLanguage] = useState('cpp');
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed] = useState(1000); // in ms
  const [queueValues, setQueueValues] = useState([10, 20, 30]);
  const [operation, setOperation] = useState('enqueue');
  const [enqueueValue, setEnqueueValue] = useState(40);
  const [queueCapacity] = useState(5); // Fixed capacity for visualization

  // Use ref for interval to avoid dependency issues
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get max steps for current operation
  const getMaxSteps = () => {
    if (operation === 'enqueue') return 3;
    if (operation === 'dequeue') return 3;
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

          // Update queue state on operation completion
          if (operation === 'enqueue' && next === 3) {
            if (queueValues.length < queueCapacity) {
              setQueueValues([...queueValues, enqueueValue]);
            }
          } else if (operation === 'dequeue' && next === 3) {
            if (queueValues.length > 0) {
              setQueueValues(queueValues.slice(1));
            }
          }

          return next;
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
    setQueueValues([10, 20, 30]); // Reset to original values
  };

  // Code examples
  const cppCode = `// C++ implementation of Queue using array
#include <iostream>
using namespace std;

class Queue {
private:
    int capacity;
    int* arr;
    int front;
    int rear;
    int size;
public:
    Queue(int cap) {
        capacity = cap;
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    // Add an element to the queue
    bool enqueue(int value) {
        if (size >= capacity) {
            cout << "Queue Overflow" << endl;
            return false;
        }
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        size++;
        return true;
    }
    
    // Remove an element from the queue
    int dequeue() {
        if (size == 0) {
            cout << "Queue Underflow" << endl;
            return -1;
        }
        int value = arr[front];
        front = (front + 1) % capacity;
        size--;
        return value;
    }
    
    // Get front element
    int peek() {
        if (size == 0) {
            cout << "Queue is empty" << endl;
            return -1;
        }
        return arr[front];
    }
    
    // Check if queue is empty
    bool isEmpty() {
        return size == 0;
    }
    
    // Get current size
    int getSize() {
        return size;
    }
    
    // Display queue
    void display() {
        if (size == 0) {
            cout << "Queue is empty" << endl;
            return;
        }
        cout << "Queue: ";
        for (int i = 0; i < size; i++) {
            cout << arr[(front + i) % capacity] << " ";
        }
        cout << endl;
    }
    
    // Destructor
    ~Queue() {
        delete[] arr;
    }
};`;

  const javaCode = `// Java implementation of Queue using array
public class Queue {
    private int capacity;
    private int[] arr;
    private int front;
    private int rear;
    private int size;
    
    public Queue(int cap) {
        capacity = cap;
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    // Add an element to the queue
    public boolean enqueue(int value) {
        if (size >= capacity) {
            System.out.println("Queue Overflow");
            return false;
        }
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        size++;
        return true;
    }
    
    // Remove an element from the queue
    public int dequeue() {
        if (size == 0) {
            System.out.println("Queue Underflow");
            return -1;
        }
        int value = arr[front];
        front = (front + 1) % capacity;
        size--;
        return value;
    }
    
    // Get front element
    public int peek() {
        if (size == 0) {
            System.out.println("Queue is empty");
            return -1;
        }
        return arr[front];
    }
    
    // Check if queue is empty
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Get current size
    public int getSize() {
        return size;
    }
    
    // Display queue
    public void display() {
        if (size == 0) {
            System.out.println("Queue is empty");
            return;
        }
        System.out.print("Queue: ");
        for (int i = 0; i < size; i++) {
            System.out.print(arr[(front + i) % capacity] + " ");
        }
        System.out.println();
    }
}`;

  const renderQueue = () => {
    let currentValues = [...queueValues];

    if (operation === 'enqueue' && animationStep >= 2 && animationStep < 3) {
      if (currentValues.length < queueCapacity) {
        currentValues = [...currentValues, enqueueValue];
      }
    } else if (operation === 'dequeue' && animationStep >= 2 && animationStep < 3) {
      if (currentValues.length > 0) {
        currentValues = currentValues.slice(1);
      }
    }

    const queueRow = (
      <div className="flex items-center justify-start overflow-x-auto pb-4">
        {currentValues.map((value, i) => {
          const isHighlighted =
            (operation === 'enqueue' && animationStep === 2 && i === currentValues.length - 1) ||
            (operation === 'dequeue' && animationStep === 2 && i === 0);

          return (
            <div key={i} className="flex items-center">
              <div className={`flex flex-col items-center justify-center rounded-lg ${
                isHighlighted ? 'bg-blue-600 scale-110 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
              } p-4 w-24 h-24 transition-all duration-300 border-2 ${
                isHighlighted ? 'border-blue-400' : 'border-slate-600'
              }`}>
                <div className={`text-lg font-bold ${isHighlighted ? 'text-white' : 'text-slate-200'}`}>
                  {value}
                </div>
                <div className={`text-xs ${isHighlighted ? 'text-blue-200' : 'text-slate-400'}`}>
                  Position {i}
                </div>
              </div>

              {i < currentValues.length - 1 && (
                <div className="mx-2 flex items-center">
                  <div className="w-12 h-2 bg-slate-500 rounded-sm"></div>
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-500"></div>
                </div>
              )}
            </div>
          );
        })}

        {currentValues.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg bg-slate-600 border-2 border-slate-500 p-4 w-24 h-24">
            <div className="text-lg font-bold text-slate-300">Empty</div>
          </div>
        )}
      </div>
    );

    if (operation === 'enqueue' && animationStep === 1) {
      return (
        <div className="flex flex-col mb-8">
          <div className="flex items-center mb-6 justify-center">
            <div className="flex flex-col items-center justify-center rounded-lg bg-green-600 border-2 border-green-400 p-4 w-24 h-24 mr-4 shadow-lg shadow-green-500/50">
              <div className="text-lg font-bold text-white">{enqueueValue}</div>
              <div className="text-xs text-green-200">New Element</div>
            </div>
            <div className="flex items-center">
              <div className="text-lg font-semibold px-4 text-slate-300">→</div>
              <div className="text-lg font-semibold text-slate-300">Ready to enqueue</div>
            </div>
          </div>
          {queueRow}
        </div>
      );
    }

    return <div className="mb-8">{queueRow}</div>;
  };

  const getAnimationDescription = () => {
    if (operation === 'enqueue') {
      const steps = [
        `Preparing to enqueue value ${enqueueValue}`,
        `Checking queue capacity (${queueValues.length}/${queueCapacity})`,
        `Adding ${enqueueValue} to the rear`,
        "Enqueue complete"
      ];
      return steps[Math.min(animationStep, steps.length - 1)];
    } else if (operation === 'dequeue') {
      const steps = [
        "Preparing to dequeue from front",
        "Accessing front element",
        "Removing front element",
        "Dequeue complete"
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
            <h1 className="text-3xl font-bold text-center mb-4">Queue</h1>
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
                    <h2 className="text-2xl font-bold mb-2">Introduction to Queues</h2>
                    <p className="text-slate-300 mb-2">First-In-First-Out (FIFO) data structure</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg text-slate-300">
                      A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle, where elements are added at the rear and removed from the front. It can be implemented using arrays or linked lists, with array-based implementations often using a circular buffer to optimize space usage.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Key Characteristics:</h3>
                    <ul className="list-disc pl-8 space-y-2 text-slate-300">
                      <li>FIFO (First-In-First-Out) order</li>
                      <li>Two main pointers: front (for dequeuing) and rear (for enqueuing)</li>
                      <li>Supports two primary operations: enqueue (add) and dequeue (remove)</li>
                      <li>Can be implemented using arrays or linked lists</li>
                      <li>Useful for task scheduling, breadth-first search, and resource management</li>
                      <li>Fixed capacity in array-based implementation, dynamic in linked list-based</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">How Queues Work:</h3>
                    <ul className="list-disc pl-8 space-y-2 text-slate-300">
                      <li><strong>Enqueue:</strong> Adds an element to the rear of the queue.</li>
                      <li><strong>Dequeue:</strong> Removes and returns the front element of the queue.</li>
                      <li><strong>Front/Peek:</strong> Returns the front element without removing it.</li>
                      <li><strong>IsEmpty:</strong> Checks if the queue is empty.</li>
                      <li><strong>IsFull:</strong> Checks if the queue is full (array-based implementation).</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">Common Operations and Time Complexity:</h3>
                    <ul className="list-disc pl-8 space-y-4 text-slate-300">
                      <li><strong>Enqueue:</strong> O(1) - Constant time for both array and linked list implementations</li>
                      <li><strong>Dequeue:</strong> O(1) - Constant time for both implementations</li>
                      <li><strong>Peek/Front:</strong> O(1) - Access the front element</li>
                      <li><strong>IsEmpty:</strong> O(1) - Check if queue is empty</li>
                      <li><strong>IsFull:</strong> O(1) - Check if queue is full (array-based)</li>
                      <li><strong>Size:</strong> O(1) - Return current number of elements</li>
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
                        <li>Simple and intuitive FIFO structure</li>
                        <li>Constant time O(1) for enqueue and dequeue operations</li>
                        <li>Efficient for task scheduling and buffering</li>
                        <li>Linked list implementation allows dynamic size</li>
                        <li>Circular queue optimizes space usage in array implementation</li>
                        <li>Supports real-world applications like printer queues</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Limitations:</h3>
                      <ul className="list-disc pl-8 space-y-2 text-slate-300">
                        <li>Array-based queues have fixed capacity</li>
                        <li>No random access to elements</li>
                        <li>Linked list implementation has memory overhead for pointers</li>
                        <li>Not suitable for searching or sorting</li>
                        <li>Circular queue implementation is more complex</li>
                        <li>Limited to FIFO access pattern</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Comparison with Stacks</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700">
                      <thead className="bg-slate-900">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Feature</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Queue</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Stack</th>
                        </tr>
                      </thead>
                      <tbody className="bg-slate-800 divide-y divide-slate-700">
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Order</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">FIFO (First-In-First-Out)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">LIFO (Last-In-First-Out)</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Primary Operations</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Enqueue, Dequeue</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Push, Pop</td>
                        </tr>
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Access Time</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1) for front/rear</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">O(1) for top</td>
                        </tr>
                        <tr className="bg-slate-800/40">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Use Cases</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Task scheduling, BFS</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Function calls, DFS</td>
                        </tr>
                        <tr className="bg-slate-800/70">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Implementation</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Array, Linked List</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Array, Linked List</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visualization" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Interactive Queue Visualization</h2>
                    <p className="text-slate-300">Watch how queue operations work</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-4 mb-4 justify-center">
                      <Button
                        variant={operation === 'enqueue' ? 'default' : 'outline'}
                        onClick={() => setOperation('enqueue')}
                        className={operation === 'enqueue'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'}
                      >
                        Enqueue
                      </Button>
                      <Button
                        variant={operation === 'dequeue' ? 'default' : 'outline'}
                        onClick={() => setOperation('dequeue')}
                        className={operation === 'dequeue'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'}
                      >
                        Dequeue
                      </Button>
                    </div>

                    {operation === 'enqueue' && (
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <label htmlFor="enqueueValue" className="text-slate-300">Value:</label>
                          <Input
                            id="enqueueValue"
                            type="number"
                            className="bg-slate-700 border-slate-600 focus:border-indigo-500 text-white w-20"
                            value={enqueueValue}
                            onChange={(e) => setEnqueueValue(parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center mb-6">
                    {renderQueue()}
                  </div>

                  <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-lg text-center">
                    <p className="font-semibold text-slate-200">{getAnimationDescription()}</p>
                  </div>

                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      onClick={startAnimation}
                      disabled={isAnimating || (operation === 'enqueue' && queueValues.length >= queueCapacity) || (operation === 'dequeue' && queueValues.length === 0)}
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
                        <pre>{`// Current Queue State
Queue queue(${queueCapacity});
${queueValues.map(val => `queue.enqueue(${val});`).join('\n')}
// Queue: ${queueValues.join(' ')}
// Size: ${queueValues.length} elements`}</pre>
                      ) : (
                        <pre>{`// Current Queue State
Queue queue = new Queue(${queueCapacity});
${queueValues.map(val => `queue.enqueue(${val});`).join('\n')}
// Queue: ${queueValues.join(' ')}
// Size: ${queueValues.length} elements`}</pre>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="builtInFunctions" className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Common Queue Operations</h2>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">enqueue(value)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">O(1)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Add element to the rear</td>
                          </tr>
                          <tr className="bg-slate-800/40">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">dequeue()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">O(1)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Remove and return front element</td>
                          </tr>
                          <tr className="bg-slate-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">peek()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">O(1)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Return front element without removing</td>
                          </tr>
                          <tr className="bg-slate-800/40">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">isEmpty()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">O(1)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Check if queue is empty</td>
                          </tr>
                          <tr className="bg-slate-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">isFull()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">O(1)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Check if queue is full (array-based)</td>
                          </tr>
                          <tr className="bg-slate-800/40">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">getSize()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">O(1)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Return current number of elements</td>
                          </tr>
                          <tr className="bg-slate-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-mono">display()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-400">O(n)</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-slate-300">Print all elements in the queue</td>
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

class Queue {
private:
    int capacity;
    int* arr;
    int front;
    int rear;
    int size;
public:
    Queue(int cap) {
        capacity = cap;
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    bool enqueue(int value) {
        if (size >= capacity) {
            cout << "Queue Overflow" << endl;
            return false;
        }
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        size++;
        cout << "Enqueued " << value << endl;
        return true;
    }
    
    int dequeue() {
        if (size == 0) {
            cout << "Queue Underflow" << endl;
            return -1;
        }
        int value = arr[front];
        front = (front + 1) % capacity;
        size--;
        cout << "Dequeued " << value << endl;
        return value;
    }
    
    void display() {
        if (size == 0) {
            cout << "Queue is empty" << endl;
            return;
        }
        cout << "Queue: ";
        for (int i = 0; i < size; i++) {
            cout << arr[(front + i) % capacity] << " ";
        }
        cout << endl;
    }
    
    ~Queue() {
        delete[] arr;
    }
};

int main() {
    Queue queue(5);
    
    // Enqueue some values
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    
    // Display queue
    queue.display();  // Output: Queue: 10 20 30
    
    // Dequeue
    queue.dequeue();  // Output: Dequeued 10
    queue.display();  // Output: Queue: 20 30
    
    // Enqueue more
    queue.enqueue(40);
    queue.display();  // Output: Queue: 20 30 40
    
    return 0;
}`}</pre>
                        ) : (
                          <pre>{`public class Queue {
    private int capacity;
    private int[] arr;
    private int front;
    private int rear;
    private int size;
    
    public Queue(int cap) {
        capacity = cap;
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    public boolean enqueue(int value) {
        if (size >= capacity) {
            System.out.println("Queue Overflow");
            return false;
        }
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        size++;
        System.out.println("Enqueued " + value);
        return true;
    }
    
    public int dequeue() {
        if (size == 0) {
            System.out.println("Queue Underflow");
            return -1;
        }
        int value = arr[front];
        front = (front + 1) % capacity;
        size--;
        System.out.println("Dequeued " + value);
        return value;
    }
    
    public void display() {
        if (size == 0) {
            System.out.println("Queue is empty");
            return;
        }
        System.out.print("Queue: ");
        for (int i = 0; i < size; i++) {
            System.out.print(arr[(front + i) % capacity] + " ");
        }
        System.out.println();
    }
}

class QueueExample {
    public static void main(String[] args) {
        Queue queue = new Queue(5);
        
        // Enqueue some values
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        
        // Display queue
        queue.display();  // Output: Queue: 10 20 30
        
        // Dequeue
        queue.dequeue();  // Output: Dequeued 10
        queue.display();  // Output: Queue: 20 30
        
        // Enqueue more
        queue.enqueue(40);
        queue.display();  // Output: Queue: 20 30 40
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

export default QueuePage;
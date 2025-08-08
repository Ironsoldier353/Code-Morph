export interface DataStructure {
    id: string;
    name: string;
    description: string;
    theory: string;
    Link?: string;
    category: string;
}

export const dataStructures: DataStructure[] = [
    {
        id: "1",
        name: "Array",
        description: "Contiguous memory location storing multiple elements of the same type",
        theory: "Fixed-size collection of elements accessed by indices, allowing random access and efficient iteration",
        "Link": "/ds/array",
        category: "easy"
    },
    {
        id: "2",
        name: "Vector",
        description: "Dynamic array with automatic resizing capability",
        theory: "Templated container from STL that provides dynamic array functionality with automatic memory management",
        "Link": "/ds/vector",
        category: "easy"
    },
    {
        id: "3",
        name: "Single Linked List",
        description: "Linear collection of elements where each element points to the next",
        theory: "Dynamic data structure with nodes containing data and reference to next node",
        "Link": "/ds/ll",
        category: "medium"
    },
    {
        id: "5",
        name: "Queue",
        description: "First-In-First-Out (FIFO) data structure",
        theory: "Linear data structure following FIFO principle, supporting enqueue and dequeue operations",
        "Link": "/ds/queue",
        category: "easy"
    }
];

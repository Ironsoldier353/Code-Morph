export interface Problem {
    id: string;
    name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    Link?: string;
    leetcodeLink?: string;
}

export interface Algorithm {
    id: number;
    name: string;
    description: string;
    category: string;
    problems: Problem[];
}


export const algorithms: Algorithm[] = [
    {
        id: 1,
        name: "Hare and Tortoise",
        description: "Floyd's cycle detection algorithm using two pointers moving at different speeds",
        category: "Linked List",
        problems: [
            {
                id: "ht1",
                name: "Find Middle Node",
                difficulty: "Easy",
                description: "Find the middle node of a linked list",
                Link: "/haretortoisealgo/middleNode"
            },
            {
                id: "ht2",
                name: "Detect Cycle",
                difficulty: "Medium",
                description: "Detect if a linked list has a cycle",
                leetcodeLink: "/haretortoisealgorithm/detectCycle"
            },
        ]
    },
    {
        id: 2,
        name: "Two Pointers",
        description: "Solving problems using two pointers moving through the data structure",
        category: "Array",
        problems: [
            {
                id: "tp1",
                name: "Two Sum Sorted",
                difficulty: "Easy",
                description: "Find two numbers that add up to target in sorted array",
                leetcodeLink: "/twopointersalgorithm/twoSumSorted"
            },

        ]
    },
    {
        id: 3,
        name: "Sliding window technique",
        description: "ergfergf",
        category: "Array",
        problems: [
            {
                id: "sw1",
                name: "Maximum sum of a subarray",
                difficulty: "Medium",
                description: "Find the maximum sum of a subarray of fixed size k",
                Link: "/slidingwindowalgo/slidingWindow"
            },
            {
                id: "sw2",
                name: "Maximum Consecutive Ones After Flipping K Zeros",
                difficulty: "Medium",
                description: "Check if one string's permutation is a substring of another",
                leetcodeLink: "/slidingwindowalgo/flipKzero"
            },
        ]
    }
];
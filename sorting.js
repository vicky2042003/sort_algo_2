// Swap colors and heights visually
function swapColorHeight(i, j) {
    let e1 = document.getElementById('elem' + i);
    let e2 = document.getElementById('elem' + j);

    let tempColor = e1.style.backgroundColor;
    e1.style.backgroundColor = e2.style.backgroundColor;
    e2.style.backgroundColor = tempColor;

    let tempHeight = e1.style.height;
    e1.style.height = e2.style.height;
    e2.style.height = tempHeight;
}

// Swap numbers in the array
function swapNumber(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Helper function to add a delay
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

// Bubble Sort function
async function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swapNumber(arr, j, j + 1);  // Swap the numbers in the array
                swapColorHeight(j, j + 1);  // Visual swap of colors and heights
                await sleep(500);           // Wait for animation effect
            }
        }
    }
}

// Insertion Sort function
async function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Move elements that are greater than key to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            document.getElementById('elem' + (j + 1)).style.height = arr[j + 1] * 6 + 'px';
            await sleep(500);
            j = j - 1;
        }
        arr[j + 1] = key;

        // Adjust height of the inserted element
        document.getElementById('elem' + (j + 1)).style.height = key * 6 + 'px';
        await sleep(500);
    }
}

// Selection Sort function
async function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            swapNumber(arr, i, minIdx);   // Swap the numbers in the array
            swapColorHeight(i, minIdx);   // Visual swap of colors and heights
            await sleep(500);             // Wait for animation effect
        }
    }
}

// Function to initiate the selected sorting algorithm
async function startSorting(arr, algorithm) {
    if (algorithm === 'bubble') {
        await bubbleSort(arr);
    } else if (algorithm === 'insertion') {
        await insertionSort(arr);
    } else if (algorithm === 'selection') {
        await selectionSort(arr);
    }
}

// Sample array
let arr = [50, 40, 30, 20, 10, 60, 80, 5];
let parentDiv = document.getElementsByClassName('parentDiv')[0];
let btn = document.getElementsByClassName('startbtn');
let selectAlgorithm = document.getElementsByClassName('algorithmSelect')[0];

// Create and display divs
arr.forEach((e, i) => {
    let innerDiv = document.createElement('div');
    innerDiv.style.height = e * 6 + 'px';  // Adjust height based on array values
    innerDiv.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    innerDiv.setAttribute('id', 'elem' + i);
    innerDiv.classList.add('innerDiv');
    parentDiv.appendChild(innerDiv);
});

// Add event listener for sorting based on the selected algorithm
btn[0].addEventListener('click', () => {
    let selectedAlgorithm = selectAlgorithm.value;
    startSorting(arr, selectedAlgorithm);
});

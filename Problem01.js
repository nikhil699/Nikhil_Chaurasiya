// Iterative Approach (Using a Loop)
var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Formula-Based Approach (Using Arithmetic Series Formula)
var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};

// Recursive Approach
var sum_to_n_c = function(n) {
    if (n === 0) return 0;
    return n + sum_to_n_c(n - 1);
};

// Main function to test all implementations
function main() {
    const n = 5;  // You can change this value to test with different numbers

    console.log("Using iterative approach: sum_to_n_a(" + n + ") =", sum_to_n_a(n));
    console.log("Using formula-based approach: sum_to_n_b(" + n + ") =", sum_to_n_b(n));
    console.log("Using recursive approach: sum_to_n_c(" + n + ") =", sum_to_n_c(n));
}

// Call the main function to run the test
main();

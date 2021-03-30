#include <stdio.h>

int fibonacci(int index) {
  if(index < 3) {
    return 1;
  } else {
    return fibonacci(index - 1) + fibonacci(index - 2);
  }
}

int main(void) {
  int fib = fibonacci(20);
  printf("%d\n", fib);
  return 0;
}
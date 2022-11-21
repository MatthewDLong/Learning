#include <stdio.h>
#include <string.h>

int main(void) {
  char p[9];
  puts("Please enter a word (8 characters max)");
  scanf("%8s", p);
  if(strlen(p) > 4) {
    puts("You entered a string greater than 4 characters");
  } else {
    puts("You entered a character less than or equal too 4 characters in length");
  }
}
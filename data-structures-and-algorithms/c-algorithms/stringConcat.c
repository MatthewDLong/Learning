#include <stdio.h>
#include <string.h>

int main(void) {
  char firstName[5] = "Matt";
  char secondName[5] = "Long";
  char fullName[12];
  strcat(fullName, firstName);
  strcat(fullName, " ");
  strcat(fullName, secondName);
  puts(fullName);
  return 0;
}
#include <stdio.h>
#include <string.h>

int main(void) {
  char a[4];
  strcpy(a, "foo");
  int len = strlen(a);
  int size = sizeof(a);
  printf("length: %d\n", len);
  printf("size: %d\n", size);
  return 0;
}

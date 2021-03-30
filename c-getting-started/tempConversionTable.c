#include <stdio.h>

float CelciusFromFahrenheit(float tempF) {
  float tempC = (tempF - 32.0) * 5.0 / 9.0;
  return tempC;
}

int main(void) {
  puts("Temperature Conversion Table");
  puts("============================");
  for(float tempF = 10.0; tempF < 100.0; tempF += 5.0) {
    float tempC = CelciusFromFahrenheit(tempF);
    printf("%.1f F       |       %5.1f C \n", tempF, tempC);
  }
  puts("----------------------------");
  return 0;
}

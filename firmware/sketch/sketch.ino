// int iterator = 0;
// int SOCKETS[10] = { 26, 25, 23, 22, 21, 19, 18, 5, 4, 2 };
// int DOWN[10] = {};

// void setup() {
//   for (int i = 0; i < 10; i++) {
//     pinMode(SOCKETS[i], OUTPUT);
//   }
//   // put your setup code here, to run once:
// }

// void loop() {
//   if (iterator > 9) {
//     for (int i = 0; i < 10; i++) {
//       digitalWrite(SOCKETS[i], LOW);
//     }
//     iterator = 0;
//   }
//   DOWN[iterator] = SOCKETS[iterator];
//   for (int i = 0; i < 10; i++) {
//     digitalWrite(SOCKETS[DOWN[i]], HIGH);
//   }
//   iterator++;
//   delay(1000);
//   // put your main code here, to run repeatedly:
// }
// #include <LiquidCrystal_I2C.h>

#define SDA 12;
#define SCL 14;

int iterator = 0;
int index_i = 0;
const int SOCKETS[6] = { 23, 22, 21, 19, 18, 5 };
int DOWN[6] = {};

void setup() {
  for (int i = 0; i < 6; i++) {
    pinMode(SOCKETS[i], OUTPUT);
    digitalWrite(SOCKETS[i], HIGH);
  }
  // put your setup code here, to run once:
}

void removeFromArray(int* arr, int size, int index) {
  if (index < 0 || index >= size) {
    return;  // Invalid index
  }

  for (int i = index; i < size - 1; i++) {
    arr[i] = arr[i + 1];  // Shift elements to the left
  }
  size--;  // Decrease the size of the array
}


void loop() {
  if (iterator > 50) {
    iterator = 0;
  }
  if (index_i > 6) {
    index_i = 0;
  }
  DOWN[index_i] = SOCKETS[random(0, 6)];
  for (int i = 0; i < 6; i++) {
    if (iterator == DOWN[i]) {
      digitalWrite(DOWN[i], LOW);
    }
    if (DOWN[i] > iterator) {
      digitalWrite(DOWN[i], HIGH);
      removeFromArray(DOWN, 6, i);
    }
  }
  delay(100);
  iterator++;
  index_i++;
  // put your main code here, to run repeatedly:
}

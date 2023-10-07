int iterator = 0;
const int SOCKETS[10] = { 26, 25, 23, 22, 21, 19, 18, 5, 4, 2 };
int DOWN[10] = {};

void setup() {
  for (int i = 0; i < 10; i++) {
    pinMode(SOCKETS[i], OUTPUT);
  }
  // put your setup code here, to run once:
}

void loop() {
  if (iterator > 26) {
    for (int i = 0; i < 10; i++) {
      digitalWrite(SOCKETS[i], LOW);
    }
    iterator = 0;
  }
  DOWN[iterator] = SOCKETS[iterator];
  for (int i = 0; i < 10; i++) {
    if (iterator == i) {
      digitalWrite(DOWN[i], HIGH);
    }
  }
  iterator++;
  delay(100);
  // put your main code here, to run repeatedly:
}

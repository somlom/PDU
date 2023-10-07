#include <LiquidCrystal_I2C.h>

const int SOCKETS[4] = { 18, 19, 20, 21 };
int DOWN[4] = {};
LiquidCrystal_I2C lcd = LiquidCrystal_I2C(0x27, 16, 2);

uint8_t ON[10] = {
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
};
uint8_t OFF[10]  = {
  0b11111,
  0b10001,
  0b10001,
  0b10001,
  0b10001,
  0b10001,
  0b10001,
  0b11111,
};

void setup() {
  lcd.init();
  lcd.createChar(1, ON);
  lcd.createChar(2, OFF);
  lcd.backlight();
  // lcd.setCursor(0, 0);
  for (int i = 0; i < 4; i++) {
    pinMode(SOCKETS[i], OUTPUT);
    digitalWrite(SOCKETS[i], HIGH);

    lcd.setCursor(i, 0);
    lcd.print("\x02");

    lcd.setCursor(i, 1);
    lcd.print(i + 1);
  }
  delay(2000);
  digitalWrite(21, LOW);
}

void loop() {
  for (int i = 0; i < 4; i++) {
    lcd.setCursor(i, 0);
    // lcd.setCursor(0, 0 + i);
    // if (DOWN[i] == SOCKETS[i]) {
    if (digitalRead(SOCKETS[i]) == LOW) {
      digitalWrite(SOCKETS[i], HIGH);
      lcd.print("\x01");
    } else {
      digitalWrite(SOCKETS[i], LOW);
      lcd.print("\x02");
    }
    lcd.setCursor(i, 1);
    lcd.print(i + 1);

  }
  delay(1000); // this speeds up the simulation
  lcd.clear();
}

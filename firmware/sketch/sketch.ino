#include <LiquidCrystal_I2C.h>

const int SOCKETS[4] = {16, 17, 18, 19};
int DOWN[4] = {};
LiquidCrystal_I2C lcd = LiquidCrystal_I2C(0x27, 16, 2);
int uptime = 0;

void setup()
{
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);

  for (int i = 0; i < 4; i++)
  {
    pinMode(SOCKETS[i], OUTPUT);
    digitalWrite(SOCKETS[i], LOW);
    lcd.print("\x02");
  }

  digitalWrite(SOCKETS[0], HIGH);
  delay(2000);
}

void error(String message)
{
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("ERROR!!!");

  lcd.setCursor(0, 1);
  lcd.print(message);
}

void loop()
{
  lcd.setCursor(0, 0);
  for (int i = 0; i < 4; i++)
  {
    if (digitalRead(SOCKETS[i]) == LOW)
    {
      digitalWrite(SOCKETS[i], HIGH);
    }
    else
    {
      digitalWrite(SOCKETS[i], LOW);
    }
  }
  lcd.printf("Uptime: %d sec", uptime);
  uptime++;
  delay(1000); // this speeds up the simulation
}

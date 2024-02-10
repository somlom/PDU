#include <LiquidCrystal_I2C.h>

void printTS(LiquidCrystal_I2C lcd)
{
  // Update LCD display
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Timestamp:");
  lcd.setCursor(0, 1);
  lcd.println(getTimestamp(rtc));
}

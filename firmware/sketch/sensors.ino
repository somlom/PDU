int getVoltage()
{
  return analogRead(25);
}

int getCurrent(int socketIndex)
{
  float voltage = analogRead(socketIndex + 10) * 5 / 1023.0;
  float current = (voltage - 2.5) / 0.185;
  return current;
}
#include "RTClib.h"

void setupRTC(RTC_DS3231 rtc)
{
  rtc.begin();
  rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
}

int getSeconds(RTC_DS3231 rtc)
{
  return rtc.now().unixtime();
}

String getTimestamp(RTC_DS3231 rtc)
{
  return rtc.now().timestamp();
}
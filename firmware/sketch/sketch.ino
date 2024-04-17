#include <LiquidCrystal_I2C.h>
#include "RTClib.h"
#include "rtc.h"
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include "ArduinoJson.h"
#include <time.h>
#include "vars.h"

const int SOCKETS[4] = { 16, 17, 18, 19 };
int DOWN[4] = { 0, 0, 0, 0 };  // time in seconds

LiquidCrystal_I2C lcd = LiquidCrystal_I2C(0x27, 16, 2);
RTC_DS3231 rtc;

const char *ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 3600;
const int daylightOffset_sec = 3600;

AsyncWebServer server(80);

unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    // Serial.println("Failed to obtain time");
    return (0);
  }
  time(&now);
  return now;
}

void setup() {

  // Serial.begin(115200);
  for (int i = 0; i < 4; i++) {
    pinMode(SOCKETS[i], OUTPUT);
    digitalWrite(SOCKETS[i], HIGH);
  }

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);

  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASSWD);
  lcd.println("Connecting...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }

  rtc.begin();
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  rtc.adjust(DateTime(getTime()));

  lcd.clear();
  lcd.println(WiFi.localIP());
  // Serial.println(WiFi.localIP());

  server.on("/ping", HTTP_GET, [](AsyncWebServerRequest *request) {
    JsonDocument doc;
    int serverTs = request->getParam("ts")->value().toInt();

    doc["uptime"] = "123456789";

    String output;

    doc.shrinkToFit();  // optional

    serializeJson(doc, output);

    // Send the JSON response
    request->send(200, "application/json", output);
  });
  // Define the API endpoint
  server.on("/getTelemetry", HTTP_GET, [](AsyncWebServerRequest *request) {
    JsonDocument doc;

    JsonArray socketsDown = doc["socketsDown"].to<JsonArray>();

    int time = getSeconds(rtc);

    for (int i = 0; i < 4; i++) {
      socketsDown.add(DOWN[i]);
    }
    doc["time"] = getSeconds(rtc);

    String output;

    doc.shrinkToFit();  // optional

    serializeJson(doc, output);

    // Send the JSON response
    request->send(200, "application/json", output);
  });

  server.on("/shutdown", HTTP_GET, [](AsyncWebServerRequest *request) {
    // Parse parameters from the request
    String socketParam = request->getParam("socket")->value();
    String timeParam = request->getParam("time")->value();

    // Convert parameters to integers
    int socket = socketParam.toInt();
    int time = timeParam.toInt();

    DOWN[socket] = getSeconds(rtc) + time;

    JsonDocument doc;

    doc["message"] = "Shutdown successfully";

    String output;

    doc.shrinkToFit();  // optional

    serializeJson(doc, output);

    // Send the JSON response
    request->send(200, "application/json", output);
  });

  server.begin();
}

void error(String message) {
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("ERROR!!!");

  lcd.setCursor(0, 1);
  lcd.print(message);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Serial.
    for (int i = 0; i < 4; i++) {
      if (DOWN[i] >= getSeconds(rtc)) {
        digitalWrite(SOCKETS[i], LOW);  //
      } else {
        DOWN[i] = 0;
        digitalWrite(SOCKETS[i], HIGH);
      }
    }

    // Update LCD display
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Timestamp:");
    lcd.setCursor(0, 1);
    lcd.println(rtc.now().timestamp());

    delay(250);  // Adjust the delay according to your needs
  } else {
    error("disconnected");
  }
}

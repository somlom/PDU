#include <LiquidCrystal_I2C.h>
#include "RTClib.h"
#include "rtc.h"
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include "ArduinoJson.h"

const int SOCKETS[4] = { 16, 17, 18, 19 };
int DOWN[4] = { 0, 0, 0, 0 };  // time in seconds

LiquidCrystal_I2C lcd = LiquidCrystal_I2C(0x27, 16, 2);
RTC_DS3231 rtc;

AsyncWebServer server(8000);

void setup() {
  rtc.begin();
  rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);

  for (int i = 0; i < 4; i++) {
    pinMode(SOCKETS[i], OUTPUT);
    digitalWrite(SOCKETS[i], HIGH);
  }

  WiFi.mode(WIFI_STA);
  WiFi.begin("PL-2.4", "QWErty78()");
  lcd.println("Connecting...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }

  lcd.clear();
  lcd.println(WiFi.localIP());
  delay(5000);
  // Define the API endpoint
  server.on("/esp/getTelementry", HTTP_GET, [](AsyncWebServerRequest *request) {
    JsonDocument doc;

    JsonArray socketsDown = doc["socketsDown"].to<JsonArray>();

    int time = getSeconds(rtc);

    for (int i = 0; i < 4; i++) {
      if (DOWN[i] > time) {
        socketsDown.add(SOCKETS[i]);
      }
    }
    doc["time"] = getSeconds(rtc);

    String output;

    doc.shrinkToFit();  // optional

    serializeJson(doc, output);

    // Send the JSON response
    request->send(200, "application/json", output);
  });

  server.on("/esp/shutdown", HTTP_GET, [](AsyncWebServerRequest *request) {
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
    for (int i = 0; i < 4; i++) {
      if (DOWN[i] >= getSeconds(rtc)) {
        digitalWrite(SOCKETS[i], HIGH);
      } else {
        digitalWrite(SOCKETS[i], LOW);
      }
    }

    // Update LCD display
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Timestamp:");
    lcd.setCursor(0, 1);
    lcd.println(rtc.now().timestamp());

    delay(1000);  // Adjust the delay according to your needs
  } else {
    error("disconnected");
  }
}

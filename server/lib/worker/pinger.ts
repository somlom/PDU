self.onmessage = () => {
  setInterval(async () => {
    // try {
    //   await fetch("http://192.168.248.238:80/ping");
    // } catch {
    //   console.log("ALARM!!!! DISCONNECTED");
    // }

    // fetch(apiUrl).catch(() => {
    //   console.error("ALARM!!!! DISCONNECTED");
    // });
  }, 10 * 1000);

  //   // Stop pinging after a specific duration (optional)
  //   setTimeout(() => {
  //     clearInterval(pingInterval);
  //     console.log("Stopped pinging after 30 seconds");
  //   }, 30000); // Stop after 30 seconds (optional)
};

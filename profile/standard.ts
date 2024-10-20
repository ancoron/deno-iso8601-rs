const millis = Date.now();

for (let i = 0; i < 1000000; i++) {
  new Date(millis).toISOString();
}

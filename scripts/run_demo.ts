import { payload, summary } from "../src/services/headlessStarterService";

console.log("headless-wp-vue-starter demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().starterFiles, null, 2));

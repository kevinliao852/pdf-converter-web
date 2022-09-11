import { publisher } from "./publisher";

async function main() {
  await publisher.setChannel();
  require("./server");
}

main();

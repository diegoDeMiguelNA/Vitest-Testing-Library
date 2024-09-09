export default function sayHello(name = "Mr. X", time = 10) {
  if (time > 12) {
    return `Good afternoon, ${name}`;
  }
  return `Good morning, ${name}`;
}
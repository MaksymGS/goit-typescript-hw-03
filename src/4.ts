class Key {
  private signature: number = Math.random();
  public getSignature(): number {
    return this.signature;
  }
}
class Person {
  constructor(private key: Key) {}
  getKey(): Key {
    return this.key;
  }
}
abstract class House {
  protected door: boolean = false;
  protected tenants: Person[] = [];
  constructor(protected key: Key) {}
  public comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      this.door = false; //зачинив за собою двері
    }
  }
  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (this.key.getSignature() === key.getSignature()) {
      this.door = true;
      console.log(this.tenants);
      console.log(this.door);
      console.log(this.key);
    } else {
      console.log("Sorry, it's locked");
    }
  }
}
const key = new Key();
const otherKey = new Key();
console.log(key);
console.log(otherKey);

const house = new MyHouse(key);
const person = new Person(key);
const Vasya = new Person(otherKey);

house.openDoor(person.getKey());
house.openDoor(Vasya.getKey());

house.comeIn(person);
house.comeIn(Vasya);

export {};

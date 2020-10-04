
class Users {
  users: User[]

  constructor () {
    this.users = [];
  }

  addUser (id: any, name: any, room: any) {
    var user = new User(id, name, room);
    this.users.push(user);
    return user;
  }

  removeUser (id: any) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id: any) {
    return this.users.filter((user) => user.id === id)[0]
  }
  
  getUserList (room: any) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

class User{
  id: any;
  name: any;
  room: any;

  constructor(id: any, name: any, room: any){
    this.id = id;
    this.name = name;
    this.room = room;
  }
}

export {Users, User};
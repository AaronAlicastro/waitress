export default class WorkersListening {
  constructor(requestDataBase = () => {}) {
    this.listening = null;
    this.requestDataBase = requestDataBase;

    // interactive actions
    this.eventNamesList = [];
    this.eventModule = [];
  }

  startListening() {
    this.stopListening();

    this.listening = setInterval(() => {
      this.requestDataBase((r) => {
        console.log("Listening working ", this.eventModule.length);
        this.eventModule.forEach((event) => event(r.ordenDataList));
      });
    }, 10000);
  }

  stopListening() {
    clearInterval(this.listening);
  }

  setEventModule(newName, fun) {
    const exist = this.eventNamesList.find((name) => name === newName);
    if (!exist) {
      console.log(newName);
      this.eventNamesList.push(newName);
      this.eventModule.push(fun);
    }
  }
}

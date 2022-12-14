var app = new Vue({
  el: "#app",
  data: {
    position: ["administrador", "secretario", "vendedor", "ensamblador"],
    optionPosition: "",
    pin: "",
    userCredentials: [
      { position: "administrador", pin: "43891569" },
      { position: "secretario", pin: "23138" },
      { position: "vendedor", pin: "32846910" },
      { position: "ensamblador", pin: "522376" },
      { position: "ensamblador", pin: "56789" },
      { position: "secretario", pin: "7865677" },
    ],
    errorPosition: false,
    errorPin: false,
  },
  methods: {
    clearForm() {
      this.optionPosition = "";
      this.pin = "";
    },
    validateCredentials(user, key) {
      this.fieldValidations(user, key)
      console.log(user)
      console.log(typeof key)
      let loguedUser = [];
      let session = this.userCredentials.filter(
        (({position, pin})  => position === user && pin === key)
      );
      console.log(session);
      loguedUser = [...session];
      return loguedUser.length === 0
        ? this.message(
            "Oops",
            2200,
            "center",
            "Verifique que los datos sean correctos",
            "error"
          )
        : this.message(
            "¡Datos correctos!",
            2200,
            "center",
            "Ingreso exito",
            "success"
          );
    },
    fieldValidations() {
      error = false;
      if (this.optionPosition === "") {
        this.errorPosition = true;
        error = true;
      } else {
        this.errorPosition = false;
      }
      if (this.pin === "") {
        this.errorPin = true;
        error = true;
      } else {
        this.errorPin = false;
      }
      return error;
    },
    message(title, timer, position, text, icon) {
      Swal.fire({
        position,
        text,
        icon,
        title,
        showConfirmButton: false,
        timer,
      });
    },
  },
});
var  app = new Vue( {
    el: '#app',
    data: {
        position:["administrador", "secretario","vendedor","ensamblador"],
        optionPosition:"",
        pin:"",
        userCredentials: [
            { position: "administrador", pin: "43891v569" },
            { position: "secretario", pin: "23a138" },
            { position: "vendedor", pin: "328y46910" },
            { position: "ensamblador", pin: "522376t" },
            { position: "ensamblador", pin:"56789q" },
            { position: "secretario", pin: "7865677a" },
          ],
        errorPosition:false,
        errorPin: false,
        
    },
    methods: {
        login() {
          
        },
        clearForm(){
            this.optionPosition = "",
            this.pin = ""
        },
        validateCredentials(user, key) {
            let loguedUser = [];
            let session = this.userCredentials.filter((user)=> user.position === user && user.pin === key)
            console.log(session)
            loguedUser = [...session];
            return loguedUser.length === 0? this.message("Oops",2200,"center","Verifique que los datos sean correctos","error"):
            this.message("¡Datos correctos!", 2200,"center","Ingreso exito", "sucess");

        },
        message(title, timer, position, text, icon){
            Swal.fire({
                position,
                text,
                icon,
                title,
                showConfirmButton: false,
                timer,
              });
        },
        getErrorPosition(){
            if(this.position === "") {
                this.errorPosition = true;
            } else {
                this.errorPosition = false;
            }
        },
        getErrorPin(){
            if(this.pin === "") {
                this.errorPin = true;
            } else {
                this.errorPin = false;
            }
        }
    }
})
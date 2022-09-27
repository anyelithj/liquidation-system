var app = new Vue( {
    el: '#app',
    data: {
        baseSalary: "",
        extraHours: "",
        totalPay: 0,
        errorBaseSalary: false,
        errorExtraHours: false,
        overtimePrice: 25000,
        totalExtraHours: 0,
        dataSecretarys: []
    },
    methods: {
        addSecretary(){
           this.fieldValidations() ? this.error : this.createSecretary() 
        },
        createSecretary(){
            this.dataSecretarys.push({
                baseSalarySec: this.baseSalary,
                extraHourSec: this.extraHours,
                totalPaySec: this.calculate()
            })
            console.log(this.dataSecretarys)
            this.updateLocalStorage()
            this.clearForm()
        },
        clearForm(){
            this.baseSalary = "",
            this.extraHours = ""
        },
        showFormatedNumber(value){
            function thousandSeparator(number = 0, decimalsQuantity = 2) {
                return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
              return thousandSeparator(value)
        },
        calculate() {
            this.totalExtraHours = this.extraHours * ( this.overtimePrice * 1.8); 
           return this.totalPay = this.baseSalary + this.totalExtraHours;
           console.log(this.totalPay)
        },      
        updateLocalStorage() {
            localStorage.setItem("dataStorang", JSON.stringify(this.dataSecretarys))
        },
        fieldValidations(){
            error = false;
            if(this.baseSalary === "" || this.baseSalary <= 0 || typeof this.baseSalary !== "number"){
              this.errorBaseSalary = true;
              error = true;
            } else {
              this.errorBaseSalary = false;
            }
            if(this.extraHours === "" || this.extraHours <= 0 || typeof this.extraHours !== "number") {
                this.errorExtraHours = true;
                error = true;
            } else {
                this.errorExtraHours = false;
            }
            return error;
        },
        message(title,timer,position,text){
            Swal.fire({
              position,
              text,
              icon: "success",
              title,
              showConfirmButton: false,
              timer
            })},
            messageDelete(index) {
                Swal.fire({
                    title: "¿Está seguro de eliminar?",
                    text: "¡Este proceso es irreversible!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "SI",
                    cancelButtonText: "NO",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.dataSecretarys.splice(index,1);
                      this.message(
                        "Se eliminó correctamente",
                        3000,
                        "center",
                        "¡Los cambios fueron guardados!"
                      );
                      this.updateLocalStorage();
                    }
                  });
            }
    },
    created() {
        if(localStorage.getItem("dataStorang") !== null) {
            this.dataSecretaryStorangs = JSON.parse(localStorage.getItem("dataSecretarys"))
        } else {
            this.dataSecretaryStorangs = this.dataSecretarys
        }
    }
})
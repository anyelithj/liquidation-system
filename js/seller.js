var app = new Vue( {
    el: '#app',
    data: {
        baseSalary: "",
        extraHours: "",
        commission: "",
        benefit: "",
        totalPay: 0,
        errorBaseSalary: false,
        errorExtraHours: false,
        errorCommission: false,
        errorBenefit: false,
        overtimePrice: 38000,
        dataSellers: []
    },
    methods: {
        addSeller(){
          this.fieldValidations() ? this.error : this.createrSeller()  
        },
        createrSeller() {
            this.dataSellers.push({
                baseSalarySel: this.baseSalary,
                extraHourSel: this.extraHours,
                commissionSel: this.commission,
                benefitSel: this.benefit,
                totalPaySel: this.calculate()
            })
            console.log(this.dataSellers)
            this.updateLocalStorage()
            this.clearForm()
        },
        clearForm(){
            this.baseSalary = "",
            this.extraHours = ""
            this.commission = "",
            this.benefit = ""
        },
        calculate() {
           return this.totalPay = (this.overtimePrice * this.extraHours)
           console.log(this.totalPay)
        },      
        updateLocalStorage() {
            localStorage.setItem("dataStorang", JSON.stringify(this.dataSellers))
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
            if(this.commission === "" || this.commission <= 0 || typeof this.commission !== "number") {
                this.errorCommission = true;
                error = true;
            } else {
                this.errorCommission = false;
            }
            if(this.benefit === "" || this.benefit <= 0 || typeof this.benefit !== "number") {
                this.errorBenefit = true;
                error = true;
            } else {
                this.errorBenefit = false;
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
                  this.dataSellers.splice(index,1);
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
            this.dataSellerStorangs = JSON.parse(localStorage.getItem("dataSellers"))
        } else {
            this.dataSellerStorangs = this.dataSellers
        }
    }
})
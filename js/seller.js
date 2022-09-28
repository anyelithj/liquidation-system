var app = new Vue( {
    el: '#app',
    data: {
        baseSalary: "",
        totalSales: "",
        transportSubsidy: 117172,
        overtimePrice: 38000,
        totalPay: 0,
        extraHours: "",
        totalCommission: 0,
        errorBaseSalary: false,
        errorExtraHours: false,
        errorTotalSales: false,
        errorTransportSubsidy: false,
        dataSellers: []
    },
    methods: {
        addSeller(){
          this.fieldValidations() ? this.error : this.createrSeller()  
        },
        createrSeller() {
            this.dataSellers.push({
                baseSalarySel: this.baseSalary,
                totalSalesSel: this.totalSales,
                transportSubsidySel: this.transportSubsidy,
                totalPaySel: this.calculate()
            })
            console.log(this.dataSellers)
            this.updateLocalStorage()
            this.clearForm()
        },
        clearForm(){
            this.baseSalary = "",
            this.totalSales = ""
        },
        showFormatedNumber(value){
            function thousandSeparator(number = 0, decimalsQuantity = 2) {
                return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
              return thousandSeparator(value)
        },
        calculate() {
            this.totalCommission = (this.totalSales >= 5000000)? this.totalSales * 0.10 : (this.totalSales >= 10000000) ? this.totalSales * 0.20 : 0;
           return this.totalPay = this.baseSalary + this.totalCommission + this.transportSubsidy;
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
            if(this.totalSales === "" || this.totalSales < 0 || typeof this.totalSales  !== "number") {
                this.errorTotalSales = true;
                error = true;
            } else {
                this.errorTotalSales= false;
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
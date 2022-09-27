var app = new Vue( {
    el: '#app',
    data: {
        baseSalary: "",
        extraHours: "",
        totalPay: 0,
        errorBaseSalary: false,
        errorExtraHours: false,
        overtimePrice: 25000,
        dataSecretarys: [],
        dataSecretaryStorangs: []
    },
    methods: {
        addSecretary(){
            this.getErrorBaseSalary()
            this.getErrorExtraHours()
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
        calculate() {
           return this.totalPay = (this.overtimePrice * this.extraHours)
           console.log(this.totalPay)
        },      
        updateLocalStorage() {
            localStorage.setItem("dataStorang", JSON.stringify(this.dataSecretarys))
        },
        getErrorBaseSalary(){
            if(this.baseSalary === ""){
                this.errorBaseSalary = true;
            } else {
                this.errorBaseSalary = false;
            }
        },
        getErrorExtraHours(){
            if(this.extraHours === "") {
                this.errorExtraHours = true;
            } else {
                this.errorExtraHours = false;
            }
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
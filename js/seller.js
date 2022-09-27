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
        dataSellers: [],
        dataSellerStorangs: []
    },
    methods: {
        addSeller(){
            this.getErrorBaseSalary()
            this.getErrorExtraHours()
            this.getErrorComision()
            this.getErrorBenefit()
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
        },
        getErrorComision(){
            if(this.commission === "") {
                this.errorCommission = true;
            } else {
                this.errorCommission = false;
            }
        },
        getErrorBenefit() {
            if(this.benefit === "") {
                this.errorBenefit = true;
            } else {
                this.errorBenefit = false;
            }
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
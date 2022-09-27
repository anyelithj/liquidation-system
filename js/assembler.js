new Vue({
    el: '#app',
    data: {
       CHART_JS_REFERENCE :'myChart',
       error:false,
       errors:{
       },
       assemblerNormalHourValue: 5000,
       fullName: "",
       identityNumber: "",
       baseSalary: "",
       extraHoursQuantity:"",
       subsidy: "",
       bonus: "",
       comission:"",
       resultLiquidation: 0,
       consolidationLiquidations: [],
       STORAGE_KEY: "setDataStorage"
    },
    created(){
        this.consolidationLiquidations = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]')
      },
    methods: {
        updateLocalStorage(){
            return localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.consolidationLiquidations))
          },
        message(title,timer,position,text){
            Swal.fire({
              position,
              text,
              icon: "success",
              title,
              showConfirmButton: false,
              timer
            })
    },
    cleanInputs(){
        this.fullName ="",
        this.identityNumber= "",
        this.baseSalary= "",
        this.extraHoursQuantity= "",
        this.subsidy= "",
        this.bonus= "",
        this.comission=""
    },
    defineExtraHours(hours){
       return hours * (this.assemblerNormalHourValue * 2.2)
    },
    showFormatedNumber(value){
        function thousandSeparator(number = 0, decimalsQuantity = 2) {
            return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          return thousandSeparator(value)
    },
    defineComission(quantity, salary){
        if(quantity > 1000 && quantity < 1700){
            return  salary * .10
        }else if(quantity > 1700 && quantity < 2000){
            return  salary * .15
        }else  if(quantity > 2000 && quantity < 3000){
            return salary * .20
        }else  if(quantity > 3000){
            return  salary * .30
        }else  {return 0}
    },
    defineBonusPerChild(num){
        if(num === 1){
            return 80000
        }else if(num > 1){
            return num * 60000
        }return  0
    },
    defineTotal(...values){
        return values.reduce((a,b) => a + b)
    },
    calculateLiquidation() {
        this.message('¡Enhorabuena!', 2200,'center','¡Has generado la liquidación exitosamente!')
        this.consolidationLiquidations.push({
            fullName: this.fullName,
            identityNumber: this.identityNumber,
            baseSalary: this.baseSalary,
            extraHoursQuantity: this.defineExtraHours(this.extraHoursQuantity),
            subsidy:this.subsidy,
            bonus: this.defineBonusPerChild(this.bonus),
            comission: this.defineComission(this.comission, this.baseSalary),
            total: this.defineTotal(this.baseSalary,this.defineExtraHours(this.extraHoursQuantity),this.subsidy,this.defineBonusPerChild(this.bonus),this.defineComission(this.comission, this.baseSalary))
        })
        this.updateLocalStorage()
        this.cleanInputs()
    }
    }
})
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
    validateInputs() {
        
        error = false;
      if (this.fullName === "") {
        this.errors.name = true;
        error = true;
      } else {
        this.errors.name = false;
      }
      if (this.identityNumber === "") {
        this.errors.lastName = true;
        error = true;
      } else {
        this.errors.lastName = false;
      }
      if (this.baseSalary === "") {
        this.errors.identity = true;
        error = true;
      } else {
        this.errors.identity = false;
      }
      if (this.extraHoursQuantity === "") {
        this.errors.position = true;
        error = true;
      } else {
        this.errors.position = false;
      }
      if (this.subsidy === "") {
        this.errors.age = true;
        error = true;
      } else {
        this.errors.age = false;
      }
      if (this.bonus == "") {
        this.errors.sex = true;
        error = true;
      } else {
        this.errors.sex = false;
      }if(this.comission === ""){
        return  this.errors.age = false;
      }
      return error;
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
    deleteAlert(item) {
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
              this.consolidationLiquidations.splice(this.consolidationLiquidations.indexOf(item), 1)
              this.message(
                "Se eliminó correctamente",
                1600,
                "center",
                "¡Este proceso es irreversible!"
              )
              this.updateLocalStorage()
            }
          })
    }
    }
})
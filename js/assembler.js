new Vue({
    el: '#app',
    data: {
       displayMessageError: "El campo 'X' debe ser un  dato valido",
       CHART_JS_REFERENCE :'myChart',
       error:false,
       errors:{
       fullName: false,
       identityNumber: false,
       baseSalary: false,
       extraHoursQuantity:false,
       subsidy: false,
       bonus: false,
       comission:false,
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
       pruebaArr: [],
       ASSEMBLER_STORAGE_KEY: "setAssemblerDataStorage",
       PROBLEMATICA_KEY: "setStorage"
    },
    created(){
        this.consolidationLiquidations = JSON.parse(localStorage.getItem(this.ASSEMBLER_STORAGE_KEY) || '[]') 

        
      },
    methods: {
        updateLocalStorage(){
            return localStorage.setItem(this.ASSEMBLER_STORAGE_KEY, JSON.stringify(this.consolidationLiquidations))
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
      if (this.fullName === "" ) {
        this.errors.fullName = true;
        error = true;
      } else {
        this.errors.fullName = false;
      }
      if (this.identityNumber === "" ||  this.fullName === 'number') {
        this.errors.identityNumber = true;
        error = true;
      } else {
        this.errors.identityNumber = false;
      }
      if (this.baseSalary === "" || typeof this.fullName !== 'number') {
        this.errors.baseSalary = true;
        error = true;
      } else {
        this.errors.baseSalary = false;
      }
      if (this.extraHoursQuantity === "" || typeof this.fullName !== 'number') {
        this.errors.extraHoursQuantity = true;
        error = true;
      } else {
        this.errors.extraHoursQuantity = false;
      }
      if (this.subsidy === "" || typeof this.fullName !== 'number') {
        this.errors.subsidy = true;
        error = true;
      } else {
        this.errors.subsidy = false;
      }
      if (this.bonus == "" || typeof this.fullName !== 'number') {
        this.errors.bonus = true;
        error = true;
      } else {
        this.errors.bonus = false;
      }if(this.comission === "" || typeof this.fullName !== 'number'){
         this.errors.comission = true;
      }else{
        this.errors.comission = false
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
        this.message('¡Enhorabuena!', 2500,'center','¡La liquidación se ha generado exitosamente!')
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

        console.log(this.pruebaArr)
        this.cleanInputs()
    },
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
                2000,
                "center",
                "¡Los cambios fueron guardados!"
              )
              this.updateLocalStorage()
            }
          })
    }
    }
})
new Vue({
    el: '#app',
    data: {
       defaultRol: null,
       wholeRoles: ['Secretario','Vendedor','Ensamblador'],
       errors:{
        selectOptions: false,
        assembler: {
          baseSalary: false,
          shoesMaxQuantity: false,
          tennisMaxQuantity: false
        },
        secretary: {
          baseSalary: false,
          extraHoursPercent: false
        },
        seller: {
          baseSalary: false,
          comission: false
        }
       },
       inputRoles: {
        assembler: {
          baseSalary: "",
          shoesMaxQuantity: "",
          tennisMaxQuantity: ""
        },
        secretary: {
          baseSalary: "",
          extraHoursPercent: ""
        },
        seller: {
          baseSalary: "",
          comission: ""
        }
       },
       identityNumber: "",
       baseSalary: "",
       extraHoursQuantity:"",
       subsidy: "",
       bonus: "",
       comission:"",
       resultLiquidation: 0, 
       adminData : [],
       adminPrivileges: [
        {
          rol: 'Secretario',
          values: {
            baseSalary: ( salary = 2500000 ) => salary,
            extraHours: ( percent = 180 ) =>  percent/100
          }
         },
       {
        rol: 'Vendedor',
        values: {
          baseSalary: ( inputValue = 3000000 ) => inputValue,
          comission: (baseSalary= 3000000, inputValue, comission1= .10, comission2= .20) => {
            if(inputValue > 5000000 && inputValue <= 10000000) {
              return baseSalary * comission1
            }else if(inputValue < 10000000) {
              return baseSalary *comission2
            }return 0
          } 
        }
       },
       {
        rol: 'Ensamblador',
        values: {
          baseSalary: ( inputValue = 2800000 ) => inputValue,
          hourPrice: (baseSalary = 2800000) => baseSalary/160,
          extraHours: (hours) => hours * (hourPrice * 2.2),
          subsidy: (inputValue) => inputValue,
          comissionShoes: (quantity, salary, min=1000, max=2000) => {
            if(quantity > min && quantity <= max){
                return  salary * .10
            }else  if(quantity > max ){
                return salary * .20
            }else  return 0
          },
          comissionTennis: (quantity,salary) => {
            if(quantity > 1700 && quantity < 2000){
              return  salary * .15
          }else  if(quantity > 3000){
                return  salary * .30
            }else  return 0
          }
        }
       }
       ],
       ADMIN_KEY: "setAdminDataStorage",
       SECRETARY_STORAGE_KEY: "setSecretaryDataStorage",
       SELLER_STORAGE_KEY: "setSellerDataStorage",
       ASSEMBLER_STORAGE_KEY: "setAssemblerDataStorage",
    },
    created(){
        this.updateLocalStorage()
        this.adminData = JSON.parse(localStorage.getItem(this.ADMIN_KEY) || '[]')
      },
    methods: {
      showData (){
        console.log(this.adminData)
      },
        updateLocalStorage(){
            return localStorage.setItem(this.ADMIN_KEY, JSON.stringify(this.adminPrivileges))
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
      if (this.identityNumber === "" || typeof this.fullName !== 'number') {
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
    
    showFormatedNumber(value){
        function thousandSeparator(number = 0, decimalsQuantity = 2) {
            return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          return thousandSeparator(value)
    },
    message(title,timer,position,text){
        Swal.fire({
          position,
          text,
          icon: "success",
          title,
          showConfirmButton: false,
          timer
        })}
    }
})
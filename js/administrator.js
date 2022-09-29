new Vue({
  el: '#app',
  data: {
     defaultRol: null,
     wholeRoles: ['Secretario','Vendedor','Ensamblador'],
     errorOptions: false, 
     errorsAssembler:{
        baseSalary: false,
        minPercentShoes:false,
        maxPercentShoes:false,
        minPercentTennis:false,
        maxPercentTennis:false,
        maxShoesQuantity:false,
        maxTennisQuantity:false
      },
     errorsSeller: {
        baseSalary: false,
        minComission: false,
        maxComission: false
     },
     errorsSecretary: {
        baseSalary: false,
        extraHoursPercent: false
     },
     inputRoles: {
      assembler: {
        baseSalary: "",
        minPercentShoes: "",
        maxPercentShoes: "",
        minPercentTennis: "",
        maxPercentTennis: "",
        maxShoesQuantity: "",
        maxTennisQuantity: ""
      },
      secretary: {
        baseSalary: "",
        extraHoursPercent: ""
      },
      seller: {
        baseSalary: "",
        minComission: "",
        maxComission: ""
      }
     },
     Secretary: [],
     Assembler: [],
     Seller: [],
     adminDefaultData : [],
     adminGetterData: [],
     ADMIN_KEY: "setAdminDataStorage",
     SECRETARY_STORAGE_KEY: "setSecretaryDataStorage",
     SELLER_STORAGE_KEY: "setSellerDataStorage",
     ASSEMBLER_STORAGE_KEY: "setAssemblerDataStorage",
  },
  created(){
      this.updateLocalStorage()
      this.adminGetterData = JSON.parse(localStorage.getItem(this.ADMIN_KEY) || '[]')
    },
  methods: {
    showData (){
      // this.adminDefaultData[0].values.baseSalary.replace(/['"]+/g, '')
       console.log(this.adminGetterData)
    },
    updateLocalStorage(){
      this.updateAdminData()
      return localStorage.setItem(this.ADMIN_KEY, JSON.stringify(this.adminDefaultData))
    },
    updateAdminData(){
      return this.adminDefaultData = [...this.Secretary, ...this.Assembler, ...this.Seller]
    },
    defineComissionShoes (quantity, salary, min=1000, max=2000) {
      if(quantity > min && quantity <= max){
          return  salary * .10
      }else  if(quantity > max ){
          return salary * .20
      }else  return 0
    },
    defineComissionTennis (max=3000, min=1700 ,quantity,salary )  {
      if(quantity > min && quantity < 2000){
        return  salary * .15
    }else  if(quantity > 3000){
          return  salary * .30
      }else  return 0
    },
    setLocalStorageData(key,data){
      localStorage.setItem(key, JSON.stringify(data))
    },
    setDataSecretary(){        
      this.Secretary = {
        baseSalary: this.inputRoles.secretary.baseSalary,
        extraHours:  this.inputRoles.secretary.extraHoursPercent/100
      }        
      this.setLocalStorageData(this.SECRETARY_STORAGE_KEY, this.Secretary)
      console.log(this.Secretary)
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      )
      this.inputRoles.secretary.baseSalary = ""
      this.inputRoles.secretary.extraHoursPercent = ""
    },
   
    setDataAssembler(){      
      this.Assembler = {
        baseSalary: this.inputRoles.assembler.baseSalary,
        minPercentShoes: this.inputRoles.assembler.minPercentShoes,
        maxPercentShoes: this.inputRoles.assembler.maxPercentShoes,
        minPercentTennis: this.inputRoles.assembler.minPercentTennis,
        maxPercentTennis: this.inputRoles.assembler.maxPercentTennis,
        maxShoesQuantity: this.inputRoles.assembler.maxShoesQuantity,
        maxTennisQuantity: this.inputRoles.assembler.maxTennisQuantity
      }
      this.setLocalStorageData(this.ASSEMBLER_STORAGE_KEY,this.Assembler)
      console.log(this.Assembler)
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      )
      this.inputRoles.assembler.baseSalary = ""
      this.inputRoles.assembler.minPercentShoes = ""
      this.inputRoles.assembler.maxPercentShoes = ""
      this.inputRoles.assembler.minPercentTennis = ""
      this.inputRoles.assembler.maxPercentTennis = ""
      this.inputRoles.assembler.maxShoesQuantity = ""
      this.inputRoles.assembler.maxTennisQuantity = ""
    },
    setDataSeller(){     
      this.Seller = {
        baseSalary: this.inputRoles.seller.baseSalary,
        minComission: this.inputRoles.seller.minComission,
        maxComission: this.inputRoles.seller.maxComission
      }
      this.setLocalStorageData(this.SELLER_STORAGE_KEY,this.Seller)
      console.log(this.Seller)
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      )
      this.inputRoles.seller.baseSalary = ""
      this.inputRoles.seller.minComission = ""
      this.inputRoles.seller.maxComission = ""
    },
      message(title,timer,position,text, button){
          swal({
            position,
            text,
            icon: "success",
            title,
            dangerMode: false,
            timer,
            button
          })
  },
  validateInputs() {
      error = false;
    if (this.fullName === '') {
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
    return error
  },
  showFormatedNumber(value){
      function thousandSeparator(number = 0, decimalsQuantity = 2) {
          return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return thousandSeparator(value)
  }
  }
})
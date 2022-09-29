const obj = {
    name: 'Lui',
    patrols:{
        dev: (par) => {
            if(par < 1) {
                return 'Is not a valid number'
            }if(par >= 1) {
                return 'Major than 1'
            }else return 'Thats impossible'
        },
        lol: 'jagdjh'
    }
    
}

// console.log(obj.patrols.dev(5))

const adminPrivileges =  [
    {
     rol: 'Secretario',
     values: {
       baseSalary: 2500000,
       hourPrice: ()=> console.log(2500000/140),
       extraHours: (hours,percent) => console.log(hours * (178571429 * percent))
     }
    }]

    // adminPrivileges[0].values.hourPrice()

    const app =  {
        rol: 'Vendedor',
        values: {
          baseSalary: 2500000,
          comission: function(inputValue) {
            baseSalary = 2500000
            if(inputValue > 5000000 && inputValue <= 10000000) {
              return baseSalary * .10
            }else if(inputValue < 10000000) {
              return baseSalary * .20
            }return 0
          } ,
          subsidy: 80000
        }
       }

    //   console.log( app.values.comission(5000001))

    const crazy = {
        name: 'LOL',
        data: {
            city: 'ARA',
            values: {
                a: 5,
                b:10
            },
            total: () => crazy.data.values.a * 2
        }
    }

    const lol = () => {
        return console.log(crazy.data.total())
    }

   


    const ob = [{
      a: '67',
      b: '85'
    }]

    // console.log(Object.values(ob).map(el => el.replace(/['"]+/g, '')));


  //   new Vue({
  //     el: '#app',
  //     data: {
  //        defaultRol: null,
  //        wholeRoles: ['Secretario','Vendedor','Ensamblador'],
  //        errorOptions: false, 
  //        errorsAssembler:{
  //           baseSalary: false,
  //           shoesMaxQuantity: false,
  //           tennisMaxQuantity: false
  //         },
  //        errorsSeller: {
  //           baseSalary: false,
  //           comission: false
  //        },
  //        errorsSecretary: {
  //           baseSalary: false,
  //           extraHoursPercent: false
  //        },
  //        inputRoles: {
  //         assembler: {
  //           baseSalary: "",
  //           shoesMaxQuantity: "",
  //           tennisMaxQuantity: ""
  //         },
  //         secretary: {
  //           baseSalary: "",
  //           extraHoursPercent: ""
  //         },
  //         seller: {
  //           baseSalary: "",
  //           comission: ""
  //         }
  //        },
  //        adminDefaultData : [],
  //        adminGetterData: [],
  //        ADMIN_KEY: "setAdminDataStorage",
  //        SECRETARY_STORAGE_KEY: "setSecretaryDataStorage",
  //        SELLER_STORAGE_KEY: "setSellerDataStorage",
  //        ASSEMBLER_STORAGE_KEY: "setAssemblerDataStorage",
  //     },
  //     created(){
  //         this.setDefaultData()
  //         this.updateLocalStorage()
  //         this.adminGetterData = JSON.parse(localStorage.getItem(this.ADMIN_KEY) || '[]')
  //       },
  //     methods: {
        
  //       showData (){
  //         // this.adminDefaultData[0].values.baseSalary.replace(/['"]+/g, '')
  //          console.log(this.adminGetterData)
  //       },
  //       updateLocalStorage(){
  //         return localStorage.setItem(this.ADMIN_KEY, JSON.stringify(this.adminDefaultData))
  //       },
  //       setDefaultData(){
  //         this.adminDefaultData.push(
  //           {
  //             rol: 'Secretary',
  //             values:{
  //               baseSalary:( salary = 2500000 ) => salary,
  //               extraHours: ( percent = 180 ) =>  percent/100
  //             }
  //            },
  //          {
  //           rol: 'Vendedor',
  //           values: {
  //             baseSalary: ( inputValue = 3000000 ) => inputValue,
  //             comission: (baseSalary= 3000000, inputValue, comission1= .10, comission2= .20) => {
  //               if(inputValue > 5000000 && inputValue <= 10000000) {
  //                 return baseSalary * comission1
  //               }else if(inputValue < 10000000) {
  //                 return baseSalary * comission2
  //               }return 0
  //             } 
  //           }
  //          },
  //          {
  //           rol: 'Ensamblador',
  //           values: {
  //             baseSalary: ( inputValue = 2800000 ) => inputValue,
  //             comissionShoes: (quantity, salary, min=1000, max=2000) => {
  //               if(quantity > min && quantity <= max){
  //                   return  salary * .10
  //               }else  if(quantity > max ){
  //                   return salary * .20
  //               }else  return 0
  //             },
  //             comissionTennis: (quantity,salary,min=1700, max=3000) => {
  //               if(quantity > 1700 && quantity < 2000){
  //                 return  salary * .15
  //             }else  if(quantity > 3000){
  //                   return  salary * .30
  //               }else  return 0
  //             }
  //           }
  //          }
  //         )
  //       },
          
  //         message(title,timer,position,text){
  //             Swal.fire({
  //               position,
  //               text,
  //               icon: "success",
  //               title,
  //               showConfirmButton: false,
  //               timer
  //             })
  //     },
  //     validateInputs() {
  //         error = false;
  //       if (this.fullName === "" ) {
  //         this.errors.fullName = true;
  //         error = true;
  //       } else {
  //         this.errors.fullName = false;
  //       }
  //       if (this.identityNumber === "" || typeof this.fullName !== 'number') {
  //         this.errors.identityNumber = true;
  //         error = true;
  //       } else {
  //         this.errors.identityNumber = false;
  //       }
  //       if (this.baseSalary === "" || typeof this.fullName !== 'number') {
  //         this.errors.baseSalary = true;
  //         error = true;
  //       } else {
  //         this.errors.baseSalary = false;
  //       }
  //       if (this.extraHoursQuantity === "" || typeof this.fullName !== 'number') {
  //         this.errors.extraHoursQuantity = true;
  //         error = true;
  //       } else {
  //         this.errors.extraHoursQuantity = false;
  //       }
  //       if (this.subsidy === "" || typeof this.fullName !== 'number') {
  //         this.errors.subsidy = true;
  //         error = true;
  //       } else {
  //         this.errors.subsidy = false;
  //       }
  //       if (this.bonus == "" || typeof this.fullName !== 'number') {
  //         this.errors.bonus = true;
  //         error = true;
  //       } else {
  //         this.errors.bonus = false;
  //       }if(this.comission === "" || typeof this.fullName !== 'number'){
  //          this.errors.comission = true;
  //       }else{
  //         this.errors.comission = false
  //       }
  //       return error;
  //     },
  //     cleanInputs(){
  //         this.fullName ="",
  //         this.identityNumber= "",
  //         this.baseSalary= "",
  //         this.extraHoursQuantity= "",
  //         this.subsidy= "",
  //         this.bonus= "",
  //         this.comission=""
  //     },
      
  //     showFormatedNumber(value){
  //         function thousandSeparator(number = 0, decimalsQuantity = 2) {
  //             return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //           }
  //           return thousandSeparator(value)
  //     },
  //     message(title,timer,position,text){
  //         Swal.fire({
  //           position,
  //           text,
  //           icon: "success",
  //           title,
  //           showConfirmButton: false,
  //           timer
  //         })}
  //     }
  // })

  a = [4]
  b= [7]
  c = [1]
  arrayMio = []

  const aba = (a,b,c) => console.log( arrayMio = [...a,...b,...c].reduce((a,b) => a + b))

  aba(a,b,c)

  newArr = [...arrayMio, [25]]

  console.log();
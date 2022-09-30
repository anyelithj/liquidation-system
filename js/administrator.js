new Vue({
  el: "#app",
  data: {
    defaultRol: null,
    wholeRoles: ["Secretario", "Vendedor", "Ensamblador"],
    errorOptions: false,
    errorsAssembler: {
      baseSalary: false,
      minPercentShoes: false,
      maxPercentShoes: false,
      minPercentTennis: false,
      maxPercentTennis: false,
      maxShoesQuantity: false,
      maxTennisQuantity: false,
    },
    errorsSeller: {
      baseSalary: false,
      minComission: false,
      maxComission: false,
    },
    errorsSecretary: {
      baseSalary: false,
    },
    inputRoles: {
      assembler: {
        baseSalaryAssembler:"",
        minPercentShoes:"",
        maxPercentShoes:"",
        minPercentTennis:"",
        maxPercentTennis:"",
        maxShoesQuantity:"",
        maxTennisQuantity:"",
      },
      secretary: {
        baseSalarySecretary:"",
      },
      seller: {
        baseSalarySeller:"",
        minComission:"",
        maxComission:"",
      },
    },
    Secretary: {},
    Assembler: {},
    Seller: {},
    wholeParsedData: {},
    SECRETARY_STORAGE_KEY: "setSecretaryDataStorage",
    SELLER_STORAGE_KEY: "setSellerDataStorage",
    ASSEMBLER_STORAGE_KEY: "setAssemblerDataStorage",
  },
  created() {
    this.Secretary = this.getParsedLocalStorage(this.SECRETARY_STORAGE_KEY);

    this.Assembler = this.getParsedLocalStorage(this.ASSEMBLER_STORAGE_KEY);

    this.Seller = this.getParsedLocalStorage(this.SELLER_STORAGE_KEY);

  },
  methods: {

    setLocalStorageData(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    getParsedLocalStorage(key) {
      return JSON.parse(localStorage.getItem(key) || "[]");
    },
    defineComissionShoes(quantity, salary, min = 1000, max = 2000) {
      if (quantity > min && quantity <= max) {
        return salary * 0.1;
      } else if (quantity > max) {
        return salary * 0.2;
      } else return 0;
    },
    defineComissionTennis(max = 3000, min = 1700, quantity, salary) {
      if (quantity > min && quantity < 2000) {
        return salary * 0.15;
      } else if (quantity > 3000) {
        return salary * 0.3;
      } else return 0;
    },
    setDataSecretary() {
      this.Secretary = {
        baseSalarySecretary: this.inputRoles.secretary?.baseSalarySecretary,
      };
      this.setLocalStorageData(this.SECRETARY_STORAGE_KEY, this.Secretary)
      
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      );
      this.inputRoles.secretary.baseSalarySecretary = "";
    },

    setDataAssembler() {
      this.Assembler = {
        baseSalaryAssembler: this.inputRoles.assembler.baseSalaryAssembler,
        minPercentShoes: this.inputRoles.assembler.minPercentShoes,
        maxPercentShoes: this.inputRoles.assembler.maxPercentShoes,
        minPercentTennis: this.inputRoles.assembler.minPercentTennis,
        maxPercentTennis: this.inputRoles.assembler.maxPercentTennis,
        maxShoesQuantity: this.inputRoles.assembler.maxShoesQuantity,
        maxTennisQuantity: this.inputRoles.assembler.maxTennisQuantity,
      };
      this.setLocalStorageData(this.ASSEMBLER_STORAGE_KEY, this.Assembler);
      
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      );
      this.inputRoles.assembler.baseSalaryAssembler = "";
      this.inputRoles.assembler.minPercentShoes = "";
      this.inputRoles.assembler.maxPercentShoes = "";
      this.inputRoles.assembler.minPercentTennis = "";
      this.inputRoles.assembler.maxPercentTennis = "";
      this.inputRoles.assembler.maxShoesQuantity = "";
      this.inputRoles.assembler.maxTennisQuantity = "";
    },
    setDataSeller() {
      this.Seller = {
        baseSalarySeller: this.inputRoles.seller.baseSalarySeller,
        minComission: this.inputRoles.seller.minComission,
        maxComission: this.inputRoles.seller.maxComission,
      };
      this.setLocalStorageData(this.SELLER_STORAGE_KEY, this.Seller);
      
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      );
      this.inputRoles.seller.baseSalarySeller = "";
      this.inputRoles.seller.minComission = "";
      this.inputRoles.seller.maxComission = "";
    },
    message(title, timer, position, text, button) {
      swal({
        position,
        text,
        icon: "success",
        title,
        dangerMode: false,
        timer,
        button,
      });
    },
    validateInputsRolSecretary(input) {
      if(input === "") 
      return this.errorsSecretary = true
      return
    },
    validateInputsRolAssembler(input) {
      if(input === "") 
      return this.errorsSecretary = true
      return
    },
    validateInputsRolSeller(input) {
      if(input === "") 
      return this.errorsSecretary = true
      return
    },
    showFormatedNumber(value) {
      function thousandSeparator(number = 0, decimalsQuantity = 2) {
        return Number(number)
          .toFixed(decimalsQuantity)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return thousandSeparator(value);
    },
  },
});

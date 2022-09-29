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
      extraHoursPercent: false,
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
        extraHoursPercent:"",
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
    wholeRolesData: {},
    ADMIN_KEY: "setAdminDataStorage",
    SECRETARY_STORAGE_KEY: "setSecretaryDataStorage",
    SELLER_STORAGE_KEY: "setSellerDataStorage",
    ASSEMBLER_STORAGE_KEY: "setAssemblerDataStorage",
  },
  created() {
    this.Secretary = this.getParsedLocalStorage(this.SECRETARY_STORAGE_KEY);

    this.Assembler = this.getParsedLocalStorage(this.ASSEMBLER_STORAGE_KEY);

    this.Seller = this.getParsedLocalStorage(this.SELLER_STORAGE_KEY);

    this.wholeRolesData = {
      ...this.Secretary,
      ...this.Assembler,
      ...this.Seller,
    };
  },
  methods: {
    showData() {
      console.log(this.wholeRolesData);
    },
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
        extraHours: this.inputRoles.secretary?.extraHoursPercent / 100,
      };
      this.setLocalStorageData(this.SECRETARY_STORAGE_KEY, this.Secretary);
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      );
      this.inputRoles.secretary.baseSalary = "";
      this.inputRoles.secretary.extraHoursPercent = "";
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
      this.inputRoles.assembler.baseSalary = "";
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
      this.inputRoles.seller.baseSalary = "";
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
    validateInputs() {
      error = false;
      if (this.fullName === "") {
        this.errors.fullName = true;
        error = true;
      } else {
        this.errors.fullName = false;
      }
      if (this.identityNumber === "" || typeof this.fullName !== "number") {
        this.errors.identityNumber = true;
        error = true;
      } else {
        this.errors.identityNumber = false;
      }
      if (this.baseSalary === "" || typeof this.fullName !== "number") {
        this.errors.baseSalary = true;
        error = true;
      } else {
        this.errors.baseSalary = false;
      }
      if (this.extraHoursQuantity === "" || typeof this.fullName !== "number") {
        this.errors.extraHoursQuantity = true;
        error = true;
      } else {
        this.errors.extraHoursQuantity = false;
      }
      if (this.subsidy === "" || typeof this.fullName !== "number") {
        this.errors.subsidy = true;
        error = true;
      } else {
        this.errors.subsidy = false;
      }
      if (this.bonus == "" || typeof this.fullName !== "number") {
        this.errors.bonus = true;
        error = true;
      } else {
        this.errors.bonus = false;
      }
      if (this.comission === "" || typeof this.fullName !== "number") {
        this.errors.comission = true;
      } else {
        this.errors.comission = false;
      }
      return error;
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

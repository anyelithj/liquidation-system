 new Vue({
    el: "#app",
    data: {
      baseSalary: "",
      extraHours: "",
      totalPay: 0,
      errorBaseSalary: false,
      errorExtraHours: false,
      overtimePrice: 25000,
      totalExtraHours: 0,
      dataSecretarys: [],
      extraHoursMultiplier: 1,
    },
    methods: {
      addSecretary() {
        this.fieldValidations() ? this.error : this.createSecretary();
      },
      createSecretary() {
        this.dataSecretarys.push({
          baseSalarySec: this.baseSalary,
          extraHourSec: this.extraHours,
          totalPaySec: this.calculate(),
        });
        console.log(this.dataSecretarys);
        this.updateLocalStorage(); 
        this.clearForm();     
      },
      clearForm() {
          (this.extraHours = "");
      },
      thousandSeparator(number = 0, decimalsQuantity = 2) {
          return Number(number)
          .toFixed(decimalsQuantity)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      showFormatedNumber(value) {
        function thousandSeparator(number = 0, decimalsQuantity = 2) {
          return Number(number)
            .toFixed(decimalsQuantity)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return thousandSeparator(value);
      },
      calculate() {
        console.log("🚀this.extraHours >>", this.extraHours);
        console.log("🚀this.totalExtraHours >>", this.totalExtraHours);
        console.log("🚀this.overtimePrice  >>", this.overtimePrice);
        console.log("🚀this.totalPay >>", this.totalPay);
        const horaNormal = this.baseSalary / 160;
        return this.extraHours * (horaNormal * this.extraHoursMultiplier);     
      },
      updateLocalStorage() {
        localStorage.setItem("dataStorang", JSON.stringify(this.dataSecretarys));
      },
      fieldValidations() {
        error = false;
        if (
          this.baseSalary === "" ||
          this.baseSalary <= 0 ||
          typeof this.baseSalary !== "number"
        ) {
          this.errorBaseSalary = true;
          error = true;
        } else {
          this.errorBaseSalary = false;
        }
        if (
          this.extraHours === "" ||
          this.extraHours <= 0 ||
          typeof this.extraHours !== "number"
        ) {
          this.errorExtraHours = true;
          error = true;
        } else {
          this.errorExtraHours = false;
        }
        return error;
      },
      message(title, timer, position, text) {
          Swal && Swal?.fire && Swal.fire({
          position,
          text,
          icon: "success",
          title,
          showConfirmButton: false,
          timer,
        });
      },
      messageDelete(index) {
          Swal && Swal?.fire && Swal.fire({
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
            this.dataSecretarys.splice(index, 1);
            this.message(
              "Se eliminó correctamente",
              3000,
              "center",
              "¡Los cambios fueron guardados!"
            );
            this.updateLocalStorage();
          }
        });
      },
    },
    created() {
      const { baseSalary, extraHours } = JSON.parse(
        localStorage.getItem("secretary")
      );
      this.baseSalary = baseSalary;
      this.extraHoursMultiplier = extraHours;
      if (localStorage.getItem("dataStorang") !== null) {
        this.dataSecretaryStorangs = JSON.parse(
          localStorage.getItem("dataSecretarys")
        );
      } else {
        this.dataSecretaryStorangs = this.dataSecretarys;
      }
    },
  });
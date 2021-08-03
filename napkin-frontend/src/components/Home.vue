<template>
  <div>
    <v-container fill-height fluid>
      <v-row no-gutters justify="center" class="ma-4">
        <v-col cols="8">
          <v-card class="pa-6">
            <h3>Input</h3>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              align="center"
              justify="center"
            >
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="4">
                      <v-subheader>Total SF</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        type="number"
                        v-model="totalSF"
                        :rules="numberRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>Hold period</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        type="number"
                        v-model="holdPeriod"
                        :rules="numberRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>Purchase Price</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        type="number"
                        v-model="purchasePrice"
                        :rules="numberRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>Exit cap rate</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        type="number"
                        v-model="exitCapRate"
                        :rules="numberRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="6">
                  <v-row>
                    <v-col cols="4">
                      <v-subheader>In Place Rent PSF</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        type="number"
                        v-model="inPlaceRentPSF"
                        :rules="numberRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>In Place Expiration</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="inPlaceExpiration"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="computedInPlaceExpirationFormated"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="inPlaceExpiration" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(inPlaceExpiration)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>New Tenant Rent PSF</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        type="number"
                        v-model="newTenantRentPSF"
                        :rules="numberRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>New Tenant TI/SF</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        type="number"
                        v-model="newTenantTISF"
                        :rules="numberRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
            <template v-if="allInputs">
              <v-divider class="ma-4"></v-divider>
              <v-form
                ref="more"
                v-model="validAll"
                lazy-validation
                align="center"
                justify="center"
              >
                <v-row>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Analysis Start</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-dialog
                          ref="dialog"
                          v-model="modal"
                          :return-value.sync="date"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Reimbursement</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Broker Comission</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Exit Costs</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Upfront CAPEX Costs PSF</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="$"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Transaction costs</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Leasing Comissions</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Expenses / SF / Yr</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="$"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="4">
                        <v-subheader>LTC</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Financing Fee</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Interest Rate</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Rent Steps</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Downtime Months</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>CAPEX Reserves</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Other Closing Costs</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>Acquisition Fees</v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          type="number"
                          value="10.00"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </template>
            <v-row align="end" justify="end">
              <v-btn
                class="mx-2"
                fab
                dark
                color="indigo"
                @click="allInputs = !allInputs"
              >
                <v-icon dark v-if="!allInputs"> mdi-plus </v-icon>
                <v-icon dark v-if="allInputs"> mdi-minus </v-icon>
              </v-btn>
            </v-row>
            <v-row align="center" justify="center">
              <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading || !canSubmit()"
                color="success"
                @click="calculate"
              >
                Save & Run
                <template v-if="loading">
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center" class="ma-4">
        <v-col cols="8">
          <v-card class="pa-6">
            <h3>Results</h3>
            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="4">
                    <v-subheader>Unlevered IRR</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <label v-if="!loading">{{ unleveredIRR }}</label>

                    <v-progress-linear
                      v-if="loading"
                      color="deep-purple accent-4"
                      indeterminate
                      rounded
                      height="6"
                    ></v-progress-linear>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-subheader>Unlevered MoC</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <label v-if="!loading">{{ unleveredMOC }}</label>

                    <v-progress-linear
                      v-if="loading"
                      color="deep-purple accent-4"
                      indeterminate
                      rounded
                      height="6"
                    ></v-progress-linear>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-subheader>Gross Levered IRR</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <label v-if="!loading">{{ grossLeveredIRR }}</label>

                    <v-progress-linear
                      v-if="loading"
                      color="deep-purple accent-4"
                      indeterminate
                      rounded
                      height="6"
                    ></v-progress-linear>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="4">
                    <v-subheader>Gross Levered MoC</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <label v-if="!loading">{{ grossLeveredMOC }}</label>

                    <v-progress-linear
                      v-if="loading"
                      color="deep-purple accent-4"
                      indeterminate
                      rounded
                      height="6"
                    ></v-progress-linear>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <v-subheader>Yield On Cost</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <label v-if="!loading">{{ yieldOnCost }}</label>

                    <v-progress-linear
                      v-if="loading"
                      color="deep-purple accent-4"
                      indeterminate
                      rounded
                      height="6"
                    ></v-progress-linear>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: (vm) => ({
    loading: false,

    totalSF: 1,
    holdPeriod: 1,
    purchasePrice: 1,
    exitCapRate: 1,
    inPlaceRentPSF: 1,
    inPlaceExpiration: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    inPlaceExpirationFormated: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    newTenantRentPSF: 1,
    newTenantTISF: 1,

    unleveredIRR: 0,
    unleveredMOC: 0,
    grossLeveredIRR: 0,
    grossLeveredMOC: 0,
    yieldOnCost: 0,

    allInputs: false,
    valid: true,
    validAll: true,
    modal: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    numberRules: [
      //(v) => !!v || "The field is required",
      (v) => (v && v >= 0) || "Value should be more than 0",
    ],
  }),
  computed: {
    computedInPlaceExpirationFormated() {
      return this.formatDate(this.inPlaceExpiration);
    },
  },
  watch: {
    loading() {
      return this.loading;
    },
    date() {
      this.inPlaceExpirationFormated = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    calculate() {
      console.log("Call G Sheets Endpoint");
      if (!this.$refs.form.validate()) {
        console.log("First form invalid");
        return;
      }
      console.log("First form valid");
      if (this.$data.allInputs) {
        if (!this.$refs.more.validate()) {
          console.log("Second form invalid");
          return;
        }
        console.log("Second form valid");
      }

      this.$data.loading = true;
      const payload = {
        totalSF: this.$data.totalSF,
        holdPeriod: this.$data.holdPeriod,
        purchasePrice: this.$data.purchasePrice,
        exitCapRate: this.$data.exitCapRate,
        inPlaceRentPSF: this.$data.inPlaceRentPSF,
        inPlaceExpiration: this.$data.inPlaceExpirationFormated,
        newTenantRentPSF: this.$data.newTenantRentPSF,
        newTenantTISF: this.$data.newTenantTISF,
      };
      axios({
        method: "post",
        url: "http://localhost:8000/calculator/api/calculator",
        data: payload,
        headers: { Authorization: "jwt " + this.$store.state.jwt },
      })
        .then((response) => {
          console.log("Response ", response);

          this.$data.unleveredIRR = response.data.unleveredIRR;
          this.$data.unleveredMOC = response.data.unleveredMOC;
          this.$data.grossLeveredIRR = response.data.grossLeveredIRR;
          this.$data.grossLeveredMOC = response.data.grossLeveredMOC;
          this.$data.yieldOnCost = response.data.yieldOnCost;

          this.$data.loading = false;
        })
        .catch((error) => {
          console.log("Error ", error);

          const l = this.loader;
          this[l] = false;
        });
    },
    canSubmit() {
      if (this.$data.allInputs) {
        return this.$data.valid && this.$data.validAll;
      }
      return this.$data.valid;
    },
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
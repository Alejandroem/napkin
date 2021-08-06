<template>
  <div>
    <v-container fill-height fluid>
      <v-row>
        <v-btn
          relative
          bottom
          right
          fab
          tile
          text
          fixed
          elevation="5"
          :loading="loading"
          :disabled="loading || !canSubmit()"
          color="success"
          @click="calculate"
        >
          <v-icon light>mdi-calculator</v-icon>
          <template v-if="loading">
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-row>
      <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="resultsDialog" hide-overlay persistent width="600">
        <v-card>
          <v-toolbar color="primary" dark>Results</v-toolbar>
          <v-card-text>
            <v-row v-if="!hasError" class="pa-5">
              <v-col cols="6">
                <v-row>
                  <v-col cols="6"> Unlevered IRR </v-col>
                  <v-col cols="6">
                    {{ unleveredIRR }}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6"> Unlevered MoC </v-col>
                  <v-col cols="6">
                    {{ unleveredMOC }}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6"> Gross Levered IRR </v-col>
                  <v-col cols="6">
                    {{ grossLeveredIRR }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="6"> Gross Levered MoC </v-col>
                  <v-col cols="6">
                    {{ grossLeveredMOC }}
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6"> Yield On Cost </v-col>
                  <v-col cols="6">
                    {{ yieldOnCost }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="resultsDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row no-gutters justify="center" class="ma-4">
        <v-col cols="8">
          <v-card class="pa-6">
            <h3>Input</h3>
            <v-form
              :disabled="loading"
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
                        suffix="%"
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
                        ref="dialogInPlaceExpiration"
                        v-model="modalInPlaceExpiration"
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
                          <v-btn
                            text
                            color="primary"
                            @click="modalInPlaceExpiration = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="
                              $refs.dialogInPlaceExpiration.save(
                                inPlaceExpiration
                              )
                            "
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
                :disabled="loading"
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
                          ref="dialogAnalysis"
                          v-model="modalAnalysis"
                          :return-value.sync="analysisStart"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="computedAnalysisStartFormated"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="analysisStart" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="modalAnalysis = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialogAnalysis.save(analysisStart)"
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
                          v-model="reimbursement"
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
                          v-model="brokerComission"
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
                          v-model="exitCosts"
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
                          v-model="upfrontCapexCostsPSF"
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
                          v-model="transactionCosts"
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
                          v-model="leasingComissions"
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
                          v-model="expesnsesSfYr"
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
                          v-model="ltc"
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
                          v-model="financingFee"
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
                          v-model="interestRate"
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
                          v-model="rentSteps"
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
                          v-model="downtimeMonths"
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
                          v-model="capexReserves"
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
                          v-model="otherClosingCosts"
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
                          v-model="acquisitionFees"
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </template>
            <v-row align="end" justify="center">
              <v-btn
                class="mx-2"
                dark
                color="indigo"
                @click="allInputs = !allInputs"
              >
                <span v-if="!allInputs"
                  ><v-icon dark> mdi-plus </v-icon> More Inputs</span
                >
                <span v-if="allInputs"
                  ><v-icon dark> mdi-minus </v-icon> Less Inputs</span
                >
              </v-btn>
            </v-row>
            <v-row align="center" justify="center" v-if="hasError">
              <v-alert color="red" type="error">
                There was an error with your request, refresh and try again
              </v-alert>
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
    loadingDialog: false,
    resultsDialog: false,
    hasError: false,
    //FIRST FORM
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

    //SECOND FORM
    analysisStart: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    analysisStartFormated: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    reimbursement: 100,
    brokerComission: 1,
    exitCosts: 2,
    upfrontCapexCostsPSF: 5,
    transactionCosts: 1,
    leasingComissions: 7,
    expesnsesSfYr: 3.0,
    ltc: 60,
    financingFee: 1,
    interestRate: 4,
    rentSteps: 4,
    downtimeMonths: 9,
    capexReserves: 0.15,
    otherClosingCosts: 1,
    acquisitionFees: 1,
    //RESULTS
    unleveredIRR: 0,
    unleveredMOC: 0,
    grossLeveredIRR: 0,
    grossLeveredMOC: 0,
    yieldOnCost: 0,

    allInputs: false,
    valid: true,
    validAll: true,
    modalAnalysis: null,
    modalInPlaceExpiration: null,
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
    computedAnalysisStartFormated() {
      return this.formatDate(this.analysisStart);
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
      this.$data.loadingDialog = true;
      this.$data.loading = true;
      this.$data.hasError = false;
      const payload = {
        totalSF: this.$data.totalSF,
        holdPeriod: this.$data.holdPeriod,
        purchasePrice: this.$data.purchasePrice,
        exitCapRate: this.$data.exitCapRate,
        inPlaceRentPSF: this.$data.inPlaceRentPSF,
        inPlaceExpiration: this.computedInPlaceExpirationFormated,
        newTenantRentPSF: this.$data.newTenantRentPSF,
        newTenantTISF: this.$data.newTenantTISF,
        allInputs: false,
      };

      if (this.$data.allInputs) {
        payload.allInputs = true;
        payload["analysisStart"] = this.computedAnalysisStartFormated;
        payload["reimbursement"] = this.$data.reimbursement;
        payload["brokerComission"] = this.$data.brokerComission;
        payload["exitCosts"] = this.$data.exitCosts;
        payload["upfrontCapexCostsPSF"] = this.$data.upfrontCapexCostsPSF;
        payload["transactionCosts"] = this.$data.transactionCosts;
        payload["leasingComissions"] = this.$data.leasingComissions;
        payload["expesnsesSfYr"] = this.$data.expesnsesSfYr;
        payload["ltc"] = this.$data.ltc;
        payload["financingFee"] = this.$data.financingFee;
        payload["interestRate"] = this.$data.interestRate;
        payload["rentSteps"] = this.$data.rentSteps;
        payload["downtimeMonths"] = this.$data.downtimeMonths;
        payload["capexReserves"] = this.$data.capexReserves;
        payload["otherClosingCosts"] = this.$data.otherClosingCosts;
        payload["acquisitionFees"] = this.$data.acquisitionFees;
      }
      axios({
        method: "post",
        url: "/calculator/api/calculator",
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
          this.$data.loadingDialog = false;
          this.$data.resultsDialog = true;
        })
        .catch((error) => {
          console.log("Error ", error);
          this.$data.loading = false;
          this.$data.hasError = true;
          this.$data.loadingDialog = false;
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
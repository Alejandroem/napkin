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
                      <v-text-field type="number" value="10.00"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>Hold period</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field type="number" value="10.00"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>Purchase Price</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field type="number" value="10.00"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>Exit cap rate</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field type="number" value="10.00"></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="6">
                  <v-row>
                    <v-col cols="4">
                      <v-subheader>In Place Rent PSF</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field type="number" value="10.00"></v-text-field>
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
                      <v-subheader>New Tenant Rent PSF</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field type="number" value="10.00"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader>New Tenant TI/SF</v-subheader>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field type="number" value="10.00"></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
            <template v-if="allInputs">
              <v-divider class="ma-4"></v-divider>
              <v-form
                ref="formAll"
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
                :disabled="!canSubmit()"
                color="success"
                class="mr-4"
                @click="calculate"
              >
                Save & Run
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center" class="ma-4">
        <v-col cols="8">
          <v-card class="pa-6">
            <h3>Results</h3>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    allInputs: false,
    valid: true,
    validAll: true,
    modal: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    usernameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
  }),

  methods: {
    calculate() {
      this.$refs.form.validate();
      this.$refs.formAll.validate();
      console.log("Call G Sheets Endpoint");
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

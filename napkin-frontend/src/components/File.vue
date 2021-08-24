<template>
  <v-container>
    <v-row no-gutters justify="center" class="ma-4">
      <v-col cols="8">
        <v-card class="pa-6">
          <v-row>
            <v-col cols="6">
              <v-subheader>Excel file</v-subheader>
              <v-file-input
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                label="Excel document"
                outlined
                dense
              ></v-file-input>
            </v-col>
            <v-col cols="6">
              <v-subheader>Word file</v-subheader>
              <v-file-input
                accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                label="Word document"
                outlined
                dense
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn depressed color="primary"> Process </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
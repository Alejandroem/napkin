import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials


def calculate_from_gsheets(values):    
    gc = gspread.service_account(filename='pythonsheets-321421-8d7f4d692a90.json')
    gdoc = gc.open_by_url("https://docs.google.com/spreadsheets/d/1rEGCfoMPKEfrXVaIBiLU-T2B6oKYkQzlw4AsF0d_7Zw")

    mydata = gdoc.sheet1.get_all_records()
    print(values['totalSF'])
    inputsSheet = gdoc.worksheet("Inputs")
    inputsSheet.update('B2', float(values['totalSF']), value_input_option='USER_ENTERED')
    inputsSheet.update('B3', float(values['holdPeriod']), value_input_option='USER_ENTERED')
    inputsSheet.update('B4', float(values['purchasePrice']), value_input_option='USER_ENTERED')
    inputsSheet.update('B5', str(values['exitCapRate'])+"%", value_input_option='USER_ENTERED')
    inputsSheet.update('B6', float(values['inPlaceRentPSF']), value_input_option='USER_ENTERED')
    inputsSheet.update('B7', values['inPlaceExpiration'], value_input_option='USER_ENTERED')
    inputsSheet.update('B8', float(values['newTenantRentPSF']), value_input_option='USER_ENTERED')
    inputsSheet.update('B9', float(values['newTenantTISF']), value_input_option='USER_ENTERED')

    if values['allInputs']: 
        inputsSheet.update('B11', values['analysisStart'],value_input_option='USER_ENTERED')
        inputsSheet.update('B12', str(values['reimbursement']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B13', str(values['brokerComission']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B14', str(values['exitCosts']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B15', "$"+str(values['upfrontCapexCostsPSF']).strip(),value_input_option='USER_ENTERED')
        inputsSheet.update('B16', str(values['transactionCosts']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B25', str(values['leasingComissions']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B26', float(values['expesnsesSfYr']),value_input_option='USER_ENTERED')
        inputsSheet.update('B17', str(values['ltc']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B18', str(values['financingFee']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B19', str(values['interestRate']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B20', str(values['rentSteps']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B22', float(values['downtimeMonths']),value_input_option='USER_ENTERED')
        inputsSheet.update('B27', float(values['capexReserves']),value_input_option='USER_ENTERED')
        inputsSheet.update('B29', str(values['otherClosingCosts']).strip()+"%",value_input_option='USER_ENTERED')
        inputsSheet.update('B30', str(values['acquisitionFees']).strip()+"%",value_input_option='USER_ENTERED')

    resultsSheet = gdoc.worksheet("Results")
    return {
        'unleveredIRR': resultsSheet.acell('B1').value,
        'unleveredMOC': resultsSheet.acell('B2').value,
        'grossLeveredIRR': resultsSheet.acell('B3').value,
        'grossLeveredMOC': resultsSheet.acell('B4').value,
        'yieldOnCost': resultsSheet.acell('B5').value,
    }
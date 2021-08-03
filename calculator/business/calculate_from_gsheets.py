import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials


def calculate_from_gsheets(values):    
    gc = gspread.service_account(filename='pythonsheets-321421-8d7f4d692a90.json')
    gdoc = gc.open_by_url("https://docs.google.com/spreadsheets/d/1rEGCfoMPKEfrXVaIBiLU-T2B6oKYkQzlw4AsF0d_7Zw")

    mydata = gdoc.sheet1.get_all_records()
    print(values['totalSF'])
    inputsSheet = gdoc.worksheet("Inputs")
    inputsSheet.update('B2', float(values['totalSF']))
    inputsSheet.update('B3', float(values['holdPeriod']))
    inputsSheet.update('B4', float(values['purchasePrice']))
    inputsSheet.update('B5', str(values['exitCapRate']).strip()+"%")
    inputsSheet.update('B6', float(values['inPlaceRentPSF']))
    inputsSheet.update('B7', values['inPlaceExpiration'])
    inputsSheet.update('B8', float(values['newTenantRentPSF']))
    inputsSheet.update('B9', float(values['newTenantTISF']))

    resultsSheet = gdoc.worksheet("Results")
    return {
        'unleveredIRR': resultsSheet.acell('B1').value,
        'unleveredMOC': resultsSheet.acell('B2').value,
        'grossLeveredIRR': resultsSheet.acell('B3').value,
        'grossLeveredMOC': resultsSheet.acell('B4').value,
        'yieldOnCost': resultsSheet.acell('B5').value,
    }
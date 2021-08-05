from datetime import datetime
from napkin.settings import BASE_DIR
import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials

from googleapiclient.discovery import build

from apiclient import errors

def calculate_from_gsheets(values):    
    credentials_path = BASE_DIR / 'pythonsheets-321421-8d7f4d692a90.json'
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_path)
    service = build('drive', 'v3', credentials=credentials)
    


    #File id
    source_file_id = '1rEGCfoMPKEfrXVaIBiLU-T2B6oKYkQzlw4AsF0d_7Zw'

    #Folder id
    folders_id = ['1FSZ5_Ckdn7-GZykLtIHvltMvK9aQ8-K6']

    file_metadata = {
        'name' : datetime.now().isoformat(),
        'parents' : folders_id,
        'starred' : True,
    }
    
    try:
        created_file = service.files().copy(
            fileId=source_file_id, body=file_metadata).execute()
        print(created_file)
    except errors.HttpError as error:
        print(error)
        raise ValueError('An error occured while creating the file' + error.error_details)


    gc = gspread.service_account(filename='pythonsheets-321421-8d7f4d692a90.json')
    gdoc = gc.open_by_url("https://docs.google.com/spreadsheets/d/"+created_file['id'])

    mydata = gdoc.sheet1.get_all_records()

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
    response = {
        'unleveredIRR': resultsSheet.acell('B1').value,
        'unleveredMOC': resultsSheet.acell('B2').value,
        'grossLeveredIRR': resultsSheet.acell('B3').value,
        'grossLeveredMOC': resultsSheet.acell('B4').value,
        'yieldOnCost': resultsSheet.acell('B5').value,
    }

    try:
        created_file = service.files().delete(fileId=created_file['id']).execute()
    except errors.HttpError as error:
        print(error)
        raise ValueError('An error occured while deleting the file' + error.error_details)
    return response
import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials


def calculate_from_gsheets():    
    gc = gspread.service_account(filename='pythonsheets-321421-8d7f4d692a90.json')
    gdoc = gc.open_by_url("https://docs.google.com/spreadsheets/d/1Q1C4TEY_yEavQCbqXgKXUPDTOH2-E3S5SvS9bHuwL_w")

    mydata = gdoc.sheet1.get_all_records()
    print(mydata)

    wsheet = gdoc.worksheet("Sheet1")
    wsheet.update('A2', 100)
    wsheet.update('B2', 100)

    cval = wsheet.acell('D2').value
    return cval
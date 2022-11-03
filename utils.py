from random import randint

def get_check_digits(process_num):
    if len(process_num) != 18:
        print(process_num)
        raise Exception("Lawsuits IDs wihtout check digits should have 18 numerical digits.")

    sequencial = int(process_num[:7])
    year = int(process_num[7:11])
    jtr = int(process_num[11:14])
    origin = int(process_num[14:])
    origin = str(origin).rjust(4,'0')

    n1 = sequencial % 97
    n1 = str(n1).rjust(2, '0')
    n2 = int(f"{n1}{year}{jtr}") % 97
    n2 = str(n2).rjust(2, '0')
    n3 = 98 - ((int(f"{n2}{origin}") * 100) % 97)
    n3 = str(n3).rjust(2, '0')

    return n3

def get_cnj_code(sequencial=None, year=None, j=None, tr=None, origin=None):
    sequencial = sequencial or randint(1, 10000000)
    sequencial = str(sequencial).rjust(7,'0')
    year = year or randint(2008, 2021)
    j = j or randint(1, 9)
    tr = tr or randint(0, 27)
    tr = str(tr).rjust(2,'0')
    origin = origin or randint(1, 9000)
    origin = str(origin).rjust(4,'0')

    dd = get_check_digits(f"{sequencial}{year}{j}{tr}{origin}")

    return f"{sequencial}-{dd}.{year}.{j}.{tr}.{origin}"
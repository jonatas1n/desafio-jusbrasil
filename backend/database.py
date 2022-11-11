from enum import Enum
import json
import pandas as pd

with open('database.json') as file:
    database = json.load(file)
    database = pd.DataFrame.from_dict(database)

with open('movement.json') as file:
    movement = json.load(file)

with open('active.json') as file:
    active_list = json.load(file)

with open('passive.json') as file:
    passive_list = json.load(file)

with open('otherInterested.json') as file:
    other_list = json.load(file)

class Response(Enum):
    SUCCESS = 1
    WRONG_LENGTH = 2
    INVALID_CODE = 3
    NOT_FOUND = 4

class Database:
    def __init__(self):
        self.database = database

    def get_active(self, lawsuit_id):
        participants = active_list.get(lawsuit_id)
        if len(participants) == 0:
            return {}
        return participants[0]

    def get_passive(self, lawsuit_id):
        participants = passive_list.get(lawsuit_id)
        if len(participants) == 0:
            return {}
        return participants[0]

    def get_others(self, lawsuit_id):
        participants = other_list.get(lawsuit_id)
        if len(participants) == 0:
            return {}
        return participants[0]

    def get_movement(self, lawsuit_id):
        participants = other_list.get(lawsuit_id)
        if len(participants) == 0:
            return {}
        return participants[0]

    def search(self, argument):
        data = self.database
        columns = list(self.database.columns)

        searched = [False for _ in range(len(data))]
        for column in columns:
            have_item = data[column].str.contains(argument, na=False, case=False)
            have_item = list(have_item)
            searched = [item[0] or item[1] for item in zip(searched, have_item)]

        for i in range(len(searched)):
            if searched[i]:
                continue

            lawsuitID = data.iloc[i]['lawsuitID']
            others = self.get_others(lawsuitID)
            others = list(others.values())
            others = [str(other).lower() for other in others]
            others = ' '.join(others)
            
            actives = self.get_active(lawsuitID)
            actives = list(actives.values())
            actives = [str(active).lower() for active in actives]
            actives = ' '.join(actives)
            
            passives = self.get_passive(lawsuitID)
            passives = list(passives.values())
            passives = [str(passive).lower() for passive in passives]
            passives = ' '.join(passives)

            if argument.lower() in f"{others} {actives} {passives}":
                searched[i] = True

        data = data[searched]

        return data

    def filtered_search(self, **kwargs):
        data = self.database
        columns = list(self.database.columns)

        if 'searchArgument' in kwargs:
            query = ''
            argument = kwargs.pop('searchArgument')
            for column in columns:
                if query[-1] != '|':
                    query += ' | '
                query += f"'{argument}' in {column}"
            data = data.query(query)

        for key, arg in kwargs.items():
            have_item = data[key].str.contains(arg, na=False, case=False)
            data = data[have_item]

        return data

    def get_process(self, lawsuit_id):
        process = self.database.query(f"lawsuitID == '{lawsuit_id}'")
        labels = list(self.database.columns)
        values = process.values[0]
        return dict(zip(labels, values))